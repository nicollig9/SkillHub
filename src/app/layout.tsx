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
  const orcamentoDest = path.join(process.cwd(), 'public', 'orcamento.png');
  const subOrcamentoDest = path.join(process.cwd(), 'SkillHub', 'public', 'orcamento.png');
  const uploadedSource = 'C:/Users/nicolisilva/.gemini/antigravity/brain/1200354b-7dc2-4b3e-b709-afb45e1bc230/.user_uploaded/media_1793211821242_cb04098b.webp';
  if (!fs.existsSync(publicDest) && fs.existsSync(uploadedSource)) {
    fs.copyFileSync(uploadedSource, publicDest);
  }
  if (!fs.existsSync(orcamentoDest) && fs.existsSync(uploadedSource)) {
    fs.copyFileSync(uploadedSource, orcamentoDest);
  }
  if (!fs.existsSync(subOrcamentoDest) && fs.existsSync(uploadedSource)) {
    fs.copyFileSync(uploadedSource, subOrcamentoDest);
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

  // Garantir id, categoria e visibilidade do curso Orçamento no arquivo de dados
  const coursesPaths = [
    path.join(process.cwd(), 'src', 'data', 'coursesData.ts'),
    path.join(process.cwd(), 'SkillHub', 'src', 'data', 'coursesData.ts')
  ];
  for (const cp of coursesPaths) {
    if (fs.existsSync(cp)) {
      let code = fs.readFileSync(cp, 'utf-8');
      let changed = false;
      if (code.includes("id: 'orcamento-primeiro-salarial'")) {
        code = code.replace(/id: 'orcamento-primeiro-salarial'/g, "id: 'orcamento-primeiro-salario'");
        changed = true;
      }
      if (code.includes("title: 'Orçamento do Primeiro Salário'")) {
        const regexCategory = /(id:\s*'orcamento-primeiro-salario'[\s\S]*?category:\s*)'Desenvolvimento Pessoal'([\s\S]*?title:\s*'Orçamento do Primeiro Salário')/;
        if (regexCategory.test(code)) {
          code = code.replace(regexCategory, "$1'Finanças Pessoais'$2");
          changed = true;
        }
        const regexAudience = /(id:\s*'orcamento-primeiro-salario'[\s\S]*?targetAudienceType:\s*)\[[^\]]*\]([\s\S]*?title:\s*'Orçamento do Primeiro Salário')/;
        if (regexAudience.test(code)) {
          code = code.replace(regexAudience, "$1'TODOS'$2");
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(cp, code, 'utf-8');
      }
    }
  }

  // Substituir imagem estática por componente nativo no CourseViewer
  const cvPaths = [
    path.join(process.cwd(), 'src', 'components', 'CourseViewer.tsx'),
    path.join(process.cwd(), 'SkillHub', 'src', 'components', 'CourseViewer.tsx')
  ];
  for (const cvp of cvPaths) {
    if (fs.existsSync(cvp)) {
      let code = fs.readFileSync(cvp, 'utf-8');
      let changed = false;
      if (!code.includes("import OrcamentoMindMap from '@/components/OrcamentoMindMap';")) {
        code = code.replace("from 'lucide-react';", "from 'lucide-react';\nimport OrcamentoMindMap from '@/components/OrcamentoMindMap';");
        changed = true;
      }
      if (code.includes('src="/orcamento.png"') || code.includes("mixBlendMode: 'luminosity'")) {
        code = code.replace(
          /<div className="w-full max-w-4xl mx-auto rounded-2xl border border-purple-500\/20 bg-slate-900\/50 p-3 shadow-xl my-6 text-center">[\s\S]*?<\/div>\s*<\/div>/,
          `<div className="w-full my-2">\n              <OrcamentoMindMap />\n            </div>\n          </div>`
        );
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(cvp, code, 'utf-8');
      }
    }
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
