/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AudienceKey, PageId } from './types';
import {
  SITE_METADATA,
  AUDIENCE_PROFILES,
} from './data/landingData';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProofStats } from './components/sections/ProofStats';
import { ServicesSection } from './components/sections/ServicesSection';

const getPageFromHash = (): PageId => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('servico')) return 'servicos';
  if (hash.includes('faq') || hash.includes('duvida')) return 'duvidas';
  return 'home';
};

const MinimalFooter: React.FC = () => (
  <footer className="border-t border-slate-200/90 bg-white py-3.5 px-4 sm:px-8 text-xs text-slate-500">
    <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-700">{SITE_METADATA.author}</span>
        <span className="text-slate-400">·</span>
        <span>Habilitação Técnica CRT · Emissão de TRT</span>
      </div>
      <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
        <span>Segurança Eletrônica</span>
        <span>·</span>
        <span>Redes &amp; Telecom</span>
        <span>·</span>
        <span>Energia Solar/EV</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromHash());
  const [selectedAudience, setSelectedAudience] = useState<AudienceKey>('residencias');
  const [whatsappNumber, setWhatsappNumber] = useState<string>(SITE_METADATA.defaultWhatsapp);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    const targetHash = page === 'home' ? '#inicio' : page === 'servicos' ? '#servicos' : '#faq';
    window.history.pushState(null, '', targetHash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageChange = (slotId: string, dataUrl: string) => {
    setCustomImages((prev) => ({ ...prev, [slotId]: dataUrl }));
  };

  const buildWhatsAppUrl = (customContext?: string) => {
    const cleanPhone = whatsappNumber.replace(/\D/g, '') || SITE_METADATA.defaultWhatsapp;
    const audienceLabel = AUDIENCE_PROFILES[selectedAudience]?.label || 'Residências';

    let message =
      'Olá, Thiago! Gostaria de agendar uma avaliação técnica para integração de sistemas (com responsabilidade técnica CRT/TRT).';

    if (customContext) {
      message = `Olá, Thiago! Vi a sua página técnica e gostaria de falar sobre: ${customContext}.`;
    } else {
      message = `Olá, Thiago! Sou responsável por *${audienceLabel}* e gostaria de agendar uma avaliação técnica para integração de sistemas com responsabilidade técnica CRT/TRT.`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#0B1623] flex flex-col justify-between">
      {/* Barra de Navegação Superior */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onWhatsAppClick={buildWhatsAppUrl}
      />

      <main className="flex-1 pt-14 sm:pt-16 flex flex-col">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                <HeroSection
                  selectedAudience={selectedAudience}
                  onSelectAudience={setSelectedAudience}
                  onWhatsAppClick={buildWhatsAppUrl}
                />
                <ProofStats />
              </div>
              <MinimalFooter />
            </motion.div>
          )}

          {currentPage === 'servicos' && (
            <motion.div
              key="servicos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex-1 flex flex-col justify-between"
            >
              <ServicesSection
                customImages={customImages}
                onImageChange={handleImageChange}
                onWhatsAppClick={buildWhatsAppUrl}
              />
              <MinimalFooter />
            </motion.div>
          )}

          {currentPage === 'duvidas' && (
            <motion.div
              key="duvidas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex-1 flex flex-col justify-between"
            >
              <Footer
                whatsappNumber={whatsappNumber}
                isEditingPhone={isEditingPhone}
                onSetWhatsappNumber={setWhatsappNumber}
                onToggleEditPhone={setIsEditingPhone}
                onWhatsAppClick={buildWhatsAppUrl}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
