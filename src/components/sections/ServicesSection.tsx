import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
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
  onWhatsAppClick?: (context?: string) => string;
}

const TAB_LABELS = ['Segurança Eletrônica', 'Redes e Telecom', 'Energia e Solar'];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  customImages,
  onImageChange,
  onWhatsAppClick,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isHorizontalSwipe = useRef<boolean>(false);
  const isPointerDown = useRef<boolean>(false);

  const goToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(SERVICE_PILLARS.length - 1, index));
    setActiveIndex(clampedIndex);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex > 0) {
      goToIndex(activeIndex - 1);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex < SERVICE_PILLARS.length - 1) {
      goToIndex(activeIndex + 1);
    }
  };

  // TOUCH GESTURE HANDLERS (Mobile Swipe)
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    isHorizontalSwipe.current = false;
    isPointerDown.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartX.current;
    const diffY = touch.clientY - touchStartY.current;

    if (!isHorizontalSwipe.current) {
      if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
        isHorizontalSwipe.current = true;
      } else if (Math.abs(diffY) > 8) {
        isPointerDown.current = false;
        setIsDragging(false);
        setDragOffset(0);
        return;
      }
    }

    if (isHorizontalSwipe.current) {
      let offset = diffX;
      if (
        (activeIndex === 0 && diffX > 0) ||
        (activeIndex === SERVICE_PILLARS.length - 1 && diffX < 0)
      ) {
        offset = diffX * 0.25;
      }
      setDragOffset(offset);
    }
  };

  const onTouchEnd = () => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsDragging(false);

    if (isHorizontalSwipe.current) {
      const containerWidth = containerRef.current?.offsetWidth || 320;
      const threshold = Math.min(60, containerWidth * 0.18);

      if (dragOffset < -threshold && activeIndex < SERVICE_PILLARS.length - 1) {
        goToIndex(activeIndex + 1);
      } else if (dragOffset > threshold && activeIndex > 0) {
        goToIndex(activeIndex - 1);
      }
    }

    setDragOffset(0);
    isHorizontalSwipe.current = false;
  };

  // MOUSE GESTURE HANDLERS (Desktop Testing & Usability)
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    isHorizontalSwipe.current = true;
    isPointerDown.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const diffX = e.clientX - touchStartX.current;
    let offset = diffX;
    if (
      (activeIndex === 0 && diffX > 0) ||
      (activeIndex === SERVICE_PILLARS.length - 1 && diffX < 0)
    ) {
      offset = diffX * 0.25;
    }
    setDragOffset(offset);
  };

  const onMouseUp = () => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsDragging(false);

    const containerWidth = containerRef.current?.offsetWidth || 320;
    const threshold = Math.min(60, containerWidth * 0.18);

    if (dragOffset < -threshold && activeIndex < SERVICE_PILLARS.length - 1) {
      goToIndex(activeIndex + 1);
    } else if (dragOffset > threshold && activeIndex > 0) {
      goToIndex(activeIndex - 1);
    }

    setDragOffset(0);
  };

  const onMouseLeave = () => {
    if (isDragging) {
      onMouseUp();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.closest('#services-carousel-block')) {
        if (e.key === 'ArrowRight' && activeIndex < SERVICE_PILLARS.length - 1) {
          goToIndex(activeIndex + 1);
        } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
          goToIndex(activeIndex - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section
      id="servicos"
      className="scroll-mt-14 sm:scroll-mt-16 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-center py-4 sm:py-6 lg:py-6 bg-white border-b border-slate-200/80"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full">
        {/* Cabeçalho da Seção sem o subtítulo de TRT */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-1 mb-2.5 sm:mb-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-[10px] sm:text-xs font-semibold text-slate-700 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f3c742]"></span>
              Especialidades Técnicas Integradas
            </div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1623] tracking-tight">
              Serviços Especializados
            </h2>
          </div>
        </motion.div>

        {/* Bloco Interativo com Carrossel Central dos Cards 1, 2 e 3 */}
        <div
          id="services-carousel-block"
          className="w-full bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm"
        >
          {/* 1. Header com Abas Interativas dos Serviços */}
          <div className="bg-[#F8FAFC] border-b border-slate-200/90 p-1.5 sm:p-2.5">
            <div className="grid grid-cols-3 gap-1 sm:gap-2 p-1 bg-slate-200/70 rounded-xl">
              {SERVICE_PILLARS.map((pillar, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => goToIndex(idx)}
                    aria-selected={isActive}
                    role="tab"
                    className={`w-full min-w-0 overflow-hidden flex items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs md:text-sm font-bold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#f3c742] text-[#0B1623] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {idx === 0 && <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                    {idx === 1 && (
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="2" width="6" height="6" rx="1" />
                        <rect x="16" y="16" width="6" height="6" rx="1" />
                        <rect x="2" y="16" width="6" height="6" rx="1" />
                        <path d="M5 16v-4h14v4" />
                        <path d="M12 8v4" />
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )}
                    <span className="truncate block">{TAB_LABELS[idx]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Área do Carrossel Central com Suporte a Swipe e Setas */}
          <div
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            className="relative overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y bg-[#FCFCFD] p-2.5 sm:p-4 lg:p-5"
            style={{ touchAction: 'pan-y' }}
            aria-label="Carrossel central de serviços especializados"
          >
            {/* Seta Anterior */}
            {activeIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Serviço anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200 flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            )}

            {/* Seta Próxima */}
            {activeIndex < SERVICE_PILLARS.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Próximo serviço"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200 flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            )}

            {/* Trilho Deslizante dos 3 Cards */}
            <div
              className={`flex w-full ${
                isDragging ? 'transition-none' : 'transition-transform duration-300 ease-out'
              }`}
              style={{
                transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
              }}
            >
              {SERVICE_PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  className="w-full shrink-0 px-1 sm:px-3 flex flex-col justify-center"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                    {/* Imagem Ilustrativa dos Equipamentos */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none rounded-xl overflow-hidden border border-slate-200/90 bg-[#f0c54d] shadow-2xs">
                        <CustomizableVisualSlot
                          slotId={pillar.id}
                          customImage={customImages[pillar.id] || pillar.defaultImage}
                          onImageChange={onImageChange}
                          alt={pillar.title}
                          className="h-36 sm:h-44 md:h-48 lg:h-56 xl:h-64 w-full flex items-center justify-center overflow-hidden bg-[#f0c54d]"
                          imgClassName="w-full h-full object-contain p-2 hover:scale-102 transition-transform duration-300 pointer-events-none select-none"
                        >
                          {idx === 0 && <SecurityPillarIllustration />}
                          {idx === 1 && <NetworkPillarIllustration />}
                          {idx === 2 && <EnergyPillarIllustration />}
                        </CustomizableVisualSlot>
                      </div>
                    </div>

                    {/* Detalhes Técnicos e Sub-serviços */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      {/* Título Principal sem termo Pilar */}
                      <h3 className="font-display text-base sm:text-xl lg:text-2xl font-extrabold text-[#0B1623] leading-snug">
                        {pillar.title}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.subtitle}
                      </p>

                      {/* Grade 2x2 dos 4 Sub-serviços */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mt-3 pt-3 border-t border-slate-200/80">
                        {pillar.items.map((item) => (
                          <div
                            key={item.name}
                            className="text-left flex items-start gap-2 p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#f3c742] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-[13px] font-bold text-[#0B1623] leading-snug">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Indicadores de Slide e Dica de Navegação */}
          <div className="px-3 sm:px-4 py-2 bg-[#F8FAFC] border-t border-slate-200/80 flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-xs text-slate-500 font-medium flex items-center gap-1 truncate">
              <span className="inline-block animate-pulse">👈</span>
              <span>Deslize ou use as setas para alternar os serviços</span>
              <span className="inline-block animate-pulse">👉</span>
            </span>

            {/* Dots Indicadores Clicáveis */}
            <div className="flex items-center gap-1.5 shrink-0">
              {SERVICE_PILLARS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  aria-label={`Ir para o serviço ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 bg-[#f3c742]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
