import React, { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { SITE_METADATA } from '../../data/landingData';

interface NavbarProps {
  onWhatsAppClick: (context?: string) => string;
}

export const Navbar: React.FC<NavbarProps> = ({ onWhatsAppClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1240px] mx-auto px-3 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Wordmark com Avatar */}
          <a
            href="#inicio"
            onClick={handleScrollToTop}
            className="flex items-center gap-2 sm:gap-2.5 group shrink min-w-0 outline-none p-0.5 cursor-pointer text-left"
            title="Ir para o Início"
          >
            <img
              src={SITE_METADATA.avatarImage}
              alt={SITE_METADATA.author}
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover object-top border-2 border-[#f3c742] shadow-xs group-hover:scale-105 transition-transform bg-slate-100 shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-display text-xs sm:text-base font-extrabold tracking-tight text-[#0B1623] truncate leading-tight">
                {SITE_METADATA.author.toUpperCase()}
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-500 font-medium leading-none truncate">
                Gestor de Segurança Privada · Redes · Eletrotécnica
              </span>
            </div>
          </a>

          {/* Links Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a
              href="#inicio"
              className="hover:text-[#0B1623] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Início
            </a>
            <a
              href="#servicos"
              className="hover:text-[#0B1623] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Serviços
            </a>
            <a
              href="#faq"
              className="hover:text-[#0B1623] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Dúvidas
            </a>
          </nav>

          {/* Toggle Menu Mobile - Trazido mais para a esquerda e com alta visibilidade */}
          <div className="flex md:hidden items-center shrink-0 pr-1 sm:pr-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0 shadow-sm border border-slate-700/60"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <>
                  <X className="w-5 h-5 text-[#f3c742]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Fechar</span>
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 text-[#f3c742]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Menu</span>
                </>
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
            <a
              href="#inicio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-slate-800 hover:text-[#0B1623] hover:bg-slate-100 active:bg-slate-200 font-semibold text-sm transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#f3c742]"></span>
                Início
              </span>
              <span className="text-xs font-mono text-slate-400">Home</span>
            </a>

            <a
              href="#servicos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-slate-800 hover:text-[#0B1623] hover:bg-slate-100 active:bg-slate-200 font-semibold text-sm transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0051BA]"></span>
                Serviços
              </span>
              <span className="text-xs font-mono text-slate-400">CFTV · Redes · Solar</span>
            </a>

            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-slate-800 hover:text-[#0B1623] hover:bg-slate-100 active:bg-slate-200 font-semibold text-sm transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                Dúvidas Frequentes
              </span>
              <span className="text-xs font-mono text-slate-400">FAQ &amp; Contato</span>
            </a>

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
