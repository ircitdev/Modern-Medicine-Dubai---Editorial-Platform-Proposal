import React, { useMemo } from 'react';
import { ConfigModule } from '../types';
import { 
  Users, 
  Code2, 
  Palette, 
  Cpu, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  Sliders
} from 'lucide-react';

interface ResourceAllocationPanelProps {
  modules: ConfigModule[];
  totalWeeks: number;
}

interface SpecialistRole {
  id: string;
  title: string;
  category: 'dev' | 'design' | 'ai' | 'qa' | 'pm';
  fte: number;
  hours: number;
  level: string;
  icon: any;
  color: string;
  badgeBg: string;
  isActive: boolean;
  requiredSkills: string[];
  activeTasks: string[];
  complexityScore: number; // 1 to 5
}

export const ResourceAllocationPanel: React.FC<ResourceAllocationPanelProps> = ({
  modules,
  totalWeeks,
}) => {
  const selectedModules = modules.filter((m) => m.isSelected);
  const selectedCount = selectedModules.length;

  // Specific module checks
  const hasAiTriage = modules.some((m) => m.id === 'feat-aitriage' && m.isSelected);
  const hasI18n = modules.some((m) => m.id === 'feat-i18n' && m.isSelected);
  const hasPortal = modules.some((m) => m.id === 'feat-portal' && m.isSelected);
  const hasBiomarkers = modules.some((m) => m.id === 'feat-biomarkers' && m.isSelected);
  const hasDha = modules.some((m) => m.id === 'feat-dha-compliance' && m.isSelected);
  const hasConcierge = modules.some((m) => m.id === 'feat-hotel-concierge' && m.isSelected);
  const hasOrm = modules.some((m) => m.id === 'feat-orm-feedback' && m.isSelected);
  const hasPayments = modules.some((m) => m.id === 'feat-payments' && m.isSelected);
  const hasTabby = modules.some((m) => m.id === 'feat-tabby' && m.isSelected);

  // Dynamic Calculation of Engineering Hours and Headcount
  const allocation = useMemo(() => {
    // 1. Full-Stack / Backend Lead
    let backendHours = 50 + selectedCount * 14;
    if (hasPortal) backendHours += 35;
    if (hasPayments) backendHours += 25;
    if (hasTabby) backendHours += 20;
    if (hasConcierge) backendHours += 18;

    // 2. Frontend & RTL/UX Designer
    let designHours = 40 + selectedCount * 10;
    if (hasI18n) designHours += 30; // RTL layout & Arabic typography
    if (hasBiomarkers) designHours += 22; // D3/Recharts data charts
    if (hasPortal) designHours += 25; // Patient portal UX

    // 3. AI / ML Engineer (Gemini API)
    let aiHours = 0;
    if (hasAiTriage) {
      aiHours = 45; // Gemini Flash prompt engineering, DHA safety guardrails, triage schema
    }

    // 4. Healthcare QA & DHA Compliance Auditor
    let qaHours = 25 + selectedCount * 6;
    if (hasDha) qaHours += 25; // NABIDH protocols & PHI encryption tests
    if (hasPayments || hasTabby) qaHours += 18; // PCI-DSS payment gateway tests

    // 5. Technical PM / Scrum Master
    let pmHours = 20 + Math.round(totalWeeks * 8);

    const totalHours = backendHours + designHours + aiHours + qaHours + pmHours;

    // FTE calculation (assuming 35 productive engineering hours / week per FTE)
    const weeksNumber = Math.max(2.5, totalWeeks);
    const backendFte = parseFloat((backendHours / (weeksNumber * 35)).toFixed(1));
    const designFte = parseFloat((designHours / (weeksNumber * 35)).toFixed(1));
    const aiFte = hasAiTriage ? parseFloat((aiHours / (weeksNumber * 35)).toFixed(1)) : 0;
    const qaFte = parseFloat((qaHours / (weeksNumber * 35)).toFixed(1));
    const pmFte = parseFloat((pmHours / (weeksNumber * 35)).toFixed(1));

    const totalFte = parseFloat((backendFte + designFte + aiFte + qaFte + pmFte).toFixed(1));
    const totalTeamHeadcount = (backendFte > 0 ? 1 : 0) + 
                               (designFte > 0 ? 1 : 0) + 
                               (hasAiTriage ? 1 : 0) + 
                               (qaFte > 0 ? 1 : 0) + 
                               1; // PM

    // Complexity score (1.0 to 5.0)
    let complexity = 2.0;
    if (hasPortal) complexity += 0.8;
    if (hasAiTriage) complexity += 0.7;
    if (hasTabby || hasPayments) complexity += 0.6;
    if (hasI18n) complexity += 0.4;
    complexity = parseFloat(Math.min(5.0, complexity).toFixed(1));

    return {
      backendHours,
      designHours,
      aiHours,
      qaHours,
      pmHours,
      totalHours,
      backendFte,
      designFte,
      aiFte,
      qaFte,
      pmFte,
      totalFte,
      totalTeamHeadcount,
      complexity,
    };
  }, [selectedCount, totalWeeks, hasAiTriage, hasI18n, hasPortal, hasBiomarkers, hasDha, hasConcierge, hasPayments, hasTabby]);

  const roles: SpecialistRole[] = [
    {
      id: 'backend',
      title: 'Senior Full-Stack & Backend Инженер',
      category: 'dev',
      fte: allocation.backendFte,
      hours: allocation.backendHours,
      level: 'Senior (7+ лет опыта)',
      icon: Code2,
      color: '#222321',
      badgeBg: 'bg-[#222321] text-white',
      isActive: true,
      requiredSkills: ['Node.js / TypeScript', 'HL7 FHIR API', 'Express REST Gateway', 'Шифрование AES-256', 'Stripe & Tabby Webhooks'],
      activeTasks: [
        'Разработка защищенного API Middleware для исключения прямого доступа к EHR',
        hasConcierge ? 'Шлюз B2B консьерж-сервиса с 15% комиссией для Fairmont Dubai' : 'Базовая маршрутизация заказов',
        hasPayments ? 'Интеграция шлюза эквайринга Stripe & Apple Pay' : 'Обработка прямых заявок',
        hasTabby ? 'Интеграция финтех-вебхуков беспроцентной рассрочки Tabby/Tamara' : null,
        hasPortal ? 'Аутентификация SMART on FHIR и хранение сонограмм Mindray' : null,
      ].filter(Boolean) as string[],
      complexityScore: hasPortal || hasTabby ? 5 : 4,
    },
    {
      id: 'design',
      title: 'Frontend & RTL/UX Дизайнер',
      category: 'design',
      fte: allocation.designFte,
      hours: allocation.designHours,
      level: 'Lead UX / Arab Specialist',
      icon: Palette,
      color: '#7FA9BC',
      badgeBg: 'bg-[#7FA9BC] text-white',
      isActive: true,
      requiredSkills: ['React 19 / Vite', 'Tailwind CSS', 'RTL Bi-directional Layout', 'Арабская типографика Noto Sans', 'Recharts / D3'],
      activeTasks: [
        'Нативная трехъязычная верстка RU/EN/AR с поддержкой RTL справа налево',
        hasBiomarkers ? 'Интерактивные визуализации динамики биомаркеров (Ферритин, D3)' : 'Базовая верстка каталога',
        'Оптимизация Core Web Vitals (LCP < 2.2s, INP < 150ms) под сети 5G ОАЭ',
        hasOrm ? 'Интерфейс QR-перехвата отзывов ORM для рецепции Suite 2105' : null,
      ].filter(Boolean) as string[],
      complexityScore: hasI18n && hasBiomarkers ? 4 : 3,
    },
    {
      id: 'ai',
      title: 'AI / Prompt Инженер (Gemini API)',
      category: 'ai',
      fte: allocation.aiFte,
      hours: allocation.aiHours,
      level: hasAiTriage ? 'AI Specialist' : 'Не требуется',
      icon: Cpu,
      color: '#8B5CF6',
      badgeBg: hasAiTriage ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600',
      isActive: hasAiTriage,
      requiredSkills: ['Google GenAI SDK (@google/genai)', 'Gemini 2.5 Flash', 'Prompt Engineering', 'DHA Medical Guardrails', 'JSON Schema Extraction'],
      activeTasks: hasAiTriage ? [
        'Тонкая настройка системных промптов Gemini 2.5 Flash для безопасного триажа',
        'Интеграция дисклеймера DHA для исключения автоматических диагнозов',
        'Маршрутизация пациента к Д-ру Димовой или Д-ру Руденко по тексту жалоб',
      ] : [
        'Модуль ИИ-триажа не выбран в ТЗ (специалист не задействован)',
      ],
      complexityScore: hasAiTriage ? 4 : 1,
    },
    {
      id: 'qa',
      title: 'Healthcare QA & Аудитор DHA/NABIDH',
      category: 'qa',
      fte: allocation.qaFte,
      hours: allocation.qaHours,
      level: 'Senior Healthcare QA',
      icon: ShieldCheck,
      color: '#10B981',
      badgeBg: 'bg-emerald-700 text-white',
      isActive: true,
      requiredSkills: ['DHA Health Data Protection', 'NABIDH Compliance Checklist', 'Пентестинг PHI данных', 'Cross-browser RTL Testing'],
      activeTasks: [
        'Аудит отсутствия сторонних рекламных пикселей (Meta/Google) в зоне медкарт',
        'Проверка отказоустойчивости шифрования данных пациентов (AES-256)',
        hasDha ? 'Тестирование цифровых согласий на передачу данных в контур NABIDH' : 'Базовое тестирование форм',
      ].filter(Boolean) as string[],
      complexityScore: hasDha ? 5 : 3,
    },
    {
      id: 'pm',
      title: 'Technical Project Manager / Scrum Master',
      category: 'pm',
      fte: allocation.pmFte,
      hours: allocation.pmHours,
      level: 'Agile Delivery Lead',
      icon: Briefcase,
      color: '#B49E87',
      badgeBg: 'bg-[#B49E87] text-white',
      isActive: true,
      requiredSkills: ['Agile / 2-week Sprints', 'Fairmont Stakeholder Management', 'Еженедельные демо', 'Jira / GitHub Workflow'],
      activeTasks: [
        'Синхронизация этапов спринтов с руководством клиники (Еленой Киреевой)',
        hasConcierge ? 'Координация регламента интеграции с Front Desk отеля Fairmont' : 'Организация приемочного тестирования',
        'Управление сроками и поэтапным графиком оплаты (30% / 40% / 30%)',
      ].filter(Boolean) as string[],
      complexityScore: 3,
    },
  ];

  return (
    <div className="bg-white p-6 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F1EDE6] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEDE8] text-[#7FA9BC] text-[10px] font-bold uppercase tracking-widest mb-2">
            <Users className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Инженерный состав & Комплектование команды</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
            Распределение ресурсов & Роли разработчиков
          </h3>

          <p className="text-xs sm:text-sm text-[#747775] mt-1 max-w-2xl leading-relaxed">
            Показывает требуемый состав команды специалистов (Full-Stack, UX/RTL, AI, QA, PM) и распределение человеко-часов в зависимости от <strong>{selectedCount} выбранных модулей</strong> и их инженерной сложности.
          </p>
        </div>

        {/* Complexity Index Badge */}
        <div className="flex items-center gap-3 bg-[#F7F6F3] p-3 rounded-2xl border border-[#E2DFD7] shrink-0 text-xs">
          <div className="p-2 rounded-xl bg-[#222321] text-white">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-[#747775] uppercase font-mono">Сложность архитектуры:</div>
            <div className="font-bold text-[#222321] flex items-center gap-1">
              <span>{allocation.complexity} из 5.0</span>
              <span className="text-[10px] text-[#7FA9BC] font-normal">
                ({allocation.complexity > 3.8 ? 'Высокая (Enterprise)' : allocation.complexity > 2.8 ? 'Средняя (Бизнес)' : 'Базовая'})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Resource Summary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E2DFD7] space-y-1">
          <div className="flex items-center justify-between text-[#7FA9BC]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              Состав команды
            </span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#222321]">
            {allocation.totalTeamHeadcount} эксперта
          </div>
          <p className="text-[11px] text-[#747775]">
            Суммарная нагрузка: <strong>{allocation.totalFte} FTE</strong> (Full-Time Equivalent).
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E2DFD7] space-y-1">
          <div className="flex items-center justify-between text-[#222321]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              Трудоемкость
            </span>
            <Clock className="w-4 h-4 text-[#7FA9BC]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#222321]">
            ~{allocation.totalHours} часов
          </div>
          <p className="text-[11px] text-[#747775]">
            Распределены на спринт в <strong>{totalWeeks} нед.</strong> без овертаймов.
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E2DFD7] space-y-1">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              ИИ-Компетенции
            </span>
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#222321]">
            {hasAiTriage ? 'Активны' : 'Не задейств.'}
          </div>
          <p className="text-[11px] text-[#747775]">
            {hasAiTriage ? 'Gemini 2.5 Flash + Guardrails DHA.' : 'Включите ИИ-триаж для подключения роли.'}
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E2DFD7] space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              DHA & Безопасность
            </span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-700">
            100% аудит
          </div>
          <p className="text-[11px] text-[#747775]">
            Специализированный QA-инженер по нормам ОАЭ.
          </p>
        </div>
      </div>

      {/* Workload Distribution Visual Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-[#222321] uppercase text-[11px] tracking-wider">
            Баланс трудозатрат по специализациям (% от общего пула часов):
          </span>
          <span className="text-[#747775] font-mono text-[11px]">
            100% = {allocation.totalHours} ч.
          </span>
        </div>

        {/* Multi-segment progress bar */}
        <div className="w-full h-4 rounded-full bg-[#EFEDE8] overflow-hidden flex shadow-inner">
          <div 
            style={{ width: `${(allocation.backendHours / allocation.totalHours) * 100}%` }} 
            className="bg-[#222321] h-full transition-all duration-500"
            title={`Backend & API: ${Math.round((allocation.backendHours / allocation.totalHours) * 100)}%`}
          />
          <div 
            style={{ width: `${(allocation.designHours / allocation.totalHours) * 100}%` }} 
            className="bg-[#7FA9BC] h-full transition-all duration-500"
            title={`UX/RTL Frontend: ${Math.round((allocation.designHours / allocation.totalHours) * 100)}%`}
          />
          {hasAiTriage && (
            <div 
              style={{ width: `${(allocation.aiHours / allocation.totalHours) * 100}%` }} 
              className="bg-purple-600 h-full transition-all duration-500"
              title={`AI / Gemini: ${Math.round((allocation.aiHours / allocation.totalHours) * 100)}%`}
            />
          )}
          <div 
            style={{ width: `${(allocation.qaHours / allocation.totalHours) * 100}%` }} 
            className="bg-emerald-600 h-full transition-all duration-500"
            title={`QA & DHA Compliance: ${Math.round((allocation.qaHours / allocation.totalHours) * 100)}%`}
          />
          <div 
            style={{ width: `${(allocation.pmHours / allocation.totalHours) * 100}%` }} 
            className="bg-[#B49E87] h-full transition-all duration-500"
            title={`PM / Scrum: ${Math.round((allocation.pmHours / allocation.totalHours) * 100)}%`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1 text-[11px] text-[#747775]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#222321]" />
            Backend & API ({Math.round((allocation.backendHours / allocation.totalHours) * 100)}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7FA9BC]" />
            Frontend & RTL ({Math.round((allocation.designHours / allocation.totalHours) * 100)}%)
          </span>
          {hasAiTriage && (
            <span className="flex items-center gap-1.5 text-purple-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
              ИИ-Инженерия ({Math.round((allocation.aiHours / allocation.totalHours) * 100)}%)
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            QA & DHA ({Math.round((allocation.qaHours / allocation.totalHours) * 100)}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B49E87]" />
            Project Management ({Math.round((allocation.pmHours / allocation.totalHours) * 100)}%)
          </span>
        </div>
      </div>

      {/* Role-by-Role Breakdown Cards */}
      <div className="space-y-4">
        <h4 className="font-serif font-bold text-lg text-[#222321]">
          Детализация ролей и распределение задач
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.id}
                className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                  role.isActive
                    ? 'bg-white border-[#E2DFD7] hover:border-[#7FA9BC] shadow-xs'
                    : 'bg-[#F7F6F3] border-[#E2DFD7] opacity-60'
                }`}
              >
                <div className="space-y-3">
                  {/* Role Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl text-white ${role.badgeBg}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-serif font-bold text-sm sm:text-base text-[#222321]">
                          {role.title}
                        </h5>
                        <span className="text-[10px] text-[#747775] font-mono block">
                          {role.level}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono text-[#222321] block">
                        {role.hours} ч.
                      </span>
                      <span className="text-[10px] text-[#7FA9BC] font-mono">
                        {role.fte > 0 ? `${role.fte} FTE` : '0 FTE'}
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.requiredSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-[#F7F6F3] border border-[#E2DFD7] text-[10px] text-[#747775]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Dynamic Tasks for Current Configuration */}
                  <div className="space-y-1.5 pt-2 border-t border-[#F1EDE6]">
                    <span className="text-[10px] uppercase font-bold text-[#747775] tracking-wider block">
                      Фокусные задачи по текущему ТЗ:
                    </span>
                    <ul className="space-y-1 text-xs text-[#222321]">
                      {role.activeTasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11px] text-[#747775]">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-[#F1EDE6] flex items-center justify-between text-[11px] text-[#747775]">
                  <span>Сложность задач роли:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`w-2 h-2 rounded-full ${
                          star <= role.complexityScore
                            ? 'bg-[#222321]'
                            : 'bg-[#E2DFD7]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Architect Advice Callout */}
      <div className="p-5 rounded-2xl bg-[#EFEDE8] border border-[#E2DFD7] flex items-start gap-4 text-xs text-[#747775] leading-relaxed">
        <Sparkles className="w-5 h-5 text-[#222321] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#222321]">Заключение технического директора: </strong>
          Сформированный состав из <strong>{allocation.totalTeamHeadcount} специалистов</strong> полностью закрывает все архитектурные уровни платформы (от защищенного шлюза HL7 FHIR до арабского RTL-интерфейса). За счет выделения роли QA по нормам ОАЭ и ИИ-инженера клиника застрахована от регуляторных замечаний DHA и задержек при интеграции с единым контуром NABIDH.
        </div>
      </div>

    </div>
  );
};
