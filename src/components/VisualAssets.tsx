import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface CustomizableVisualProps {
  slotId: string;
  customImage?: string;
  onImageChange: (slotId: string, dataUrl: string) => void;
  alt: string;
  children: React.ReactNode;
  className?: string;
  imgClassName?: string;
}

export const CustomizableVisualSlot: React.FC<CustomizableVisualProps> = ({
  slotId,
  customImage,
  onImageChange,
  alt,
  children,
  className = '',
  imgClassName,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {customImage ? (
        <img
          src={customImage}
          alt={alt}
          referrerPolicy="no-referrer"
          className={imgClassName || 'w-full h-full object-contain sm:object-cover'}
        />
      ) : (
        children
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              onImageChange(slotId, reader.result);
            }
          };
          reader.readAsDataURL(file);
        }}
        className="hidden"
        aria-label={`Substituir imagem: ${alt}`}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 bg-white/95 hover:bg-white text-slate-800 border border-slate-300 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
        title="Carregar foto real do seu acervo para este espaço"
      >
        <Camera className="w-3.5 h-3.5 text-slate-600" />
        <span>Usar foto própria</span>
      </button>
    </div>
  );
};

export const HeroSystemIllustration: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[240px] sm:min-h-[280px] lg:min-h-[290px] p-3 sm:p-4 lg:p-4 flex flex-col justify-between bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] select-none">
      {/* Top Technical Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-300/80 pb-2">
        <div>
          <p className="text-[10px] font-mono text-slate-500 tracking-tight">
            ARQUITETURA CENTRALIZADA · RESPONSABILIDADE ÚNICA (CRT/TRT)
          </p>
          <p className="text-xs sm:text-xs lg:text-[13px] font-semibold text-slate-900 mt-0.5">
            Topologia Integrada: Segurança, Conectividade e Energia
          </p>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#0051BA] tabular-nums">
          NBR 5410 · NBR 17240 · NBR 14565
        </span>
      </div>

      {/* Central Visual Hardware Diagram (SimpliSafe Clean Hardware Aesthetic) */}
      <div className="my-auto py-1.5 sm:py-2">
        <svg
          viewBox="0 0 680 340"
          className="w-full h-auto max-h-[190px] sm:max-h-[210px] lg:max-h-[220px]"
          role="img"
          aria-label="Diagrama técnico de integração entre Segurança Eletrônica, Redes e Energia Solar/EV sob gestão técnica única"
        >
          <defs>
            <linearGradient id="cardSurface" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F8FAFC" />
            </linearGradient>
            <linearGradient id="hubSurface" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1623" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <filter id="softShadow" x="-8%" y="-8%" width="116%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.07" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          <g stroke="#CBD5E1" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.65">
            <line x1="40" y1="60" x2="640" y2="60" />
            <line x1="40" y1="170" x2="640" y2="170" />
            <line x1="40" y1="280" x2="640" y2="280" />
            <line x1="170" y1="20" x2="170" y2="320" />
            <line x1="340" y1="20" x2="340" y2="320" />
            <line x1="510" y1="20" x2="510" y2="320" />
          </g>

          {/* Connecting Bus Lines from Central Core to 3 Pillars */}
          <g fill="none" strokeWidth="2.5">
            {/* Left branch: Security */}
            <path d="M 250 170 L 185 170 L 185 95 L 155 95" stroke="#0051BA" />
            <path d="M 250 170 L 185 170 L 185 245 L 155 245" stroke="#0051BA" />
            {/* Right branch: Energy & Network */}
            <path d="M 430 170 L 495 170 L 495 95 L 525 95" stroke="#f3c742" />
            <path d="M 430 170 L 495 170 L 495 245 L 525 245" stroke="#0F172A" />
          </g>

          {/* Node 1: Segurança Eletrônica (Top Left) */}
          <g filter="url(#softShadow)">
            <rect x="20" y="38" width="145" height="106" rx="10" fill="url(#cardSurface)" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Minimalist Dome Camera Vector */}
            <circle cx="54" cy="74" r="16" fill="#F1F5F9" stroke="#0B1623" strokeWidth="1.8" />
            <circle cx="54" cy="74" r="7" fill="#0B1623" />
            <circle cx="56" cy="72" r="2" fill="#38BDF8" />
            <text x="80" y="70" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
              CFTV IP &amp; SDAI
            </text>
            <text x="80" y="84" fill="#475569" fontSize="9.5" fontFamily="DM Sans, sans-serif">
              Acesso Biométrico
            </text>
            <line x1="34" y1="104" x2="150" y2="104" stroke="#E2E8F0" strokeWidth="1" />
            <text x="34" y="124" fill="#0051BA" fontSize="9.5" fontWeight="600" fontFamily="JetBrains Mono, monospace">
              01 · MONITORAMENTO
            </text>
          </g>

          {/* Node 2: Infraestrutura de Redes (Bottom Left) */}
          <g filter="url(#softShadow)">
            <rect x="20" y="192" width="145" height="106" rx="10" fill="url(#cardSurface)" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Minimalist Rack / Switch Vector */}
            <rect x="36" y="214" width="34" height="24" rx="4" fill="#F1F5F9" stroke="#0B1623" strokeWidth="1.8" />
            <circle cx="44" cy="226" r="2.5" fill="#f3c742" />
            <circle cx="51" cy="226" r="2" fill="#0051BA" />
            <line x1="58" y1="226" x2="64" y2="226" stroke="#0B1623" strokeWidth="1.8" />
            <text x="80" y="224" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
              Rede &amp; Failover
            </text>
            <text x="80" y="238" fill="#475569" fontSize="9.5" fontFamily="DM Sans, sans-serif">
              Cat6A / Fibra / Wi-Fi
            </text>
            <line x1="34" y1="258" x2="150" y2="258" stroke="#E2E8F0" strokeWidth="1" />
            <text x="34" y="278" fill="#0051BA" fontSize="9.5" fontWeight="600" fontFamily="JetBrains Mono, monospace">
              02 · CONECTIVIDADE
            </text>
          </g>

          {/* CENTER HUB: Single Technical Manager & CRT Execution */}
          <g filter="url(#softShadow)">
            <rect x="242" y="96" width="196" height="148" rx="14" fill="url(#hubSurface)" stroke="#334155" strokeWidth="1.5" />
            {/* Shield + Technical Circuit Emblem */}
            <path
              d="M 340 120 L 362 128 L 362 146 C 362 161 352 172 340 177 C 328 172 318 161 318 146 L 318 128 Z"
              fill="#f3c742"
              stroke="#FEF08A"
              strokeWidth="1.5"
            />
            <path d="M 333 148 L 338 153 L 348 143" stroke="#0B1623" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            <text x="340" y="198" textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
              THIAGO GONÇALVES
            </text>
            <text x="340" y="214" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="DM Sans, sans-serif">
              Projeto · Execução · Manutenção
            </text>
            <text x="340" y="231" textAnchor="middle" fill="#f3c742" fontSize="9.5" fontWeight="600" fontFamily="JetBrains Mono, monospace">
              REGISTRO CRT + EMISSÃO TRT
            </text>
          </g>

          {/* Node 3: Energia Solar On/Off-Grid (Top Right) */}
          <g filter="url(#softShadow)">
            <rect x="515" y="38" width="145" height="106" rx="10" fill="url(#cardSurface)" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Solar / Inverter Vector */}
            <rect x="531" y="58" width="32" height="28" rx="4" fill="#FEF9C3" stroke="#0B1623" strokeWidth="1.8" />
            <path d="M 545 64 L 541 72 L 548 72 L 544 80" stroke="#0B1623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <text x="572" y="70" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
              Solar On/Off-Grid
            </text>
            <text x="572" y="84" fill="#475569" fontSize="9.5" fontFamily="DM Sans, sans-serif">
              Autonomia &amp; Backup
            </text>
            <line x1="529" y1="104" x2="645" y2="104" stroke="#E2E8F0" strokeWidth="1" />
            <text x="529" y="124" fill="#0B1623" fontSize="9.5" fontWeight="600" fontFamily="JetBrains Mono, monospace">
              03 · GERAÇÃO SOLAR
            </text>
          </g>

          {/* Node 4: Mobilidade Elétrica & Automação (Bottom Right) */}
          <g filter="url(#softShadow)">
            <rect x="515" y="192" width="145" height="106" rx="10" fill="url(#cardSurface)" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* EV Wallbox Vector */}
            <rect x="533" y="212" width="28" height="32" rx="5" fill="#F1F5F9" stroke="#0B1623" strokeWidth="1.8" />
            <circle cx="547" cy="224" r="5" fill="#f3c742" />
            <path d="M 541 236 L 553 236" stroke="#0B1623" strokeWidth="1.8" strokeLinecap="round" />
            <text x="572" y="224" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
              Recarga EV
            </text>
            <text x="572" y="238" fill="#475569" fontSize="9.5" fontFamily="DM Sans, sans-serif">
              Rateio &amp; Balanceamento
            </text>
            <line x1="529" y1="258" x2="645" y2="258" stroke="#E2E8F0" strokeWidth="1" />
            <text x="529" y="278" fill="#0B1623" fontSize="9.5" fontWeight="600" fontFamily="JetBrains Mono, monospace">
              04 · ELETROMOBILIDADE
            </text>
          </g>
        </svg>
      </div>

    </div>
  );
};

