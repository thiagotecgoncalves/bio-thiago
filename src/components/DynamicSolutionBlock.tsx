import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  Building2,
  Factory,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export type SolutionType = 'residencias' | 'condominios' | 'empresas';

interface DynamicSolutionBlockProps {
  initialSolution?: SolutionType;
  activeSolution?: SolutionType;
  onSelectSolution?: (tab: SolutionType) => void;
  buildWhatsAppUrl: (context?: string) => string;
}

interface SolutionItem {
  id: SolutionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  imageSrc: string;
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'residencias',
    label: 'Residências',
    icon: Home,
    title: 'Soluções para Casas e Residências',
    imageSrc: '/assets/aistudio/Folder-solu__es-totus_20261029_211038_0000_9b6d5217.png',
  },
  {
    id: 'condominios',
    label: 'Condomínios',
    icon: Building2,
    title: 'Soluções para Condomínios & Portaria Autônoma',
    imageSrc: '/assets/aistudio/Folder-solu__es-totus_condominios_same_size.png',
  },
  {
    id: 'empresas',
    label: 'Empresas',
    icon: Factory,
    title: 'Soluções para Empresas e Indústrias',
    imageSrc: '/assets/aistudio/banner-empresas-same-size.svg',
  },
];

export const DynamicSolutionBlock: React.FC<DynamicSolutionBlockProps> = ({
  initialSolution = 'residencias',
  activeSolution,
  onSelectSolution,
}) => {
  const [internalTab, setInternalTab] = useState<SolutionType>(initialSolution);
  const currentTab = activeSolution ?? internalTab;

  const activeIndex = Math.max(
    0,
    SOLUTIONS.findIndex((s) => s.id === currentTab)
  );

  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isHorizontalSwipe = useRef<boolean>(false);
  const isPointerDown = useRef<boolean>(false);

  const handleTabChange = (tab: SolutionType) => {
    setInternalTab(tab);
    onSelectSolution?.(tab);
  };

  const goToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(SOLUTIONS.length - 1, index));
    handleTabChange(SOLUTIONS[clampedIndex].id);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex > 0) {
      goToIndex(activeIndex - 1);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex < SOLUTIONS.length - 1) {
      goToIndex(activeIndex + 1);
    }
  };

  // TOUCH EVENT HANDLERS (Mobile Swipe)
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

    // Check gesture direction
    if (!isHorizontalSwipe.current) {
      if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
        isHorizontalSwipe.current = true;
      } else if (Math.abs(diffY) > 8) {
        // Vertical scroll intent: let the browser handle natural scrolling
        isPointerDown.current = false;
        setIsDragging(false);
        setDragOffset(0);
        return;
      }
    }

    if (isHorizontalSwipe.current) {
      // Prevent boundary over-drag with spring damping
      let offset = diffX;
      if (
        (activeIndex === 0 && diffX > 0) ||
        (activeIndex === SOLUTIONS.length - 1 && diffX < 0)
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

      if (dragOffset < -threshold && activeIndex < SOLUTIONS.length - 1) {
        goToIndex(activeIndex + 1);
      } else if (dragOffset > threshold && activeIndex > 0) {
        goToIndex(activeIndex - 1);
      }
    }

    setDragOffset(0);
    isHorizontalSwipe.current = false;
  };

  // MOUSE DRAG HANDLERS (Desktop Testing & Usability)
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
      (activeIndex === SOLUTIONS.length - 1 && diffX < 0)
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

    if (dragOffset < -threshold && activeIndex < SOLUTIONS.length - 1) {
      goToIndex(activeIndex + 1);
    } else if (dragOffset > threshold && activeIndex > 0) {
      goToIndex(activeIndex - 1);
    }

    setDragOffset(0);
  };

  const onMouseLeave = () => {
    if (isPointerDown.current) {
      onMouseUp();
    }
  };

  // Keyboard navigation when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.closest('#dynamic-solution-block')) {
        if (e.key === 'ArrowRight' && activeIndex < SOLUTIONS.length - 1) {
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
    <div
      id="dynamic-solution-block"
      className="w-full bg-white border border-slate-200/90 rounded-xl flex flex-col justify-between overflow-hidden shadow-sm"
    >
      {/* 1. TOP INTERACTIVE SELECTOR HEADER */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/90 p-1 sm:p-2">
        <div className="w-full">
          {/* Segmented Control with 3 equal columns */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/70 rounded-lg w-full max-w-full">
            {SOLUTIONS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = item.id === currentTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabChange(item.id)}
                  aria-selected={isActive}
                  role="tab"
                  className={`w-full min-w-0 overflow-hidden flex items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-2.5 py-1.5 sm:py-2 rounded-md text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm font-bold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#f3c742] text-[#0B1623] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="truncate block">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. SWIPEABLE CAROUSEL CONTENT (Touch & Swipe Enabled) */}
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
        className="flex-1 p-1 sm:p-1.5 bg-[#FCFCFD] relative overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ touchAction: 'pan-y' }}
        aria-label="Galeria de soluções interativa deslizável"
      >
        {/* Previous Button Arrow */}
        {activeIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Solução anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-slate-200/80 flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        {/* Next Button Arrow */}
        {activeIndex < SOLUTIONS.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próxima solução"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-slate-200/80 flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        {/* Carousel Slider Track */}
        <div
          className={`flex w-full ${
            isDragging ? 'transition-none' : 'transition-transform duration-300 ease-out'
          }`}
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="w-full shrink-0 flex items-center justify-center p-0.5"
            >
              <div className="w-full flex items-center justify-center rounded-lg overflow-hidden border border-slate-200/80 bg-[#f0c54d]">
                <img
                  src={sol.imageSrc}
                  alt={sol.title}
                  draggable={false}
                  className="w-full h-auto max-h-[290px] sm:max-h-[320px] lg:max-h-[350px] xl:max-h-[370px] object-contain rounded-md pointer-events-none select-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM SLIDE INDICATORS & SWIPE HINT */}
      <div className="px-3 py-1.5 bg-[#F8FAFC] border-t border-slate-200/70 flex items-center justify-between gap-2">
        {/* Swipe instruction hint for mobile */}
        <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1 truncate">
          <span className="inline-block animate-pulse">👈</span>
          <span>Deslize para navegar</span>
          <span className="inline-block animate-pulse">👉</span>
        </span>

        {/* Dots pagination */}
        <div className="flex items-center gap-1.5 shrink-0" role="tablist" aria-label="Indicadores de slide">
          {SOLUTIONS.map((sol, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={sol.id}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`Ir para ${sol.label}`}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-5 h-1.5 bg-[#f3c742]'
                    : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
