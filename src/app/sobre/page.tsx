import { ArrowRight, Building2, GraduationCap, HeartHandshake, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';

const impact = [
  { value: '+1.200', label: 'jovens cadastrados' },
  { value: '+80', label: 'empresas parceiras na RMC' },
  { value: '95%', label: 'taxa de contratabilidade informada' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f0c1b] text-white">
      <Header />
      <main>
        <section id="inicio" className="relative isolate overflow-hidden border-b border-violet-200/10 px-5 py-20 sm:px-8 sm:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.20),transparent_58%)]" />
          <div className="mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[0.06] px-3 py-1.5 text-xs font-semibold text-violet-200"><MapPin className="h-3.5 w-3.5" /> Curitiba &amp; Região Metropolitana</div>
            <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">Talento existe em todo lugar. <span className="text-violet-300">Oportunidade também deve existir.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">O SkillHub aproxima jovens que estão começando sua trajetória profissional das empresas que querem formar e contratar novos talentos na região de Curitiba.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/vagas" className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500">Conhecer oportunidades <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/cadastro" className="inline-flex items-center justify-center gap-2 rounded-lg border border-violet-300/20 px-5 py-3 text-sm font-semibold text-violet-100 transition hover:border-violet-300/50 hover:bg-violet-300/[0.06]">Fazer parte do SkillHub</Link>
            </div>
          </div>
        </section>

        <section id="sobre" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Nossa missão</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Uma ponte entre formação e trabalho digno</h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">O início da vida profissional pode ser difícil quando faltam experiência, orientação e acesso às empresas. O SkillHub foi pensado para reduzir essa distância: reunir formação prática, oportunidades locais e informação clara em uma plataforma acessível.</p>
            <p className="mt-4 text-sm leading-7 text-slate-400">A atuação prioriza a inclusão de jovens de Curitiba e da Região Metropolitana, respeitando as regras de aprendizagem, estágio, proteção de dados e participação de responsáveis legais quando necessário.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: GraduationCap, title: 'Formação prática', text: 'Conteúdos e trilhas conectados às competências do primeiro emprego.' },
              { icon: Building2, title: 'Conexão local', text: 'Empresas e oportunidades próximas da realidade de cada jovem.' },
              { icon: ShieldCheck, title: 'Segurança', text: 'Cuidado com dados pessoais e processos seletivos responsáveis.' },
              { icon: HeartHandshake, title: 'Inclusão', text: 'Mais acesso a caminhos de aprendizagem, estágio e trabalho.' },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-xl border border-violet-200/10 bg-[#18132b] p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-300/15 bg-violet-300/[0.07] text-violet-200"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-sm font-bold text-white">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-violet-200/10 bg-[#141020] px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-300"><Sparkles className="h-4 w-4" /> Impacto na região</div>
            <div className="grid gap-3 sm:grid-cols-3">
              {impact.map((item) => <div key={item.label} className="rounded-xl border border-violet-200/10 bg-[#18132b] p-6"><p className="text-3xl font-extrabold text-violet-300">{item.value}</p><p className="mt-2 text-sm text-slate-400">{item.label}</p></div>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Vozes da comunidade</p><h2 className="mt-2 text-2xl font-bold">Histórias que merecem ser ouvidas</h2></div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-200/10 px-3 py-1.5 text-xs text-slate-400"><ShieldCheck className="h-3.5 w-3.5 text-violet-300" /> Publicação mediante autorização</span>
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-violet-300/20 bg-[#18132b]/60 p-7 sm:p-9">
            <p className="max-w-3xl text-sm leading-7 text-slate-300">Os depoimentos de jovens contratados e empresas parceiras serão publicados aqui com autorização explícita e identificação validada. Como não há relatos autorizados cadastrados neste projeto, não exibimos citações fictícias.</p>
            <a href="mailto:contato@skillhub.com.br" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200">Compartilhar uma história <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-2">
          <article id="termos" className="scroll-mt-24 rounded-xl border border-violet-200/10 bg-[#18132b] p-6">
            <h2 className="text-base font-bold">Termos de uso</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">A plataforma conecta jovens e empresas a oportunidades de formação e trabalho. Processos seletivos devem respeitar a legislação aplicável e não podem cobrar taxas dos candidatos.</p>
          </article>
          <article id="privacidade" className="scroll-mt-24 rounded-xl border border-violet-200/10 bg-[#18132b] p-6">
            <h2 className="text-base font-bold">Privacidade e LGPD</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Dados de candidatos devem ser usados apenas para finalidades informadas e com acesso controlado. Dados de menores requerem os cuidados e autorizações previstos em lei.</p>
          </article>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}