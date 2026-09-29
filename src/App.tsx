import React, { useState, useEffect } from 'react';
import { ViewMode, Language, Currency, PresetType, ConfigModule } from './types';
import { INITIAL_MODULES, CURRENCY_RATES, BASE_SETUP_FEE_AED, RATE_PER_WEEK_AED } from './constants';
import { Header } from './components/Header';
import { ConfiguratorView } from './components/ConfiguratorView';
import { ResearchView } from './components/ResearchView';
import { CompetitorsView } from './components/CompetitorsView';
import { TimelineView } from './components/TimelineView';
import { AnalyticsView } from './components/AnalyticsView';
import { PrototypeView } from './components/PrototypeView';
import { BookingModal } from './components/BookingModal';
import { B2BProposalModal } from './components/B2BProposalModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { ArrowRight, Share2, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('configurator');
  const [currentLang, setCurrentLang] = useState<Language>('ru');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('RUB');
  const [modules, setModules] = useState<ConfigModule[]>(INITIAL_MODULES);
  const [activePreset, setActivePreset] = useState<PresetType>('standard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isB2BProposalModalOpen, setIsB2BProposalModalOpen] = useState<boolean>(false);

  // Booking Modal State
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    serviceTitle: string;
    priceAED: number;
  }>({
    isOpen: false,
    serviceTitle: 'Первичный прием и диагностика',
    priceAED: 167,
  });

  // Handle RTL for Arabic
  useEffect(() => {
    if (currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  // Toggle Module Selection
  const handleToggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((mod) => (mod.id === id ? { ...mod, isSelected: !mod.isSelected } : mod))
    );
    setActivePreset('custom');
  };

  // Apply Configurator Presets
  const handleApplyPreset = (preset: PresetType) => {
    setActivePreset(preset);

    if (preset === 'mvp') {
      const mvpIds = ['feat-i18n', 'feat-currency', 'feat-quickbook', 'feat-card-details'];
      setModules((prev) =>
        prev.map((mod) => ({ ...mod, isSelected: mvpIds.includes(mod.id) }))
      );
      setToastMessage('Применен пакет: MVP Старт (3.5 недели)');
    } else if (preset === 'standard') {
      const standardIds = [
        'feat-i18n',
        'feat-currency',
        'feat-dha-compliance',
        'feat-blog',
        'feat-aitriage',
        'feat-card-details',
        'feat-quickbook',
        'feat-hotel-concierge',
        'feat-portal',
        'feat-biomarkers',
      ];
      setModules((prev) =>
        prev.map((mod) => ({ ...mod, isSelected: standardIds.includes(mod.id) }))
      );
      setToastMessage('Применен пакет: Оптимально для Дубая (Рекомендуемый)');
    } else if (preset === 'vip') {
      // All modules
      setModules((prev) => prev.map((mod) => ({ ...mod, isSelected: true })));
      setToastMessage('Применен пакет: Full Premium VIP (со всеми финтех-модулями)');
    }
  };

  // Load custom saved version
  const handleLoadVersion = (moduleIds: string[]) => {
    setModules((prev) =>
      prev.map((mod) => ({ ...mod, isSelected: moduleIds.includes(mod.id) }))
    );
    setActivePreset('custom');
  };

  // Open booking modal
  const handleOpenBooking = (serviceTitle: string, priceAED: number) => {
    setBookingModal({
      isOpen: true,
      serviceTitle,
      priceAED,
    });
  };

  // Calculations for Mobile Sticky CTA
  const selectedModules = modules.filter((m) => m.isSelected);
  const totalWeeks = selectedModules.reduce((acc, m) => acc + m.timeWeeks, 0);
  const totalAED = BASE_SETUP_FEE_AED + totalWeeks * RATE_PER_WEEK_AED;
  const totalRUB = Math.round(totalAED * CURRENCY_RATES.RUB);
  const totalUSD = Math.round(totalAED * CURRENCY_RATES.USD);

  const handleMobileWhatsAppExport = () => {
    const text = encodeURIComponent(
      `Здравствуйте, Елена! Мы сформировали ТЗ для Modern Medicine Dubai (Fairmont 21st Floor): модулей: ${selectedModules.length}, сроки: ${totalWeeks.toFixed(1)} нед., бюджет: ${totalAED.toLocaleString('en-US')} AED. Готовы запустить!`
    );
    window.open(`https://wa.me/971529266594?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3] text-[#222321] selection:bg-[#DCEAF0] selection:text-[#222321]">
      
      {/* Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        selectedModulesCount={selectedModules.length}
        onOpenB2BProposal={() => setIsB2BProposalModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {currentView === 'configurator' && (
          <ConfiguratorView
            modules={modules}
            onToggleModule={handleToggleModule}
            onApplyPreset={handleApplyPreset}
            activePreset={activePreset}
            currentCurrency={currentCurrency}
            onLoadVersion={handleLoadVersion}
            onNavigateToProto={() => {
              setCurrentView('site');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToTimeline={() => {
              setCurrentView('timeline');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={setToastMessage}
          />
        )}

        {currentView === 'research' && <ResearchView />}

        {currentView === 'analytics' && (
          <AnalyticsView
            modules={modules}
            currentCurrency={currentCurrency}
            onNavigateToConfig={() => {
              setCurrentView('configurator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'competitors' && <CompetitorsView />}

        {currentView === 'timeline' && (
          <TimelineView
            modules={modules}
            currentCurrency={currentCurrency}
            onNavigateToConfig={() => {
              setCurrentView('configurator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={setToastMessage}
          />
        )}

        {currentView === 'site' && (
          <PrototypeView
            currentCurrency={currentCurrency}
            onBookService={handleOpenBooking}
            onShowToast={setToastMessage}
          />
        )}
      </main>

      {/* Mobile Sticky Bar for Configurator View */}
      {currentView === 'configurator' && (
        <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#E2DFD7] p-4 z-40 lg:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div>
              <div className="text-[10px] text-[#747775] font-semibold uppercase tracking-wider">
                Бюджет ({selectedModules.length} мод. • {totalWeeks.toFixed(1)} нед.)
              </div>
              <div className="text-lg font-serif font-bold text-[#222321] leading-tight">
                {currentCurrency === 'RUB'
                  ? `~ ${totalRUB.toLocaleString('ru-RU')} ₽`
                  : currentCurrency === 'USD'
                  ? `~ $${totalUSD.toLocaleString('en-US')}`
                  : `~ ${totalAED.toLocaleString('en-US')} AED`}
              </div>
              <div className="text-[10px] text-[#747775]">
                {currentCurrency === 'RUB'
                  ? `~ ${totalAED.toLocaleString('en-US')} AED • $${totalUSD.toLocaleString('en-US')}`
                  : currentCurrency === 'USD'
                  ? `~ ${totalAED.toLocaleString('en-US')} AED • ${totalRUB.toLocaleString('ru-RU')} ₽`
                  : `~ ${totalRUB.toLocaleString('ru-RU')} ₽ • $${totalUSD.toLocaleString('en-US')}`}
              </div>
            </div>

            <button
              onClick={handleMobileWhatsAppExport}
              className="bg-[#222321] hover:bg-black text-white px-5 py-3 rounded-full text-xs font-medium shadow-md active:scale-95 transition-transform flex items-center gap-2"
            >
              <span>Согласовать ТЗ</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7FA9BC]" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating AI Chat Assistant for Elena Kireeva */}
      <FloatingChatWidget modules={modules} currentCurrency={currentCurrency} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
        serviceTitle={bookingModal.serviceTitle}
        priceAED={bookingModal.priceAED}
        currentCurrency={currentCurrency}
        onSuccess={setToastMessage}
      />

      {/* Official B2B Proposal Modal for Fairmont Dubai */}
      <B2BProposalModal
        isOpen={isB2BProposalModalOpen}
        onClose={() => setIsB2BProposalModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

    </div>
  );
}
