import React, { useState } from 'react';
import { ProtoMode, Currency, ServiceItem, Biomarker, TriageResult } from '../types';
import { CLINIC_SERVICES, CLINIC_DOCTORS, PATIENT_BIOMARKERS, CURRENCY_RATES } from '../constants';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Activity, 
  FileText, 
  Heart, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  User, 
  Download, 
  ShieldCheck, 
  PhoneCall,
  Bot,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AudioPodcastPlayer } from './AudioPodcastPlayer';

interface PrototypeViewProps {
  currentCurrency: Currency;
  onBookService: (serviceTitle: string, priceAED: number) => void;
  onShowToast: (msg: string) => void;
}

export const PrototypeView: React.FC<PrototypeViewProps> = ({
  currentCurrency,
  onBookService,
  onShowToast,
}) => {
  const [protoMode, setProtoMode] = useState<ProtoMode>('public');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('all');
  
  // AI Triage State
  const [symptomInput, setSymptomInput] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<TriageResult | null>(null);

  // Portal State
  const [activeBiomarkerId, setActiveBiomarkerId] = useState<string>('ferritin');

  const formatPrice = (amountAED: number) => {
    if (currentCurrency === 'USD') return `$${Math.round(amountAED * CURRENCY_RATES.USD).toLocaleString('en-US')}`;
    if (currentCurrency === 'RUB') return `${Math.round(amountAED * CURRENCY_RATES.RUB).toLocaleString('ru-RU')} ₽`;
    return `${Math.round(amountAED).toLocaleString('en-US')} AED`;
  };

  // Sample prompt chips for 1-click test
  const samplePrompts = [
    'Сильная усталость и джетлаг после долгого перелета',
    'Хочу комплексный чекап здоровья с УЗИ',
    'Сухость кожи на солнце и уход ZO Skin Health',
    'Консультация уролога и профилактика',
  ];

  // Call server-side /api/gemini/triage
  const handleRunAiTriage = async (customPrompt?: string) => {
    const textToAnalyze = customPrompt || symptomInput;
    if (!textToAnalyze.trim()) {
      onShowToast('Пожалуйста, введите ваши симптомы или выберите пример');
      return;
    }

    setIsAiLoading(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/gemini/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom: textToAnalyze, language: 'ru' }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setAiResult(json.data);
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error('Triage error:', err);
      // Fallback
      setAiResult({
        serviceName: 'IV Therapy «Dubai Jetlag Recovery»',
        doctorName: 'Выездная медицинская бригада Modern Medicine',
        recommendation: 'Рекомендуется интенсивная инфузионная терапия с электролитами и витаминами для снятия симптомов усталости и нормализации клеточного энергообмена.',
        priceAED: 850,
        urgency: 'Сегодня (в течение 30-45 мин)',
        preparation: 'Процедура доступна с выездом в номер отеля Fairmont Dubai.',
        keyHighlights: ['Мгновенный подъем сил', 'Выезд в номер', 'Премиальные компоненты']
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const activeBiomarker = PATIENT_BIOMARKERS.find((b) => b.id === activeBiomarkerId) || PATIENT_BIOMARKERS[0];

  return (
    <div className="space-y-16">
      
      {/* Prototype Navigation Toggle */}
      <div className="flex justify-center">
        <div className="bg-white p-1.5 rounded-full border border-[#E2DFD7] flex items-center gap-1 shadow-sm overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setProtoMode('public')}
            className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              protoMode === 'public'
                ? 'bg-[#222321] text-white shadow-md'
                : 'text-[#747775] hover:text-[#222321]'
            }`}
          >
            Веб-сайт клиники
          </button>

          <button
            onClick={() => setProtoMode('portal')}
            className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              protoMode === 'portal'
                ? 'bg-[#222321] text-white shadow-md'
                : 'text-[#747775] hover:text-[#222321]'
            }`}
          >
            <span>Личный кабинет (EHR)</span>
            <span className="text-[10px] bg-[#7FA9BC] text-white px-2 py-0.2 rounded-full">
              Live
            </span>
          </button>

          <button
            onClick={() => setProtoMode('b2b-concierge')}
            className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              protoMode === 'b2b-concierge'
                ? 'bg-[#222321] text-white shadow-md'
                : 'text-[#747775] hover:text-[#222321]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Консьерж Fairmont (B2B)</span>
            <span className="text-[10px] bg-[#B49E87] text-white px-2 py-0.2 rounded-full">
              Suite 2105
            </span>
          </button>
        </div>
      </div>

      {/* Contextual Audio Companion for Patients & Doctors */}
      <div className="max-w-2xl mx-auto w-full">
        <AudioPodcastPlayer
          initialEpisodeId="podcast-concierge-health"
          variant="compact"
          titleOverride="Аудиогид: «Личный цифровой консьерж здоровья Modern Medicine»"
        />
      </div>

      {/* ================================================================= */}
      {/* MODE 1: PUBLIC CLINIC WEBSITE PROTOTYPE */}
      {/* ================================================================= */}
      {protoMode === 'public' && (
        <div className="space-y-24">
          
          {/* Editorial Hero Section */}
          <section className="relative py-12 sm:py-20 flex flex-col justify-center">
            <div className="max-w-4xl space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFEDE8] text-[#222321] text-xs font-medium border border-[#E2DFD7]">
                <MapPin className="w-3.5 h-3.5 text-[#7FA9BC]" />
                <span>Fairmont Dubai • 21st Floor • Sheikh Zayed Road</span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-serif text-[#222321] leading-[0.9] tracking-tight">
                Современная медицина<br />без лишнего.
              </h1>

              <p className="text-base sm:text-xl text-[#747775] max-w-xl leading-relaxed">
                Эстетическая медицина, превентивные Check-up программы и точная диагностика на основе анатомической доказательности в самом сердце Дубая.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  onClick={() => onBookService('Первичный прием и диагностика', 500)}
                  className="px-8 py-4 bg-[#222321] hover:bg-black text-white rounded-full text-sm font-medium transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Записаться на консультацию</span>
                  <ArrowRight className="w-4 h-4 text-[#7FA9BC]" />
                </button>

                <div className="text-xs text-[#747775] sm:border-l border-[#E2DFD7] sm:pl-5 py-2">
                  <span className="font-semibold text-[#222321]">Консьерж 24/7:</span> вызов врача и капельниц в номер отеля
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Services Catalog */}
          <section className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E2DFD7] pb-6">
              <div>
                <span className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest">
                  Клинические направления
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#222321] mt-1">
                  Услуги & Программы
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
                {[
                  { key: 'all', label: 'Все услуги' },
                  { key: 'aesthetics', label: 'Эстетика & ZO Skin' },
                  { key: 'wellness', label: 'Урология & Прием' },
                  { key: 'diagnostics', label: 'Check-Up' },
                  { key: 'infusions', label: 'IV Терапия' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedServiceCategory(tab.key)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      selectedServiceCategory === tab.key
                        ? 'bg-[#222321] text-white shadow-sm'
                        : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CLINIC_SERVICES
                .filter((s) => selectedServiceCategory === 'all' || s.category === selectedServiceCategory)
                .map((service, index) => {
                  return (
                    <div
                      key={service.id}
                      className="group bg-white rounded-3xl border border-[#E2DFD7] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image Frame */}
                      <div className="relative h-56 w-full overflow-hidden bg-[#EFEDE8]">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-semibold bg-[#222321]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full">
                            {service.duration}
                          </span>
                          <span className="text-[10px] font-semibold bg-white/95 backdrop-blur-md text-[#222321] px-2.5 py-1 rounded-full border border-[#E2DFD7]">
                            {service.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="text-[11px] text-[#7FA9BC] font-medium uppercase tracking-wider">
                            {service.doctor} • {service.doctorRole}
                          </div>
                          <h3 className="font-serif text-xl sm:text-2xl text-[#222321] font-semibold leading-snug">
                            {service.title}
                          </h3>
                          <p className="text-xs text-[#747775] leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {/* Bottom Bar: Prep Note + Price & CTA */}
                        <div className="pt-4 border-t border-[#F1EDE6] space-y-3">
                          <div className="text-[11px] text-[#B49E87] bg-[#F7F6F3] p-2.5 rounded-xl border border-[#E2DFD7]">
                            <span className="font-semibold text-[#222321]">Подготовка: </span>
                            {service.prepNote}
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-lg font-serif font-bold text-[#222321]">
                                {formatPrice(service.priceAED)}
                              </div>
                              <div className="text-[10px] text-[#747775]">
                                {currentCurrency === 'RUB' 
                                  ? `~ ${service.priceAED.toLocaleString('en-US')} AED`
                                  : currentCurrency === 'USD'
                                  ? `~ ${service.priceAED.toLocaleString('en-US')} AED`
                                  : `~ ${Math.round(service.priceAED * CURRENCY_RATES.RUB).toLocaleString('ru-RU')} ₽`}
                              </div>
                            </div>

                            <button
                              onClick={() => onBookService(service.title, service.priceAED)}
                              className="px-4 py-2 bg-[#222321] hover:bg-black text-white rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                            >
                              <span>Записаться</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* Doctor Quote Banner */}
          <section className="py-16 border-y border-[#E2DFD7] flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#EFEDE8]">
              <img
                src={CLINIC_DOCTORS[0].image}
                alt="Dr. Olga Dimova"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#222321] leading-tight tracking-tight">
              «Истинное мастерство в эстетической медицине — это когда результат безупречен, а следы вмешательства абсолютно незаметны.»
            </p>

            <div className="text-xs sm:text-sm">
              <div className="font-bold text-[#222321] text-base">{CLINIC_DOCTORS[0].name}</div>
              <div className="text-[#747775] mt-0.5">{CLINIC_DOCTORS[0].role} • {CLINIC_DOCTORS[0].experience}</div>
            </div>
          </section>

          {/* Gemini AI Smart Triage Assistant */}
          <section className="bg-white border border-[#E2DFD7] p-8 sm:p-12 rounded-[32px] max-w-4xl mx-auto space-y-8 shadow-sm relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#DCEAF0] rounded-full filter blur-3xl opacity-50 pointer-events-none" />

            <div className="text-center space-y-3 relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEDE8] text-[#222321] text-xs font-medium border border-[#E2DFD7]">
                <Bot className="w-3.5 h-3.5 text-[#7FA9BC]" />
                <span>Powered by Gemini 3.8 Flash</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#222321]">
                Интеллектуальный медицинский триаж
              </h2>
              <p className="text-xs sm:text-sm text-[#747775] max-w-lg mx-auto">
                Опишите ваши симптомы или пожелания простыми словами — ИИ-ассистент подберет оптимальный клинический протокол, специалиста и правила подготовки.
              </p>
            </div>

            {/* Quick Chips */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-[#747775] uppercase tracking-wider text-center">
                Быстрые примеры запросов:
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSymptomInput(prompt);
                      handleRunAiTriage(prompt);
                    }}
                    className="text-xs bg-[#F7F6F3] hover:bg-[#EFEDE8] border border-[#E2DFD7] text-[#222321] px-3 py-1.5 rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea & Submit */}
            <div className="space-y-4">
              <textarea
                rows={3}
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder="Опишите, что вас беспокоит (например: 'Чувствую постоянную слабость после перелета в Дубай, тусклый цвет кожи, хочу капельницу')..."
                className="w-full p-4 sm:p-5 bg-[#F7F6F3] border border-[#E2DFD7] rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#222321] transition-colors resize-none"
              />

              <button
                onClick={() => handleRunAiTriage()}
                disabled={isAiLoading}
                className="w-full py-4 bg-[#222321] hover:bg-black disabled:bg-[#747775] text-white rounded-full text-xs sm:text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-99"
              >
                {isAiLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Gemini анализирует клинический профиль...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#7FA9BC]" />
                    <span>Подобрать программу лечения (Gemini AI)</span>
                  </>
                )}
              </button>
            </div>

            {/* Result Box */}
            {aiResult && (
              <div className="p-6 sm:p-8 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-5 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DFD7] pb-4">
                  <div>
                    <span className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-wider">
                      Рекомендованный протокол:
                    </span>
                    <h3 className="font-serif text-2xl text-[#222321] font-bold mt-0.5">
                      {aiResult.serviceName}
                    </h3>
                    <div className="text-xs text-[#747775] mt-1">
                      {aiResult.doctorName} • <span className="text-[#222321] font-medium">{aiResult.urgency}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-2xl font-serif font-bold text-[#222321]">
                      {formatPrice(aiResult.priceAED)}
                    </div>
                    <div className="text-[10px] text-[#747775]">
                      Ориентировочная стоимость
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#222321] leading-relaxed">
                  <span className="font-semibold text-[#7FA9BC]">Клиническое обоснование:</span>
                  <p>{aiResult.recommendation}</p>
                </div>

                {/* Highlights */}
                {aiResult.keyHighlights && aiResult.keyHighlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {aiResult.keyHighlights.map((hl, i) => (
                      <span key={i} className="text-[11px] bg-white text-[#222321] border border-[#E2DFD7] px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#7FA9BC]" />
                        {hl}
                      </span>
                    ))}
                  </div>
                )}

                {/* Preparation Guide */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E2DFD7] text-xs text-[#747775]">
                  <span className="font-semibold text-[#222321]">Рекомендация по подготовке: </span>
                  {aiResult.preparation}
                </div>

                {/* Direct Booking */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onBookService(aiResult.serviceName, aiResult.priceAED)}
                    className="flex-1 py-3 px-6 bg-[#222321] hover:bg-black text-white rounded-full text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Записаться на этот прием в WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </section>

        </div>
      )}

      {/* ================================================================= */}
      {/* MODE 3: B2B CONCIERGE HUB (FAIRMONT DUBAI FRONT DESK) */}
      {/* ================================================================= */}
      {protoMode === 'b2b-concierge' && (
        <div className="space-y-10">
          {/* Header */}
          <div className="bg-[#222321] text-white p-7 sm:p-9 rounded-[28px] border border-[#353633] shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#7FA9BC]">
                <Building2 className="w-3.5 h-3.5" />
                <span>Fairmont Concierge Direct Line • Suite 2105 (21st Floor)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                Служебный портал вызова врача в номер отеля
              </h2>
              <p className="text-xs text-[#F7F6F3]/70 max-w-xl">
                Прямой канал для Concierge Desk и Front Office. Заказ выезда дежурного врача или капельницы Jet Lag Recovery в номер гостя за 15–30 минут с автоматическим начислением комиссии отелю.
              </p>
            </div>

            <div className="text-right bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0">
              <div className="text-[10px] text-[#7FA9BC] uppercase font-semibold">Статус дежурной бригады</div>
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5 justify-end mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>В клинике (21 эт.) • Готовы к выезду</span>
              </div>
              <div className="text-[10px] text-white/50 mt-1">Норматив прибытия: 15–25 мин</div>
            </div>
          </div>

          {/* Concierge Dispatch Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Instant Room Booking Form */}
            <div className="lg:col-span-8 bg-white p-7 sm:p-9 rounded-[28px] border border-[#E2DFD7] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest">
                  Быстрое оформление вызова
                </span>
                <h3 className="text-2xl font-serif text-[#222321] font-bold mt-0.5">
                  Вызов медицинской бригады в номер гостя
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#222321]">Номер комнаты / Suite в Fairmont:</label>
                  <select className="w-full p-3.5 bg-[#F7F6F3] border border-[#E2DFD7] rounded-xl font-medium text-[#222321] focus:outline-none">
                    <option value="1402">Presidential Suite 1402 (14th floor)</option>
                    <option value="2108">Executive Suite 2108 (21st floor)</option>
                    <option value="915">Deluxe King Room 915 (9th floor)</option>
                    <option value="3401">Royal Penthouse 3401 (34th floor)</option>
                    <option value="lobby">Lobby / Concierge Desk</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#222321]">Протокол из Hotel Medical Menu:</label>
                  <select className="w-full p-3.5 bg-[#F7F6F3] border border-[#E2DFD7] rounded-xl font-medium text-[#222321] focus:outline-none">
                    <option value="jetlag">Jet Lag Recovery & Hydration IV (850 AED)</option>
                    <option value="doctor-call">24/7 Room Visit (Вызов врача GP) (950 AED)</option>
                    <option value="wtc-energy">DWTC Delegate Express Energy Pass (750 AED)</option>
                    <option value="dental">Urgent Dental / Toothache Relief (600 AED)</option>
                    <option value="checkup">Executive Health Check-up 360° (1800 AED)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-[#222321]">Язык общения гостя:</label>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-[#222321] text-white font-medium">Английский (English)</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#F7F6F3] border border-[#E2DFD7] text-[#222321]">Арабский (العربية)</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#F7F6F3] border border-[#E2DFD7] text-[#222321]">Русский</span>
                </div>
              </div>

              <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#747775]">Комиссионное вознаграждение отеля: </span>
                  <span className="font-bold text-emerald-700">15% Non-Room Revenue</span>
                </div>
                <div className="font-bold text-[#222321]">
                  +127.5 AED в отчет Fairmont
                </div>
              </div>

              <button
                onClick={() => {
                  confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                  const text = encodeURIComponent(
                    `[FAIRMONT CONCIERGE HOTLINE]\nСрочный вызов врача в номер отеля!\nКомната: Suite 1402 (Presidential)\nУслуга: Jet Lag Recovery & Hydration IV (850 AED)\nЯзык гостя: English\nНорматив прибытия: 15–20 мин\nКонсьерж Desk: подтверждено.`
                  );
                  window.open(`https://wa.me/971529266594?text=${text}`, '_blank');
                  onShowToast('Вызов передан дежурному врачу в Suite 2105. Прибытие через 18 минут.');
                }}
                className="w-full py-4 bg-[#222321] hover:bg-black text-white rounded-full font-medium text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-99"
              >
                <PhoneCall className="w-4 h-4 text-[#7FA9BC]" />
                <span>Направить медицинскую бригаду в номер (WhatsApp Direct Hotline)</span>
              </button>
            </div>

            {/* Right Column: Guest Directory & QR display preview */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-7 rounded-[28px] border border-[#E2DFD7] shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#222321]">
                    Цифровой Guest Directory в номерах
                  </h4>
                  <span className="text-[10px] bg-[#EFEDE8] text-[#222321] px-2 py-0.5 rounded-full font-medium">QR-код</span>
                </div>

                <div className="p-5 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] text-center space-y-3">
                  <div className="w-24 h-24 mx-auto bg-white rounded-xl border border-[#E2DFD7] flex items-center justify-center shadow-inner font-mono text-[9px] text-[#747775]">
                    [ QR: Suite 2105 ]
                  </div>
                  <div className="text-xs font-serif font-bold text-[#222321]">
                    «VIP Health & In-Room IV Drips»
                  </div>
                  <p className="text-[11px] text-[#747775] leading-relaxed">
                    Гости в номерах сканируют QR-код на прикроватной тумбочке и заказывают капельницу от джетлага в 1 клик со смартфона.
                  </p>
                </div>

                <div className="text-xs space-y-2 text-[#747775]">
                  <div className="flex items-center justify-between border-b border-[#F1EDE6] pb-2">
                    <span>Прямой телефон клиники:</span>
                    <span className="font-medium text-[#222321]">+971 52 926 6594</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#F1EDE6] pb-2">
                    <span>Лифт в клинику:</span>
                    <span className="font-medium text-[#222321]">Tower Elevators 21 эт.</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>VIP Fast-Track:</span>
                    <span className="font-medium text-emerald-700">Без очередей</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}
      {protoMode === 'portal' && (
        <div className="space-y-10">
          
          {/* Patient Header Card */}
          <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#E2DFD7] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#DCEAF0] text-[#222321] font-serif text-2xl flex items-center justify-center font-bold border border-[#7FA9BC]/30 shadow-inner">
                ЕК
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#222321] leading-none font-bold">
                    Елена Киреева
                  </h2>
                  <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Patient
                  </span>
                </div>
                <p className="text-[#747775] text-xs sm:text-sm mt-1.5">
                  ID: 90210 • Дата рождения: 12.04.1985 • Группа крови: A (II) Rh+
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onBookService('Вызов медсестры на дом / в отель', 950)}
                className="flex-1 sm:flex-initial py-3 px-5 bg-[#222321] hover:bg-black text-white rounded-full text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#7FA9BC]" />
                <span>Вызвать в номер Fairmont</span>
              </button>
            </div>
          </div>

          {/* Portal Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Interactive Biomarkers Dynamic Chart */}
            <div className="lg:col-span-8 bg-white p-7 sm:p-8 rounded-[28px] border border-[#E2DFD7] shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1EDE6] pb-5">
                <div>
                  <span className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest">
                    Динамика показателей здоровья
                  </span>
                  <h3 className="text-2xl font-serif text-[#222321] font-bold mt-0.5">
                    Интерактивные биомаркеры (EHR)
                  </h3>
                </div>

                {/* Biomarker Selector Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
                  {PATIENT_BIOMARKERS.map((bm) => (
                    <button
                      key={bm.id}
                      onClick={() => setActiveBiomarkerId(bm.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        activeBiomarkerId === bm.id
                          ? 'bg-[#222321] text-white shadow-xs'
                          : 'bg-[#F7F6F3] border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
                      }`}
                    >
                      {bm.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Biomarker Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F7F6F3] p-4 rounded-2xl border border-[#E2DFD7]">
                <div>
                  <div className="text-xs text-[#747775]">{activeBiomarker.name}</div>
                  <div className="text-2xl font-serif font-bold text-[#222321] flex items-baseline gap-2">
                    <span>{activeBiomarker.currentValue} {activeBiomarker.unit}</span>
                    <span className="text-xs text-emerald-600 font-sans font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      В норме (Оптимум {activeBiomarker.optimalRange})
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#747775] text-right">
                  Категория: <span className="font-semibold text-[#222321]">{activeBiomarker.category}</span>
                </div>
              </div>

              {/* Custom SVG Line Chart */}
              <div className="space-y-2 pt-2">
                <div className="h-56 w-full relative flex items-end justify-between px-6 pb-6 pt-4 bg-white rounded-2xl border border-[#F1EDE6]">
                  {/* Target reference dashed line */}
                  <div className="absolute left-6 right-6 top-1/2 border-b border-dashed border-emerald-400 opacity-60 z-0">
                    <span className="absolute right-0 -top-4 text-[9px] text-emerald-600 font-medium">
                      Целевой уровень
                    </span>
                  </div>

                  {activeBiomarker.history.map((pt, idx) => {
                    const maxVal = Math.max(...activeBiomarker.history.map(h => h.value)) * 1.25;
                    const heightPercent = (pt.value / maxVal) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 z-10 group relative">
                        <div className="text-[10px] font-bold text-[#222321] opacity-0 group-hover:opacity-100 transition-opacity bg-[#222321] text-white px-2 py-0.5 rounded-md">
                          {pt.value} {activeBiomarker.unit}
                        </div>
                        <div
                          className="w-4 sm:w-6 bg-[#7FA9BC] hover:bg-[#222321] rounded-t-lg transition-all duration-500 cursor-pointer shadow-xs"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-[11px] text-[#747775] font-medium">
                          {pt.date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Clinical Note from Doctor */}
              <div className="p-4 rounded-xl bg-[#EFEDE8] border border-[#E2DFD7] text-xs space-y-1">
                <span className="font-bold text-[#222321] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7FA9BC]" />
                  Заключение лечащего врача:
                </span>
                <p className="text-[#747775] leading-relaxed">
                  {activeBiomarker.clinicalNote}
                </p>
              </div>

            </div>

            {/* Right Column: Appointments & Lab Reports */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white p-7 rounded-[28px] border border-[#E2DFD7] shadow-sm space-y-5">
                <h3 className="text-xl font-serif text-[#222321] font-bold">
                  История визитов
                </h3>

                <div className="space-y-3.5">
                  
                  {/* Visit 1 */}
                  <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#747775] font-semibold uppercase">
                      <span>24 Августа 2026</span>
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">Выполнено</span>
                    </div>
                    <div className="font-semibold text-sm text-[#222321]">
                      IV Therapy: Jetlag Recovery
                    </div>
                    <div className="text-xs text-[#747775]">
                      Выезд в номер отеля Fairmont Dubai
                    </div>
                  </div>

                  {/* Visit 2 */}
                  <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#747775] font-semibold uppercase">
                      <span>10 Августа 2026</span>
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">Выполнено</span>
                    </div>
                    <div className="font-semibold text-sm text-[#222321]">
                      Консультация гинеколога
                    </div>
                    <div className="text-xs text-[#747775]">
                      Д-р Ольга Димова • Fairmont 21st Floor
                    </div>
                  </div>

                  {/* Visit 3 */}
                  <div className="p-4 bg-white rounded-2xl border border-[#7FA9BC] space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-[#7FA9BC] font-bold uppercase">
                      <span>05 Августа 2026</span>
                      <span className="text-[#222321] bg-[#DCEAF0] px-2 py-0.2 rounded-full">Готово</span>
                    </div>
                    <div className="font-semibold text-sm text-[#222321]">
                      Комплексный Check-Up 360°
                    </div>
                    <button
                      onClick={() => onShowToast('Лабораторное заключение PDF успешно скачано')}
                      className="text-xs text-[#7FA9BC] hover:text-[#222321] font-semibold flex items-center gap-1 transition-colors pt-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Скачать результаты анализов (PDF) →</span>
                    </button>
                  </div>

                </div>

                <button
                  onClick={() => onBookService('Повторная консультация по результатам', 500)}
                  className="w-full py-3 bg-[#222321] hover:bg-black text-white rounded-full text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#7FA9BC]" />
                  <span>Записаться на новый прием</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
