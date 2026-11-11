import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
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
  return (
    <footer className="bg-[#0B1623] text-white">
      {/* Banner de Conversão Final */}
      <div className="border-b border-slate-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-semibold text-[#f3c742] tracking-wider">
              PRONTO PARA CENTRALIZAR SUA INFRAESTRUTURA?
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Substitua múltiplos fornecedores por um único especialista habilitado.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Envie uma mensagem no WhatsApp informando se sua demanda é para empresa, condomínio ou
              residência. Retorno técnico ágil e objetivo.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            <a
              href={onWhatsAppClick('Solicitação de Orçamento / Visita Técnica')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-4 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-sm sm:text-base font-bold shadow-lg transition-all duration-150"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Iniciar Conversa no WhatsApp</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Informações Profissionais e Direitos */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80 text-sm">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={SITE_METADATA.avatarImage}
                alt={SITE_METADATA.author}
                className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#f3c742] shadow-sm bg-slate-800"
              />
              <p className="font-display text-lg font-extrabold tracking-tight text-white">
                {SITE_METADATA.author.toUpperCase()}
              </p>
            </div>
            <p className="mt-2 text-xs text-slate-400 max-w-sm leading-relaxed">
              {SITE_METADATA.role} ({SITE_METADATA.crtHabilitation}). Projeto, execução e manutenção unificada de Segurança Eletrônica, Redes Estruturadas e Energia Solar/EV.
            </p>
          </div>

          <div className="md:col-span-4 space-y-1.5 text-xs text-slate-300">
            <p className="font-mono text-slate-400 font-semibold">CREDENCIAIS E ESCOPO</p>
            <p>Habilitação: {SITE_METADATA.crtHabilitation}</p>
            <p>Experiência: {SITE_METADATA.experienceYears}</p>
            <p>Atendimento: Empresas, Condomínios e Residências</p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs text-slate-300">
            <p className="font-mono text-slate-400 font-semibold">CANAL DIRETO</p>
            <p className="font-mono text-white">WhatsApp: +{whatsappNumber}</p>
            {!isEditingPhone ? (
              <button
                type="button"
                onClick={() => onToggleEditPhone(true)}
                className="text-[11px] text-[#f3c742] hover:underline cursor-pointer"
              >
                Alterar número do WhatsApp
              </button>
            ) : (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => onSetWhatsappNumber(e.target.value)}
                  placeholder="5567996294838"
                  className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono text-white w-36 focus:outline-none focus:border-[#f3c742]"
                />
                <button
                  type="button"
                  onClick={() => onToggleEditPhone(false)}
                  className="px-2.5 py-1 bg-[#f3c742] text-[#0B1623] rounded text-xs font-bold cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE_METADATA.author}. Todos os direitos reservados.
          </p>
          <p className="font-mono">
            Segurança Eletrônica · Infraestrutura de Redes · Energia &amp; Automação
          </p>
        </div>
      </div>
    </footer>
  );
};
