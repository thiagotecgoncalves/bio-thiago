import React, { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_METADATA } from '../../data/landingData';
import { PageId } from '../../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onWhatsAppClick: (context?: string) => string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onWhatsAppClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1240px] mx-auto px-3 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Wordmark com Avatar */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f3c742] rounded-lg p-0.5 cursor-pointer text-left"
            title="Ir para o Início"
          >
            <img
              src={SITE_METADATA.avatarImage}
              alt={SITE_METADATA.author}
              className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 rounded-full object-cover object-top border-2 border-[#f3c742] shadow-xs group-hover:scale-105 transition-transform bg-slate-100"
            />
            <div className="flex flex-col">
              <span className="font-display text-xs min-[360px]:text-sm sm:text-lg font-extrabold tracking-tight text-[#0B1623] whitespace-nowrap leading-tight">
                {SITE_METADATA.author.toUpperCase()}
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-500 font-medium leading-none">
                Gestor de Segurança Privada · Redes · Eletrotécnica
              </span>
            </div>
          </button>

          {/* Links Desktop das 3 Páginas Independentes */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`transition-all whitespace-nowrap cursor-pointer py-1 border-b-2 ${
                currentPage === 'home'
                  ? 'text-[#0B1623] font-extrabold border-[#f3c742]'
                  : 'text-slate-600 hover:text-[#0B1623] border-transparent'
              }`}
            >
              Início
            </button>
            <button
              type="button"
              onClick={() => onNavigate('servicos')}
              className={`transition-all whitespace-nowrap cursor-pointer py-1 border-b-2 ${
                currentPage === 'servicos'
                  ? 'text-[#0B1623] font-extrabold border-[#f3c742]'
                  : 'text-slate-600 hover:text-[#0B1623] border-transparent'
              }`}
            >
              Serviços
            </button>
            <button
              type="button"
              onClick={() => onNavigate('duvidas')}
              className={`transition-all whitespace-nowrap cursor-pointer py-1 border-b-2 ${
                currentPage === 'duvidas'
                  ? 'text-[#0B1623] font-extrabold border-[#f3c742]'
                  : 'text-slate-600 hover:text-[#0B1623] border-transparent'
              }`}
            >
              Dúvidas
            </button>
          </nav>

          {/* CTA Principal + Toggle Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={onWhatsAppClick('Atendimento Técnico Integrado')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 min-[360px]:px-3 min-[360px]:py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] text-xs sm:text-sm font-bold shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3c742]"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Falar no WhatsApp</span>
            </motion.a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:text-[#0B1623] hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#f3c742]"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#0B1623]" />
              ) : (
                <Menu className="w-5 h-5 text-[#0B1623]" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Dropdown Mobile */}
        <div
          className={`fixed top-14 sm:top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl md:hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-4 py-3 space-y-1">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors text-left ${
                currentPage === 'home'
                  ? 'bg-slate-100 text-[#0B1623] font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#f3c742]"></span>
                Início
              </span>
              <span className="text-xs font-mono text-slate-400">Home</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('servicos');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors text-left ${
                currentPage === 'servicos'
                  ? 'bg-slate-100 text-[#0B1623] font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0051BA]"></span>
                Serviços
              </span>
              <span className="text-xs font-mono text-slate-400">CFTV · Redes · Solar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('duvidas');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors text-left ${
                currentPage === 'duvidas'
                  ? 'bg-slate-100 text-[#0B1623] font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                Dúvidas Frequentes
              </span>
              <span className="text-xs font-mono text-slate-400">FAQ</span>
            </button>

            <div className="pt-2 mt-2 border-t border-slate-100">
              <a
                href={onWhatsAppClick('Menu Mobile')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#f3c742] hover:bg-[#eab825] text-[#0B1623] font-bold text-sm shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Falar no WhatsApp com Thiago</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay Backdrop Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
