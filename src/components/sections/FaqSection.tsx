import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../../data/landingData';

export const FaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="scroll-mt-14 sm:scroll-mt-16 py-10 sm:py-16 bg-[#F8FAFC] border-b border-slate-200/90"
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs text-[10px] sm:text-xs font-semibold text-slate-700 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#0051BA]" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl font-extrabold text-[#0B1623] tracking-tight">
            Respostas diretas para gestores, síndicos e proprietários
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-[60ch] mx-auto">
            Esclareça questões sobre compatibilidade, normas ABNT e centralização sob responsabilidade técnica CRT/TRT.
          </p>
        </motion.div>

        <div className="mt-3.5 sm:mt-5 lg:mt-3 xl:mt-5 space-y-2 sm:space-y-2.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-3.5 sm:px-5 py-2.5 sm:py-3 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xs sm:text-sm lg:text-[13px] xl:text-sm font-bold text-[#0B1623] leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0B1623]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 sm:px-5 pb-3 sm:pb-3.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2 sm:pt-2.5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
