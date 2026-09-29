import React, { useState } from 'react';
import { ConfigModule, Currency } from '../types';
import { CURRENCY_RATES } from '../constants';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Flag, 
  ArrowRight, 
  Layers, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  Share2,
  Sliders,
  ChevronRight,
  Milestone,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TimelineViewProps {
  modules: ConfigModule[];
  currentCurrency: Currency;
  onNavigateToConfig: () => void;
  onShowToast: (msg: string) => void;
}

interface PhaseDefinition {
  phaseNumber: number;
  title: string;
  subtitle: string;
  startWeek: number;
  endWeek: number;
  color: string;
  bgLight: string;
  milestoneTitle: string;
  deliverable: string;
  team: string[];
  moduleIds: string[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  modules,
  currentCurrency,
  onNavigateToConfig,
  onShowToast,
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<number | 'all'>('all');
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);

  const selectedModules = modules.filter((m) => m.isSelected);
  const selectedCount = selectedModules.length;

  // Master phases definition
  const rawPhases: PhaseDefinition[] = [
    {
      phaseNumber: 1,
      title: 'Фаза 1: Архитектура, Дизайн-система & Регулирование DHA',
      subtitle: 'Разработка визуальной концепции Fairmont, мультиязычность и контур безопасности',
      startWeek: 1,
      endWeek: 2,
      color: '#222321',
      bgLight: '#EFEDE8',
      milestoneTitle: 'M1: Согласование архитектуры & UI-кита',
      deliverable: 'Готовые дизайн-макеты всех экранов, мультиязычный каркас (RU/EN/AR с RTL), формы согласий DHA.',
      team: ['Lead UI/UX Designer', 'Solution Architect', 'DHA Compliance Consultant'],
      moduleIds: ['feat-i18n', 'feat-currency', 'feat-dha-compliance'],
    },
    {
      phaseNumber: 2,
      title: 'Фаза 2: Публичный портал, Каталог услуг & Консьерж Fairmont',
      subtitle: 'Фронтенд-реализация витрины услуг, блога врачей и шлюза вызова в номер 24/7',
      startWeek: 2,
      endWeek: 3.5,
      color: '#7FA9BC',
      bgLight: '#DCEAF0',
      milestoneTitle: 'M2: Запуск MVP Публичного сайта',
      deliverable: 'Интерактивный каталог услуг с фильтрацией, микро-интерфейсы карточек, связь с WhatsApp регистратуры.',
      team: ['Senior React Engineer', 'Medical Content Editor', 'Frontend QA'],
      moduleIds: ['feat-blog', 'feat-card-details', 'feat-quickbook', 'feat-hotel-concierge'],
    },
    {
      phaseNumber: 3,
      title: 'Фаза 3: Интеллектуальный ИИ-Триаж (Gemini 3.8 Flash)',
      subtitle: 'Обучение и интеграция серверного ассистента симптоматического маршрута пациента',
      startWeek: 3,
      endWeek: 4.5,
      color: '#B49E87',
      bgLight: '#E9DFD5',
      milestoneTitle: 'M3: Бета-тестирование ИИ-ассистента',
      deliverable: 'Рабочий серверный эндпоинт ИИ-триажа с валидацией протоколов лечения врачами клиники.',
      team: ['AI Integration Engineer', 'Lead Medical Advisor', 'Security Auditor'],
      moduleIds: ['feat-aitriage'],
    },
    {
      phaseNumber: 4,
      title: 'Фаза 4: Пациентский сервис (EHR Портал & Биомаркеры)',
      subtitle: 'Защищенный личный кабинет пациента, визуализация анализов и история визитов',
      startWeek: 4,
      endWeek: 6,
      color: '#222321',
      bgLight: '#EFEDE8',
      milestoneTitle: 'M4: Релиз Личного кабинета (EHR)',
      deliverable: 'Авторизация пациентов, интерактивные графики ферритина/витаминов, генерация защищенных PDF-отчетов.',
      team: ['Full-stack Engineer', 'Data Security Specialist', 'Clinical Systems QA'],
      moduleIds: ['feat-portal', 'feat-biomarkers'],
    },
    {
      phaseNumber: 5,
      title: 'Фаза 5: FinTech (Stripe, Apple Pay & Рассрочка ОАЭ)',
      subtitle: 'Подключение платежных шлюзов, прием депозитов на чекапы и финальное тестирование',
      startWeek: 5.5,
      endWeek: 7.5,
      color: '#7FA9BC',
      bgLight: '#DCEAF0',
      milestoneTitle: 'M5: Полномасштабный релиз в Fairmont Dubai',
      deliverable: 'Прием платежей в AED, сплит-оплата Tabby/Tamara, нагрузочное тестирование и передача ключей.',
      team: ['FinTech Integration Specialist', 'DevOps / Cloud Run', 'Lead QA'],
      moduleIds: ['feat-payments', 'feat-tabby'],
    },
  ];

