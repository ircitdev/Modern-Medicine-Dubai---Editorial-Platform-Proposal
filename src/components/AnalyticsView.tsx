import React, { useState, useMemo } from 'react';
import { ConfigModule, Currency } from '../types';
import { CURRENCY_RATES } from '../constants';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Building2, 
  Calendar, 
  Sliders, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  PieChart as PieIcon, 
  BarChart3, 
  Activity,
  Layers,
  HelpCircle,
  Share2,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface AnalyticsViewProps {
  modules: ConfigModule[];
  currentCurrency: Currency;
  onNavigateToConfig?: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  modules,
  currentCurrency,
  onNavigateToConfig,
}) => {
  // Simulator Controls
  const [fairmontOccupancy, setFairmontOccupancy] = useState<number>(75); // Hotel occupancy %
  const [clinicMargin, setClinicMargin] = useState<number>(60); // Operating margin %
  const [timeHorizon, setTimeHorizon] = useState<'6m' | '12m'>('12m');

  // Check active high-impact modules
  const hasHotelConcierge = modules.some((m) => m.id === 'feat-hotel-concierge' && m.isSelected);
  const hasPortal = modules.some((m) => m.id === 'feat-portal' && m.isSelected);
  const hasAiTriage = modules.some((m) => m.id === 'feat-aitriage' && m.isSelected);
  const hasOrm = modules.some((m) => m.id === 'feat-orm-feedback' && m.isSelected);
  const hasTabby = modules.some((m) => m.id === 'feat-tabby' && m.isSelected);
  const hasPayments = modules.some((m) => m.id === 'feat-payments' && m.isSelected);

  const selectedCount = modules.filter((m) => m.isSelected).length;

  const formatPrice = (amountAED: number) => {
    if (currentCurrency === 'USD') return `$${Math.round(amountAED * CURRENCY_RATES.USD).toLocaleString('en-US')}`;
    if (currentCurrency === 'RUB') return `${Math.round(amountAED * CURRENCY_RATES.RUB).toLocaleString('ru-RU')} ₽`;
    return `${Math.round(amountAED).toLocaleString('en-US')} AED`;
  };

  // Base averages in Dubai Fairmont Trade Centre cluster
  const avgHotelCheck = 925; // Jet lag IV (900 AED) / Hotel Visit (950 AED)
  const avgOutpatientCheck = 750; // GP + Ultrasound (700 AED) / Gynecology (675 AED)
  const avgAestheticCheck = 1350; // ZO Skin Health
  const avgCheckupCheck = 2400; // Executive Checkup 360

  // Multipliers based on active modules
  const hotelMultiplier = (hasHotelConcierge ? 1.45 : 1.0) * (fairmontOccupancy / 75);
  const ormMultiplier = hasOrm ? 1.28 : 1.0; // 5.0 rating recovery
  const ehrRetentionMultiplier = hasPortal ? 1.25 : 1.0;
  const aiTriageMultiplier = hasAiTriage ? 1.15 : 1.0;
  const tabbyMultiplier = hasTabby ? 1.20 : 1.0; // higher check on high-margin courses

  // Monthly Base Figures
  const baseFairmontPatients = Math.round(35 * hotelMultiplier);
  const baseOutpatients = Math.round(80 * ormMultiplier * aiTriageMultiplier);
  const baseRepeatPatients = Math.round(28 * ehrRetentionMultiplier);
  const baseCheckups = Math.round(14 * (hasPortal ? 1.3 : 1.0));

  const totalMonthlyPatients = baseFairmontPatients + baseOutpatients + baseRepeatPatients + baseCheckups;

  // Monthly Revenue breakdown
  const monthlyFairmontRev = baseFairmontPatients * avgHotelCheck;
  const monthlyOutpatientRev = baseOutpatients * avgOutpatientCheck;
  const monthlyAestheticRev = baseRepeatPatients * avgAestheticCheck * tabbyMultiplier;
  const monthlyCheckupRev = baseCheckups * avgCheckupCheck;

  const totalMonthlyRevenueAED = monthlyFairmontRev + monthlyOutpatientRev + monthlyAestheticRev + monthlyCheckupRev;
  const totalMonthlyProfitAED = totalMonthlyRevenueAED * (clinicMargin / 100);

  // Digital platform direct attribution share (revenue enabled by IT modules)
  const digitalAttributionShare = useMemo(() => {
    let base = 0.20;
    if (hasHotelConcierge) base += 0.12;
    if (hasOrm) base += 0.08;
    if (hasPortal) base += 0.07;
    if (hasAiTriage) base += 0.05;
    if (hasTabby) base += 0.05;
    if (hasPayments) base += 0.04;
    return Math.min(0.60, base);
  }, [hasHotelConcierge, hasOrm, hasPortal, hasAiTriage, hasTabby, hasPayments]);

  const attributedMonthlyRevenueAED = totalMonthlyRevenueAED * digitalAttributionShare;

  // 12-Month Projection Data for Recharts AreaChart
  const monthlyProjectionData = useMemo(() => {
    const months = [
      'Мес 1', 'Мес 2', 'Мес 3', 'Мес 4', 'Мес 5', 'Мес 6',
      'Мес 7', 'Мес 8', 'Мес 9', 'Мес 10', 'Мес 11', 'Мес 12'
    ];

    const count = timeHorizon === '6m' ? 6 : 12;

    return months.slice(0, count).map((month, idx) => {
      // Ramp-up curve (months 1-3 ramp up, months 4-12 plateau/growth with seasonality in Oct-Mar for Dubai)
      const rampFactor = Math.min(1, 0.45 + (idx * 0.12));
      // Seasonality: Months 8-12 (Dubai high exhibition season) gets +15%
      const seasonalityFactor = idx >= 7 ? 1.15 : 1.0;

      const hotelPatients = Math.round(baseFairmontPatients * rampFactor * seasonalityFactor);
      const outpatients = Math.round(baseOutpatients * rampFactor);
      const repeatEHR = Math.round(baseRepeatPatients * Math.min(1.4, 0.2 + (idx * 0.11))); // grows with patient base
      const checkups = Math.round(baseCheckups * rampFactor);

      const totalP = hotelPatients + outpatients + repeatEHR + checkups;
      const grossRev = (hotelPatients * avgHotelCheck) + 
                       (outpatients * avgOutpatientCheck) + 
                       (repeatEHR * avgAestheticCheck * tabbyMultiplier) + 
                       (checkups * avgCheckupCheck);

      const netProfit = grossRev * (clinicMargin / 100);

      return {
        month,
        'Гости Fairmont (IV/Выезд)': hotelPatients,
        'Амбулаторный прием (GP/УЗИ)': outpatients,
        'Повторные визиты (EHR)': repeatEHR,
        'Executive Check-Up': checkups,
        totalPatients: totalP,
        grossRevenueAED: Math.round(grossRev),
        netProfitAED: Math.round(netProfit),
        formattedGross: formatPrice(grossRev),
        formattedProfit: formatPrice(netProfit),
      };
    });
  }, [timeHorizon, baseFairmontPatients, baseOutpatients, baseRepeatPatients, baseCheckups, avgHotelCheck, avgOutpatientCheck, avgAestheticCheck, avgCheckupCheck, tabbyMultiplier, clinicMargin, currentCurrency]);

  // Revenue by Service Category (Stacked Bar Data)
  const revenueCategoryData = useMemo(() => {
    return [
      {
        category: 'Выезд в Fairmont & IV',
        revenueAED: monthlyFairmontRev,
        share: Math.round((monthlyFairmontRev / totalMonthlyRevenueAED) * 100),
        color: '#7FA9BC',
      },
      {
        category: 'Терапия & УЗИ',
        revenueAED: monthlyOutpatientRev,
        share: Math.round((monthlyOutpatientRev / totalMonthlyRevenueAED) * 100),
        color: '#222321',
      },
      {
        category: 'Эстетика & ZO Skin',
        revenueAED: monthlyAestheticRev,
        share: Math.round((monthlyAestheticRev / totalMonthlyRevenueAED) * 100),
        color: '#B49E87',
      },
      {
        category: 'Executive Check-Up',
        revenueAED: monthlyCheckupRev,
        share: Math.round((monthlyCheckupRev / totalMonthlyRevenueAED) * 100),
        color: '#10B981',
      },
    ];
  }, [monthlyFairmontRev, monthlyOutpatientRev, monthlyAestheticRev, monthlyCheckupRev, totalMonthlyRevenueAED]);

  // Module Impact Ranking Data (Horizontal Bar)
  const moduleImpactData = useMemo(() => {
    return [
      {
        name: 'Шлюз Fairmont B2B',
        impactAED: hasHotelConcierge ? 32000 : 0,
        status: hasHotelConcierge ? 'Активен' : 'Отключен',
        color: hasHotelConcierge ? '#7FA9BC' : '#A8AAA5',
      },
      {
        name: 'Антикризисный ORM 5.0★',
        impactAED: hasOrm ? 22500 : 0,
        status: hasOrm ? 'Активен' : 'Отключен',
        color: hasOrm ? '#222321' : '#A8AAA5',
      },
      {
        name: 'Личный кабинет EHR (LTV)',
        impactAED: hasPortal ? 19000 : 0,
        status: hasPortal ? 'Активен' : 'Отключен',
        color: hasPortal ? '#10B981' : '#A8AAA5',
      },
      {
        name: 'Рассрочка Tabby / Tamara',
        impactAED: hasTabby ? 14500 : 0,
        status: hasTabby ? 'Активен' : 'Отключен',
        color: hasTabby ? '#B49E87' : '#A8AAA5',
      },
      {
        name: 'ИИ-Триаж жалоб (Gemini)',
        impactAED: hasAiTriage ? 11200 : 0,
        status: hasAiTriage ? 'Активен' : 'Отключен',
        color: hasAiTriage ? '#8B5CF6' : '#A8AAA5',
      },
      {
        name: 'Stripe & Apple Pay',
        impactAED: hasPayments ? 9800 : 0,
        status: hasPayments ? 'Активен' : 'Отключен',
        color: hasPayments ? '#0EA5E9' : '#A8AAA5',
      },
    ];
  }, [hasHotelConcierge, hasOrm, hasPortal, hasTabby, hasAiTriage, hasPayments]);

  // Traffic Source Breakdown (Pie Chart)
  const trafficShareData = useMemo(() => {
    return [
      { name: 'Отель Fairmont (Консьерж)', value: hasHotelConcierge ? 32 : 12, color: '#7FA9BC' },
      { name: 'Поиск Google & 2GIS (ORM)', value: hasOrm ? 30 : 15, color: '#222321' },
      { name: 'Повторные визиты (EHR)', value: hasPortal ? 22 : 10, color: '#10B981' },
      { name: 'Соцсети & Блог врачей', value: 16, color: '#B49E87' },
    ];
  }, [hasHotelConcierge, hasOrm, hasPortal]);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F1EDE6] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEDE8] text-[#7FA9BC] text-[10px] font-bold uppercase tracking-widest mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Прогностическая аналитика & ROI платформы</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#222321] font-bold tracking-tight">
            Аналитика потока пациентов & Дохода
          </h1>

          <p className="text-xs sm:text-sm text-[#747775] mt-1 max-w-2xl leading-relaxed">
            Динамический расчет посещаемости и выручки клиники Modern Medicine в Fairmont Dubai (Suite 2105) 
            на основе <strong>{selectedCount} активных модулей</strong> цифровой платформы.
          </p>
        </div>

        {/* Quick Config Link */}
        {onNavigateToConfig && (
          <button
            onClick={onNavigateToConfig}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F7F6F3] border border-[#E2DFD7] text-[#222321] text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Настроить модули в Конструкторе</span>
          </button>
        )}
      </div>

      {/* Simulator Controls Strip */}
      <div className="bg-[#F7F6F3] p-5 sm:p-6 rounded-3xl border border-[#E2DFD7] shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#7FA9BC]" />
            <span className="font-bold text-[#222321] uppercase text-[11px] tracking-wider">
              Параметры симуляции для Suite 2105:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#747775]">Горизонт прогноза:</span>
            <div className="flex bg-white rounded-lg p-0.5 border border-[#E2DFD7] text-[10px]">
              <button
                onClick={() => setTimeHorizon('6m')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  timeHorizon === '6m' ? 'bg-[#222321] text-white font-bold' : 'text-[#747775]'
                }`}
              >
                6 месяцев
              </button>
              <button
                onClick={() => setTimeHorizon('12m')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  timeHorizon === '12m' ? 'bg-[#222321] text-white font-bold' : 'text-[#747775]'
                }`}
              >
                12 месяцев
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Slider 1: Fairmont Occupancy */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#747775] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#7FA9BC]" />
                Загрузка отеля Fairmont Dubai (394 номера):
              </span>
              <span className="font-bold text-[#222321]">{fairmontOccupancy}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={95}
              step={5}
              value={fairmontOccupancy}
              onChange={(e) => setFairmontOccupancy(Number(e.target.value))}
              className="w-full accent-[#222321] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#A8AAA5]">
              <span>40% (Летний спад)</span>
              <span>75% (Среднегодовая)</span>
              <span>95% (Сезон WTC выставок)</span>
            </div>
          </div>

          {/* Slider 2: Clinic Margin */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#747775] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#10B981]" />
                Операционная маржинальность клиники:
              </span>
              <span className="font-bold text-[#222321]">{clinicMargin}%</span>
            </div>
            <input
              type="range"
              min={45}
              max={75}
              step={5}
              value={clinicMargin}
              onChange={(e) => setClinicMargin(Number(e.target.value))}
              className="w-full accent-[#222321] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#A8AAA5]">
              <span>45% (Базовая медицина)</span>
              <span>60% (Сбалансированная)</span>
              <span>75% (Премиальная эстетика/IV)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2DFD7] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#7FA9BC]">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider">
              Пациентопоток / мес
            </span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#222321]">
            ~{totalMonthlyPatients} чел.
          </div>
          <p className="text-[11px] text-[#747775] leading-tight">
            Включает {baseFairmontPatients} вызовов в номера Fairmont и {baseOutpatients} амбулаторных приемов.
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2DFD7] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#222321]">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider">
              Ежемесячный доход
            </span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#222321]">
            {formatPrice(totalMonthlyRevenueAED)}
          </div>
          <p className="text-[11px] text-emerald-700 font-medium leading-tight">
            Чистая прибыль: ~{formatPrice(totalMonthlyProfitAED)} / мес (маржа {clinicMargin}%)
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2DFD7] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#B49E87]">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider">
              Вклад ИТ-платформы
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#222321]">
            {Math.round(digitalAttributionShare * 100)}%
          </div>
          <p className="text-[11px] text-[#747775] leading-tight">
            ~{formatPrice(attributedMonthlyRevenueAED)} выручки в месяц напрямую разблокировано модулями ТЗ.
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2DFD7] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider">
              Окупаемость платформы
            </span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-700">
            ~{hasHotelConcierge ? '28–35' : '45–60'} дней
          </div>
          <p className="text-[11px] text-[#747775] leading-tight">
            Полный возврат инвестиций в разработку за счет конверсии люксов и чекапов.
          </p>
        </div>
      </div>

      {/* Main Charts Row: AreaChart (Monthly Trajectory) & BarChart (Revenue Mix) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Chart 1: Monthly Patient Trajectory (AreaChart, 7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1EDE6] pb-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#7FA9BC] tracking-wider">
                Recharts • Динамическая модель
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#222321]">
                Динамика пациентопотока по категориям
              </h3>
            </div>
            <span className="text-xs text-[#747775]">
              Прогноз на {timeHorizon === '6m' ? '6 месяцев' : '1 год'}
            </span>
          </div>

          {/* Area Chart Container */}
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProjectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fairmontGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7FA9BC" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7FA9BC" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="outpatientGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#222321" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#222321" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="ehrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE6" vertical={false} />
                <XAxis dataKey="month" stroke="#A8AAA5" fontSize={11} tickLine={false} />
                <YAxis stroke="#A8AAA5" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#222321', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Гости Fairmont (IV/Выезд)" stackId="1" stroke="#7FA9BC" fill="url(#fairmontGrad)" />
                <Area type="monotone" dataKey="Амбулаторный прием (GP/УЗИ)" stackId="1" stroke="#222321" fill="url(#outpatientGrad)" />
                <Area type="monotone" dataKey="Повторные визиты (EHR)" stackId="1" stroke="#10B981" fill="url(#ehrGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] text-xs text-[#747775] flex items-center justify-between">
            <span>
              <strong>Наблюдение: </strong> 
              Благодаря Личному кабинету (EHR) доля повторных визитов вырастает с 15% в 1-й месяц до 35% к 12-му месяцу.
            </span>
          </div>
        </div>

        {/* Chart 2: Monthly Revenue by Service (BarChart, 5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-5">
          <div className="border-b border-[#F1EDE6] pb-4">
            <div className="text-[10px] uppercase font-bold text-[#7FA9BC] tracking-wider">
              Структура выручки
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#222321]">
              Ежемесячный доход по направлениям
            </h3>
          </div>

          {/* Bar Chart Container */}
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueCategoryData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1EDE6" />
                <XAxis type="number" stroke="#A8AAA5" fontSize={10} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <YAxis dataKey="category" type="category" stroke="#222321" fontSize={11} tickLine={false} width={110} />
                <Tooltip
                  formatter={(val: any) => [formatPrice(Number(val)), 'Выручка']}
                  contentStyle={{ backgroundColor: '#222321', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }}
                />
                <Bar dataKey="revenueAED" radius={[0, 8, 8, 0]}>
                  {revenueCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Share Breakdown List */}
          <div className="space-y-2 pt-2 border-t border-[#F1EDE6]">
            {revenueCategoryData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#222321]">{item.category}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-[#222321]">{formatPrice(item.revenueAED)}</span>
                  <span className="text-[10px] text-[#747775]">({item.share}%)</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Secondary Charts Row: Module Impact Ranking & Traffic Source Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Chart 3: Module Impact Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-5">
          <div className="border-b border-[#F1EDE6] pb-4">
            <div className="text-[10px] uppercase font-bold text-[#7FA9BC] tracking-wider">
              Экономический эффект каждого модуля
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#222321]">
              Вклад выбранных модулей ТЗ в ежемесячную выручку (AED)
            </h3>
            <p className="text-xs text-[#747775] mt-1">
              Показывает, сколько дирхамов дополнительного дохода генерирует каждый подключенный ИТ-модуль.
            </p>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleImpactData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1EDE6" />
                <XAxis dataKey="name" stroke="#747775" fontSize={10} tickLine={false} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#A8AAA5" fontSize={10} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip
                  formatter={(val: any) => [formatPrice(Number(val)), 'Ежемесячный вклад']}
                  contentStyle={{ backgroundColor: '#222321', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }}
                />
                <Bar dataKey="impactAED" radius={[6, 6, 0, 0]}>
                  {moduleImpactData.map((entry, index) => (
                    <Cell key={`cell-mod-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-[#F7F6F3] rounded-xl border border-[#E2DFD7]">
              <span className="font-bold text-[#222321] block">Топ-1 драйвер: Шлюз Fairmont B2B</span>
              <span className="text-[11px] text-[#747775]">
                Генерирует до 32,000 AED/мес за счет быстрого выезда в люксы отеля.
              </span>
            </div>
            <div className="p-3 bg-[#F7F6F3] rounded-xl border border-[#E2DFD7]">
              <span className="font-bold text-[#222321] block">Топ-2 драйвер: Антикризисный ORM</span>
              <span className="text-[11px] text-[#747775]">
                Возврат рейтинга в 5.0★ предотвращает потерю до 22,500 AED/мес от конкурента Ora Care.
              </span>
            </div>
          </div>
        </div>

        {/* Chart 4: Traffic & Channel Sources (PieChart, 5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-5">
          <div className="border-b border-[#F1EDE6] pb-4">
            <div className="text-[10px] uppercase font-bold text-[#7FA9BC] tracking-wider">
              Источники привлечения
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#222321]">
              Доля каналов в пациентопотоке
            </h3>
          </div>

          {/* Pie Chart Container */}
          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {trafficShareData.map((entry, index) => (
                    <Cell key={`cell-pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Доля потока']}
                  contentStyle={{ backgroundColor: '#222321', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2 pt-1 border-t border-[#F1EDE6]">
            {trafficShareData.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-[#222321]">{entry.name}</span>
                </div>
                <span className="font-bold font-mono text-[#222321]">{entry.value}%</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#EFEDE8] rounded-xl text-xs text-[#222321] leading-relaxed">
            <strong>Стратегический эффект: </strong>
            Отель Fairmont Dubai и система ORM обеспечивают более 60% всего первичного коммерческого потока клиники.
          </div>
        </div>

      </div>

    </div>
  );
};
