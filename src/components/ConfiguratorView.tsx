import React, { useState } from 'react';
import { ConfigModule, PresetType, Currency } from '../types';
import { CURRENCY_RATES, BASE_SETUP_FEE_AED, RATE_PER_WEEK_AED } from '../constants';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Share2, 
  Copy, 
  Download, 
  CheckCircle2, 
  Layers, 
  PieChart as PieIcon, 
  Check, 
  HelpCircle,
  ShieldCheck,
  Zap,
  Smartphone,
  Calendar,
  ChevronRight,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConfiguratorFaq } from './ConfiguratorFaq';
import { ConfiguratorRoiCalculator } from './ConfiguratorRoiCalculator';
import { ConfiguratorRiskAnalysis } from './ConfiguratorRiskAnalysis';
import { ClinicFloorPlan } from './ClinicFloorPlan';
import { ImplementationStatusWidget } from './ImplementationStatusWidget';
import { VersionComparisonWidget } from './VersionComparisonWidget';
import { ResourceAllocationPanel } from './ResourceAllocationPanel';
import { LaunchCountdownWidget } from './LaunchCountdownWidget';
import { CompetitiveBenchmarkWidget } from './CompetitiveBenchmarkWidget';

interface ConfiguratorViewProps {
  modules: ConfigModule[];
  onToggleModule: (id: string) => void;
  onApplyPreset: (preset: PresetType) => void;
  activePreset: PresetType;
  currentCurrency: Currency;
  onNavigateToProto: () => void;
  onNavigateToTimeline?: () => void;
  onShowToast: (msg: string) => void;
  onLoadVersion?: (moduleIds: string[]) => void;
}

