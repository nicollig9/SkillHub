import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import ToastContainer from '@/components/ToastContainer';

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
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen antialiased selection:bg-purple-600 selection:text-white transition-colors duration-300">
        <AppProvider>
          {children}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
