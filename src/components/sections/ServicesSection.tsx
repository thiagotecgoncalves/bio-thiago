import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
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
      className="scroll-mt-14 sm:scroll-mt-16 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-4 xl:py-6 bg-white border-b border-slate-200/80"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full">
        {/* Cabeçalho da Seção com Animação Suave */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-1 sm:gap-2 mb-4 sm:mb-5 lg:mb-3 xl:mb-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-[10px] sm:text-xs font-semibold text-slate-700 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f3c742]"></span>
              Especialidades Técnicas Integradas
            </div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1623] tracking-tight">
              Serviços Especializados
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Engenharia e gestão unificada com documentação técnica e emissão de TRT ativa no CRT.
            </p>
          </div>
        </motion.div>

        {/* Grade dos 3 Pilares com Animação Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-3.5 xl:gap-4 items-stretch">
          {SERVICE_PILLARS.map((pillar, idx) => (
            <motion.article
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className="group relative border border-slate-200/90 hover:border-[#f3c742]/70 rounded-xl bg-white flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 h-full"
            >
              {/* Barra de destaque sutil no hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#f3c742] transition-colors duration-200 z-10" />

              <div className="flex flex-col flex-1">
                {/* Visual Slot Responsivo */}
                <CustomizableVisualSlot
                  slotId={pillar.id}
                  customImage={customImages[pillar.id] || pillar.defaultImage}
                  onImageChange={onImageChange}
                  alt={pillar.title}
                  className="border-b border-slate-200 h-28 sm:h-32 lg:h-[76px] xl:h-[88px] 2xl:h-24 w-full flex items-center justify-center overflow-hidden bg-[#f0c54d] shrink-0"
                  imgClassName="w-full h-full object-contain p-1 group-hover:scale-102 transition-transform duration-300"
                >
                  {idx === 0 && <SecurityPillarIllustration />}
                  {idx === 1 && <NetworkPillarIllustration />}
                  {idx === 2 && <EnergyPillarIllustration />}
                </CustomizableVisualSlot>

                <div className="p-3.5 sm:p-4 lg:p-2.5 xl:p-3.5 flex flex-col flex-1">
                  <h3 className="font-display text-sm sm:text-base lg:text-[13px] xl:text-[15px] font-extrabold text-[#0B1623] group-hover:text-[#0B1623] leading-snug">
                    <span className="text-[#f3c742] block text-xs uppercase tracking-wider font-mono font-bold mb-0.5">
                      Pilar 0{idx + 1}
                    </span>
                    {pillar.title}
                  </h3>

                  <p className="mt-1 text-xs lg:text-[11px] xl:text-xs text-slate-600 leading-tight min-h-[28px] lg:min-h-[26px] xl:min-h-[30px]">
                    {pillar.subtitle}
                  </p>

                  {/* Sub-serviços detalhados */}
                  <div className="mt-2.5 pt-2.5 lg:mt-1.5 lg:pt-1.5 xl:mt-2.5 xl:pt-2.5 border-t border-slate-100 space-y-2 lg:space-y-1.5 xl:space-y-2 flex-1">
                    {pillar.items.map((item) => (
                      <div key={item.name} className="text-left flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#f3c742] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs lg:text-[11px] xl:text-xs font-bold text-[#0B1623] leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-[11px] lg:text-[10px] xl:text-[11px] text-slate-600 mt-0.5 leading-tight">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ação do Rodapé do Card com feedback tátil */}
              <div className="px-3.5 sm:px-4 lg:px-2.5 xl:px-3.5 py-2 lg:py-1.5 xl:py-2 bg-[#F8FAFC] border-t border-slate-200/80 flex items-center justify-between gap-1.5 mt-auto">
                <span
                  className="text-[10px] lg:text-[9.5px] xl:text-[10px] font-mono text-slate-500 truncate"
                  title={pillar.specs}
                >
                  {pillar.specs}
                </span>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  href={onWhatsAppClick(pillar.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] lg:text-[10.5px] xl:text-[11px] font-bold text-[#0B1623] bg-[#f3c742] hover:bg-[#eab825] px-3 py-1.5 lg:px-2.5 lg:py-1 rounded-md inline-flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs hover:shadow-xs transition-colors"
                >
                  <span>Orçar serviço</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