export const ConfiguratorView: React.FC<ConfiguratorViewProps> = ({
  modules,
  onToggleModule,
  onApplyPreset,
  activePreset,
  currentCurrency,
  onNavigateToProto,
  onNavigateToTimeline,
  onShowToast,
  onLoadVersion,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'core' | 'marketing' | 'portal' | 'commerce'>('all');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Calculations
  const selectedModules = modules.filter((m) => m.isSelected);
  const selectedCount = selectedModules.length;
  const totalWeeks = selectedModules.reduce((acc, m) => acc + m.timeWeeks, 0);

  // Pricing
  const totalAED = BASE_SETUP_FEE_AED + totalWeeks * RATE_PER_WEEK_AED;
  const totalUSD = Math.round(totalAED * CURRENCY_RATES.USD);
  const totalRUB = Math.round(totalAED * CURRENCY_RATES.RUB);

  // Category distribution
  const categoryWeeks = {
    core: selectedModules.filter((m) => m.category === 'core').reduce((acc, m) => acc + m.timeWeeks, 0),
    marketing: selectedModules.filter((m) => m.category === 'marketing').reduce((acc, m) => acc + m.timeWeeks, 0),
    portal: selectedModules.filter((m) => m.category === 'portal').reduce((acc, m) => acc + m.timeWeeks, 0),
    commerce: selectedModules.filter((m) => m.category === 'commerce').reduce((acc, m) => acc + m.timeWeeks, 0),
  };

  const categoriesMeta = [
    { key: 'core', label: 'Базовые модули', color: '#222321', weeks: categoryWeeks.core },
    { key: 'marketing', label: 'Маркетинг & ИИ', color: '#7FA9BC', weeks: categoryWeeks.marketing },
    { key: 'portal', label: 'EHR Портал', color: '#B49E87', weeks: categoryWeeks.portal },
    { key: 'commerce', label: 'FinTech & Оплата', color: '#D4CFC5', weeks: categoryWeeks.commerce },
  ];

  // Helper for currency formatting
  const formatPrice = (amountAED: number) => {
    if (currentCurrency === 'USD') return `$${Math.round(amountAED * CURRENCY_RATES.USD).toLocaleString('en-US')}`;
    if (currentCurrency === 'RUB') return `${Math.round(amountAED * CURRENCY_RATES.RUB).toLocaleString('ru-RU')} ₽`;
    return `${Math.round(amountAED).toLocaleString('en-US')} AED`;
  };

  const handleExportWhatsApp = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
    const moduleTitles = selectedModules.map((m) => `• ${m.title} (${m.timeWeeks} нед.)`).join('%0A');
    const text = encodeURIComponent(
      `Здравствуйте, Елена! Направляю согласованную конфигурацию проекта цифровой платформы Modern Medicine (Fairmont Dubai):\n\n` +
      `📌 Модулей в скоупе: ${selectedCount} из ${modules.length}\n` +
      `⏱ Ориентировочный срок: ${totalWeeks.toFixed(1)} недель\n` +
      `💰 Бюджет: ${totalAED.toLocaleString('en-US')} AED (~ ${totalRUB.toLocaleString('ru-RU')} ₽ / $${totalUSD.toLocaleString('en-US')})\n\n` +
      `Выбранный состав:\n${selectedModules.map(m => `• ${m.title}`).join('\n')}\n\n` +
      `Готовы зафиксировать ТЗ и запустить спринт разработки.`
    );
    window.open(`https://wa.me/971529266594?text=${text}`, '_blank');
  };

  const handleCopySummary = () => {
    const summary = 
`# ТЗ на разработку платформы Modern Medicine Dubai
Заказчик: Елена Киреева (Modern Medicine, Fairmont Dubai 21st Floor)
Дата: ${new Date().toLocaleDateString('ru-RU')}

## Общие параметры:
- Выбрано модулей: ${selectedCount} из ${modules.length}
- Сроки разработки: ${totalWeeks.toFixed(1)} нед.
- Бюджет: ${totalAED.toLocaleString('en-US')} AED (~ ${totalRUB.toLocaleString('ru-RU')} ₽ / $${totalUSD.toLocaleString('en-US')})

## Состав модулей:
${selectedModules.map(m => `- [x] ${m.title} — ${m.timeWeeks} нед. (${m.categoryLabel})\n  ${m.description}`).join('\n\n')}

## Структура трудозатрат:
- Базовый функционал: ${categoryWeeks.core.toFixed(1)} нед.
- Маркетинг & ИИ: ${categoryWeeks.marketing.toFixed(1)} нед.
- EHR Портал: ${categoryWeeks.portal.toFixed(1)} нед.
- FinTech & Оплата: ${categoryWeeks.commerce.toFixed(1)} нед.
`;
    navigator.clipboard.writeText(summary);
    onShowToast('Сводка ТЗ успешно скопирована в буфер обмена!');
  };

  const handleDownloadMD = () => {
    const element = document.createElement('a');
    const file = new Blob([
`# Техническое задание: Modern Medicine Dubai
Заказчик: Елена Киреева
Дата формирования: ${new Date().toLocaleDateString('ru-RU')}
Локация: Fairmont Dubai, 21st floor, Sheikh Zayed Road

Бюджет: ${totalAED.toLocaleString('en-US')} AED (${totalRUB.toLocaleString('ru-RU')} RUB)
Сроки: ${totalWeeks.toFixed(1)} недель
Модулей: ${selectedCount}

Список утвержденных модулей:
${selectedModules.map((m, i) => `${i + 1}. ${m.title} (${m.timeWeeks} нед.)\n   Категория: ${m.categoryLabel}\n   Описание: ${m.description}\n`).join('\n')}
`
    ], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `Modern_Medicine_Dubai_TZ_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onShowToast('Файл ТЗ скачан на ваше устройство');
  };

  // SVG Donut calculation
  const totalCategoryWeeks = Math.max(totalWeeks, 0.001);
  let cumulativeAngle = 0;

  return (
    <div className="space-y-12">
      {/* Editorial Header with Large PDF Download Button */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E2DFD7] bg-white text-[#222321] text-xs font-medium tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Интерактивный конструктор ТЗ</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#222321] leading-[0.95] tracking-tight">
            Проектирование<br />
            цифровой<br />
            платформы.
          </h1>

          <p className="text-[#747775] text-base sm:text-lg max-w-2xl leading-relaxed">
            На основе комплексного аудита клиники в Fairmont Dubai мы структурировали модульную архитектуру. 
            Выбирайте компоненты системы — расчет бюджета, сроков и визуальный прототип обновляются мгновенно.
          </p>

          {/* Preset Selector */}
          <div className="pt-2">
            <div className="text-xs uppercase font-semibold text-[#747775] tracking-wider mb-3">
              Готовые конфигурационные пакеты:
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => onApplyPreset('mvp')}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  activePreset === 'mvp'
                    ? 'bg-[#222321] text-white shadow-md'
                    : 'bg-white/80 border border-[#E2DFD7] text-[#222321] hover:bg-white hover:border-[#222321]'
                }`}
              >
                🌱 MVP Старт (3.5 нед.)
              </button>

              <button
                onClick={() => onApplyPreset('standard')}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activePreset === 'standard'
                    ? 'bg-[#222321] text-white shadow-md'
                    : 'bg-white/80 border border-[#E2DFD7] text-[#222321] hover:bg-white hover:border-[#222321]'
                }`}
              >
                <span>⭐ Оптимально: Дубай</span>
                <span className="text-[10px] bg-[#7FA9BC] text-white px-2 py-0.5 rounded-full">Рекомендуем</span>
              </button>

              <button
                onClick={() => onApplyPreset('vip')}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  activePreset === 'vip'
                    ? 'bg-[#222321] text-white shadow-md'
                    : 'bg-[#E9DFD5]/70 border border-[#B49E87]/40 text-[#222321] hover:bg-[#E9DFD5]'
                }`}
              >
                👑 Full Premium VIP (с Stripe & BNPL)
              </button>
            </div>
          </div>
        </div>

        {/* Large PDF Download Button on the Right */}
        <div className="lg:pt-4 shrink-0">
          <a
            href="https://storage.googleapis.com/uspeshnyy-projects/modern_medicine/ModernMed-webdev.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="ModernMed-webdev.pdf"
            className="group relative flex items-center gap-4 p-5 sm:p-6 bg-[#222321] hover:bg-black text-white rounded-3xl border border-[#353633] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {/* Red PDF Icon badge */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#E04F44]/20 border border-[#E04F44]/40 flex items-center justify-center shrink-0 group-hover:bg-[#E04F44]/30 transition-colors shadow-inner">
              <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-[#E04F44]" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E04F44] bg-[#E04F44]/15 px-2 py-0.5 rounded-full">
                  PDF
                </span>
                <span className="text-[11px] text-[#7FA9BC] font-mono font-semibold">
                  14 МБ • 8 слайдов
                </span>
              </div>
              <div className="text-lg sm:text-xl font-serif font-bold text-white mt-1 leading-snug">
                Скачать презентацию
              </div>
              <div className="text-xs text-[#F7F6F3]/70 font-light flex items-center gap-1.5 mt-0.5">
                <span>ModernMed-webdev.pdf</span>
                <Download className="w-3.5 h-3.5 text-[#7FA9BC] group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Version Comparison & Saved Snapshots Widget */}
      <VersionComparisonWidget
        modules={modules}
        currentCurrency={currentCurrency}
        onLoadVersion={onLoadVersion || (() => {})}
        onShowToast={onShowToast}
      />

      {/* Implementation Status & Progress Bar Widget */}
      <ImplementationStatusWidget
        activePreset={activePreset}
        selectedModules={selectedModules}
        totalWeeks={totalWeeks}
        onNavigateToTimeline={onNavigateToTimeline}
        onNavigateToProto={onNavigateToProto}
      />

      {/* Dynamic Launch Countdown & Go-Live Date Widget */}
      <LaunchCountdownWidget
        totalWeeks={totalWeeks}
        selectedModulesCount={selectedModules.length}
        onNavigateToTimeline={onNavigateToTimeline}
      />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Side: Modular Feature Blocks */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Quick Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#222321] text-white'
                  : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
              }`}
            >
              Все категории ({modules.length})
            </button>
            <button
              onClick={() => setActiveCategoryFilter('core')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeCategoryFilter === 'core'
                  ? 'bg-[#222321] text-white'
                  : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
              }`}
            >
              Базовые & DHA
            </button>
            <button
              onClick={() => setActiveCategoryFilter('marketing')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeCategoryFilter === 'marketing'
                  ? 'bg-[#222321] text-white'
                  : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
              }`}
            >
              Маркетинг & ИИ
            </button>
            <button
              onClick={() => setActiveCategoryFilter('portal')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeCategoryFilter === 'portal'
                  ? 'bg-[#222321] text-white'
                  : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
              }`}
            >
              EHR Портал
            </button>
            <button
              onClick={() => setActiveCategoryFilter('commerce')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeCategoryFilter === 'commerce'
                  ? 'bg-[#222321] text-white'
                  : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
              }`}
            >
              FinTech & Оплата
            </button>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules
              .filter((m) => activeCategoryFilter === 'all' || m.category === activeCategoryFilter)
              .map((module) => {
                return (
                  <div
                    key={module.id}
                    onClick={() => onToggleModule(module.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                      module.isSelected
                        ? 'bg-white border-[#222321] shadow-sm'
                        : 'bg-white/60 border-[#E2DFD7] hover:border-[#7FA9BC] hover:bg-white'
                    }`}
                  >
                    <div>
                      {/* Top Bar with Badge & Checkbox */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                              module.isSelected
                                ? 'bg-[#222321] border-[#222321] text-white'
                                : 'border-[#D4CFC5] bg-white group-hover:border-[#7FA9BC]'
                            }`}
                          >
                            {module.isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-sm font-semibold text-[#222321] leading-snug">
                            {module.title}
                          </span>
                        </div>

                        {module.highlight && (
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                            module.isSelected
                              ? 'bg-[#DCEAF0] text-[#222321]'
                              : 'bg-[#EFEDE8] text-[#747775]'
                          }`}>
                            {module.highlight}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#747775] leading-relaxed pl-7">
                        {module.description}
                      </p>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-[#F1EDE6] pl-7">
                      <span className="text-[11px] font-medium text-[#7FA9BC] uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {module.timeWeeks} {module.timeWeeks === 1 ? 'неделя' : module.timeWeeks < 1 ? 'нед.' : 'недели'}
                      </span>
                      <span className="text-[11px] text-[#747775]">
                        +{formatPrice(module.timeWeeks * RATE_PER_WEEK_AED)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Strategic Value Note */}
          <div className="p-6 rounded-2xl bg-[#EFEDE8] border border-[#E2DFD7] flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#222321] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[#222321]">
                Соответствие стандартам Dubai Health Authority (DHA)
              </h4>
              <p className="text-xs text-[#747775] leading-relaxed">
                Все модули разработаны с учетом обязательных требований регулятора ОАЭ: хранение данных пациентов в защищенном контуре, двуязычная документация (EN/AR) и интеграция с единой системой медицинских записей NABIDH.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Calculation & Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-white p-7 rounded-3xl border border-[#E2DFD7] sticky top-24 space-y-7 shadow-sm">
            
            {/* Header */}
            <div>
              <div className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <span>Финансово-технический расчет</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#222321]">
                Оценка проекта
              </h3>
            </div>

            {/* Metrics List */}
            <div className="space-y-3.5 border-t border-b border-[#F1EDE6] py-5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[#747775]">Выбрано модулей:</span>
                <span className="font-semibold text-[#222321] flex items-center gap-1.5">
                  <span>{selectedCount} из {modules.length}</span>
                  <span className="text-xs text-[#7FA9BC] font-normal">
                    ({Math.round((selectedCount / modules.length) * 100)}%)
                  </span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#747775]">Срок реализации:</span>
                <span className="font-semibold text-[#222321]">
                  {totalWeeks.toFixed(1)} нед. (~{Math.ceil(totalWeeks * 7)} дн.)
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-[#E2DFD7]">
                <span className="text-[#747775]">Бюджет проекта:</span>
                <div className="text-right">
                  <div className="text-2xl font-serif font-bold text-[#222321]">
                    ~ {formatPrice(totalAED)}
                  </div>
                  <div className="text-xs text-[#747775] mt-0.5 space-x-2">
                    {currentCurrency === 'RUB' ? (
                      <>
                        <span>~ {totalAED.toLocaleString('en-US')} AED</span>
                        <span>•</span>
                        <span>${totalUSD.toLocaleString('en-US')}</span>
                      </>
                    ) : currentCurrency === 'USD' ? (
                      <>
                        <span>~ {totalAED.toLocaleString('en-US')} AED</span>
                        <span>•</span>
                        <span>~ {totalRUB.toLocaleString('ru-RU')} ₽</span>
                      </>
                    ) : (
                      <>
                        <span>~ {totalRUB.toLocaleString('ru-RU')} ₽</span>
                        <span>•</span>
                        <span>${totalUSD.toLocaleString('en-US')}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Scope Distribution Chart */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#747775]">
                <span className="font-medium text-[#222321]">Распределение объема работ:</span>
                <span className="text-[11px]">{totalWeeks.toFixed(1)} нед. всего</span>
              </div>

              {/* Custom SVG Donut Chart */}
              <div className="flex items-center gap-4 bg-[#F7F6F3] p-4 rounded-2xl border border-[#E2DFD7]">
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {categoriesMeta.map((cat) => {
                      const fraction = cat.weeks / totalCategoryWeeks;
                      const strokeDasharray = `${fraction * 251.2} 251.2`;
                      const strokeDashoffset = -cumulativeAngle;
                      cumulativeAngle += fraction * 251.2;

                      return (
                        <circle
                          key={cat.key}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={cat.color}
                          strokeWidth="14"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500 cursor-pointer hover:stroke-[16]"
                          onMouseEnter={() => setHoveredSlice(cat.label)}
                          onMouseLeave={() => setHoveredSlice(null)}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xs font-serif font-bold text-[#222321]">
                      {totalWeeks.toFixed(0)}н
                    </span>
                  </div>
                </div>

                {/* Legends */}
                <div className="space-y-1.5 text-[11px] flex-1 min-w-0">
                  {categoriesMeta.map((cat) => (
                    <div key={cat.key} className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <span className="truncate text-[#747775]">{cat.label}</span>
                      </div>
                      <span className="font-medium text-[#222321] shrink-0">
                        {cat.weeks.toFixed(1)}н
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={onNavigateToProto}
                className="w-full py-3.5 px-5 bg-[#222321] hover:bg-black text-white rounded-full text-xs sm:text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.99]"
              >
                <span>Смотреть интерактивный прототип</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {onNavigateToTimeline && (
                <button
                  onClick={onNavigateToTimeline}
                  className="w-full py-3 px-5 bg-[#EFEDE8] hover:bg-[#E2DFD7] text-[#222321] rounded-full text-xs font-medium transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#7FA9BC]" />
                  <span>Поэтапный план реализации (Timeline)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#747775]" />
                </button>
              )}

              <button
                onClick={handleExportWhatsApp}
                className="w-full py-3 px-5 bg-white border border-[#222321] hover:bg-[#F7F6F3] text-[#222321] rounded-full text-xs font-medium transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Share2 className="w-3.5 h-3.5 text-[#222321]" />
                <span>Отправить ТЗ в WhatsApp (+971)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleCopySummary}
                  className="py-2.5 px-3 bg-[#EFEDE8] hover:bg-[#E2DFD7] text-[#222321] rounded-full text-[11px] font-medium transition-all flex items-center justify-center gap-1.5"
                  title="Скопировать текст ТЗ"
                >
                  <Copy className="w-3 h-3 text-[#747775]" />
                  <span>Копировать</span>
                </button>

                <button
                  onClick={handleDownloadMD}
                  className="py-2.5 px-3 bg-[#EFEDE8] hover:bg-[#E2DFD7] text-[#222321] rounded-full text-[11px] font-medium transition-all flex items-center justify-center gap-1.5"
                  title="Скачать ТЗ в формате Markdown"
                >
                  <Download className="w-3 h-3 text-[#747775]" />
                  <span>Скачать .md</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Interactive Clinic Floor Plan on 21st Floor Fairmont Dubai */}
      <ClinicFloorPlan
        modules={modules}
        onToggleModule={onToggleModule}
      />

      {/* ROI Calculator for Elena Kireeva */}
      <ConfiguratorRoiCalculator
        modules={modules}
        currentCurrency={currentCurrency}
        totalWeeks={totalWeeks}
        totalAED={totalAED}
      />

      {/* Dynamic Competitive Benchmark & Market Gap Radar (Recharts) */}
      <CompetitiveBenchmarkWidget
        modules={modules}
        onToggleModule={onToggleModule}
      />

      {/* Dynamic Project Risk & DHA Compliance Analysis */}
      <ConfiguratorRiskAnalysis
        modules={modules}
        totalWeeks={totalWeeks}
      />

      {/* Resource Allocation & Engineering Staffing Panel */}
      <ResourceAllocationPanel
        modules={modules}
        totalWeeks={totalWeeks}
      />

      {/* FAQ Section for Client Elena Kireeva */}
      <ConfiguratorFaq />

    </div>
  );
};
