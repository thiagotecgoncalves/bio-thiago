import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_METADATA } from '../../data/landingData';

interface FooterProps {
  onWhatsAppClick: (context?: string) => string;
  whatsappNumber?: string;
  isEditingPhone?: boolean;
  onSetWhatsappNumber?: (val: string) => void;
  onToggleEditPhone?: (val: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ onWhatsAppClick }) => {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <footer className="bg-[#0B1623] text-white pt-10 sm:pt-14 pb-6 sm:pb-8 border-t border-slate-800">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full">
        {/* Bloco de Conversão Principal do Rodapé */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pb-10 border-b border-slate-800/90">
          {/* Lado Esquerdo: Mensagem e Credenciais Técnicas */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700/60 text-[10px] sm:text-xs font-semibold text-[#f3c742] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{SITE_METADATA.crtHabilitation}</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Pronto para centralizar sua infraestrutura?
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-[55ch]">
              Elimine o retrabalho e visitas cobradas em duplicidade. Tenha um único responsável técnico para projetos, execução e manutenção em Segurança Eletrônica, Redes e Energia Solar/EV.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <img
                src={SITE_METADATA.avatarImage}
                alt={SITE_METADATA.author}
                className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#f3c742] shadow-sm bg-slate-800 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-white leading-tight">
                  {SITE_METADATA.author}
                </p>
                <p className="text-[11px] text-slate-400">
                  {SITE_METADATA.role}
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Ação Rápida WhatsApp Animada */}
          <div className="lg:col-span-5 flex flex-col justify-center bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <motion.a
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  '0 4px 14px 0 rgba(243,199,66,0.35)',
                  '0 8px 24px 0 rgba(243,199,66,0.55)',
                  '0 4px 14px 0 rgba(243,199,66,0.35)',
                ],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={onWhatsAppClick('Solicitação de Orçamento / Visita Técnica pelo Rodapé')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-sm sm:text-base font-extrabold shadow-lg transition-all cursor-pointer select-none group"
            >
              <motion.div
                animate={{ rotate: [0, -12, 12, -8, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: 'easeInOut',
                }}
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
              </motion.div>
              <span>Iniciar Conversa no WhatsApp</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <p className="mt-2.5 text-[11px] text-center text-slate-400 font-mono flex items-center justify-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Online no WhatsApp · Retorno ágil em horário comercial</span>
            </p>
          </div>
        </div>

        {/* Barra Inferior com Copyright e Navegação */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <div>
            <p>
              © {new Date().getFullYear()} <strong className="text-slate-200">{SITE_METADATA.author}</strong>. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Segurança Eletrônica · Infraestrutura de Redes · Energia Solar &amp; EV · CRT/TRT
            </p>
          </div>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold cursor-pointer border border-slate-700/50"
            title="Voltar ao início da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#f3c742]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
