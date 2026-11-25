'use client';

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { JobOpportunity } from '@/data/jobsData';
import { MapPin, Navigation, Building2, ExternalLink, Sparkles, Compass } from 'lucide-react';
import Link from 'next/link';

// Componente utilitário para recentralizar o mapa suavemente quando as coordenadas mudarem
function MapViewController({
  center,
  zoom
}: {
  center: [number, number];
  zoom?: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom || map.getZoom(), {
      animate: true,
      duration: 0.8
    });
  }, [center, zoom, map]);

  return null;
}

// Cria ícones com pino e etiqueta visível do bairro (ex: 📍 Batel) em SVG limpo
function createCustomPin(
  job: JobOpportunity,
  isSelected: boolean
): L.DivIcon {
  const colorMap: Record<string, { bg: string; border: string; glow: string; text: string }> = {
    Presencial: {
      bg: '#059669', // Emerald-600
      border: '#10B981',
      glow: 'rgba(16, 185, 129, 0.5)',
      text: '#FFFFFF'
    },
    Híbrido: {
      bg: '#7C3AED', // Purple-600
      border: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.5)',
      text: '#FFFFFF'
    },
    Remoto: {
      bg: '#2563EB', // Blue-600
      border: '#3B82F6',
      glow: 'rgba(37, 99, 235, 0.5)',
      text: '#FFFFFF'
    }
  };

  const scheme = colorMap[job.modality] || colorMap['Presencial'];
  const size = isSelected ? 42 : 34;
  const iconSize = isSelected ? 20 : 16;

  const html = `
    <div style="
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transform: translate(-50%, -50%);
      transition: all 0.25s ease;
    ">
      ${isSelected ? `
        <div style="
          position: absolute;
          top: 0;
          width: ${size + 14}px;
          height: ${size + 14}px;
          border-radius: 9999px;
          background: ${scheme.glow};
          animation: pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        "></div>
      ` : ''}

      <!-- Círculo do Pino -->
      <div style="
        position: relative;
        z-index: 10;
        width: ${size}px;
        height: ${size}px;
        border-radius: 9999px;
        background: linear-gradient(135deg, ${scheme.bg}, #0F172A);
        border: 2.5px solid ${isSelected ? '#FFFFFF' : scheme.border};
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4), 0 0 ${isSelected ? '12px' : '4px'} ${scheme.glow};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${scheme.text};
      ">
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>

      <!-- Etiqueta / Badge Visível do Bairro -->
      <div style="
        margin-top: 3px;
        white-space: nowrap;
        font-size: 10px;
        font-weight: 800;
        color: #FFFFFF;
        background: rgba(15, 23, 42, 0.94);
        padding: 2px 7px;
        border-radius: 9999px;
        border: 1px solid rgba(139, 92, 246, 0.6);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 3px;
      ">
        <span style="color: #C084FC;">📍</span>
        <span>${job.neighborhood}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-skillhub-marker',
    html,
    iconSize: [size, size + 20],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
}

// Marcador da localização do aluno (GPS)
function createUserLocationPin(): L.DivIcon {
  const html = `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      transform: translate(-50%, -50%);
    ">
      <div style="
        position: absolute;
        width: 38px;
        height: 38px;
        border-radius: 9999px;
        background: rgba(59, 130, 246, 0.4);
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      "></div>
      <div style="
        position: relative;
        z-index: 10;
        width: 18px;
        height: 18px;
        border-radius: 9999px;
        background: #2563EB;
        border: 3px solid #FFFFFF;
        box-shadow: 0 0 14px rgba(37, 99, 235, 0.9);
      "></div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-user-marker',
    html,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

interface LeafletJobsMapProps {
  jobs: JobOpportunity[];
  selectedJobId: string | null;
  onSelectJob: (job: JobOpportunity) => void;
  onOpenDetails: (job: JobOpportunity) => void;
  centerCoords: [number, number];
  zoomLevel?: number;
  userCoords: [number, number] | null;
  userAddressLabel?: string;
  distancesMap?: Record<string, number>;
}