export const SecurityPillarIllustration: React.FC = () => (
  <div className="w-full h-full bg-[#F4F5F7] flex items-center justify-center p-2 sm:p-2.5">
    <svg viewBox="0 0 400 180" className="w-full h-full max-h-full" role="img" aria-label="Ilustração de Câmera IP, Controle de Acesso Facial e Detecção e Alarme de Incêndio">
      {/* Clean Architectural Backdrop */}
      <rect x="16" y="14" width="368" height="152" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      
      {/* 1. IP Dome Camera */}
      <g transform="translate(45, 36)">
        <rect x="12" y="0" width="56" height="12" rx="3" fill="#CBD5E1" />
        <path d="M 16 12 L 64 12 L 70 34 L 10 34 Z" fill="#F8FAFC" stroke="#0B1623" strokeWidth="1.8" />
        <path d="M 20 34 A 20 20 0 0 0 60 34 Z" fill="#0B1623" />
        <circle cx="40" cy="40" r="6" fill="#38BDF8" />
        <text x="40" y="84" textAnchor="middle" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">CFTV IP</text>
        <text x="40" y="98" textAnchor="middle" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono, monospace">PoE · IA Perimetral</text>
      </g>

      {/* Divider */}
      <line x1="150" y1="34" x2="150" y2="146" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

      {/* 2. Fire Detection */}
      <g transform="translate(168, 36)">
        <circle cx="32" cy="34" r="24" fill="#F8FAFC" stroke="#0B1623" strokeWidth="1.8" />
        <circle cx="32" cy="34" r="14" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.2" />
        <circle cx="27" cy="34" r="2.5" fill="#DC2626" />
        <circle cx="37" cy="34" r="2.5" fill="#0051BA" />
        <text x="32" y="84" textAnchor="middle" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Incêndio</text>
        <text x="32" y="98" textAnchor="middle" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono, monospace">Detecção e Alarme</text>
      </g>

      {/* Divider */}
      <line x1="254" y1="34" x2="254" y2="146" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

      {/* 3. Biometric / Facial Access Terminal */}
      <g transform="translate(278, 30)">
        <rect x="16" y="4" width="44" height="64" rx="6" fill="#0B1623" stroke="#334155" strokeWidth="1.8" />
        <rect x="21" y="10" width="34" height="42" rx="3" fill="#1E293B" />
        {/* Face recognition reticle */}
        <path d="M 30 22 L 26 22 L 26 26 M 46 22 L 50 22 L 50 26 M 30 40 L 26 40 L 26 36 M 46 40 L 50 40 L 50 36" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
        <circle cx="38" cy="59" r="2.5" fill="#f3c742" />
        <text x="38" y="90" textAnchor="middle" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Acesso</text>
        <text x="38" y="104" textAnchor="middle" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono, monospace">Facial · Portaria</text>
      </g>
    </svg>
  </div>
);

