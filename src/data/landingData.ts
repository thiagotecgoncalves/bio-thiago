import {
  AudienceKey,
  AudienceProfile,
  ServicePillar,
  ScopeOption,
  FaqItem,
  StatItem,
} from '../types';

export const SITE_METADATA = {
  author: 'Thiago Gonçalves',
  role: 'Gestor de Segurança Privada, Especialista em Redes de Computadores e Técnico Eletrotécnico',
  crtHabilitation: 'Registro Ativo no CRT · Emissão de TRT',
  defaultWhatsapp: '5567996294838',
  experienceYears: '+10 Anos em Integração de Sistemas',
  avatarImage: '/assets/aistudio/avatar-totus_2eb586d9.png',
};

export const AUDIENCE_PROFILES: Record<AudienceKey, AudienceProfile> = {
  empresas: { label: 'Empresas e Indústrias' },
  condominios: { label: 'Condomínios e Síndicos' },
  residencias: { label: 'Residências de Alto Padrão' },
};

export const STATS_ITEMS: StatItem[] = [
  {
    title: '10 Anos',
    desc: 'De atuação prática integrando infraestrutura crítica em campo.',
  },
  {
    title: '3 em 1',
    desc: 'Segurança Eletrônica, Redes/Telecom e Eletrotécnica unificadas.',
  },
  {
    title: '100% CRT',
    desc: 'Habilitação legal ativa com emissão de TRT para obras e laudos.',
    highlight: true,
  },
  {
    title: 'Zero Conflito',
    desc: 'Fim das visitas cobradas em duplicidade por terceiros desconectados.',
    highlight: true,
  },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'pillar-security',
    title: 'Segurança Eletrônica e Controle de Acesso',
    subtitle:
      'Projetos de prevenção e resposta com alimentação e rede imunes a sabotagem ou queda de tensão.',
    specs: 'CFTV IP · Alarme Perimetral · Incêndio · Acesso',
    defaultImage: '/assets/aistudio/Seguran_a_Eletronica_e_Controle_de_Acesso_d9f5b76a.png',
    items: [
      {
        name: 'CFTV IP de Alta Definição e Analíticos',
        desc: 'Câmeras PoE com leitura de placas (LPR), cercamento virtual e gravação redundante.',
      },
      {
        name: 'Alarme Perimetral',
        desc: 'Instalação de sensores de barreira e presença, cercas elétricas e concertinas.',
      },
      {
        name: 'Detecção e Alarme de Incêndio',
        desc: 'Centrais endereçáveis, detectores e laudo técnico com emissão de TRT.',
      },
      {
        name: 'Controle de Acesso Físico e Portaria',
        desc: 'Terminais faciais antifraude, biometria, catracas e clausuras veiculares.',
      },
    ],
  },
  {
    id: 'pillar-network',
    title: 'Infraestrutura de Redes e Telecom',
    subtitle:
      'Espinha dorsal física e lógica de alta velocidade para comunicação estável e sem interrupções.',
    specs: 'Cabeamento Cat6A/Fibra · Failover WAN · Wi-Fi',
    defaultImage: '/assets/aistudio/Infreaestrutura_de_redes_e_telecom_811c0fe1.png',
    items: [
      {
        name: 'Cabeamento Estruturado e Racks',
        desc: 'Saneamento e organização de racks, certificação Cat6/Cat6A e fusão óptica.',
      },
      {
        name: 'Redundância de Internet e Failover',
        desc: 'Balanceamento entre operadoras e backup automático sem queda de sessão.',
      },
      {
        name: 'Wi-Fi Corporativo e Alta Densidade',
        desc: 'Access Points de alta cobertura, roaming contínuo e rede isolada de visitantes.',
      },
      {
        name: 'Segurança Lógica e Segmentação (VLAN)',
        desc: 'Isolamento de tráfego crítico para CFTV, automação e dados administrativos.',
      },
    ],
  },
  {
    id: 'pillar-energy',
    title: 'Energia Solar e Carregadores Veiculares',
    subtitle:
      'Engenharia eletrotécnica aplicada para reduzir custos, garantir autonomia e recarga com segurança.',
    specs: 'Solar On/Off-Grid · Wallbox EV · Adequação NBR 5410',
    defaultImage: '/assets/aistudio/Energia_Solar_e_Carregadores_Veiculares_695023ee.png',
    items: [
      {
        name: 'Sistemas Fotovoltaicos On-Grid e Híbridos',
        desc: 'Homologação na concessionária e backup com banco de baterias para cargas críticas.',
      },
      {
        name: 'Carregadores Veiculares (Wallbox EV)',
        desc: 'Instalação de estações de recarga com proteção DR Tipo B e medição individual.',
      },
      {
        name: 'Quadros Elétricos e Proteção contra Surtos',
        desc: 'Reforma de QGBTs, coordenação de DPS (raios), aterramento técnico e laudo NBR 5410.',
      },
      {
        name: 'Automação de Força e Geradores',
        desc: 'Comandos inteligentes para acionamento de bombas, iluminação e geradores.',
      },
    ],
  },
];

export const SCOPE_OPTIONS: ScopeOption[] = [
  { id: 'cftv', label: 'CFTV IP & Monitoramento Perimetral', pillar: 'Segurança' },
  { id: 'perimetral', label: 'Alarme Perimetral, Cercas e Concertinas', pillar: 'Segurança' },
  { id: 'sdai', label: 'Detecção e Alarme de Incêndio (NBR 17240)', pillar: 'Segurança' },
  { id: 'acesso', label: 'Controle de Acesso Facial / Portaria', pillar: 'Segurança' },
  { id: 'rede', label: 'Cabeamento Estruturado / Reforma de Rack', pillar: 'Redes' },
  { id: 'wifi', label: 'Wi-Fi de Alta Cobertura & Failover de Internet', pillar: 'Redes' },
  { id: 'solar', label: 'Energia Solar (On-Grid ou Híbrido Off-Grid)', pillar: 'Energia' },
  { id: 'ev', label: 'Carregador Veicular (Wallbox EV) + Laudo Elétrico', pillar: 'Energia' },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Por que contratar um único profissional em vez de empresas separadas para CFTV, Rede e Elétrica?',
    answer:
      'Sistemas modernos de segurança, conectividade e energia dependem diretamente uns dos outros. Câmeras IP e controles faciais rodam sobre cabeamento de rede e switches PoE, que por sua vez exigem aterramento, proteção contra surtos e autonomia elétrica dimensionada. Centralizar em um Gestor de Segurança Privada, Especialista em Redes de Computadores e Técnico Eletrotécnico elimina falhas de comunicação, reduz custos de passagem de cabos duplicados e garante um único responsável técnico caso algo precise de manutenção.',
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
