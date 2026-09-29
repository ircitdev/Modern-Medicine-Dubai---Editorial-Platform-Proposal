import React from 'react';
import { ViewMode, Language, Currency } from '../types';
import { MapPin, MessageCircle, Sliders, BarChart3, TrendingUp, Calendar, Laptop, Sparkles, Building2, Activity, FileText } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  currentCurrency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  selectedModulesCount: number;
  onOpenB2BProposal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  currentLang,
  onLangChange,
  currentCurrency,
  onCurrencyChange,
  selectedModulesCount,
  onOpenB2BProposal,
}) => {
  return (
    <>
      {/* Top Elite Minimalist Utility Bar */}
      <div className="bg-[#222321] text-[#F7F6F3] text-[11px] py-1.5 px-3 sm:px-4 tracking-wide border-b border-[#353633]">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-2">
          
          {/* Location & License Info */}
          <div className="flex items-center space-x-2 opacity-90 text-[10px] sm:text-[11px] truncate">
            <span className="flex items-center gap-1 font-medium truncate">
              <MapPin className="w-3 h-3 text-[#7FA9BC] shrink-0" />
              <span className="truncate">Suite 2105 • Fairmont Dubai</span>
            </span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span className="hidden lg:inline text-[#E9DFD5]/90 text-[10px] uppercase tracking-wider">
              DHA License • 24/7 Concierge Medicine
            </span>
          </div>

          {/* Quick Language / Currency in Top Bar */}
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] shrink-0">
            {/* Currency Selector */}
            <div className="flex items-center bg-white/10 rounded-full px-2 py-0.5 text-[10px] sm:text-[11px]">
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-transparent font-medium text-white focus:outline-none cursor-pointer"
              >
                <option value="AED" className="text-[#222321]">AED (د.إ)</option>
                <option value="USD" className="text-[#222321]">USD ($)</option>
                <option value="RUB" className="text-[#222321]">RUB (₽)</option>
              </select>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5 text-[10px] font-medium">
              {(['ru', 'en', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLangChange(lang)}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full uppercase transition-all ${
                    currentLang === lang
                      ? 'bg-white text-[#222321] font-bold shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* B2B Proposal Document Link Button */}
            {onOpenB2BProposal && (
              <button
                onClick={onOpenB2BProposal}
                className="hover:text-white transition-all flex items-center gap-1 font-medium bg-[#7FA9BC]/25 hover:bg-[#7FA9BC]/40 text-white px-2 py-0.5 rounded-full cursor-pointer text-[10px] border border-[#7FA9BC]/30"
                title="Открыть коммерческое предложение B2B для Fairmont Dubai"
              >
                <FileText className="w-3 h-3 text-[#7FA9BC]" />
                <span className="hidden sm:inline font-semibold">B2B Proposal</span>
                <span className="sm:hidden">B2B</span>
              </button>
            )}

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/971529266594"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7FA9BC] transition-colors items-center gap-1 font-medium bg-[#7FA9BC]/20 hover:bg-[#7FA9BC]/30 text-white px-2.5 py-0.5 rounded-full hidden md:flex"
            >
              <MessageCircle className="w-3 h-3 text-[#7FA9BC]" />
              <span>WhatsApp: +971 52 926 6594</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Sticky Navigation Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E2DFD7] sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5 sm:py-3 gap-3">
            
            {/* Editorial Brand Logo */}
            <div 
              onClick={() => onViewChange('site')}
              className="cursor-pointer group flex items-center space-x-2.5 shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-[#222321] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs group-hover:bg-black transition-colors">
                MM
              </div>
              <div>
                <div className="text-lg sm:text-xl font-serif text-[#222321] leading-none tracking-tight font-semibold flex items-center gap-1.5">
                  <span>MODERN MEDICINE</span>
                  <span className="text-[9px] uppercase font-sans tracking-widest text-[#7FA9BC] bg-[#DCEAF0] px-1.5 py-0.2 rounded-full font-medium hidden xs:inline-block">
                    DUBAI
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#747775] tracking-wider uppercase mt-0.5 font-light flex items-center gap-1">
                  <span>Suite 2105</span>
                  <span>•</span>
                  <span>Fairmont 21st Fl</span>
                </div>
              </div>
            </div>

            {/* Streamlined Tab Navigation - Clean & Space-Optimized */}
            <nav className="flex items-center overflow-x-auto hide-scrollbar max-w-full py-1">
              <div className="flex bg-[#EFEDE8] p-1 rounded-full border border-[#E2DFD7] shrink-0 gap-0.5 shadow-inner">
                
                {/* Tab 1: Configurator */}
                <button
                  onClick={() => onViewChange('configurator')}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    currentView === 'configurator'
                      ? 'bg-[#222321] text-white shadow-sm'
                      : 'text-[#747775] hover:text-[#222321]'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Конструктор</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                    currentView === 'configurator' ? 'bg-white/20 text-white' : 'bg-[#E2DFD7] text-[#222321]'
                  }`}>
                    {selectedModulesCount}
                  </span>
                </button>

                {/* Tab 2: Research */}
                <button
                  onClick={() => onViewChange('research')}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    currentView === 'research'
                      ? 'bg-[#222321] text-white shadow-sm'
                      : 'text-[#747775] hover:text-[#222321]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Исследование</span>
                </button>

                {/* Tab: Analytics */}
                <button
                  onClick={() => onViewChange('analytics')}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    currentView === 'analytics'
                      ? 'bg-[#222321] text-white shadow-sm'
                      : 'text-[#747775] hover:text-[#222321]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-[#7FA9BC]" />
                  <span>Аналитика</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold hidden sm:inline ${
                    currentView === 'analytics' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    ROI
                  </span>
                </button>

                {/* Tab 3: Competitors */}
                <button
                  onClick={() => onViewChange('competitors')}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    currentView === 'competitors'
                      ? 'bg-[#222321] text-white shadow-sm'
                      : 'text-[#747775] hover:text-[#222321]'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Конкуренты</span>
                </button>

                {/* Tab 4: Timeline */}
                <button
                  onClick={() => onViewChange('timeline')}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    currentView === 'timeline'
                      ? 'bg-[#222321] text-white shadow-sm'
                      : 'text-[#747775] hover:text-[#222321]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Timeline</span>
                </button>

                {/* Tab 5: Prototype */}
                <button
                  onClick={() => onViewChange('site')}
                  className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    currentView === 'site'
                      ? 'bg-[#222321] text-white shadow-sm'
                      : 'text-[#747775] hover:text-[#222321]'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Прототип</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    currentView === 'site' ? 'bg-[#7FA9BC]' : 'bg-[#7FA9BC]'
                  }`} />
                </button>

              </div>
            </nav>

          </div>
        </div>
      </header>
    </>
  );
};