export const NetworkPillarIllustration: React.FC = () => (
  <div className="w-full h-full bg-[#F4F5F7] flex items-center justify-center p-2 sm:p-2.5">
    <svg viewBox="0 0 400 180" className="w-full h-full max-h-full" role="img" aria-label="Ilustração de Rack de Cabeamento Estruturado, Failover Automático e Wi-Fi Corporativo">
      <rect x="16" y="14" width="368" height="152" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Structured Rack Patch Panel */}
      <g transform="translate(38, 32)">
        <rect x="0" y="0" width="140" height="76" rx="5" fill="#0B1623" />
        {/* Rack Unit 1: Router Failover */}
        <rect x="8" y="8" width="124" height="24" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />
        <circle cx="18" cy="20" r="3" fill="#f3c742" />
        <circle cx="28" cy="20" r="3" fill="#38BDF8" />
        <text x="40" y="23" fill="#E2E8F0" fontSize="8.5" fontFamily="JetBrains Mono, monospace">WAN1 + WAN2 FAILOVER</text>

        {/* Rack Unit 2: 24-Port PoE+ Switch */}
        <rect x="8" y="40" width="124" height="28" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />
        <g fill="#38BDF8">
          <rect x="16" y="47" width="6" height="5" rx="1" />
          <rect x="25" y="47" width="6" height="5" rx="1" />
          <rect x="34" y="47" width="6" height="5" rx="1" />
          <rect x="43" y="47" width="6" height="5" rx="1" />
          <rect x="52" y="47" width="6" height="5" rx="1" />
          <rect x="61" y="47" width="6" height="5" rx="1" />
          <rect x="70" y="47" width="6" height="5" rx="1" />
          <rect x="79" y="47" width="6" height="5" rx="1" />
        </g>
        <text x="16" y="63" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono, monospace">CAT6A · FIBRA ÓPTICA · POE+</text>

        <text x="70" y="98" textAnchor="middle" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Cabeamento &amp; Redundância</text>
        <text x="70" y="112" textAnchor="middle" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono, monospace">Certificação NBR 14565</text>
      </g>

      {/* Connection Line */}
      <path d="M 178 70 L 236 70" stroke="#0051BA" strokeWidth="2" strokeDasharray="4 4" />

      {/* Enterprise Wi-Fi 6 Disc */}
      <g transform="translate(242, 32)">
        <circle cx="58" cy="38" r="34" fill="#F8FAFC" stroke="#0B1623" strokeWidth="1.8" />
        <circle cx="58" cy="38" r="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
        <circle cx="58" cy="6" fill="#0051BA" />
        <text x="58" y="98" textAnchor="middle" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Wi-Fi Corporativo</text>
        <text x="58" y="112" textAnchor="middle" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono, monospace">Roaming Zero-Handoff</text>
      </g>
    </svg>
  </div>
);

