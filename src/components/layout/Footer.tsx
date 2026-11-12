import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_METADATA } from '../../data/landingData';

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

          {/* Lado Direito: Ação Rápida WhatsApp + Configuração de Telefone */}
          <div className="lg:col-span-5 flex flex-col gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div>
              <p className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Atendimento Direto com o Especialista
              </p>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-xs text-slate-300">WhatsApp:</span>
                <span className="font-mono text-sm font-bold text-white">+{whatsappNumber}</span>
              </div>

              {!isEditingPhone ? (
                <button
                  type="button"
                  onClick={() => onToggleEditPhone(true)}
                  className="text-[11px] text-[#f3c742] hover:underline cursor-pointer block text-right w-full mt-1"
                >
                  Alterar número do WhatsApp
                </button>
              ) : (
                <div className="flex items-center gap-2 pt-2 justify-end">
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => onSetWhatsappNumber(e.target.value)}
                    placeholder="5567996294838"
                    className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white w-36 focus:outline-none focus:border-[#f3c742]"
                  />
                  <button
                    type="button"
                    onClick={() => onToggleEditPhone(false)}
                    className="px-2.5 py-1 bg-[#f3c742] text-[#0B1623] rounded text-xs font-bold cursor-pointer hover:bg-[#eab825] transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              )}
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={onWhatsAppClick('Solicitação de Orçamento / Visita Técnica pelo Rodapé')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Iniciar Conversa no WhatsApp</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </motion.a>

            <p className="text-[10px] text-center text-slate-400 font-mono">
              Atendimento em horário comercial · Retorno técnico ágil
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
