import React, { useState } from 'react';
import {
  Home,
  Building2,
  Factory,
  MessageCircle,
  Clock,
} from 'lucide-react';

export type SolutionType = 'residencias' | 'condominios' | 'empresas';

interface DynamicSolutionBlockProps {
  initialSolution?: SolutionType;
  activeSolution?: SolutionType;
  onSelectSolution?: (tab: SolutionType) => void;
  buildWhatsAppUrl: (context?: string) => string;
}

export const DynamicSolutionBlock: React.FC<DynamicSolutionBlockProps> = ({
  initialSolution = 'residencias',
  activeSolution,
  onSelectSolution,
  buildWhatsAppUrl,
}) => {
  const [internalTab, setInternalTab] = useState<SolutionType>(initialSolution);
  const currentTab = activeSolution ?? internalTab;

  const handleTabChange = (tab: SolutionType) => {
    setInternalTab(tab);
    onSelectSolution?.(tab);
  };

  const getCurrentImageSrc = () => {
    if (currentTab === 'residencias') return '/assets/aistudio/Folder-solu__es-totus_20261029_211038_0000_9b6d5217.png';
    if (currentTab === 'condominios') return '/assets/aistudio/Folder-solu__es-totus_condominios_same_size.png';
    return null;
  };

  const getImageTitle = () => {
    if (currentTab === 'residencias') return 'Soluções para Casas e Residências';
    if (currentTab === 'condominios') return 'Soluções para Condomínios & Portaria Autônoma';
    return 'Soluções para Empresas e Indústrias';
  };

  const currentImageSrc = getCurrentImageSrc();

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-xl flex flex-col justify-between overflow-hidden shadow-sm">
      {/* 1. TOP INTERACTIVE SELECTOR HEADER - Perfectly aligned, strictly bounded on mobile */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/90 p-1 sm:p-2">
        <div className="w-full">
          {/* Segmented Control with 3 equal columns */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/70 rounded-lg w-full max-w-full">
            <button
              type="button"
              onClick={() => handleTabChange('residencias')}
              className={`w-full min-w-0 overflow-hidden flex items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-2.5 py-1.5 sm:py-2 rounded-md text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm font-bold transition-all duration-150 cursor-pointer ${
                currentTab === 'residencias'
                  ? 'bg-[#f3c742] text-[#0B1623] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate block">Residências</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('condominios')}
              className={`w-full min-w-0 overflow-hidden flex items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-2.5 py-1.5 sm:py-2 rounded-md text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm font-bold transition-all duration-150 cursor-pointer ${
                currentTab === 'condominios'
                  ? 'bg-[#f3c742] text-[#0B1623] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate block">Condomínios</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('empresas')}
              className={`w-full min-w-0 overflow-hidden flex items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-2.5 py-1.5 sm:py-2 rounded-md text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm font-bold transition-all duration-150 cursor-pointer ${
                currentTab === 'empresas'
                  ? 'bg-[#f3c742] text-[#0B1623] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Factory className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate block">Empresas</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CENTER CONTENT: EXPANDED PROPORTIONS ORIGINAL FOLDER */}
      <div className="flex-1 p-1 sm:p-2 bg-[#FCFCFD] flex items-center justify-center min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] relative">
        {currentImageSrc ? (
          <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden border border-slate-200/80 bg-[#f0c54d]">
            <img
              src={currentImageSrc}
              alt={getImageTitle()}
              className="w-full h-auto max-h-[440px] sm:max-h-[520px] lg:max-h-[560px] object-contain rounded-md"
            />
          </div>
        ) : (
          /* EMPTY STATE FOR EMPRESAS - Compact, well-proportioned and mobile-friendly */
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-3.5 sm:p-6 bg-slate-50/70 border border-dashed border-slate-300 rounded-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f3c742]/20 border border-[#f3c742] flex items-center justify-center text-[#0B1623] mb-2 sm:mb-2.5">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
            <h3 className="font-display font-bold text-xs sm:text-base text-slate-900">
              Soluções para Empresas &amp; Indústrias
            </h3>
            <p className="mt-1 text-[11px] sm:text-xs text-slate-500 max-w-xs sm:max-w-sm leading-relaxed">
              Material técnico em confecção. Em breve disponibilizaremos o folder completo com
              cabeamento estruturado, racks, failover e automação corporativa.
            </p>
            <div className="mt-3 sm:mt-4 w-full flex justify-center">
              <a
                href={buildWhatsAppUrl('Soluções para Empresas e Indústrias')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Consultar Projeto no WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