export const EnergyPillarIllustration: React.FC = () => (
  <div className="w-full h-full bg-[#F4F5F7] flex items-center justify-center p-2 sm:p-2.5">
    <svg viewBox="0 0 400 180" className="w-full h-full max-h-full" role="img" aria-label="Ilustração de Inversor Solar Híbrido On/Off-Grid e Carregador Veicular EV">
      <rect x="16" y="14" width="368" height="152" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Hybrid Solar Inverter */}
      <g transform="translate(46, 28)">
        <rect x="14" y="0" width="84" height="82" rx="8" fill="#F8FAFC" stroke="#0B1623" strokeWidth="1.8" />
        <rect x="26" y="14" width="60" height="28" rx="4" fill="#0B1623" />
        <text x="56" y="31" textAnchor="middle" fill="#f3c742" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">ON/OFF-GRID</text>
        <line x1="26" y1="54" x2="86" y2="54" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="56" cy="67" r="4" fill="#f3c742" />
        <text x="56" y="102" textAnchor="middle" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Inversor Híbrido</text>
        <text x="56" y="116" textAnchor="middle" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono, monospace">Solar + Banco Baterias</text>
      </g>

      {/* Smart Power Bus */}
      <path d="M 144 70 L 234 70" stroke="#f3c742" strokeWidth="2.5" />
      <rect x="167" y="60" width="44" height="20" rx="4" fill="#0B1623" stroke="#f3c742" strokeWidth="1.2" />
      <text x="189" y="73" textAnchor="middle" fill="#f3c742" fontSize="8.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">380/220V</text>

      {/* EV Wallbox Charger */}
      <g transform="translate(238, 28)">
        <rect x="24" y="4" width="68" height="78" rx="12" fill="#0B1623" stroke="#334155" strokeWidth="1.8" />
        <circle cx="58" cy="34" r="14" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.8" />
        <path d="M 56 27 L 52 35 L 59 35 L 55 42" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="42" y="58" width="32" height="6" rx="3" fill="#f3c742" />
        <text x="58" y="102" textAnchor="middle" fill="#0B1623" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Wallbox Veicular</text>
        <text x="58" y="116" textAnchor="middle" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono, monospace">Rateio Condominial</text>
      </g>
    </svg>
  </div>
);

