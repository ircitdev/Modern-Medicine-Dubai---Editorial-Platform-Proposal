import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Check, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { PresetType, ConfigModule } from '../types';

interface ImplementationStatusWidgetProps {
  activePreset: PresetType;
  selectedModules: ConfigModule[];
  totalWeeks: number;
  onNavigateToTimeline?: () => void;
  onNavigateToProto?: () => void;
}

interface MilestoneStep {
  id: number;
  title: string;
  shortDesc: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  duration: string;
  completionPercent: number;
  badge: string;
}

export const ImplementationStatusWidget: React.FC<ImplementationStatusWidgetProps> = ({
  activePreset,
  selectedModules,
  totalWeeks,
  onNavigateToTimeline,
  onNavigateToProto,
}) => {
  // Preset labels
  const presetLabels: Record<PresetType, string> = {
    mvp: 'MVP Старт (Быстрый запуск)',
    standard: 'Сбалансированный (Бизнес-стандарт)',
    vip: 'Full Premium VIP (с Stripe & BNPL)',
    custom: 'Индивидуальная конфигурация',
  };

  const steps: MilestoneStep[] = [
    {
      id: 1,
      title: 'Аудит рынка & DHA-стандарты',
      shortDesc: 'Анализ локации Fairmont Dubai, конкурента Ora Care 5.0★ и EBP-страхования',
      status: 'completed',
      duration: '1 нед.',
      completionPercent: 100,
      badge: 'Выполнено 100%',
    },
    {
      id: 2,
      title: 'Интерактивный прототип & Дизайн',
      shortDesc: 'Разработка кликабельного веб-приложения и цветовой палитры Suite 2105',
      status: 'completed',
      duration: '1.5 нед.',
      completionPercent: 100,
      badge: 'Выполнено 100%',
    },
    {
      id: 3,
      title: 'Согласование ТЗ с Еленой Киреевой',
      shortDesc: 'Фиксация скоупа из ' + selectedModules.length + ' модулей, бюджета и этапов оплаты (30/40/30)',
      status: 'in-progress',
      duration: 'Текущий спринт',
      completionPercent: 75,
      badge: 'В процессе • 75%',
    },
    {
      id: 4,
      title: 'Инженерная разработка (MVP + Консьерж)',
      shortDesc: 'Сайт RU/EN/AR, каталог услуг, WhatsApp 1-click и шлюз отеля Fairmont',
      status: 'upcoming',
      duration: `${Math.min(3.5, totalWeeks).toFixed(1)} нед.`,
      completionPercent: 0,
      badge: 'Старт после ТЗ',
    },
    {
      id: 5,
      title: 'EHR Портал, Финтех & Запуск 1.0',
      shortDesc: 'Личный кабинет пациента, рассрочка Tabby и сдача объекта в Fairmont Suite 2105',
      status: 'upcoming',
      duration: `${Math.max(1, totalWeeks - 3.5).toFixed(1)} нед.`,
      completionPercent: 0,
      badge: 'Финальный релиз',
    },
  ];

  // Overall completion calculation:
  // Step 1: 100%, Step 2: 100%, Step 3: 75%, Step 4: 0%, Step 5: 0% => (100+100+75)/500 = 55%
  const totalCompletionPercent = Math.round(
    steps.reduce((acc, step) => acc + step.completionPercent, 0) / steps.length
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD7] shadow-sm space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1EDE6] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-[#7FA9BC] uppercase tracking-wider">
              Статус реализации проекта • Modern Medicine
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#222321] font-bold mt-1">
            План внедрения: {presetLabels[activePreset]}
          </h3>
          <div className="text-xs text-[#747775] mt-0.5">
            Конфигурация: <span className="font-semibold text-[#222321]">{selectedModules.length} модулей</span> • Расчетный срок до полного релиза: <span className="font-semibold text-[#222321]">{totalWeeks.toFixed(1)} нед.</span>
          </div>
        </div>

        {/* Global Progress Gauge */}
        <div className="flex items-center gap-4 bg-[#F7F6F3] px-5 py-3 rounded-2xl border border-[#E2DFD7] shrink-0">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#747775]">Общий прогресс</div>
            <div className="text-2xl font-serif font-bold text-[#222321] leading-none mt-0.5">
              {totalCompletionPercent}%
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">Этап: Согласование ТЗ</div>
          </div>

          <div className="w-12 h-12 rounded-full border-4 border-[#E2DFD7] border-t-[#222321] border-r-[#222321] flex items-center justify-center font-bold text-xs text-[#222321]">
            3/5
          </div>
        </div>
      </div>

      {/* Main Continuous Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-[#222321] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Дорожная карта реализации платформы</span>
          </span>
          <span className="text-[#747775] text-[11px]">
            2 этапа завершено • 1 в процессе • 2 запланировано
          </span>
        </div>

        {/* Visual Multi-segment Bar */}
        <div className="w-full h-3 bg-[#EFEDE8] rounded-full overflow-hidden flex p-0.5 border border-[#E2DFD7]">
          {steps.map((step) => {
            let segmentColor = 'bg-transparent';
            if (step.status === 'completed') segmentColor = 'bg-[#222321]';
            else if (step.status === 'in-progress') segmentColor = 'bg-[#7FA9BC] animate-pulse';

            return (
              <div
                key={step.id}
                className="flex-1 px-0.5 h-full"
                title={`${step.title} (${step.badge})`}
              >
                <div className={`h-full rounded-full transition-all duration-500 ${segmentColor}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Stepper Milestones Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
        {steps.map((step) => {
          const isDone = step.status === 'completed';
          const isInProgress = step.status === 'in-progress';

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                isInProgress
                  ? 'bg-[#F7F6F3] border-[#222321] shadow-xs'
                  : isDone
                  ? 'bg-white border-[#E2DFD7]'
                  : 'bg-white/60 border-[#E2DFD7] opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : isInProgress
                      ? 'bg-[#222321] text-white'
                      : 'bg-[#EFEDE8] text-[#747775]'
                  }`}>
                    Этап 0{step.id}
                  </span>

                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isInProgress ? (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7FA9BC] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7FA9BC]" />
                    </span>
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-[#A8AAA5]" />
                  )}
                </div>

                <h4 className="font-serif font-bold text-sm text-[#222321] leading-tight">
                  {step.title}
                </h4>

                <p className="text-[11px] text-[#747775] leading-relaxed line-clamp-2">
                  {step.shortDesc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E2DFD7]/60 flex items-center justify-between text-[10px]">
                <span className="text-[#747775]">{step.duration}</span>
                <span className={`font-semibold ${
                  isDone ? 'text-emerald-700' : isInProgress ? 'text-[#222321]' : 'text-[#747775]'
                }`}>
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer Callout */}
      <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-[#222321]">
          <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Текущий статус: </strong>
            ТЗ и интерактивный прототип подготовлены. Ожидается подтверждение состава модулей для старта разработки.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToProto && (
            <button
              onClick={onNavigateToProto}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#EFEDE8] border border-[#E2DFD7] text-[#222321] text-[11px] font-medium transition-colors cursor-pointer"
            >
              Смотреть прототип
            </button>
          )}

          {onNavigateToTimeline && (
            <button
              onClick={onNavigateToTimeline}
              className="px-3.5 py-1.5 rounded-full bg-[#222321] hover:bg-black text-white text-[11px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Подробный таймлайн</span>
              <ArrowRight className="w-3 h-3 text-[#7FA9BC]" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
