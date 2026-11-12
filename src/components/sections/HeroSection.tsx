import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { AudienceKey } from '../../types';
import { DynamicSolutionBlock } from '../DynamicSolutionBlock';

interface HeroSectionProps {
  selectedAudience: AudienceKey;
  onSelectAudience: (aud: AudienceKey) => void;
  onWhatsAppClick: (context?: string) => string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedAudience,
  onSelectAudience,
  onWhatsAppClick,
}) => {
  return (
    <section
      id="inicio"
      className="pt-3 sm:pt-4 lg:pt-5 pb-5 sm:pb-6 lg:pb-6 bg-white border-b border-slate-200/80"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center py-1 sm:py-2">
          {/* Coluna Esquerda: Headline & Copywriting de Alta Conversão */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-center py-0"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-semibold text-slate-700 mb-2.5 shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0051BA]" />
                <span>Gestor de Segurança · Redes · Técnico Eletrotécnico (CRT/TRT)</span>
              </motion.div>

              <h1 className="font-display text-[1.45rem] xs:text-[1.65rem] sm:text-2xl lg:text-[1.95rem] xl:text-[2.2rem] font-extrabold tracking-tight text-[#0B1623] leading-[1.15] [text-wrap:pretty]">
                <span className="sm:whitespace-nowrap">Segurança Eletrônica,</span> Redes e Energia, integrados por um único{' '}
                <span className="text-[#f3c742] bg-[#0B1623] px-2 py-0.5 rounded whitespace-nowrap">
                  Responsável Técnico
                </span>
              </h1>

              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[0.92rem] text-slate-700 leading-relaxed max-w-[56ch]">
                <strong className="font-semibold text-slate-900 block mb-1">
                  Projeto, execução e manutenção unificada de Segurança Eletrônica, Redes Estruturadas e Energia Solar/EV.
                </strong>
                Elimine a falha de comunicação e a contratação de múltiplos fornecedores desconectados. Garanta integração técnica de alto nível com registro ativo no CRT e emissão de TRT para empresas, condomínios e residências.
              </p>
            </div>

            {/* Bloco de Conversão Direto com Microinterações */}
            <div className="mt-3.5 sm:mt-4 pt-3 border-t border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={onWhatsAppClick()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-lg bg-[#f3c742] hover:bg-[#eab825] active:scale-[0.99] text-[#0B1623] text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3c742]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="truncate">Solicitar Diagnóstico via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 shrink-0 hidden sm:inline-block" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Coluna Direita: Bloco de Solução Dinâmica com Animação */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 w-full min-w-0 flex flex-col justify-center items-center lg:items-end"
          >
            <div className="w-full max-w-[390px] sm:max-w-[420px] lg:max-w-[440px] xl:max-w-[460px]">
              <DynamicSolutionBlock
                activeSolution={selectedAudience}
                onSelectSolution={(tab) => onSelectAudience(tab)}
                buildWhatsAppUrl={onWhatsAppClick}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