export const AuthorityEngineerIllustration: React.FC = () => (
  <div className="w-full h-full min-h-[340px] sm:min-h-[380px] bg-[#0B1623] text-white p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden">
    {/* Technical Document Header */}
    <div className="border-b border-slate-700/80 pb-4 sm:pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div>
        <p className="text-[11px] sm:text-xs font-mono text-[#f3c742] tracking-wider">
          DOCUMENTO DE HABILITAÇÃO OFICIAL
        </p>
        <h3 className="text-base sm:text-lg font-bold text-white mt-1">
          Termo de Responsabilidade Técnica (TRT)
        </h3>
      </div>
      <div className="font-mono text-xs text-slate-300 tabular-nums">
        CRT ATIVO · 10 ANOS
      </div>
    </div>

    {/* Visual Blueprint / Technical Seal Card */}
    <div className="my-5 sm:my-6 bg-slate-900/90 border border-slate-700/90 rounded-lg p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-3.5">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/avatar-totus_2eb586d9.png"
            alt="Thiago Gonçalves"
            className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#f3c742] shrink-0"
          />
          <div>
            <p className="text-xs text-slate-400">Responsável Técnico Habilitado</p>
            <p className="text-sm font-semibold text-white mt-0.5">
              Thiago Gonçalves · Gestor de Segurança &amp; Eletrotécnico
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-[#f3c742] font-semibold self-start sm:self-auto">
          HABILITAÇÃO PLENA
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded">
          <p className="text-slate-400">Atribuição Elétrica</p>
          <p className="font-mono text-slate-100 font-semibold mt-1 tabular-nums">
            Projetos, Laudos &amp; Execução até 800 kVA
          </p>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded">
          <p className="text-slate-400">Gestão de Segurança</p>
          <p className="font-mono text-slate-100 font-semibold mt-1">
            Análise de Risco &amp; Normas ABNT
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-1 text-[11px] sm:text-xs text-slate-300 font-mono">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
          <span className="text-slate-400">NBR 5410 / NR-10</span>
          <span className="text-[#f3c742]">Instalações de Baixa Tensão</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
          <span className="text-slate-400">NBR 17240</span>
          <span className="text-[#f3c742]">Detecção e Alarme de Incêndio</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
          <span className="text-slate-400">NBR 14565 / 16690</span>
          <span className="text-[#f3c742]">Cabeamento &amp; Sistemas Fotovoltaicos</span>
        </div>
      </div>
    </div>

    {/* Bottom Verification Footnote */}
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
      <span>Rastreabilidade Jurídica e Seguradoras</span>
      <span className="font-mono text-[#f3c742]">1 Contrato · 1 TRT</span>
    </div>
  </div>
);
