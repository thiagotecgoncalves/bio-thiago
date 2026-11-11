import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/landingData';

export const FaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-14 sm:scroll-mt-16 pt-5 sm:pt-6 pb-7 sm:pb-9 bg-[#F4F5F7] border-b border-slate-200"
    >
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
  );
};