  // Dynamically calculate which phases and modules are active
  const activePhases = rawPhases.filter((phase) => {
    return phase.moduleIds.some((id) => selectedModules.some((sm) => sm.id === id));
  });

  // Calculate maximum duration in weeks dynamically
  const maxEndWeek = activePhases.length > 0 
    ? Math.max(...activePhases.map((p) => p.endWeek))
    : 4;

  const totalWeeksDisplay = Math.ceil(maxEndWeek);
  const weekColumns = Array.from({ length: totalWeeksDisplay }, (_, i) => i + 1);

  const handleExportRoadmapWhatsApp = () => {
    confetti({ particleCount: 65, spread: 60, origin: { y: 0.8 } });
    const text = encodeURIComponent(
      `Здравствуйте, Елена! Направляю согласованный поэтапный план-график (Timeline) реализации Modern Medicine Dubai:\n\n` +
      `⏱ Общая длительность: ~${maxEndWeek.toFixed(1)} недель (${totalWeeksDisplay} спринтов)\n` +
      `📦 Модулей в скоупе: ${selectedCount} из ${modules.length}\n\n` +
      `Ключевые этапы:\n` +
      activePhases.map((p) => `• ${p.title} (Недели ${p.startWeek}–${p.endWeek}): ${p.milestoneTitle}`).join('\n') +
      `\n\nГотовы зафиксировать даты контрольных точек и начать работу.`
    );
    window.open(`https://wa.me/971529266594?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-16">
      
      {/* Editorial Header */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E2DFD7] bg-white text-[#222321] text-xs font-medium tracking-wide shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-[#7FA9BC]" />
          <span>Поэтапный производственный план реализации проекта</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#222321] leading-[0.95] tracking-tight">
          Дорожная карта проекта<br className="hidden sm:inline" /> и спринты по неделям.
        </h1>

        <p className="text-[#747775] text-base sm:text-lg max-w-2xl leading-relaxed">
          Интерактивная диаграмма Ганта и план контрольных точек (Milestones) для Елены Киреевой. 
          План автоматически синхронизируется с выбранными модулями в Конструкторе ТЗ ({selectedCount} модулей в скоупе).
        </p>

        {/* Quick Actions & Sync Status */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onNavigateToConfig}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#222321] hover:bg-[#F7F6F3] text-[#222321] text-xs font-medium transition-all shadow-xs cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Изменить состав модулей ({selectedCount})</span>
          </button>

          <button
            onClick={handleExportRoadmapWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#222321] hover:bg-black text-white rounded-full text-xs font-medium transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Отправить план в WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-3xl p-6 border border-[#E2DFD7] shadow-sm space-y-3">
          <div className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest">
            Общая длительность
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#222321]">
            ~ {maxEndWeek.toFixed(1)} нед.
          </div>
          <div className="text-xs text-[#747775]">
            С учетом параллельных дорожек разработки
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E2DFD7] shadow-sm space-y-3">
          <div className="text-[10px] font-semibold text-[#747775] uppercase tracking-widest">
            Производственные фазы
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#222321]">
            {activePhases.length} спринта
          </div>
          <div className="text-xs text-[#7FA9BC] font-medium">
            Синхронизировано со скоупом ТЗ
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E2DFD7] shadow-sm space-y-3">
          <div className="text-[10px] font-semibold text-[#747775] uppercase tracking-widest">
            Готовность MVP
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#222321]">
            Неделя 3
          </div>
          <div className="text-xs text-[#747775]">
            Запуск публичного каталога и WhatsApp
          </div>
        </div>

        <div className="bg-[#222321] text-white rounded-3xl p-6 border border-[#222321] shadow-md space-y-3">
          <div className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest">
            Финальный релиз в Fairmont
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Неделя {totalWeeksDisplay}
          </div>
          <div className="text-xs text-[#F7F6F3]/70">
            Передача ключей и запуск рекламного трафика
          </div>
        </div>

      </div>

      {/* Main Gantt Chart Roadmap */}
      <section className="bg-white p-6 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F1EDE6] pb-5">
          <div>
            <div className="text-[10px] text-[#7FA9BC] font-semibold uppercase tracking-widest mb-1">
              Интерактивная диаграмма Ганта
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
              Понедельный график разработки модулей
            </h3>
            <p className="text-xs text-[#747775] mt-1">
              Цветовая индикация категорий модулей и привязка к спринтам. Наведите на полосу для подробностей.
            </p>
          </div>

          {/* Phase Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            <button
              onClick={() => setSelectedPhaseFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                selectedPhaseFilter === 'all'
                  ? 'bg-[#222321] text-white shadow-xs'
                  : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
              }`}
            >
              Все фазы ({activePhases.length})
            </button>
            {activePhases.map((phase) => (
              <button
                key={phase.phaseNumber}
                onClick={() => setSelectedPhaseFilter(phase.phaseNumber)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  selectedPhaseFilter === phase.phaseNumber
                    ? 'bg-[#222321] text-white shadow-xs'
                    : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
                }`}
              >
                Фаза {phase.phaseNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Gantt Timeline Grid */}
        <div className="overflow-x-auto custom-scrollbar pt-2 pb-4">
          <div className="min-w-[800px] space-y-6">
            
            {/* Header: Weeks Scale */}
            <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-[#747775] border-b border-[#E2DFD7] pb-3">
              <div className="col-span-4 pl-2">Модуль / Этап разработки</div>
              <div className="col-span-8 grid" style={{ gridTemplateColumns: `repeat(${totalWeeksDisplay}, 1fr)` }}>
                {weekColumns.map((week) => (
                  <div key={week} className="text-center font-mono text-[11px] text-[#222321]">
                    Неделя {week}
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Blocks & Module Rows */}
            {activePhases
              .filter((p) => selectedPhaseFilter === 'all' || selectedPhaseFilter === p.phaseNumber)
              .map((phase) => {
                const phaseSelectedModules = selectedModules.filter((m) => phase.moduleIds.includes(m.id));

                return (
                  <div key={phase.phaseNumber} className="space-y-3 pt-2">
                    
                    {/* Phase Header Banner */}
                    <div className="grid grid-cols-12 gap-2 items-center bg-[#F7F6F3] p-3 rounded-xl border border-[#E2DFD7]">
                      <div className="col-span-4 flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: phase.color }} 
                        />
                        <span className="font-serif font-bold text-[#222321] text-sm truncate">
                          {phase.title}
                        </span>
                      </div>

                      {/* Phase Master Range Bar */}
                      <div className="col-span-8 grid relative items-center" style={{ gridTemplateColumns: `repeat(${totalWeeksDisplay}, 1fr)` }}>
                        <div 
                          className="h-2 rounded-full opacity-40"
                          style={{
                            gridColumnStart: Math.floor(phase.startWeek),
                            gridColumnEnd: Math.ceil(phase.endWeek) + 1,
                            backgroundColor: phase.color,
                          }}
                        />
                        <div className="absolute right-2 text-[10px] text-[#747775] font-mono">
                          {phase.startWeek}–{phase.endWeek} нед.
                        </div>
                      </div>
                    </div>

                    {/* Modules Rows */}
                    <div className="space-y-2 pl-3">
                      {phaseSelectedModules.map((module) => {
                        // Calculate grid start and span
                        const duration = Math.max(0.5, module.timeWeeks);
                        const start = Math.floor(phase.startWeek);
                        const end = Math.min(totalWeeksDisplay + 1, Math.ceil(phase.startWeek + duration));

                        const isHovered = hoveredModuleId === module.id;

                        return (
                          <div 
                            key={module.id} 
                            onMouseEnter={() => setHoveredModuleId(module.id)}
                            onMouseLeave={() => setHoveredModuleId(null)}
                            className={`grid grid-cols-12 gap-2 items-center py-2 px-2 rounded-lg transition-colors ${
                              isHovered ? 'bg-[#DCEAF0]/30' : 'hover:bg-[#F7F6F3]'
                            }`}
                          >
                            <div className="col-span-4 flex items-center justify-between pr-4">
                              <span className="text-xs font-medium text-[#222321] truncate">
                                {module.title}
                              </span>
                              <span className="text-[10px] text-[#7FA9BC] font-mono shrink-0 ml-2">
                                {module.timeWeeks}н
                              </span>
                            </div>

                            {/* Gantt Bar */}
                            <div 
                              className="col-span-8 grid relative h-7 items-center" 
                              style={{ gridTemplateColumns: `repeat(${totalWeeksDisplay}, 1fr)` }}
                            >
                              <div
                                className="h-6 rounded-md flex items-center px-2 text-[10px] font-semibold text-white shadow-xs cursor-pointer transition-all duration-300 hover:brightness-110 truncate"
                                style={{
                                  gridColumnStart: start,
                                  gridColumnEnd: end,
                                  backgroundColor: phase.color,
                                }}
                              >
                                <span className="truncate">{module.title}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })}

          </div>
        </div>

        {/* Deliverables & Milestones Row */}
        <div className="border-t border-[#F1EDE6] pt-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#222321] uppercase tracking-wider">
            <Milestone className="w-4 h-4 text-[#7FA9BC]" />
            <span>Контрольные точки и сдача этапов (Milestones)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePhases.map((phase) => (
              <div 
                key={phase.phaseNumber}
                className="p-5 rounded-2xl border border-[#E2DFD7] bg-[#F7F6F3] space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-[#7FA9BC] uppercase">
                    <span>Спринт {phase.phaseNumber}</span>
                    <span className="font-mono">Неделя {phase.endWeek}</span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#222321] mt-1">
                    {phase.milestoneTitle}
                  </h4>

                  <p className="text-xs text-[#747775] leading-relaxed mt-1">
                    {phase.deliverable}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E2DFD7] flex items-center gap-1.5 flex-wrap">
                  {phase.team.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-white border border-[#E2DFD7] text-[#222321] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Production Guarantee & Readiness Protocol */}
      <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#7FA9BC]" />
          <h3 className="font-serif text-2xl text-[#222321] font-bold">
            Регламент сдачи и запуск в отеле Fairmont Dubai
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#747775] leading-relaxed">
          <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-2">
            <span className="font-bold text-[#222321] flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Еженедельные демо
            </span>
            <p>
              Каждую пятницу демонстрация прогресса Елене Киреевой на рабочем dev-сервере с возможностью оперативного согласования правок.
            </p>
          </div>

          <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-2">
            <span className="font-bold text-[#222321] flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Приемка врачами клиники
            </span>
            <p>
              Д-р Ольга Димова и специалисты клиники лично тестируют формулировки ИИ-триажа и корректность отображения биомаркеров в личном кабинете.
            </p>
          </div>

          <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-2">
            <span className="font-bold text-[#222321] flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3. Гарантийная поддержка
            </span>
            <p>
              30 дней бесплатной гарантийной поддержки после релиза: мониторинг доступности 99.9%, исправление замечаний и помощь администраторам.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
