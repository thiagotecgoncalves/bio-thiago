import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICE_PILLARS } from '../../data/landingData';
import {
  CustomizableVisualSlot,
  SecurityPillarIllustration,
  NetworkPillarIllustration,
  EnergyPillarIllustration,
} from '../VisualAssets';

interface ServicesSectionProps {
  customImages: Record<string, string>;
  onImageChange: (slotId: string, dataUrl: string) => void;
  onWhatsAppClick: (context?: string) => string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  customImages,
  onImageChange,
  onWhatsAppClick,
}) => {
  return (
    <section
      id="servicos"
      className="scroll-mt-14 sm:scroll-mt-16 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-10 bg-white border-b border-slate-200/80"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1623] tracking-tight">
              Serviços
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Engenharia e gestão unificada com documentação técnica e emissão de TRT.
            </p>
          </div>
        </div>

        {/* Grade dos 3 Pilares */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {SERVICE_PILLARS.map((pillar, idx) => (
            <article
              key={pillar.id}
              className="border border-slate-200 rounded-xl bg-white flex flex-col justify-between overflow-hidden shadow-xs hover:border-slate-300 transition-colors h-full"
            >
              <div className="flex flex-col flex-1">
                {/* Visual Slot */}
                <CustomizableVisualSlot
                  slotId={pillar.id}
                  customImage={customImages[pillar.id] || pillar.defaultImage}
                  onImageChange={onImageChange}
                  alt={pillar.title}
                  className="border-b border-slate-200 h-28 sm:h-32 w-full flex items-center justify-center overflow-hidden bg-[#f0c54d]"
                  imgClassName="w-full h-full object-contain"
                >
                  {idx === 0 && <SecurityPillarIllustration />}
                  {idx === 1 && <NetworkPillarIllustration />}
                  {idx === 2 && <EnergyPillarIllustration />}
                </CustomizableVisualSlot>

                <div className="p-3.5 sm:p-4 flex flex-col flex-1">
                  <h3 className="font-display text-sm sm:text-base font-extrabold text-[#f3c742] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-600 leading-snug min-h-[32px]">
                    {pillar.subtitle}
                  </p>

                  {/* Sub-serviços detalhados */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 flex-1">
                    {pillar.items.map((item) => (
                      <div key={item.name} className="text-left">
                        <h4 className="text-xs font-bold text-[#0B1623] leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ação do Rodapé do Card */}
              <div className="px-3.5 sm:px-4 py-2.5 bg-[#F8FAFC] border-t border-slate-200/80 flex items-center justify-between gap-2 mt-auto">
                <span className="text-[10px] font-mono text-slate-500 truncate">
                  {pillar.specs}
                </span>
                <a
                  href={onWhatsAppClick(pillar.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#0B1623] bg-[#f3c742] hover:bg-[#eab825] px-2.5 py-1 rounded-md inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors"
                >
                  <span>Orçar serviço</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
