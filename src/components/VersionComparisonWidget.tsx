import React, { useState, useEffect } from 'react';
import { ConfigModule, Currency, SavedConfigurationVersion } from '../types';
import { CURRENCY_RATES, BASE_SETUP_FEE_AED, RATE_PER_WEEK_AED } from '../constants';
import { 
  GitCompare, 
  Save, 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Share2, 
  CheckCircle2, 
  Minus,
  HelpCircle,
  Copy,
  ExternalLink,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VersionComparisonWidgetProps {
  modules: ConfigModule[];
  currentCurrency: Currency;
  onLoadVersion: (moduleIds: string[]) => void;
  onShowToast: (message: string) => void;
}

const DEFAULT_VERSIONS: SavedConfigurationVersion[] = [
  {
    id: 'ver-mvp',
    name: 'Вариант 1: «MVP Старт»',
    tag: '3.5 недели • Быстрый запуск',
    description: 'Минимальный жизнеспособный продукт: сайт RU/EN/AR с RTL, каталог услуг, WhatsApp 1-click запись и консьерж Fairmont.',
    createdAt: 'Предустановлен',
    moduleIds: ['feat-i18n', 'feat-currency', 'feat-card-details', 'feat-quickbook', 'feat-hotel-concierge'],
  },
  {
    id: 'ver-standard',
    name: 'Вариант 2: «Оптимально: Дубай»',
    tag: '6.5 недель • Рекомендуемый',
    description: 'Бизнес-стандарт для Suite 2105: MVP + Личный кабинет (EHR), ИИ-триаж, Digital Intake, графики биомаркеров и ORM 5.0★.',
    createdAt: 'Предустановлен',
    moduleIds: [
      'feat-i18n',
      'feat-currency',
      'feat-dha-compliance',
      'feat-blog',
      'feat-aitriage',
      'feat-card-details',
      'feat-quickbook',
      'feat-hotel-concierge',
      'feat-orm-feedback',
      'feat-portal',
      'feat-biomarkers',
      'feat-digital-intake',
    ],
  },
  {
    id: 'ver-vip',
    name: 'Вариант 3: «Full Premium VIP»',
    tag: '9.0 недель • Вся экосистема',
    description: 'Максимальный функционал клиники целевого назначения (Destination Clinic): все модули, включая Stripe Apple Pay и рассрочку Tabby / Tamara.',
    createdAt: 'Предустановлен',
    moduleIds: [
      'feat-i18n',
      'feat-currency',
      'feat-dha-compliance',
      'feat-blog',
      'feat-aitriage',
      'feat-card-details',
      'feat-quickbook',
      'feat-hotel-concierge',
      'feat-orm-feedback',
      'feat-portal',
      'feat-biomarkers',
      'feat-digital-intake',
      'feat-burnout-protection',
      'feat-payments',
      'feat-tabby',
    ],
  },
];

export const VersionComparisonWidget: React.FC<VersionComparisonWidgetProps> = ({
  modules,
  currentCurrency,
  onLoadVersion,
  onShowToast,
}) => {
  const [versions, setVersions] = useState<SavedConfigurationVersion[]>(() => {
    try {
      const saved = localStorage.getItem('mm_saved_config_versions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 3) return parsed;
      }
    } catch (e) {
      // Fallback to default
    }
    return DEFAULT_VERSIONS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [targetSaveSlotIndex, setTargetSaveSlotIndex] = useState<number>(0);
  const [customVersionName, setCustomVersionName] = useState('');

  // Persist versions
  useEffect(() => {
    try {
      localStorage.setItem('mm_saved_config_versions', JSON.stringify(versions));
    } catch (e) {
      // ignore
    }
  }, [versions]);

  const activeModuleIds = modules.filter((m) => m.isSelected).map((m) => m.id);

  const formatPrice = (amountAED: number) => {
    if (currentCurrency === 'USD') return `$${Math.round(amountAED * CURRENCY_RATES.USD).toLocaleString('en-US')}`;
    if (currentCurrency === 'RUB') return `${Math.round(amountAED * CURRENCY_RATES.RUB).toLocaleString('ru-RU')} ₽`;
    return `${Math.round(amountAED).toLocaleString('en-US')} AED`;
  };

  const calculateVersionMetrics = (moduleIds: string[]) => {
    const selectedMods = modules.filter((m) => moduleIds.includes(m.id));
    const weeks = selectedMods.reduce((acc, m) => acc + m.timeWeeks, 0);
    const costAED = BASE_SETUP_FEE_AED + weeks * RATE_PER_WEEK_AED;
    const advance30AED = costAED * 0.3;
    const hasConcierge = moduleIds.includes('feat-hotel-concierge');
    const hasPortal = moduleIds.includes('feat-portal');
    const paybackDays = hasConcierge ? Math.max(25, Math.round((costAED / 9333) * 30)) : 60;

    return {
      count: selectedMods.length,
      weeks: parseFloat(weeks.toFixed(1)),
      costAED,
      advance30AED,
      paybackDays,
      hasConcierge,
      hasPortal,
    };
  };

  const handleApplyVersion = (ver: SavedConfigurationVersion) => {
    onLoadVersion(ver.moduleIds);
    confetti({ particleCount: 30, spread: 50 });
    onShowToast(`Применена конфигурация: ${ver.name}`);
    setIsModalOpen(false);
  };

  const handleSaveCurrentToSlot = (slotIdx: number) => {
    const updated = [...versions];
    const newName = customVersionName.trim() || `Вариант ${slotIdx + 1}: «Моя конфигурация»`;
    const selectedCount = activeModuleIds.length;
    
    updated[slotIdx] = {
      id: `ver-custom-${Date.now()}`,
      name: newName,
      tag: `${selectedCount} модулей • Пользовательский`,
      description: `Сохранено пользователем ${new Date().toLocaleDateString()} в ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Содержит ${selectedCount} выбранных модулей.`,
      createdAt: new Date().toLocaleDateString(),
      moduleIds: [...activeModuleIds],
    };

    setVersions(updated);
    setIsSaveModalOpen(false);
    setCustomVersionName('');
    onShowToast(`Конфигурация сохранена в Слот ${slotIdx + 1}!`);
  };

  const handleExportComparisonWhatsApp = () => {
    let msg = `*Сравнение версий ТЗ для клиники Modern Medicine Dubai (Fairmont Suite 2105)*\nЗаказчик: Елена Киреева\n\n`;

    versions.forEach((ver, idx) => {
      const met = calculateVersionMetrics(ver.moduleIds);
      msg += `*${ver.name}*\n`;
      msg += `• Модулей: ${met.count} | Срок: ${met.weeks} нед.\n`;
      msg += `• Бюджет: ${formatPrice(met.costAED)} (Аванс 30%: ${formatPrice(met.advance30AED)})\n`;
      msg += `• Окупаемость: ~${met.paybackDays} дней\n\n`;
    });

    msg += `Посмотреть интерактивное сравнение: https://ais-pre-qug47nd5jie5rwhludgs6q-133875749979.europe-west2.run.app`;

    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* Top Banner & Version Switcher Card */}
      <div className="bg-[#F7F6F3] rounded-3xl p-5 sm:p-6 border border-[#E2DFD7] shadow-xs space-y-4">
        
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border border-[#E2DFD7] text-[#7FA9BC] shadow-xs">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#7FA9BC] uppercase tracking-wider">
                Сравнение версий & Снэпшоты ТЗ
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#222321]">
                Сохраненные варианты скоупа проекта
              </h4>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaveModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EFEDE8] border border-[#E2DFD7] text-[#222321] text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#7FA9BC]" />
              <span>Сохранить текущую ({activeModuleIds.length})</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#222321] hover:bg-black text-white text-xs font-medium transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <GitCompare className="w-3.5 h-3.5 text-[#7FA9BC]" />
              <span>Сравнить 3 версии</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Version Chips Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {versions.map((ver, idx) => {
            const met = calculateVersionMetrics(ver.moduleIds);
            // Check if current active selection matches this version exactly
            const isCurrentlyActive =
              activeModuleIds.length === ver.moduleIds.length &&
              ver.moduleIds.every((id) => activeModuleIds.includes(id));

            return (
              <div
                key={ver.id}
                onClick={() => handleApplyVersion(ver)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                  isCurrentlyActive
                    ? 'bg-white border-[#222321] shadow-md ring-1 ring-[#222321]'
                    : 'bg-white/70 hover:bg-white border-[#E2DFD7] hover:border-[#7FA9BC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-mono text-[#747775]">СЛОТ 0{idx + 1}</span>
                    {isCurrentlyActive && (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        Активен сейчас
                      </span>
                    )}
                  </div>

                  <h5 className="font-serif font-bold text-sm text-[#222321] group-hover:text-[#7FA9BC] transition-colors">
                    {ver.name}
                  </h5>

                  <p className="text-[11px] text-[#747775] mt-1 line-clamp-1">
                    {ver.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F1EDE6] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#222321]">{formatPrice(met.costAED)}</span>
                    <span className="text-[10px] text-[#747775] ml-1.5">({met.weeks} нед.)</span>
                  </div>

                  <span className="text-[10px] text-[#7FA9BC] font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Применить
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal: Save Current Configuration */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E2DFD7] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#F1EDE6] pb-4">
              <h3 className="font-serif font-bold text-xl text-[#222321] flex items-center gap-2">
                <Save className="w-5 h-5 text-[#7FA9BC]" />
                <span>Сохранить текущую версию</span>
              </h3>
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F7F6F3] text-[#747775] flex items-center justify-center hover:bg-[#EFEDE8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#747775]">
              Текущий набор из <strong className="text-[#222321]">{activeModuleIds.length} модулей</strong> будет сохранен в выбранный слот для быстрого переключения.
            </p>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#747775] uppercase">
                Название версии:
              </label>
              <input
                type="text"
                placeholder="например: Вариант Елены (без BNPL)"
                value={customVersionName}
                onChange={(e) => setCustomVersionName(e.target.value)}
                className="w-full p-3 bg-[#F7F6F3] border border-[#E2DFD7] rounded-xl text-xs focus:outline-none focus:border-[#222321]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#747775] uppercase">
                Выберите слот для перезаписи:
              </label>
              <div className="space-y-2">
                {versions.map((ver, idx) => (
                  <button
                    key={ver.id}
                    onClick={() => handleSaveCurrentToSlot(idx)}
                    className="w-full p-3 text-left rounded-xl border border-[#E2DFD7] hover:border-[#222321] hover:bg-[#F7F6F3] transition-all flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-[#7FA9BC] block">Слот 0{idx + 1}</span>
                      <span className="font-medium text-[#222321]">{ver.name}</span>
                    </div>
                    <span className="text-[10px] bg-[#EFEDE8] text-[#747775] px-2 py-0.5 rounded-full">
                      Перезаписать
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal: Full Side-by-Side Comparison Matrix */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full border border-[#E2DFD7] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#222321] text-white p-5 sm:p-7 flex items-center justify-between border-b border-white/10 shrink-0">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#7FA9BC]">
                  Modern Medicine Dubai • Suite 2105
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                  Сравнительный анализ 3 версий ТЗ
                </h3>
                <p className="text-xs text-[#F7F6F3]/70 font-light mt-1">
                  Наглядное сопоставление бюджета, сроков внедрения и стратегических эффектов для Елены Киреевой
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportComparisonWhatsApp}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#7FA9BC]" />
                  <span>В WhatsApp</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Comparison Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 custom-scrollbar">
              
              {/* Strategic KPI Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {versions.map((ver, idx) => {
                  const met = calculateVersionMetrics(ver.moduleIds);
                  const isCurrent =
                    activeModuleIds.length === ver.moduleIds.length &&
                    ver.moduleIds.every((id) => activeModuleIds.includes(id));

                  return (
                    <div
                      key={ver.id}
                      className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                        isCurrent
                          ? 'bg-[#F7F6F3] border-[#222321] shadow-xs ring-1 ring-[#222321]'
                          : 'bg-white border-[#E2DFD7]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-mono text-[#747775]">ВАРИАНТ 0{idx + 1}</span>
                          <span className="bg-[#EFEDE8] text-[#222321] px-2 py-0.5 rounded-full font-medium">
                            {ver.tag}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-lg text-[#222321]">
                          {ver.name}
                        </h4>

                        <p className="text-xs text-[#747775] leading-relaxed">
                          {ver.description}
                        </p>
                      </div>

                      {/* Numbers Matrix */}
                      <div className="space-y-2 pt-3 border-t border-[#E2DFD7] text-xs">
                        <div className="flex justify-between py-1 border-b border-[#F1EDE6]">
                          <span className="text-[#747775]">Бюджет проекта:</span>
                          <span className="font-bold text-[#222321]">{formatPrice(met.costAED)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#F1EDE6]">
                          <span className="text-[#747775]">Срок реализации:</span>
                          <span className="font-bold text-[#222321]">{met.weeks} нед.</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#F1EDE6]">
                          <span className="text-[#747775]">Аванс 30%:</span>
                          <span className="font-medium text-[#222321]">{formatPrice(met.advance30AED)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-[#747775]">Окупаемость (дней):</span>
                          <span className="font-bold text-emerald-700">~{met.paybackDays} дней</span>
                        </div>
                      </div>

                      {/* Select CTA */}
                      <button
                        onClick={() => handleApplyVersion(ver)}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#222321] text-white shadow-xs'
                            : 'bg-[#EFEDE8] hover:bg-[#222321] text-[#222321] hover:text-white'
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#7FA9BC]" />
                            <span>Уже активен</span>
                          </>
                        ) : (
                          <>
                            <span>Применить эту версию</span>
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>

                    </div>
                  );
                })}
              </div>

              {/* Module-by-Module Feature Checklist Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-lg text-[#222321]">
                    Матрица включения модулей
                  </h4>
                  <span className="text-xs text-[#747775]">Все 13 модулей ТЗ</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#E2DFD7]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F7F6F3] text-[#747775] border-b border-[#E2DFD7]">
                      <tr>
                        <th className="py-3.5 px-4 font-semibold">Модуль цифровой платформы</th>
                        <th className="py-3.5 px-3 font-semibold text-center">Срок</th>
                        {versions.map((ver) => (
                          <th key={ver.id} className="py-3.5 px-4 font-semibold text-center">
                            {ver.name}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#F1EDE6]">
                      {modules.map((mod) => (
                        <tr key={mod.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-medium text-[#222321]">{mod.title}</div>
                            <div className="text-[10px] text-[#747775]">{mod.categoryLabel}</div>
                          </td>

                          <td className="py-3 px-3 text-center text-[#747775] font-mono">
                            {mod.timeWeeks} нед.
                          </td>

                          {versions.map((ver) => {
                            const isIncluded = ver.moduleIds.includes(mod.id);
                            return (
                              <td key={ver.id} className="py-3 px-4 text-center">
                                {isIncluded ? (
                                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                                    <Check className="w-3.5 h-3.5" />
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-6 h-6 text-[#A8AAA5]">
                                    <Minus className="w-3.5 h-3.5" />
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Guidance for Elena Kireeva */}
              <div className="p-5 rounded-2xl bg-[#EFEDE8] border border-[#E2DFD7] flex items-start gap-4 text-xs text-[#747775] leading-relaxed">
                <Sparkles className="w-5 h-5 text-[#222321] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#222321]">Рекомендация архитектора: </strong>
                  Для максимальной скорости вывода клиники на рынок рекомендуется утвердить **Вариант 2 (Оптимально: Дубай)**. Он позволяет запустить MVP за первые 3.5 недели, а Личный кабинет (EHR) подключить вторым спринтом без простоя сайта и без задержек в обслуживании гостей Fairmont Dubai.
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-[#F7F6F3] border-t border-[#E2DFD7] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-[#747775]">
                При переключении версии все калькуляторы (ROI, DHA риски, схема 21 этажа) пересчитаются автоматически.
              </span>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#222321] text-white text-xs font-medium hover:bg-black transition-colors"
              >
                Закрыть окно
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
