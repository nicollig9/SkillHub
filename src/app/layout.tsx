import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import ToastContainer from '@/components/ToastContainer';
import Footer from '@/components/Footer';
import fs from 'fs';
import path from 'path';

// Garantir que imagens dos mapas mentais existam em disco
try {
  const publicDest = path.join(process.cwd(), 'public', 'mapa-mental-orcamento.png');
  const uploadedSource = 'C:/Users/nicolisilva/.gemini/antigravity/brain/1200354b-7dc2-4b3e-b709-afb45e1bc230/.user_uploaded/media_1793211821242_cb04098b.webp';
  if (!fs.existsSync(publicDest) && fs.existsSync(uploadedSource)) {
    fs.copyFileSync(uploadedSource, publicDest);
  }

  const equilibrioDest = path.join(process.cwd(), 'public', 'mapa-mental-equilibrio.png');
  const subEquilibrioDest = path.join(process.cwd(), 'SkillHub', 'public', 'mapa-mental-equilibrio.png');
  const equilibrioSource = 'C:/Users/nicolisilva/.gemini/antigravity/brain/1200354b-7dc2-4b3e-b709-afb45e1bc230/mapa_mental_equilibrio_1793215124594.jpg';
  if (!fs.existsSync(equilibrioDest) && fs.existsSync(equilibrioSource)) {
    fs.copyFileSync(equilibrioSource, equilibrioDest);
  }
  if (!fs.existsSync(subEquilibrioDest) && fs.existsSync(equilibrioSource)) {
    fs.copyFileSync(equilibrioSource, subEquilibrioDest);
  }
} catch {}

export const metadata: Metadata = {
  title: 'SkillHub — Plataforma de Formação e Empregabilidade de Aprendizes',
  description: 'Capacitação, Gamificação com Badges, Mapa de Proximidade e Guardrails LGPD para Jovens Aprendizes em Curitiba e Região Metropolitana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Montserrat:wght@700;800&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('skillhub_theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}else{document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col antialiased selection:bg-purple-600 selection:text-white transition-colors duration-300">
        <AppProvider>
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>
          <Footer />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
