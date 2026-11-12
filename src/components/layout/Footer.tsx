import React, { useState } from 'react';
import { MessageCircle, ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_METADATA, FAQ_ITEMS } from '../../data/landingData';

interface FooterProps {
  whatsappNumber: string;
  isEditingPhone: boolean;
  onSetWhatsappNumber: (val: string) => void;
  onToggleEditPhone: (val: boolean) => void;
  onWhatsAppClick: (context?: string) => string;
}

export const Footer: React.FC<FooterProps> = ({
  whatsappNumber,
  isEditingPhone,
  onSetWhatsappNumber,
  onToggleEditPhone,
  onWhatsAppClick,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <footer
      id="faq"
      className="flex-1 bg-[#0B1623] text-white pt-4 sm:pt-6 lg:pt-6 pb-4 sm:pb-6 flex flex-col justify-between"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full">
        {/* Grid Unificado: FAQ à Esquerda + CTA & Rodapé à Direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          {/* Coluna Esquerda: Perguntas Frequentes (FAQ) */}
          <div className="lg:col-span-7">
            <div className="mb-2.5 sm:mb-3">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-[10px] sm:text-xs font-semibold text-[#f3c742] mb-1 font-mono uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Dúvidas Frequentes</span>
              </div>
              <h2 className="font-display text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight">
                Respostas diretas para gestores, síndicos e proprietários
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Compatibilidade, normas ABNT e centralização sob responsabilidade técnica.
              </p>
            </div>

            {/* Accordions do FAQ */}
            <div className="space-y-1.5 sm:space-y-2">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.question}
                    className="bg-slate-900/90 border border-slate-800 rounded-lg overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-3.5 py-2 sm:py-2.5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-xs sm:text-[13px] font-semibold text-white leading-snug">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#f3c742] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-white' : ''
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
                          <div className="px-3.5 pb-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-2">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coluna Direita: CTA de Conversão + Credenciais + Canal Direto */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
            <div>
              {/* Header com Avatar e Nome */}
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800">
                <img
                  src={SITE_METADATA.avatarImage}
                  alt={SITE_METADATA.author}
                  className="w-9 h-9 rounded-full object-cover object-top border-2 border-[#f3c742] shadow-sm bg-slate-800 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-extrabold text-white truncate">
                    {SITE_METADATA.author.toUpperCase()}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {SITE_METADATA.crtHabilitation} · {SITE_METADATA.experienceYears}
                  </p>
                </div>
              </div>

              {/* Texto de Conversão */}
              <div className="mt-2.5">
                <h3 className="font-display text-sm sm:text-[15px] font-bold text-white leading-snug">
                  Pronto para centralizar sua infraestrutura?
                </h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Substitua múltiplos terceiros desconectados por um único responsável técnico com emissão de TRT para empresas, condomínios e residências.
                </p>
              </div>

              {/* Informações de Contato / Canal Direto */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 space-y-1 text-xs text-slate-300">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">Canal Direto:</span>
                  <span className="font-mono text-white font-semibold text-xs">+{whatsappNumber}</span>
                </div>
                {!isEditingPhone ? (
                  <button
                    type="button"
                    onClick={() => onToggleEditPhone(true)}
                    className="text-[11px] text-[#f3c742] hover:underline cursor-pointer block text-right w-full"
                  >
                    Alterar número do WhatsApp
                  </button>
                ) : (
                  <div className="flex items-center gap-2 pt-1 justify-end">
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => onSetWhatsappNumber(e.target.value)}
                      placeholder="5567996294838"
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-white w-32 focus:outline-none focus:border-[#f3c742]"
                    />
                    <button
                      type="button"
                      onClick={() => onToggleEditPhone(false)}
                      className="px-2 py-1 bg-[#f3c742] text-[#0B1623] rounded text-xs font-bold cursor-pointer"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Botão de Ação Direto */}
            <div className="mt-3 pt-2.5 border-t border-slate-800">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={onWhatsAppClick('Solicitação de Orçamento / Visita Técnica')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Iniciar Conversa no WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </motion.a>
              <p className="mt-1 text-[10px] text-center text-slate-400 font-mono">
                Retorno técnico ágil em horário comercial · Sem compromisso
              </p>
            </div>
          </div>
        </div>

        {/* Barra Inferior com Direitos Autorais */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE_METADATA.author}. Todos os direitos reservados.
          </p>
          <p className="font-mono text-slate-400">
            Segurança Eletrônica · Infraestrutura de Redes · Energia Solar &amp; EV
          </p>
        </div>
      </div>
    </footer>
  );
};
