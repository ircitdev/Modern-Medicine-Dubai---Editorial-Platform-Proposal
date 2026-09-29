import React, { useState } from 'react';
import { ViewMode, Language, Currency } from '../types';
import { 
  MapPin, 
  MessageCircle, 
  Sliders, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Laptop, 
  Sparkles, 
  Building2, 
  Activity, 
  FileText,
  Menu,
  X,
  Download,
  ChevronRight
} from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectTab = (view: ViewMode) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navTabs = [
    { id: 'configurator' as ViewMode, label: 'Конструктор ТЗ', icon: Sliders, badge: selectedModulesCount },
    { id: 'research' as ViewMode, label: 'Исследование', icon: BarChart3 },
    { id: 'analytics' as ViewMode, label: 'Аналитика', icon: Activity, tag: 'ROI' },
    { id: 'competitors' as ViewMode, label: 'Конкуренты SZR', icon: TrendingUp },
    { id: 'timeline' as ViewMode, label: 'Timeline', icon: Calendar },
    { id: 'site' as ViewMode, label: 'Прототип клиники', icon: Laptop, dot: true },
  ];
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

            {/* Desktop Navigation (visible on md and up) */}
            <nav className="hidden md:flex items-center">
              <div className="flex bg-[#EFEDE8] p-1 rounded-full border border-[#E2DFD7] shrink-0 gap-0.5 shadow-inner">
                {navTabs.map((tab) => {
                  const isActive = currentView === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleSelectTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#222321] text-white shadow-sm'
                          : 'text-[#747775] hover:text-[#222321]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                      {typeof tab.badge === 'number' && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#E2DFD7] text-[#222321]'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                      {tab.tag && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {tab.tag}
                        </span>
                      )}
                      {tab.dot && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Mobile Hamburger Menu Toggle (visible only on mobile) */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="https://storage.googleapis.com/uspeshnyy-projects/modern_medicine/ModernMed-webdev.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="ModernMed-webdev.pdf"
                className="w-8 h-8 rounded-lg bg-[#E04F44]/15 border border-[#E04F44]/30 text-[#E04F44] flex items-center justify-center text-[10px] font-bold"
                title="Скачать PDF"
              >
                PDF
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-9 h-9 rounded-xl bg-[#EFEDE8] hover:bg-[#E2DFD7] text-[#222321] flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Hamburger Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2DFD7] bg-white/98 backdrop-blur-md shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-5 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
              
              {/* Section Links */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#747775] px-3 mb-1">
                  Разделы платформы
                </div>
                {navTabs.map((tab) => {
                  const isActive = currentView === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleSelectTab(tab.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#222321] text-white font-semibold shadow-xs'
                          : 'hover:bg-[#F7F6F3] text-[#222321]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#7FA9BC]' : 'text-[#747775]'}`} />
                        <span className="text-sm">{tab.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {typeof tab.badge === 'number' && (
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-[#EFEDE8] text-[#222321]'
                          }`}>
                            {tab.badge} мод.
                          </span>
                        )}
                        {tab.tag && (
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {tab.tag}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white/60' : 'text-[#747775]'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Direct PDF Presentation Download */}
              <div className="pt-2 border-t border-[#F1EDE6]">
                <a
                  href="https://storage.googleapis.com/uspeshnyy-projects/modern_medicine/ModernMed-webdev.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="ModernMed-webdev.pdf"
                  className="flex items-center justify-between p-3.5 bg-[#222321] text-white rounded-2xl border border-[#353633] shadow-md group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E04F44] text-white flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif">Скачать презентацию</div>
                      <div className="text-[10px] text-white/60">ModernMed-webdev.pdf • 14 МБ</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-[#7FA9BC]" />
                </a>
              </div>

              {/* B2B Proposal & WhatsApp Direct Links */}
              <div className="space-y-2">
                {onOpenB2BProposal && (
                  <button
                    onClick={() => {
                      onOpenB2BProposal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 bg-[#FAF9F5] hover:bg-[#EFEDE8] border border-[#E2DFD7] rounded-xl text-xs font-medium text-[#222321] cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#7FA9BC]" />
                      <span>B2B Proposal Fairmont Dubai</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#747775]" />
                  </button>
                )}

                <a
                  href="https://wa.me/971529266594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-3 bg-[#7FA9BC]/10 hover:bg-[#7FA9BC]/20 border border-[#7FA9BC]/30 rounded-xl text-xs font-medium text-[#222321]"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-[#7FA9BC]" />
                    <span>WhatsApp: +971 52 926 6594</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7FA9BC]" />
                </a>
              </div>

              {/* Currency & Language in Mobile Menu */}
              <div className="pt-2 border-t border-[#F1EDE6] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#747775] uppercase">Валюта:</span>
                  <div className="flex bg-[#EFEDE8] rounded-lg p-0.5 text-xs font-medium">
                    {(['AED', 'USD', 'RUB'] as Currency[]).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => onCurrencyChange(curr)}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          currentCurrency === curr ? 'bg-[#222321] text-white' : 'text-[#747775]'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#747775] uppercase">Язык:</span>
                  <div className="flex bg-[#EFEDE8] rounded-lg p-0.5 text-xs font-medium">
                    {(['ru', 'en', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => onLangChange(lang)}
                        className={`px-2 py-0.5 rounded-md uppercase transition-all ${
                          currentLang === lang ? 'bg-[#222321] text-white' : 'text-[#747775]'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
};
