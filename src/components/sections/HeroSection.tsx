import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
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
      className="lg:h-[calc(100vh-4rem)] lg:min-h-[580px] flex flex-col justify-between pt-2 sm:pt-3 lg:pt-4 pb-0 bg-white border-b border-slate-200/80"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center py-2 sm:py-3">
          {/* Coluna Esquerda: Headline & Copywriting de Alta Conversão */}
          <div className="lg:col-span-6 flex flex-col justify-center py-0">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-semibold text-slate-700 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f3c742]"></span>
                Gestor de Segurança Privada · Especialista em Redes de Computadores · Técnico Eletrotécnico
              </div>

              <h1 className="font-display text-[1.4rem] xs:text-[1.55rem] sm:text-2xl lg:text-[1.95rem] xl:text-[2.2rem] font-extrabold tracking-tight text-[#0B1623] leading-[1.12] [text-wrap:pretty]">
                <span className="sm:whitespace-nowrap">Segurança Eletrônica,</span> Redes e Energia, integrados por um único{' '}
                <span className="text-[#f3c742] whitespace-nowrap">Responsável Técnico</span>
              </h1>

              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[0.92rem] text-slate-700 leading-relaxed max-w-[56ch]">
                <strong className="font-semibold text-slate-900 block mb-1">
                  Projeto, execução e manutenção unificada de Segurança Eletrônica, Redes Estruturadas e Energia Solar/EV.
                </strong>
                Elimine a falha de comunicação e a contratação de múltiplos fornecedores desconectados. Garanta integração técnica de alto nível com registro ativo no CRT e emissão de TRT para empresas, condomínios e residências.
              </p>
            </div>

            {/* Bloco de Conversão Direto */}
            <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={onWhatsAppClick()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#f3c742] hover:bg-[#eab825] active:scale-[0.99] text-[#0B1623] text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3c742]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="truncate">Solicitar Diagnóstico via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 shrink-0 hidden sm:inline-block" />
                </a>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Bloco de Solução Dinâmica */}
          <div className="lg:col-span-6 w-full min-w-0 flex flex-col justify-center items-center lg:items-end">
            <div className="w-full max-w-[390px] sm:max-w-[420px] lg:max-w-[440px] xl:max-w-[460px]">
              <DynamicSolutionBlock
                activeSolution={selectedAudience}
                onSelectSolution={(tab) => onSelectAudience(tab)}
                buildWhatsAppUrl={onWhatsAppClick}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
