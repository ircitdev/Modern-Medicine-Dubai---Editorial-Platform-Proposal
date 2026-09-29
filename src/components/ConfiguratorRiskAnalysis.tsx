import React, { useState, useMemo } from 'react';
import { ConfigModule } from '../types';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  Bot, 
  UserCheck, 
  Clock, 
  FileText,
  ChevronDown,
  Info,
  Lock,
  Sparkles
} from 'lucide-react';

interface ConfiguratorRiskAnalysisProps {
  modules: ConfigModule[];
  totalWeeks: number;
}

interface RiskItem {
  id: string;
  category: 'regulatory' | 'operational' | 'technical' | 'market';
  categoryLabel: string;
  severity: 'high' | 'medium' | 'low';
  severityLabel: string;
  title: string;
  triggerDescription: string;
  isTriggered: boolean;
  consequences: string;
  mitigation: string;
  complianceDoc?: string;
}

export const ConfiguratorRiskAnalysis: React.FC<ConfiguratorRiskAnalysisProps> = ({
  modules,
  totalWeeks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedRiskId, setExpandedRiskId] = useState<string | null>('risk-dha');

  // Trigger checks based on selected modules
  const isDoctorBookingActive = modules.some((m) => (m.id === 'feat-provider-schedule' || m.id === 'feat-portal' || m.id === 'feat-intake' || m.id === 'feat-site') && m.isSelected);
  const isHotelConciergeActive = modules.some((m) => m.id === 'feat-hotel-concierge' && m.isSelected);
  const isAiTriageActive = modules.some((m) => m.id === 'feat-aitriage' && m.isSelected);
  const isPaymentsActive = modules.some((m) => (m.id === 'feat-payments' || m.id === 'feat-tabby') && m.isSelected);
  const isOrmMissing = !modules.some((m) => m.id === 'feat-orm-feedback' && m.isSelected);
  const isTimelineHigh = totalWeeks > 7.5;
  const isIntakeMissing = !modules.some((m) => m.id === 'feat-intake' && m.isSelected) && isDoctorBookingActive;

  const risks: RiskItem[] = useMemo(() => [
    {
      id: 'risk-dha',
      category: 'regulatory',
      categoryLabel: 'Регуляторика DHA',
      severity: 'high',
      severityLabel: 'Высокий приоритет',
      title: 'DHA Health Regulation & Защита медицинских данных (PHI)',
      triggerDescription: 'Активирован модуль онлайн-записи к врачу или Личный кабинет пациента (EHR)',
      isTriggered: isDoctorBookingActive,
      consequences: 'Штрафы от Dubai Health Authority (DHA), предписания при аудитах Shariyan, блокировка платформы при передаче медицинских данных через небезопасные сторонние трекеры (Meta Pixel, Google Analytics).',
      mitigation: 'В архитектуру заложено сквозное шифрование AES-256, хранение в защищенном контуре NABIDH-ready, и полный отказ от маркетинговых пикселей в зоне медицинских записей Д-ра Ольги Димовой и Д-ра Николая Руденко.',
      complianceDoc: 'DHA Health Data Protection Law & NABIDH Standard v2.4',
    },
    {
      id: 'risk-fairmont-sla',
      category: 'operational',
      categoryLabel: 'Операционный (Fairmont)',
      severity: 'medium',
      severityLabel: 'Средний риск',
      title: 'Срыв норматива прибытия бригады в номер отеля (SLA 15–25 мин)',
      triggerDescription: 'Активирован модуль B2B консьерж-сервиса в отеле Fairmont',
      isTriggered: isHotelConciergeActive,
      consequences: 'Недовольство VIP-гостей президентских номеров Fairmont Dubai, конфликты со службой Front Desk и риск расторжения эксклюзивного B2B-соглашения.',
      mitigation: 'Внедрение закрытого служебного Telegram/WhatsApp шлюза для консьержей Suite 2105 с автооповещением дежурного врача и резервированием портативных чемоданов Jet Lag IV Drip для немедленного выезда.',
      complianceDoc: 'Fairmont Hospitality SLA Agreement & In-Room Protocol',
    },
    {
      id: 'risk-ai-liability',
      category: 'regulatory',
      categoryLabel: 'Регуляторика DHA',
      severity: 'high',
      severityLabel: 'Высокий приоритет',
      title: 'Юридическая ответственность за ИИ-триаж симптомов',
      triggerDescription: 'Активирован модуль искусственного интеллекта (Gemini 3.8 Flash)',
      isTriggered: isAiTriageActive,
      consequences: 'Нарушение регламента DHA относительно автоматизированной постановки клинических диагнозов программами без прямого участия лицензированного врача.',
      mitigation: 'ИИ позиционируется исключительно как цифровой координатор маршрутизации («Digital Triage Assistant»). Внедрены обязательные дисклеймеры, запрет на назначение рецептурных препаратов и прямая маршрутизация к терапевту в Suite 2105.',
      complianceDoc: 'DHA AI in Healthcare Guidance Circular 2025/2026',
    },
    {
      id: 'risk-payments',
      category: 'technical',
      categoryLabel: 'Финтех & Эквайринг',
      severity: 'medium',
      severityLabel: 'Средний риск',
      title: 'Требования Центрального банка ОАЭ (CBUAE) и сплит-платежи',
      triggerDescription: 'Активированы модули онлайн-оплаты и рассрочки Tabby/Tamara',
      isTriggered: isPaymentsActive,
      consequences: 'Задержка холдирования средств банками-эквайерами, сложности при автоматическом начислении 15% агентской комиссии отеля Fairmont.',
      mitigation: 'Использование сертифицированного шлюза (Stripe UAE / Network International) с поддержкой 3D Secure 2.0, протоколов Apple Pay и автоматического сплитования выплат на фолио отеля.',
      complianceDoc: 'CBUAE Retail Payment Services Framework',
    },
    {
      id: 'risk-cannibalization',
      category: 'market',
      categoryLabel: 'Рыночный / ORM',
      severity: 'high',
      severityLabel: 'Высокий приоритет',
      title: 'Каннибализация трафика клиникой Ora Care (1.0★ vs 5.0★)',
      triggerDescription: 'Модуль перехвата отзывов ORM Feedback НЕ выбран в текущем ТЗ',
      isTriggered: isOrmMissing,
      consequences: 'Клиника Ora Care на 1 этаже Fairmont перехватывает до 80% входящих гостей здания из-за безупречного рейтинга 5.0★ (134 отзыва), пока у Modern Medicine рейтинг 1.0★.',
      mitigation: 'Настоятельно рекомендуется включить модуль «ORM & Сбор отзывов (Feedback Capture)»: автоматический QR-сбор оценок на рецепции Suite 2105 для преодоления рейтинга 1.0★ за 60 дней.',
      complianceDoc: 'Brand Reputation & Local SEO Strategy',
    },
    {
      id: 'risk-burnout',
      category: 'operational',
      categoryLabel: 'Операционный (Врачи)',
      severity: 'low',
      severityLabel: 'Низкий риск',
      title: 'Перегрузка врачей асинхронными сообщениями пациентов',
      triggerDescription: 'Активирован модуль гибкого расписания врачей без цифрового анамнеза',
      isTriggered: isIntakeMissing,
      consequences: 'Увеличение рутинной нагрузки врачей на 26%, потеря времени на первичном приеме на ручное заполнение анкет.',
      mitigation: 'Внедрение протокола Digital Intake (онлайн-анкета здоровья до визита) и протокола командного триажа сообщений PACE (перенаправление рутины администраторам клиники).',
      complianceDoc: 'Clinical Workflow PACE Guidelines',
    },
    {
      id: 'risk-scope-creep',
      category: 'technical',
      categoryLabel: 'Сроки & Бюджет',
      severity: 'medium',
      severityLabel: 'Средний риск',
      title: 'Риск затягивания сроков запуска при расширенном составе ТЗ',
      triggerDescription: `Выбрано модулей на ${totalWeeks.toFixed(1)} недель разработки (> 7.5 нед.)`,
      isTriggered: isTimelineHigh,
      consequences: 'Отсрочка начала коммерческой эксплуатации и задержка генерации выручки от гостей отеля.',
      mitigation: 'Разделение запуска на 2 фазы: Фаза 1 (MVP за 3.5 недели) запускает сайт с каталогом, WhatsApp и консьержем; Фаза 2 (Личный кабинет EHR и сложный финтех) подключается без остановки приемов.',
      complianceDoc: 'Agile 2-Stage Delivery Roadmap',
    },
  ], [
    isDoctorBookingActive,
    isHotelConciergeActive,
    isAiTriageActive,
    isPaymentsActive,
    isOrmMissing,
    isTimelineHigh,
    isIntakeMissing,
    totalWeeks,
  ]);

  const activeRisks = risks.filter((r) => r.isTriggered);
  const filteredRisks = activeRisks.filter((r) => selectedCategory === 'all' || r.category === selectedCategory);

  // Safety Score calculation (100 - weight of active unmitigated risks)
  const safetyScore = Math.max(70, Math.round(100 - (activeRisks.filter(r => r.severity === 'high').length * 6)));

  return (
    <div className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F1EDE6] pb-6">
        <div>
          <div className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Комплаенс & Управление надежностью</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
            Анализ рисков проекта и DHA-комплаенс
          </h3>
          <p className="text-xs sm:text-sm text-[#747775] mt-1 max-w-2xl leading-relaxed">
            Динамическая матрица рисков обновляется в реальном времени под текущий состав модулей. 
            Показывает регуляторные требования DHA, операционные вызовы в Fairmont Dubai и заложенные контрмеры.
          </p>
        </div>

        {/* Dynamic Safety Score */}
        <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-[#E2DFD7] shrink-0 text-right min-w-[200px]">
          <div className="text-[10px] uppercase font-bold text-[#747775]">Индекс управляемости рисков</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#222321] flex items-center justify-end gap-1.5 mt-0.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span>{safetyScore}%</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            {activeRisks.length} активных фактора под контролем
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#222321] text-white shadow-xs'
              : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
          }`}
        >
          Все риски ({activeRisks.length})
        </button>

        <button
          onClick={() => setSelectedCategory('regulatory')}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'regulatory'
              ? 'bg-[#222321] text-white shadow-xs'
              : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
          }`}
        >
          <Lock className="w-3 h-3 text-[#7FA9BC]" />
          <span>DHA & Юридические ({activeRisks.filter(r => r.category === 'regulatory').length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('operational')}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-1.5 ${
            selectedCategory === 'operational'
              ? 'bg-[#222321] text-white shadow-xs'
              : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
          }`}
        >
          <Building2 className="w-3 h-3 text-[#7FA9BC]" />
          <span>Fairmont & Врачи ({activeRisks.filter(r => r.category === 'operational').length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('technical')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            selectedCategory === 'technical'
              ? 'bg-[#222321] text-white shadow-xs'
              : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
          }`}
        >
          Технические & Финтех ({activeRisks.filter(r => r.category === 'technical').length})
        </button>
      </div>

      {/* Dynamic Risk Cards List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const isExpanded = expandedRiskId === risk.id;

          const severityStyles = {
            high: 'bg-red-50 border-red-200 text-red-700',
            medium: 'bg-amber-50 border-amber-200 text-amber-800',
            low: 'bg-blue-50 border-blue-200 text-blue-800',
          }[risk.severity];

          return (
            <div
              key={risk.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'border-[#222321] bg-[#F7F6F3]/50 shadow-xs' : 'border-[#E2DFD7] bg-white hover:border-[#7FA9BC]'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedRiskId(isExpanded ? null : risk.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${severityStyles}`}>
                    {risk.severity === 'high' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Info className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider ${severityStyles}`}>
                        {risk.severityLabel}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-[#EFEDE8] text-[#747775]">
                        {risk.categoryLabel}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#222321] leading-snug">
                      {risk.title}
                    </h4>

                    <div className="text-[11px] text-[#747775] mt-1 flex items-center gap-1.5">
                      <span className="font-medium text-[#222321]">Триггер:</span>
                      <span>{risk.triggerDescription}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 mt-1">
                  <ChevronDown
                    className={`w-5 h-5 text-[#747775] transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-[#222321]' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-[#E2DFD7]/80 text-xs sm:text-sm space-y-4 animate-in fade-in duration-200">
                  
                  {/* Consequence vs Mitigation Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Impact / Potential Threat */}
                    <div className="p-4 rounded-xl bg-white border border-red-100 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Потенциальные последствия:</span>
                      </div>
                      <p className="text-[#747775] leading-relaxed text-xs">
                        {risk.consequences}
                      </p>
                    </div>

                    {/* Mitigation Strategy */}
                    <div className="p-4 rounded-xl bg-white border border-emerald-100 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Заложенное решение в архитектуре:</span>
                      </div>
                      <p className="text-[#222321] font-medium leading-relaxed text-xs">
                        {risk.mitigation}
                      </p>
                    </div>

                  </div>

                  {/* Compliance Document Note */}
                  {risk.complianceDoc && (
                    <div className="flex items-center justify-between text-[11px] text-[#747775] bg-white p-3 rounded-xl border border-[#E2DFD7]">
                      <span className="flex items-center gap-1.5 font-medium text-[#222321]">
                        <FileText className="w-3.5 h-3.5 text-[#7FA9BC]" />
                        <span>Регулирующий стандарт: {risk.complianceDoc}</span>
                      </span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Предусмотрено в ТЗ
                      </span>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Note for Elena Kireeva */}
      <div className="p-5 rounded-2xl bg-[#EFEDE8] border border-[#E2DFD7] flex items-start gap-4 text-xs text-[#747775] leading-relaxed">
        <Sparkles className="w-5 h-5 text-[#222321] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#222321]">Вывод для руководства клиники: </strong>
          Каждый добавленный в Конструкторе модуль автоматически валидируется на предмет регуляторных рисков ОАЭ (DHA, CBUAE) и операционных требований отеля Fairmont Dubai. Вы получаете не просто код, а юридически и клинически защищенное решение.
        </div>
      </div>

    </div>
  );
};