export default function LeafletJobsMap({
  jobs,
  selectedJobId,
  onSelectJob,
  onOpenDetails,
  centerCoords,
  zoomLevel = 13,
  userCoords,
  userAddressLabel,
  distancesMap = {}
}: LeafletJobsMapProps) {
  const userPinIcon = useMemo(() => createUserLocationPin(), []);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white flex flex-col">
      {/* Barra de Informações Flutuante no Topo */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center justify-between pointer-events-none">
        {/* Indicador de Status / Localização */}
        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-purple-500/30 text-xs text-slate-100 shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">{jobs.length} vagas mapeadas</span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            • OpenStreetMap Oficial (Bairros e Ruas Nítidos)
          </span>
        </div>

        {userCoords && (
          <div className="pointer-events-auto hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/90 border border-blue-500/40 text-[11px] font-semibold text-blue-200 shadow-lg">
            <Navigation className="w-3.5 h-3.5 text-blue-400" />
            <span>GPS Ativo</span>
          </div>
        )}
      </div>

      {/* Legenda de Modalidades Flutuante no Rodapé */}
      <div className="absolute bottom-3 left-3 z-[1000] hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-purple-500/30 text-[11px] text-slate-200 shadow-xl pointer-events-auto">
        <span className="font-extrabold text-white text-xs">
          Modalidades:
        </span>
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span>Presencial</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />
          <span>Híbrido</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
          <span>Remoto</span>
        </div>
      </div>

      {/* Mapa Leaflet com OpenStreetMap Oficial */}
      <MapContainer
        center={centerCoords}
        zoom={zoomLevel}
        minZoom={9}
        maxZoom={19}
        scrollWheelZoom={true}
        className="w-full h-full flex-1 z-0"
        style={{ minHeight: '100%', height: '100%', width: '100%' }}
      >
        <MapViewController center={centerCoords} zoom={zoomLevel} />

        {/* Servidor Oficial Padrão do OpenStreetMap - 100% Nítido, Colorido e Detalhado */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
          maxZoom={19}
        />

        {/* Marcador do Usuário com Raio de Precisão */}
        {userCoords && (
          <>
            <Circle
              center={userCoords}
              radius={500}
              pathOptions={{
                color: '#2563EB',
                fillColor: '#3B82F6',
                fillOpacity: 0.18,
                weight: 2
              }}
            />
            <Marker position={userCoords} icon={userPinIcon}>
              <Popup className="skillhub-popup">
                <div className="p-1 space-y-1 text-slate-100">
                  <div className="font-extrabold text-xs flex items-center gap-1.5 text-blue-400">
                    <Navigation className="w-3.5 h-3.5" />
                    Sua Localização Atual
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {userAddressLabel || 'Ponto de referência para cálculo da distância.'}
                  </p>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Marcadores de Todas as Vagas com Balão (Popup) com Contraste Perfeito */}
        {jobs.map((job) => {
          const isSelected = selectedJobId === job.id;
          const pinIcon = createCustomPin(job, isSelected);
          const distanceKm = distancesMap[job.id];

          return (
            <Marker
              key={job.id}
              position={[job.lat, job.lng]}
              icon={pinIcon}
              eventHandlers={{
                click: () => onSelectJob(job)
              }}
            >
              <Popup className="skillhub-popup" minWidth={280} maxWidth={340}>
                <div className="p-1 space-y-3 text-slate-100">
                  {/* Cabeçalho do Popup: Bairro em Destaque & Modalidade */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/40 text-purple-200 text-xs font-bold">
                      <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                      <span>📍 {job.neighborhood} • {job.city}</span>
                    </div>

                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white"
                      style={{
                        backgroundColor:
                          job.modality === 'Presencial'
                            ? '#059669'
                            : job.modality === 'Híbrido'
                            ? '#7C3AED'
                            : '#2563EB'
                      }}
                    >
                      {job.modality}
                    </span>
                  </div>

                  {/* Informações Principais da Vaga */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded inline-block">
                      {job.contractType}
                    </span>
                    <h4 className="text-sm font-black text-white leading-tight">
                      {job.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{job.company}</span>
                    </p>
                    {typeof distanceKm === 'number' && (
                      <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 pt-0.5">
                        <Navigation className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Aproximadamente {distanceKm} km de distância</span>
                      </p>
                    )}
                  </div>

                  {/* Remuneração em Destaque */}
                  <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 font-medium">Bolsa / Salário:</span>
                    <span className="font-black text-sm text-emerald-400">{job.salary}</span>
                  </div>

                  {/* Curso Recomendado SkillHub */}
                  {job.recommendedCourses.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/30 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] font-extrabold text-purple-300 uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>Curso SkillHub Recomendado</span>
                      </div>
                      <Link
                        href={job.recommendedCourses[0].link}
                        className="text-xs font-bold text-purple-200 hover:text-white hover:underline flex items-center justify-between"
                      >
                        <span>{job.recommendedCourses[0].title}</span>
                        <ExternalLink className="w-3 h-3 text-purple-400 shrink-0 ml-1" />
                      </Link>
                    </div>
                  )}

                  {/* Botão de Ação no Popup */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenDetails(job)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Ver Detalhes e Candidatar-se</span>
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
