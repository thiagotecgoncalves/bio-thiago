/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AudienceKey } from './types';
import {
  SITE_METADATA,
  AUDIENCE_PROFILES,
  SCOPE_OPTIONS,
} from './data/landingData';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProofStats } from './components/sections/ProofStats';
import { ServicesSection } from './components/sections/ServicesSection';
import { ScopeSimulator } from './components/sections/ScopeSimulator';
import { FaqSection } from './components/sections/FaqSection';

export default function App() {
  const [selectedAudience, setSelectedAudience] = useState<AudienceKey>('residencias');
  const [selectedScope, setSelectedScope] = useState<string[]>(['cftv', 'rede', 'ev']);
  const [whatsappNumber, setWhatsappNumber] = useState<string>(SITE_METADATA.defaultWhatsapp);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  const handleImageChange = (slotId: string, dataUrl: string) => {
    setCustomImages((prev) => ({ ...prev, [slotId]: dataUrl }));
  };

  const toggleScopeItem = (id: string) => {
    setSelectedScope((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const buildWhatsAppUrl = (customContext?: string) => {
    const cleanPhone = whatsappNumber.replace(/\D/g, '') || SITE_METADATA.defaultWhatsapp;
    const audienceLabel = AUDIENCE_PROFILES[selectedAudience]?.label || 'Residências';
    const selectedLabels = SCOPE_OPTIONS.filter((opt) => selectedScope.includes(opt.id)).map(
      (opt) => opt.label
    );

    let message =
      'Olá, Thiago! Gostaria de agendar uma avaliação técnica para integração de sistemas (com responsabilidade técnica CRT/TRT).';

    if (customContext) {
      message = `Olá, Thiago! Vi a sua página técnica e gostaria de falar sobre: ${customContext}.`;
    } else if (selectedLabels.length > 0) {
      message = `Olá, Thiago! Sou responsável por *${audienceLabel}* e gostaria de um diagnóstico unificado para:\n- ${selectedLabels.join(
        '\n- '
      )}\n\nPodemos conversar sobre visita técnica e projeto?`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-[#0B1623] flex flex-col">
      {/* Barra de Navegação Superior */}
      <Navbar onWhatsAppClick={buildWhatsAppUrl} />

      <main className="flex-1 pt-14 sm:pt-16">
        {/* Seção Principal (Hero + Bloco Interativo de Solução) */}
        <HeroSection
          selectedAudience={selectedAudience}
          onSelectAudience={setSelectedAudience}
          onWhatsAppClick={buildWhatsAppUrl}
        />

        {/* Métricas e Prova Quantitativa (10 Anos, 3 em 1, 100% CRT, Zero Conflito) */}
        <ProofStats />

        {/* Grade de Serviços e Pilares de Atuação */}
        <ServicesSection
          customImages={customImages}
          onImageChange={handleImageChange}
          onWhatsAppClick={buildWhatsAppUrl}
        />

        {/* Simulador Interativo de Escopo */}
        <ScopeSimulator
          selectedScope={selectedScope}
          onToggleScope={toggleScopeItem}
          onWhatsAppClick={buildWhatsAppUrl}
        />

        {/* Perguntas Frequentes (FAQ) */}
        <FaqSection />
      </main>

      {/* Rodapé e CTA Final de Conversão */}
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
