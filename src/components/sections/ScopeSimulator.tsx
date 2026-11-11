import React from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { SCOPE_OPTIONS } from '../../data/landingData';

interface ScopeSimulatorProps {
  selectedScope: string[];
  onToggleScope: (id: string) => void;
  onWhatsAppClick: (context?: string) => string;
}

export const ScopeSimulator: React.FC<ScopeSimulatorProps> = ({
  selectedScope,
  onToggleScope,
  onWhatsAppClick,
}) => {
  const estimatedSuppliersReplaced = Math.max(
    1,
    Math.min(4, Math.ceil(selectedScope.length * 0.75))
  );

  return (
    <section
      id="escopo"
      className="scroll-mt-14 sm:scroll-mt-16 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-12 bg-[#F4F5F7] border-b border-slate-200/90"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 w-full">
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 lg:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Coluna Esquerda: Opções de Escopo */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#f3c742] tracking-tight">
                  Selecione os sistemas que você precisa implantar, reformar ou unificar:
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Marque os itens abaixo para gerar o resumo técnico direto no WhatsApp de Thiago Gonçalves.
                </p>
              </div>

              {/* Grid de Checkboxes */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCOPE_OPTIONS.map((option) => {
                  const isSelected = selectedScope.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onToggleScope(option.id)}
                      className={`text-left p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-semibold leading-snug">
                          {option.label}
                        </p>
                        <p
                          className={`text-[11px] font-mono mt-1 ${
                            isSelected ? 'text-[#f3c742]' : 'text-slate-500'
                          }`}
                        >
                          Serviço: {option.pillar}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#f3c742] text-[#0B1623]'
                            : 'border border-slate-300 bg-slate-50'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coluna Direita: Resumo do Diagnóstico & CTA */}
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 sm:p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono font-semibold text-slate-500">
                  DIAGNÓSTICO DE CENTRALIZAÇÃO
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500">Sistemas Selecionados</p>
                    <p className="text-xl sm:text-2xl font-extrabold font-mono text-[#0B1623] tabular-nums mt-0.5">
                      {selectedScope.length} {selectedScope.length === 1 ? 'item' : 'itens'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Fornecedores Substituídos</p>
                    <p className="text-xl sm:text-2xl font-extrabold font-mono text-[#0B1623] tabular-nums mt-0.5">
                      <span className="bg-[#f3c742] px-2 py-0.5 rounded">
                        {estimatedSuppliersReplaced} para 1
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">
                    O que está incluído no atendimento inicial:
                  </p>
                  <p>1. Análise de compatibilidade elétrica, lógica e segurança física.</p>
                  <p>2. Levantamento de pontos vulneráveis e gargalos de rede/energia.</p>
                  <p>3. Proposta executiva unificada com cronograma e TRT no CRT.</p>
                </div>
              </div>

              <div className="mt-7 sm:mt-8">
                <a
                  href={onWhatsAppClick()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-sm sm:text-base font-bold shadow-md transition-all duration-150"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>Enviar Escopo pelo WhatsApp</span>
                </a>
                <p className="mt-2.5 text-[11px] text-center text-slate-500 font-mono">
                  Resposta rápida em horário comercial · Sem compromisso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
