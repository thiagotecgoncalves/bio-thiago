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
      {/* Barra de Navegação Superior */}
      <Navbar onWhatsAppClick={buildWhatsAppUrl} />

      <main className="flex-1 pt-14 sm:pt-16">
        {/* Página 1: Início (Hero + Bloco Interativo de Solução + Métricas) */}
        <section id="inicio">
          <HeroSection
            selectedAudience={selectedAudience}
            onSelectAudience={setSelectedAudience}
            onWhatsAppClick={buildWhatsAppUrl}
          />
          <ProofStats />
        </section>

        {/* Página 2: Grade de Serviços Especializados */}
        <ServicesSection
          customImages={customImages}
          onImageChange={handleImageChange}
          onWhatsAppClick={buildWhatsAppUrl}
        />
      </main>

      {/* Página 3: Seção Unificada de Dúvidas Frequentes (FAQ) + Rodapé e Conversão */}
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
