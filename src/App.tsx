/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MessageCircle,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Award,
  SlidersHorizontal,
  Building2,
  Home,
  Factory,
  ChevronDown,
  Menu,
} from 'lucide-react';
import {
  CustomizableVisualSlot,
  HeroSystemIllustration,
  SecurityPillarIllustration,
  NetworkPillarIllustration,
  EnergyPillarIllustration,
  AuthorityEngineerIllustration,
} from './components/VisualAssets';
import { DynamicSolutionBlock } from './components/DynamicSolutionBlock';

type AudienceKey = 'empresas' | 'condominios' | 'residencias';

const AUDIENCE_PROFILES: Record<AudienceKey, { label: string }> = {
  empresas: { label: 'Empresas e Indústrias' },
  condominios: { label: 'Condomínios e Síndicos' },
  residencias: { label: 'Residências de Alto Padrão' },
};

const SERVICE_PILLARS = [
  {
    id: 'pillar-security',
    number: '01.',
    category: 'PROTEÇÃO PATRIMONIAL E VIDA',
    title: 'Segurança Eletrônica e Controle de Acesso',
    subtitle:
      'Projetos de prevenção e resposta desenhados por Gestor de Segurança, com alimentação elétrica e rede de dados imunes a sabotagem ou queda de tensão.',
    specs: 'CFTV IP Analítico · SDAI (NBR 17240) · Controle de Acesso',
    items: [
      {
        name: 'CFTV IP de Alta Definição e Analíticos',
        desc: 'Câmeras PoE com leitura de placas (LPR), cercamento virtual e gravação redundante local/nuvem.',
      },
      {
        name: 'SDAI — Detecção e Alarme de Incêndio',
        desc: 'Centrais endereçáveis, detectores ópticos/termovelocimétricos e laudo técnico com emissão de TRT.',
      },
      {
        name: 'Controle de Acesso Físico e Portaria',
        desc: 'Terminais faciais antifraude, biometria, catracas, clausuras veiculares e intertravamento eletromecânico.',
      },
    ],
  },
  {
    id: 'pillar-network',
    number: '02.',
    category: 'CONECTIVIDADE DE MISSÃO CRÍTICA',
    title: 'Infraestrutura de Redes e Telecom',
    subtitle:
      'Sem rede estável, câmeras, portarias e inversores solares ficam cegos. Construímos a espinha dorsal física e lógica para disponibilidade contínua.',
    specs: 'Cabeamento Cat6A/Fibra · Failover Dual-WAN · Wi-Fi Corporativo',
    items: [
      {
        name: 'Cabeamento Estruturado e Organização de Racks',
        desc: 'Saneamento de racks críticos, certificação de pontos Cat6/Cat6A, fusão de fibra óptica e identificação técnica.',
      },
      {
        name: 'Redundância de Internet e Failover Automático',
        desc: 'Balanceamento de carga entre múltiplas operadoras e backup 4G/5G/Starlink sem queda de sessão.',
      },
      {
        name: 'Wi-Fi Corporativo e Residencial de Alta Densidade',
        desc: 'Mapa de calor (Site Survey), Access Points gerenciáveis em teto/parede e rede isolada (VLAN) para visitantes e IoT.',
      },
    ],
  },
  {
    id: 'pillar-energy',
    number: '03.',
    category: 'AUTONOMIA ENERGÉTICA E ELETROMOBILIDADE',
    title: 'Energia Solar e Carregadores Veiculares',
    subtitle:
      'Engenharia eletrotécnica aplicada para reduzir custos fixos de energia, garantir operação durante apagões e viabilizar a recarga de veículos elétricos com segurança.',
    specs: 'Solar On-Grid / Off-Grid Híbrido · Wallbox EV · Adequação NBR 5410',
    items: [
      {
        name: 'Sistemas Fotovoltaicos On-Grid, Off-Grid e Híbridos',
        desc: 'Homologação na concessionária, inversores híbridos com banco de baterias LiFePO4 para backup de cargas críticas.',
      },
      {
        name: 'Infraestrutura para Carregadores Veiculares (EV)',
        desc: 'Instalação de estações Wallbox em condomínios, empresas e residências com proteção residual (DR Tipo B) e medição individual.',
      },
      {
        name: 'Automação de Quadros e Proteção contra Surtos',
        desc: 'Reforma de QGBTs, coordenação de DPS (proteção contra raios), aterramento técnico e gestão inteligente de cargas.',
      },
    ],
  },
];

