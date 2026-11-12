/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AudienceKey } from './types';
import {
  SITE_METADATA,
  AUDIENCE_PROFILES,
} from './data/landingData';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProofStats } from './components/sections/ProofStats';
import { ServicesSection } from './components/sections/ServicesSection';
import { FaqSection } from './components/sections/FaqSection';

export default function App() {
  const [selectedAudience, setSelectedAudience] = useState<AudienceKey>('residencias');
  const [whatsappNumber, setWhatsappNumber] = useState<string>(SITE_METADATA.defaultWhatsapp);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#0B1623] flex flex-col">
      {/* Barra de Navegação Superior Fixa */}
      <Navbar onWhatsAppClick={buildWhatsAppUrl} />

      {/* Conteúdo Contínuo com Rolagem Fluida (Mobile e Desktop) */}
      <main className="flex-1 pt-14 sm:pt-16 flex flex-col">
        {/* Seção 1: Início / Home (Hero + Prova Quantitativa / Métricas) */}
        <section
          id="inicio"
          className="scroll-mt-14 sm:scroll-mt-16 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-white border-b border-slate-200/80"
        >
          <div className="flex-1 flex flex-col justify-center py-2 sm:py-3">
            <HeroSection
              selectedAudience={selectedAudience}
              onSelectAudience={setSelectedAudience}
              onWhatsAppClick={buildWhatsAppUrl}
            />
          </div>
          <ProofStats />
        </section>

        {/* Seção 2: Grade de Serviços Especializados */}
        <ServicesSection
          customImages={customImages}
          onImageChange={handleImageChange}
          onWhatsAppClick={buildWhatsAppUrl}
        />

        {/* Seção 3: Dúvidas Frequentes (FAQ) */}
        <FaqSection />
      </main>

      {/* Seção 4: Rodapé (Footer) Abaixo das Dúvidas Frequentes */}
      <Footer
        whatsappNumber={whatsappNumber}
        isEditingPhone={isEditingPhone}
        onSetWhatsappNumber={setWhatsappNumber}
        onToggleEditPhone={setIsEditingPhone}
        onWhatsAppClick={buildWhatsAppUrl}
      />
    </div>
  );
}
