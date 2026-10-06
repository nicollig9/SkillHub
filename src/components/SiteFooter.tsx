import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin, MapPin } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer id="contato" className="border-t border-violet-200/10 bg-[#0c0a16] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="SkillHub, início">
            <img src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="text-lg font-extrabold text-white">Skill<span className="text-violet-400">Hub</span></span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">Mais caminhos para jovens talentos e empresas de Curitiba e Região Metropolitana.</p>
          <p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5 text-violet-300" /> Curitiba &amp; Região Metropolitana</p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Plataforma</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link className="transition hover:text-violet-200" href="/">Início</Link>
            <Link className="transition hover:text-violet-200" href="/vagas">Vagas</Link>
            <Link className="transition hover:text-violet-200" href="/login">Acessar conta</Link>
            <Link className="transition hover:text-violet-200" href="/sobre">Sobre nós</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Informações</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link className="transition hover:text-violet-200" href="/sobre#termos">Termos de uso</Link>
            <Link className="transition hover:text-violet-200" href="/sobre#privacidade">Privacidade e LGPD</Link>
            <a className="transition hover:text-violet-200" href="mailto:contato@skillhub.com.br">Contato</a>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Redes</h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">Os canais oficiais serão adicionados após a confirmação dos perfis da SkillHub.</p>
          <div className="mt-3 flex gap-2 text-slate-500" aria-label="Instagram e LinkedIn">
            <span title="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/10"><Instagram className="h-4 w-4" /></span>
            <span title="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/10"><Linkedin className="h-4 w-4" /></span>
            <a href="#inicio" title="Voltar ao topo" className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/10 text-violet-300 transition hover:border-violet-300/30 hover:bg-violet-300/[0.06]"><ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-violet-200/10 px-5 py-4 text-center text-xs text-slate-500 sm:px-8">© {new Date().getFullYear()} SkillHub. Curitiba &amp; Região Metropolitana.</div>
    </footer>
  );
}