const SCOPE_OPTIONS = [
  { id: 'cftv', label: 'CFTV IP & Monitoramento Perimetral', pillar: 'Segurança' },
  { id: 'sdai', label: 'SDAI (Alarme de Incêndio NBR 17240)', pillar: 'Segurança' },
  { id: 'acesso', label: 'Controle de Acesso Facial / Portaria', pillar: 'Segurança' },
  { id: 'rede', label: 'Cabeamento Estruturado / Reforma de Rack', pillar: 'Redes' },
  { id: 'wifi', label: 'Wi-Fi de Alta Cobertura & Failover de Internet', pillar: 'Redes' },
  { id: 'solar', label: 'Energia Solar (On-Grid ou Híbrido Off-Grid)', pillar: 'Energia' },
  { id: 'ev', label: 'Carregador Veicular (Wallbox EV) + Laudo Elétrico', pillar: 'Energia' },
];

const FAQ_ITEMS = [
  {
    question: 'Por que contratar um único profissional em vez de empresas separadas para CFTV, Rede e Elétrica?',
    answer:
      'Sistemas modernos de segurança, conectividade e energia dependem diretamente uns dos outros. Câmeras IP e controles faciais rodam sobre cabeamento de rede e switches PoE, que por sua vez exigem aterramento, proteção contra surtos e autonomia elétrica dimensionada. Centralizar em um Gestor de Segurança e Técnico Eletrotécnico elimina falhas de comunicação, reduz custos de passagem de cabos duplicados e garante um único responsável técnico caso algo precise de manutenção.',
  },
  {
    question: 'O que é o TRT (Termo de Responsabilidade Técnica) e quando ele é obrigatório?',
    answer:
      'O TRT é o documento oficial emitido por profissional registrado no CRT (Conselho Regional dos Técnicos Industriais) que atesta que o projeto, execução ou manutenção segue rigorosamente as normas técnicas da ABNT e NR-10. Ele é exigido em reformas condominiais (NBR 16280), vistorias do Corpo de Bombeiros (AVCB/CLCB para SDAI e elétrica), homologação de energia solar e apólices de seguro empresarial e residencial.',
  },
  {
    question: 'Vocês assumem sistemas já instalados por outros fornecedores que estão apresentando falhas?',
    answer:
      'Sim. Realizamos o diagnóstico técnico completo de infraestruturas herdadas (racks desorganizados, sistemas de CFTV com quedas constantes, redes Wi-Fi com zonas de sombra ou quadros elétricos sobrecarregados), executamos o saneamento normativo e assumimos a manutenção preventiva e corretiva unificada.',
  },
  {
    question: 'Como funciona a instalação de carregadores de carros elétricos em condomínios?',
    answer:
      'Fazemos o estudo de demanda elétrica do condomínio, dimensionamos a proteção individualizada conforme as diretrizes técnicas de segurança e instalamos o carregador Wallbox com medição individualizada ou balanceamento dinâmico de carga, emitindo o respectivo TRT para respaldo jurídico do síndico e do morador.',
  },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedAudience, setSelectedAudience] = useState<AudienceKey>('empresas');
  const [selectedScope, setSelectedScope] = useState<string[]>(['cftv', 'rede', 'ev']);
  const [whatsappNumber, setWhatsappNumber] = useState<string>('5567996294838');
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  const handleImageChange = (slotId: string, dataUrl: string) => {
    setCustomImages((prev) => ({ ...prev, [slotId]: dataUrl }));
  };

  const toggleScopeItem = (id: string) => {
    setSelectedScope((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const buildWhatsAppUrl = (customContext?: string) => {
    const cleanPhone = whatsappNumber.replace(/\D/g, '') || '5567996294838';
    const audienceLabel = AUDIENCE_PROFILES[selectedAudience].label;
    const selectedLabels = SCOPE_OPTIONS.filter((opt) => selectedScope.includes(opt.id)).map(
      (opt) => opt.label
    );

    let message =
      'Olá, Thiago! Gostaria de agendar uma avaliação técnica para integração de sistemas (com responsabilidade técnica CRT/TRT).';

    if (customContext) {
      message = `Olá, Thiago! Vi a sua página técnica e gostaria de falar sobre: ${customContext}.`;
    } else if (selectedLabels.length > 0) {
      message = `Olá, Thiago! Sou responsável por *${audienceLabel}* e gostaria de um diagnóstico unificado para:\n- ${selectedLabels.join(
        '\n- '
      )}\n\nPodemos conversar sobre visita técnica e projeto?`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const estimatedSuppliersReplaced = Math.max(1, Math.min(4, Math.ceil(selectedScope.length * 0.75)));

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#0B1623] flex flex-col">
      {/* TOP BAR: Fixed in entire landing page (Brand wordmark | Desktop Links | Mobile Menu + WhatsApp CTA) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1240px] mx-auto px-3 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-display text-xs min-[360px]:text-sm sm:text-lg font-extrabold tracking-tight text-[#0B1623] whitespace-nowrap shrink-0"
          >
            THIAGO GONÇALVES
          </a>

          {/* Zone 2: Concise single-line navigation links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#servicos"
              className="hover:text-[#0B1623] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pilares Técnicos
            </a>
            <a
              href="#escopo"
              className="hover:text-[#0B1623] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulador de Escopo
            </a>
            <a
              href="#autoridade"
              className="hover:text-[#0B1623] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Registro CRT &amp; TRT
            </a>
            <a
              href="#faq"
              className="hover:text-[#0B1623] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Dúvidas
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Hamburger Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl('Atendimento Técnico Integrado')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 min-[360px]:px-3 min-[360px]:py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[#f3c742] hover:bg-[#eab825] active:scale-[0.99] text-[#0B1623] text-xs sm:text-sm font-bold shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3c742]"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Falar no WhatsApp</span>
            </a>

            {/* Mobile Menu Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-1.5 min-[360px]:p-2 rounded-lg text-slate-700 hover:text-[#0B1623] hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#f3c742]"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#0B1623]" />
              ) : (
                <Menu className="w-5 h-5 text-[#0B1623]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        <div
          className={`fixed top-14 sm:top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl md:hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-4 py-3 space-y-1">
            <a
              href="#servicos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-slate-800 hover:text-[#0B1623] hover:bg-slate-100 active:bg-slate-200 font-semibold text-sm transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0051BA]"></span>
                Pilares Técnicos
              </span>
              <span className="text-xs font-mono text-slate-400">CFTV · Redes · Solar</span>
            </a>

            <a
              href="#escopo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-slate-800 hover:text-[#0B1623] hover:bg-slate-100 active:bg-slate-200 font-semibold text-sm transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#f3c742]"></span>
                Simulador de Escopo
              </span>
              <span className="text-xs font-mono text-slate-400">Diagnóstico</span>
            </a>

            <a
              href="#autoridade"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-slate-800 hover:text-[#0B1623] hover:bg-slate-100 active:bg-slate-200 font-semibold text-sm transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Registro CRT &amp; TRT
              </span>
              <span className="text-xs font-mono text-slate-400">Habilitação</span>
            </a>

            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-slate-800 hover:text-[#0B1623] hover:bg-slate-100 active:bg-slate-200 font-semibold text-sm transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                Dúvidas Frequentes
              </span>
              <span className="text-xs font-mono text-slate-400">FAQ</span>
            </a>

            <div className="pt-2 mt-2 border-t border-slate-100">
              <a
                href={buildWhatsAppUrl('Menu Mobile')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] font-bold text-sm shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Falar no WhatsApp com Thiago</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <main className="flex-1 pt-14 sm:pt-16">
        {/* HERO SECTION — Compact, High-Trust Layout with 100% Zoom Viewport Fit */}
        <section className="pt-2 pb-4 sm:pt-3 sm:pb-6 lg:pt-3 lg:pb-5 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
              {/* Left Column: High-Conversion Direct Copywriting */}
              <div className="lg:col-span-6 flex flex-col justify-start py-0">
                <div>
                  <h1 className="font-display text-[1.5rem] xs:text-[1.65rem] sm:text-2xl lg:text-[2.2rem] xl:text-[2.5rem] font-extrabold tracking-tight text-[#0B1623] leading-[1.12] [text-wrap:pretty]">
                    <span className="sm:whitespace-nowrap">Segurança Eletrônica,</span> Redes e Energia, integrados por um único{' '}
                    <span className="text-[#f3c742] whitespace-nowrap">Responsável Técnico</span>
                  </h1>

                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[0.95rem] text-slate-600 leading-relaxed max-w-[58ch]">
                    Elimine a falha de comunicação e os vários fornecedores e instaladores de câmeras,
                    técnicos de TI e eletricistas. Centralize{' '}
                    <strong className="font-semibold text-slate-900">
                      projeto, execução e manutenção
                    </strong>{' '}
                    com um profissional habilitado e com vasta experiencia para proteger sua empresa,
                    condomínio ou residência.
                  </p>
                </div>

                {/* Primary Conversion Block */}
                <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-200/80">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3c742]"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span className="truncate">Solicitar Diagnóstico via WhatsApp</span>
                      <ArrowRight className="w-4 h-4 shrink-0 hidden sm:inline-block" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Interactive Solution Block (Residências, Condomínios, Empresas) */}
              <div className="lg:col-span-6 w-full min-w-0 flex flex-col justify-center">
                <DynamicSolutionBlock
                  activeSolution={selectedAudience}
                  onSelectSolution={(tab) => setSelectedAudience(tab)}
                  buildWhatsAppUrl={buildWhatsAppUrl}
                />
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split - Tightly spaced */}
            <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              <div>
                <p className="font-display text-base sm:text-xl xl:text-2xl font-extrabold text-[#0B1623] font-mono tabular-nums whitespace-nowrap">
                  10 Anos
                </p>
                <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                  De atuação prática integrando infraestrutura crítica em campo.
                </p>
              </div>
              <div>
                <p className="font-display text-base sm:text-xl xl:text-2xl font-extrabold text-[#0B1623] font-mono tabular-nums whitespace-nowrap">
                  3 em 1
                </p>
                <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                  Segurança Eletrônica, Redes/Telecom e Eletrotécnica unificadas.
                </p>
              </div>
              <div>
                <p className="font-display text-base sm:text-xl xl:text-2xl font-extrabold text-[#f3c742] font-mono tabular-nums whitespace-nowrap">
                  100% CRT
                </p>
                <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                  Habilitação legal ativa com emissão de TRT para obras e laudos.
                </p>
              </div>
              <div>
                <p className="font-display text-base sm:text-xl xl:text-2xl font-extrabold text-[#f3c742] font-mono tabular-nums whitespace-nowrap">
                  Zero Conflito
                </p>
                <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                  Fim das visitas cobradas em duplicidade por terceiros desconectados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: GRID DE SERVIÇOS (3 PILARES DE ENGENHARIA E GESTÃO) */}
        <section id="servicos" className="py-14 sm:py-20 lg:py-28 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-mono font-semibold text-[#0051BA] tracking-wider">
                  ESCOPO TÉCNICO INTEGRADO
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-[#0B1623] tracking-tight">
                  Três pilares de infraestrutura sob uma única diretriz executiva.
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md">
                Todos os projetos são entregues com documentação técnica, identificação de cabos e quadros,
                e emissão de Termo de Responsabilidade Técnica (TRT).
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {SERVICE_PILLARS.map((pillar, idx) => (
                <article
                  key={pillar.id}
                  className="border border-slate-200 rounded-xl bg-white flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Visual Slot with Custom Upload Support */}
                    <CustomizableVisualSlot
                      slotId={pillar.id}
                      customImage={customImages[pillar.id]}
                      onImageChange={handleImageChange}
                      alt={pillar.title}
                      className="border-b border-slate-200"
                    >
                      {idx === 0 && <SecurityPillarIllustration />}
                      {idx === 1 && <NetworkPillarIllustration />}
                      {idx === 2 && <EnergyPillarIllustration />}
                    </CustomizableVisualSlot>

                    <div className="p-5 sm:p-7">
                      {/* Editorial Numbering & Category */}
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <span className="font-bold text-[#0051BA]">{pillar.number}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pillar.category}</span>
                      </div>

                      <h3 className="mt-2.5 font-display text-lg sm:text-xl font-bold text-[#0B1623]">
                        {pillar.title}
                      </h3>

                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        {pillar.subtitle}
                      </p>

                      {/* Detailed Sub-services */}
                      <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                        {pillar.items.map((item) => (
                          <div key={item.name}>
                            <h4 className="text-sm font-semibold text-[#0B1623]">
                              {item.name}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-5 sm:px-7 py-4 bg-[#F8FAFC] border-t border-slate-200/80 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-slate-500 truncate">
                      {pillar.specs}
                    </span>
                    <a
                      href={buildWhatsAppUrl(pillar.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#0B1623] bg-[#f3c742] hover:bg-[#eab825] px-3 py-1.5 rounded-md inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors"
                    >
                      <span>Orçar pilar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: INTERACTIVE SCOPE CONFIGURATOR (Lead Qualifier -> Direct WhatsApp CTA) */}
        <section id="escopo" className="py-14 sm:py-20 lg:py-24 bg-[#F4F5F7] border-b border-slate-200/90">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0051BA]">
                    <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                    <span>CONFIGURADOR DE DEMANDA TÉCNICA</span>
                  </div>
                  <h2 className="mt-2 font-display text-xl sm:text-3xl font-extrabold text-[#0B1623]">
                    Selecione os sistemas que você precisa implantar, reformar ou unificar:
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Marque os itens abaixo para gerar o resumo técnico direto no WhatsApp de Thiago Gonçalves.
                  </p>

                  {/* Checkboxes for Scope */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SCOPE_OPTIONS.map((option) => {
                      const isSelected = selectedScope.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => toggleScopeItem(option.id)}
                          className={`text-left p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <p className="text-xs sm:text-sm font-semibold leading-snug">
                              {option.label}
                            </p>
                            <p
                              className={`text-[11px] font-mono mt-1 ${
                                isSelected ? 'text-[#f3c742]' : 'text-slate-500'
                              }`}
                            >
                              Pilar: {option.pillar}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-[#f3c742] text-[#0B1623]'
                                : 'border border-slate-300 bg-slate-50'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Summary & Single High-Contrast WhatsApp CTA */}
                <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 sm:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-mono font-semibold text-slate-500">
                      DIAGNÓSTICO DE CENTRALIZAÇÃO
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 pb-5 border-b border-slate-200">
                      <div>
                        <p className="text-xs text-slate-500">Sistemas Selecionados</p>
                        <p className="text-xl sm:text-2xl font-extrabold font-mono text-[#0B1623] tabular-nums mt-0.5">
                          {selectedScope.length} {selectedScope.length === 1 ? 'item' : 'itens'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Fornecedores Substituídos</p>
                        <p className="text-xl sm:text-2xl font-extrabold font-mono text-[#0B1623] tabular-nums mt-0.5">
                          <span className="bg-[#f3c742] px-2 py-0.5 rounded">
                            {estimatedSuppliersReplaced} para 1
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2.5 text-xs text-slate-600">
                      <p className="font-semibold text-slate-900">
                        O que está incluído no atendimento inicial:
                      </p>
                      <p>1. Análise de compatibilidade elétrica, lógica e segurança física.</p>
                      <p>2. Levantamento de pontos vulneráveis e gargalos de rede/energia.</p>
                      <p>3. Proposta executiva unificada com cronograma e TRT no CRT.</p>
                    </div>
                  </div>

                  <div className="mt-7 sm:mt-8">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-sm sm:text-base font-bold shadow-md transition-all duration-150"
                    >
                      <MessageCircle className="w-5 h-5 shrink-0" />
                      <span>Enviar Escopo pelo WhatsApp</span>
                    </a>
                    <p className="mt-2.5 text-[11px] text-center text-slate-500 font-mono">
                      Resposta rápida em horário comercial · Sem compromisso
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: AUTORIDADE TÉCNICA (CRT, EMISSÃO DE TRT & 10 ANOS DE EXPERIÊNCIA) */}
        <section id="autoridade" className="py-14 sm:py-20 lg:py-28 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
              {/* Left Column: Authority Visual / Engineer Portrait Slot */}
              <div className="lg:col-span-5 flex">
                <CustomizableVisualSlot
                  slotId="authority"
                  customImage={customImages['authority']}
                  onImageChange={handleImageChange}
                  alt="Thiago Gonçalves - Especialista Gestor de Segurança e Técnico Eletrotécnico com registro CRT"
                  className="w-full rounded-xl lg:h-full"
                >
                  <AuthorityEngineerIllustration />
                </CustomizableVisualSlot>
              </div>

              {/* Right Column: Rational Credentials & TRT Value */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-[#0051BA]">
                    <span>RESPALDO LEGAL E ENGENHARIA APLICADA</span>
                    <span aria-hidden="true">·</span>
                    <span>CRT ATIVO</span>
                  </div>

                  <h2 className="mt-3 font-display text-2xl sm:text-4xl font-extrabold text-[#0B1623] tracking-tight">
                    Segurança patrimonial e infraestrutura elétrica não aceitam amadorismo.
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    A maioria dos problemas graves em condomínios, empresas e residências nasce da
                    contratação de instaladores sem formação normativa. Um curto-circuito em carregador
                    veicular ou uma falha no alarme de incêndio (SDAI) sem responsável técnico pode
                    invalidar o seguro do imóvel e gerar responsabilização civil e criminal para o
                    gestor ou síndico.
                  </p>

                  {/* 3 Concrete Credential Blocks */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#f3c742]/25 border border-[#f3c742] flex items-center justify-center text-[#0B1623]">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="mt-3.5 font-display text-base font-bold text-[#0B1623]">
                        Registro Ativo no CRT
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                        Técnico Eletrotécnico regularmente habilitado no Conselho Regional dos Técnicos
                        Industriais para projetos, execução e laudos.
                      </p>
                    </div>

                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#f3c742]/25 border border-[#f3c742] flex items-center justify-center text-[#0B1623]">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <h3 className="mt-3.5 font-display text-base font-bold text-[#0B1623]">
                        Emissão Oficial de TRT
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                        Emissão de Termo de Responsabilidade Técnica garantindo conformidade com NBR 5410,
                        NBR 17240, NBR 16280 e exigências de seguradoras.
                      </p>
                    </div>

                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#f3c742]/25 border border-[#f3c742] flex items-center justify-center text-[#0B1623]">
                        <Award className="w-5 h-5" />
                      </div>
                      <h3 className="mt-3.5 font-display text-base font-bold text-[#0B1623]">
                        10 Anos de Experiência
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                        Uma década resolvendo cenários complexos com visão dupla: Inteligência de Gestão
                        de Segurança e precisão Eletrotécnica.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Authority Section Bottom CTA */}
                <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#0B1623]">
                      Precisa de projeto novo, adequação normativa ou emissão de TRT?
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fale diretamente com Thiago Gonçalves sem passar por intermediários.
                    </p>
                  </div>
                  <a
                    href={buildWhatsAppUrl('Consulta Técnica com Emissão de TRT')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-sm font-bold shadow-sm transition-all duration-150 shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Agendar Visita Técnica</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FAQ (Objection Handling) */}
        <section id="faq" className="py-14 sm:py-20 bg-[#F4F5F7] border-b border-slate-200">
          <div className="max-w-[900px] mx-auto px-4 sm:px-8">
            <div className="text-center">
              <p className="text-xs font-mono font-semibold text-[#0051BA] tracking-wider">
                PERGUNTAS FREQUENTES
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#0B1623]">
                Respostas diretas para gestores, síndicos e proprietários
              </h2>
            </div>

            <div className="mt-8 sm:mt-10 space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.question}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-sm sm:text-base font-bold text-[#0B1623]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#0B1623]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: Contact Summary, Final High-Contrast WhatsApp CTA & Cloudflare Ready Config */}
      <footer className="bg-[#0B1623] text-white">
        {/* Final High-Impact Conversion Banner */}
        <div className="border-b border-slate-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-mono font-semibold text-[#f3c742] tracking-wider">
                PRONTO PARA CENTRALIZAR SUA INFRAESTRUTURA?
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Substitua múltiplos fornecedores por um único especialista habilitado.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Envie uma mensagem no WhatsApp informando se sua demanda é para empresa, condomínio ou
                residência. Retorno técnico ágil e objetivo.
              </p>
            </div>

            <div className="w-full sm:w-auto shrink-0">
              <a
                href={buildWhatsAppUrl('Solicitação de Orçamento / Visita Técnica')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-4 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-sm sm:text-base font-bold shadow-lg transition-all duration-150"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Iniciar Conversa no WhatsApp</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Footer Information & Contact Summary */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80 text-sm">
            <div className="md:col-span-5">
              <p className="font-display text-lg font-extrabold tracking-tight text-white">
                THIAGO GONÇALVES
              </p>
              <p className="mt-2 text-xs text-slate-400 max-w-sm leading-relaxed">
                Gestão de Segurança Patrimonial e Técnica Eletrotécnica (CRT). Projeto, execução e
                manutenção unificada de Segurança Eletrônica, Redes Estruturadas e Energia Solar/EV.
              </p>
            </div>

            <div className="md:col-span-4 space-y-1.5 text-xs text-slate-300">
              <p className="font-mono text-slate-400 font-semibold">CREDENCIAIS E ESCOPO</p>
              <p>Habilitação: Registro Ativo no CRT · Emissão de TRT</p>
              <p>Experiência: +10 Anos em Integração de Sistemas</p>
              <p>Atendimento: Empresas, Condomínios e Residências</p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs text-slate-300">
              <p className="font-mono text-slate-400 font-semibold">CANAL DIRETO</p>
              <p className="font-mono text-white">WhatsApp: +{whatsappNumber}</p>
              {!isEditingPhone ? (
                <button
                  type="button"
                  onClick={() => setIsEditingPhone(true)}
                  className="text-[11px] text-[#f3c742] hover:underline cursor-pointer"
                >
                  Alterar número do WhatsApp
                </button>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="5567996294838"
                    className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white w-36 focus:outline-none focus:border-[#f3c742]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditingPhone(false)}
                    className="px-2.5 py-1 bg-[#f3c742] text-[#0B1623] rounded text-xs font-bold cursor-pointer"
                  >
                    Salvar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Thiago Gonçalves. Todos os direitos reservados.
            </p>
            <p className="font-mono">
              Segurança Eletrônica · Infraestrutura de Redes · Energia &amp; Automação
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
