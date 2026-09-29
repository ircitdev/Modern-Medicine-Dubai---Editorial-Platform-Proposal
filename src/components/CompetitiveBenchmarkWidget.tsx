import React, { useState, useMemo } from 'react';
import { ConfigModule } from '../types';
import { 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Award, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  BarChart2, 
  Radar as RadarIcon, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Flame,
  Zap
} from 'lucide-react';

interface CompetitiveBenchmarkWidgetProps {
  modules: ConfigModule[];
  onToggleModule?: (id: string) => void;
}

export const CompetitiveBenchmarkWidget: React.FC<CompetitiveBenchmarkWidgetProps> = ({
  modules,
  onToggleModule,
}) => {
  const [chartType, setChartType] = useState<'radar' | 'bar'>('radar');
  const [selectedCompetitorFilter, setSelectedCompetitorFilter] = useState<'all' | 'ora-care' | 'american-hospital' | 'kings-college'>('all');

  // Check active module states in Modern Medicine
  const hasAiTriage = modules.some((m) => m.id === 'feat-aitriage' && m.isSelected);
  const hasPortal = modules.some((m) => m.id === 'feat-portal' && m.isSelected);
  const hasBiomarkers = modules.some((m) => m.id === 'feat-biomarkers' && m.isSelected);
  const hasHotelConcierge = modules.some((m) => m.id === 'feat-hotel-concierge' && m.isSelected);
  const hasI18n = modules.some((m) => m.id === 'feat-i18n' && m.isSelected);
  const hasPayments = modules.some((m) => m.id === 'feat-payments' && m.isSelected);
  const hasTabby = modules.some((m) => m.id === 'feat-tabby' && m.isSelected);
  const hasDha = modules.some((m) => m.id === 'feat-dha-compliance' && m.isSelected);
  const hasOrm = modules.some((m) => m.id === 'feat-orm-feedback' && m.isSelected);

  // Scores for Modern Medicine dynamically calculated based on current selected modules
  const modernMedicineScores = useMemo(() => {
    return {
      aiTriage: hasAiTriage ? 95 : 12,
      ehrPortal: (hasPortal && hasBiomarkers) ? 96 : hasPortal ? 65 : 15,
      hotelConcierge: hasHotelConcierge ? 98 : 25,
      multilingualRtl: hasI18n ? 95 : 40,
      fintechBnpl: (hasPayments && hasTabby) ? 96 : hasPayments ? 65 : 15,
      mobileSpeed: 94, // Clean React SPA without heavy legacy CMS bloat
      dhaCompliance: hasDha ? 98 : 55,
      ormRatingCare: hasOrm ? 95 : 40,
    };
  }, [hasAiTriage, hasPortal, hasBiomarkers, hasHotelConcierge, hasI18n, hasPayments, hasTabby, hasDha, hasOrm]);

  // Overall Advantage Score (0-100)
  const modernMedicineAvg = useMemo(() => {
    const values = Object.values(modernMedicineScores);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  }, [modernMedicineScores]);

  // Market benchmarks
  const benchmarkData = useMemo(() => [
    {
      capability: 'ИИ-триаж симптомов',
      shortKey: 'AI Триаж',
      modernMedicine: modernMedicineScores.aiTriage,
      oraCare: 15, // Only static WhatsApp link
      americanHospital: 40, // Legacy phone triage
      kingsCollege: 25, // Basic form
      fullMark: 100,
      moduleId: 'feat-aitriage',
      active: hasAiTriage,
      statusLabel: hasAiTriage ? 'Gemini 2.5 Flash + Guardrails' : 'Отключено (базовый чат)',
    },
    {
      capability: 'EHR Портал & Биомаркеры',
      shortKey: 'EHR Портал',
      modernMedicine: modernMedicineScores.ehrPortal,
      oraCare: 20, // Send PDF via email
      americanHospital: 85, // Epic MyChart (slow on mobile)
      kingsCollege: 60, // Basic portal
      fullMark: 100,
      moduleId: 'feat-portal',
      active: hasPortal,
      statusLabel: hasPortal ? 'SMART on FHIR + Графики' : 'Отключено (выдача на руки)',
    },
    {
      capability: 'Отельный консьерж 24/7',
      shortKey: 'Консьерж B2B',
      modernMedicine: modernMedicineScores.hotelConcierge,
      oraCare: 30, // Regular room calls without hotel B2B API
      americanHospital: 25, // No hotel integration
      kingsCollege: 20, // Remote booking
      fullMark: 100,
      moduleId: 'feat-hotel-concierge',
      active: hasHotelConcierge,
      statusLabel: hasHotelConcierge ? 'Шлюз Fairmont + Выезд 15м' : 'Отключено (только клиника)',
    },
    {
      capability: '3 Языка & RTL (RU/EN/AR)',
      shortKey: '3 Языка + RTL',
      modernMedicine: modernMedicineScores.multilingualRtl,
      oraCare: 45, // English only, no Russian support
      americanHospital: 70, // EN/AR, minimal Russian doctors
      kingsCollege: 65, // EN/AR only
      fullMark: 100,
      moduleId: 'feat-i18n',
      active: hasI18n,
      statusLabel: hasI18n ? 'Полная адаптация RU/EN/AR' : 'Только один язык',
    },
    {
      capability: 'Рассрочка Tabby & Stripe',
      shortKey: 'Финтех & BNPL',
      modernMedicine: modernMedicineScores.fintechBnpl,
      oraCare: 35, // Traditional POS terminals
      americanHospital: 65, // Bank card installments
      kingsCollege: 50, // Standard cards
      fullMark: 100,
      moduleId: 'feat-tabby',
      active: hasTabby,
      statusLabel: (hasPayments && hasTabby) ? 'Tabby 4 платежа + Apple Pay' : 'Обычный эквайринг',
    },
    {
      capability: 'DHA / NABIDH Безопасность',
      shortKey: 'DHA / NABIDH',
      modernMedicine: modernMedicineScores.dhaCompliance,
      oraCare: 75,
      americanHospital: 90,
      kingsCollege: 85,
      fullMark: 100,
      moduleId: 'feat-dha-compliance',
      active: hasDha,
      statusLabel: hasDha ? 'Шифрование AES-256 + NABIDH' : 'Базовые согласия',
    },
    {
      capability: 'QR-сбор отзывов ORM 5.0★',
      shortKey: 'ORM Репутация',
      modernMedicine: modernMedicineScores.ormRatingCare,
      oraCare: 80, // High reviews count
      americanHospital: 45, // Many negative wait-time reviews (3.4★)
      kingsCollege: 60,
      fullMark: 100,
      moduleId: 'feat-orm-feedback',
      active: hasOrm,
      statusLabel: hasOrm ? 'QR-перехват негатива в 2105' : 'Обычные отзывы',
    },
  ], [modernMedicineScores, hasAiTriage, hasPortal, hasHotelConcierge, hasI18n, hasTabby, hasPayments, hasDha, hasOrm]);

  // Industry average
  const industryAvg = 52;
  const superiorityDelta = modernMedicineAvg - industryAvg;

  return (
    <div className="bg-white p-6 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F1EDE6] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEDE8] text-[#7FA9BC] text-[10px] font-bold uppercase tracking-widest mb-2">
            <Zap className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Конкурентный бенчмаркинг в реальном времени</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
            Сравнение с конкурентами Дубая (SZR & WTC)
          </h3>

          <p className="text-xs sm:text-sm text-[#747775] mt-1 max-w-2xl leading-relaxed">
            Визуализация технологического и сервисного преимущества <strong>Modern Medicine (Suite 2105)</strong> над ключевыми медицинскими игроками (Ora Care, American Hospital, King's College) в зависимости от выбранных в конфигураторе модулей.
          </p>
        </div>

        {/* Chart View Switcher */}
        <div className="flex items-center gap-2 bg-[#F7F6F3] p-1.5 rounded-2xl border border-[#E2DFD7] shrink-0">
          <button
            onClick={() => setChartType('radar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              chartType === 'radar'
                ? 'bg-[#222321] text-white shadow-xs'
                : 'text-[#747775] hover:text-[#222321]'
            }`}
          >
            <RadarIcon className="w-3.5 h-3.5" />
            <span>Радар превосходства</span>
          </button>

          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              chartType === 'bar'
                ? 'bg-[#222321] text-white shadow-xs'
                : 'text-[#747775] hover:text-[#222321]'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Столбчатый анализ</span>
          </button>
        </div>
      </div>

      {/* Top Leadership Index Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E2DFD7] space-y-1">
          <span className="text-[10px] font-mono text-[#7FA9BC] uppercase font-bold tracking-wider">
            Индекс технологичности Modern Medicine
          </span>
          <div className="text-3xl font-serif font-bold text-[#222321] flex items-baseline gap-2">
            <span>{modernMedicineAvg} / 100</span>
            <span className={`text-xs font-mono font-normal ${superiorityDelta >= 0 ? 'text-emerald-700' : 'text-red-500'}`}>
              ({superiorityDelta >= 0 ? `+${superiorityDelta}%` : `${superiorityDelta}%`} к рынку)
            </span>
          </div>
          <p className="text-[11px] text-[#747775]">
            Динамически пересчитывается при переключении модулей ТЗ.
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E2DFD7] space-y-1">
          <span className="text-[10px] font-mono text-[#747775] uppercase font-bold tracking-wider">
            Ключевой соперник в локации: Ora Care
          </span>
          <div className="text-3xl font-serif font-bold text-[#747775] flex items-baseline gap-2">
            <span>42 / 100</span>
            <span className="text-xs font-mono text-emerald-700 font-normal">
              Опережение на +{modernMedicineAvg - 42} п.п.
            </span>
          </div>
          <p className="text-[11px] text-[#747775]">
            У Ora Care нет ИИ-триажа, EHR-портала и B2B отельного шлюза.
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E2DFD7] space-y-1">
          <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold tracking-wider">
            Уникальное УТП в Fairmont
          </span>
          <div className="text-3xl font-serif font-bold text-emerald-700">
            {hasHotelConcierge ? '100% защита' : 'Требует активации'}
          </div>
          <p className="text-[11px] text-[#747775]">
            {hasHotelConcierge 
              ? 'Эксклюзивный доступ к постояльцам отеля и делегатам WTC.' 
              : 'Включите модуль B2B-консьержа для монополии на 21 этаже.'}
          </p>
        </div>

      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9F5] p-6 sm:p-8 rounded-3xl border border-[#E2DFD7]">
        
        {/* Left: Recharts Visualization (7 cols) */}
        <div className="lg:col-span-7 h-[360px] sm:h-[400px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'radar' ? (
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={benchmarkData}>
                <PolarGrid stroke="#E2DFD7" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="shortKey" 
                  tick={{ fill: '#222321', fontSize: 11, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#B49E87" tick={{ fontSize: 9 }} />
                
                {/* Modern Medicine (High Contrast Premium) */}
                <Radar
                  name="Modern Medicine (Suite 2105)"
                  dataKey="modernMedicine"
                  stroke="#222321"
                  fill="#7FA9BC"
                  fillOpacity={0.5}
                  strokeWidth={2.5}
                />

                {/* Ora Care Wellness */}
                {(selectedCompetitorFilter === 'all' || selectedCompetitorFilter === 'ora-care') && (
                  <Radar
                    name="Ora Care Wellness (5.0★ SZR)"
                    dataKey="oraCare"
                    stroke="#B49E87"
                    fill="#B49E87"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                )}

                {/* American Hospital Dubai */}
                {(selectedCompetitorFilter === 'all' || selectedCompetitorFilter === 'american-hospital') && (
                  <Radar
                    name="American Hospital Dubai"
                    dataKey="americanHospital"
                    stroke="#DC2626"
                    fill="#DC2626"
                    fillOpacity={0.15}
                    strokeWidth={1.5}
                    strokeDasharray="2 2"
                  />
                )}

                <Tooltip 
                  formatter={(value: any, name: any) => [`${value} баллов из 100`, name]}
                  contentStyle={{ backgroundColor: '#222321', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                />
              </RadarChart>
            ) : (
              <BarChart data={benchmarkData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2DFD7" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#747775' }} />
                <YAxis dataKey="shortKey" type="category" tick={{ fontSize: 11, fill: '#222321', fontWeight: 600 }} />
                <Tooltip 
                  formatter={(value: any, name: any) => [`${value} / 100`, name]}
                  contentStyle={{ backgroundColor: '#222321', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="modernMedicine" name="Modern Medicine" fill="#222321" radius={[0, 6, 6, 0]} />
                <Bar dataKey="oraCare" name="Ora Care" fill="#B49E87" radius={[0, 6, 6, 0]} />
                <Bar dataKey="americanHospital" name="American Hospital" fill="#DC2626" radius={[0, 6, 6, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Right: Competitor Filter & Live Status Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#747775] uppercase font-bold tracking-wider block">
              Фильтр сравнения с конкурентами:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedCompetitorFilter('all')}
                className={`py-2 px-3 rounded-xl border text-left font-medium transition-all ${
                  selectedCompetitorFilter === 'all'
                    ? 'bg-[#222321] text-white border-[#222321]'
                    : 'bg-white text-[#747775] border-[#E2DFD7] hover:text-[#222321]'
                }`}
              >
                Все конкуренты
              </button>

              <button
                onClick={() => setSelectedCompetitorFilter('ora-care')}
                className={`py-2 px-3 rounded-xl border text-left font-medium transition-all ${
                  selectedCompetitorFilter === 'ora-care'
                    ? 'bg-[#B49E87] text-white border-[#B49E87]'
                    : 'bg-white text-[#747775] border-[#E2DFD7] hover:text-[#222321]'
                }`}
              >
                vs Ora Care 5.0★
              </button>

              <button
                onClick={() => setSelectedCompetitorFilter('american-hospital')}
                className={`py-2 px-3 rounded-xl border text-left font-medium transition-all ${
                  selectedCompetitorFilter === 'american-hospital'
                    ? 'bg-red-700 text-white border-red-700'
                    : 'bg-white text-[#747775] border-[#E2DFD7] hover:text-[#222321]'
                }`}
              >
                vs American Hospital
              </button>

              <button
                onClick={() => setSelectedCompetitorFilter('kings-college')}
                className={`py-2 px-3 rounded-xl border text-left font-medium transition-all ${
                  selectedCompetitorFilter === 'kings-college'
                    ? 'bg-[#7FA9BC] text-white border-[#7FA9BC]'
                    : 'bg-white text-[#747775] border-[#E2DFD7] hover:text-[#222321]'
                }`}
              >
                vs King's College
              </button>
            </div>
          </div>

          {/* Dynamic Insight Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2DFD7] space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#222321] font-bold">
              <Sparkles className="w-4 h-4 text-[#7FA9BC]" />
              <span>Почему ваша текущая конфигурация выигрывает:</span>
            </div>
            
            <ul className="space-y-1.5 text-[#747775]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] mt-1.5 shrink-0" />
                <span>
                  {hasAiTriage 
                    ? 'ИИ-триаж на Gemini 2.5 Flash снимает барьер первого обращения и маршрутизирует пациента круглосуточно.' 
                    : 'Без ИИ-триажа клиника теряет до 25% пациентов в нерабочие часы.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] mt-1.5 shrink-0" />
                <span>
                  {hasPortal 
                    ? 'EHR Личный кабинет стимулирует повторные визиты за счет динамики биомаркеров (LTV выше в 1.8 раза).' 
                    : 'Без Личного кабинета пациенты уходят в крупные сети с MyChart.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] mt-1.5 shrink-0" />
                <span>
                  {hasHotelConcierge 
                    ? 'Прямой B2B-консьерж с отелем Fairmont дает внеконкурентный трафик состоятельных туристов.' 
                    : 'Локация на 21 этаже остается не монетизированной на 100%.'}
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Granular Capability Matrix Table */}
      <div className="space-y-3">
        <h4 className="font-serif font-bold text-lg text-[#222321]">
          Матрица технологического паритета и отрыва
        </h4>

        <div className="overflow-x-auto border border-[#E2DFD7] rounded-2xl bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFEDE8] text-[#222321] font-serif border-b border-[#E2DFD7]">
              <tr>
                <th className="p-3.5 font-bold">Сервисная функция</th>
                <th className="p-3.5 font-bold bg-[#222321]/5">Modern Medicine (Текущее ТЗ)</th>
                <th className="p-3.5 font-bold">Ora Care Wellness (SZR)</th>
                <th className="p-3.5 font-bold">American Hospital Dubai</th>
                <th className="p-3.5 font-bold">Действие в конфигураторе</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EDE6]">
              {benchmarkData.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="p-3.5 font-bold text-[#222321]">
                    {item.capability}
                  </td>

                  {/* Modern Medicine Status */}
                  <td className="p-3.5 font-medium bg-[#222321]/5">
                    <div className="flex items-center gap-1.5">
                      {item.active ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                      <span className={item.active ? 'text-[#222321] font-bold' : 'text-[#747775]'}>
                        {item.statusLabel}
                      </span>
                    </div>
                  </td>

                  {/* Ora Care */}
                  <td className="p-3.5 text-[#747775]">
                    <div className="flex items-center gap-1.5">
                      {item.oraCare > 60 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-[#A8AAA5]" />
                      )}
                      <span>{item.oraCare > 60 ? 'Частично' : 'Отсутствует'}</span>
                    </div>
                  </td>

                  {/* American Hospital */}
                  <td className="p-3.5 text-[#747775]">
                    <div className="flex items-center gap-1.5">
                      {item.americanHospital > 60 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-[#A8AAA5]" />
                      )}
                      <span>{item.americanHospital > 60 ? 'Внедрено (Enterprise)' : 'Слабо развито'}</span>
                    </div>
                  </td>

                  {/* Quick Toggle Action */}
                  <td className="p-3.5">
                    {onToggleModule && item.moduleId && (
                      <button
                        onClick={() => onToggleModule(item.moduleId)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          item.active
                            ? 'bg-[#EFEDE8] text-[#222321] hover:bg-red-50 hover:text-red-700'
                            : 'bg-[#222321] text-white hover:bg-black'
                        }`}
                      >
                        {item.active ? 'Отключить' : '+ Включить модуль'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
