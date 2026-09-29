import React, { useState, useEffect } from 'react';
import { PODCAST_TRANSCRIPT, FAIRMONT_B2B_PARTNERSHIP, DOCTORS_MEDIA_PLAN } from '../constants';
import { 
  Play, 
  Pause, 
  Volume2, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Activity,
  Headphones,
  RotateCcw,
  Building,
  PhoneCall,
  Mail,
  ShieldCheck,
  Video,
  Send,
  Star,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExecutivePresentationViewer } from './ExecutivePresentationViewer';
import { B2BProposalModal } from './B2BProposalModal';
import { AudioPodcastPlayer } from './AudioPodcastPlayer';

export const ResearchView: React.FC = () => {
  const [researchTab, setResearchTab] = useState<'presentation' | 'benchmarks' | 'b2b' | 'media-plan'>('presentation');
  const [isB2BModalOpen, setIsB2BModalOpen] = useState<boolean>(false);

  const copyCoverLetter = () => {
    const letter = 
`To: ${FAIRMONT_B2B_PARTNERSHIP.coverLetterSample.recipient}
From: Medical Director / Management, Modern Medicine Medical Center (${FAIRMONT_B2B_PARTNERSHIP.suiteLocation})
Subject: ${FAIRMONT_B2B_PARTNERSHIP.coverLetterSample.subject}

${FAIRMONT_B2B_PARTNERSHIP.coverLetterSample.greeting}

${FAIRMONT_B2B_PARTNERSHIP.coverLetterSample.body}

Key Offerings:
${FAIRMONT_B2B_PARTNERSHIP.hotelMedicalMenu.map(m => `• ${m.title} (${m.time}) — ${m.description}`).join('\n')}

Strategic Benefits for Fairmont:
${FAIRMONT_B2B_PARTNERSHIP.commercialBenefits.map(b => `• ${b.title}: ${b.desc}`).join('\n')}

Contact: B2B Partnerships Team | Suite 2105, Fairmont Dubai | WhatsApp: +971 52 926 6594`;

    navigator.clipboard.writeText(letter);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="space-y-12">
      
      {/* Editorial Header */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E2DFD7] bg-white text-[#222321] text-xs font-medium tracking-wide shadow-sm">
          <FileText className="w-3.5 h-3.5 text-[#7FA9BC]" />
          <span>Анализ рынка ОАЭ, B2B-партнерство & Стратегический аудит</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#222321] leading-[0.95] tracking-tight">
          Исследование функционала<br className="hidden sm:inline" /> и B2B-стратегия клиники.
        </h1>

        <p className="text-[#747775] text-base sm:text-lg max-w-2xl leading-relaxed">
          Комплексный анализ цифрового присутствия клиник в ОАЭ, пакет B2B-партнерства с отелем Fairmont Dubai (Suite 2105) 
          и 4-недельный медиаплан продвижения врачей для выхода на стабильный рейтинг 5.0★.
        </p>

        {/* Section Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pt-2">
          <button
            onClick={() => setResearchTab('presentation')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              researchTab === 'presentation'
                ? 'bg-[#222321] text-white shadow-md'
                : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Презентация для руководства (8 слайдов)</span>
            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.2 rounded-full font-bold">2026</span>
          </button>

          <button
            onClick={() => setResearchTab('benchmarks')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              researchTab === 'benchmarks'
                ? 'bg-[#222321] text-white shadow-md'
                : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
            }`}
          >
            📊 Анализ рынка & Подкаст NotebookLM
          </button>

          <button
            onClick={() => setResearchTab('b2b')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              researchTab === 'b2b'
                ? 'bg-[#222321] text-white shadow-md'
                : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>B2B Партнерство с Fairmont (Suite 2105)</span>
            <span className="text-[10px] bg-[#7FA9BC] text-white px-2 py-0.2 rounded-full">New</span>
          </button>

          <button
            onClick={() => setResearchTab('media-plan')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              researchTab === 'media-plan'
                ? 'bg-[#222321] text-white shadow-md'
                : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#B49E87]" />
            <span>Медиаплан врачей & ORM (4 недели)</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* TAB 0: EXECUTIVE PRESENTATION (8 SLIDES) */}
      {/* ================================================================= */}
      {researchTab === 'presentation' && (
        <ExecutivePresentationViewer />
      )}

      {/* ================================================================= */}
      {/* TAB 1: BENCHMARKS & PODCAST */}
      {/* ================================================================= */}
      {researchTab === 'benchmarks' && (
        <div className="space-y-12">
          <div className="flex flex-wrap gap-3">
            <a
              href="https://docs.google.com/document/d/1wjQwo9_VX9mKpHHRYct2M3Ize07yGo6zK5sDm4qz1PQ/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#222321] hover:bg-black text-white rounded-full text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95"
            >
              <span>Открыть полный отчет в Google Docs</span>
              <ExternalLink className="w-4 h-4 text-[#7FA9BC]" />
            </a>

            <button
              onClick={() => setIsB2BModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-[#E2DFD7] hover:bg-[#F7F6F3] text-[#222321] rounded-full text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#7FA9BC]" />
              <span>B2B Proposal: Fairmont Dubai (Suite 2105)</span>
              <span className="text-[10px] bg-[#7FA9BC] text-white px-2 py-0.5 rounded-full font-bold">Официальный документ</span>
            </button>
          </div>

          {/* Multi-Episode Real Audio Studio Player */}
          <AudioPodcastPlayer
            variant="studio"
            allowEpisodeSwitching={true}
          />

          {/* Comparative Benchmarks & Implementation Metrics */}
          <div className="space-y-8">
            <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-6">
                <div>
                  <div className="text-[10px] text-[#747775] font-semibold uppercase tracking-widest mb-1.5">
                    Метрики эффективности внедрения
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#222321]">
                    Эффект цифровой платформы vs Обычные клиники
                  </h3>
                  <p className="text-xs sm:text-sm text-[#747775] mt-2">
                    Данные на основе анализа внедрения личных кабинетов и ИИ-триажа в премиальном сегменте здравоохранения Дубая.
                  </p>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#222321]">Конверсия трафика в запись:</span>
                      <div className="space-x-3 text-right">
                        <span className="text-[#747775]">Обычные: 2.1%</span>
                        <span className="font-bold text-[#222321]">Modern Medicine: 5.8% (+176%)</span>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-[#EFEDE8] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#222321] rounded-full" style={{ width: '58%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#222321]">Повторные визиты (Retention 90 дней):</span>
                      <div className="space-x-3 text-right">
                        <span className="text-[#747775]">Обычные: 35%</span>
                        <span className="font-bold text-[#222321]">EHR Портал: 68% (+94%)</span>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-[#EFEDE8] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#7FA9BC] rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#222321]">Скорость загрузки интерфейса на смартфонах:</span>
                      <div className="space-x-3 text-right">
                        <span className="text-[#747775]">Старые CMS: 4.2 сек</span>
                        <span className="font-bold text-[#222321]">SPA Оптимизация: 1.4 сек</span>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-[#EFEDE8] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#B49E87] rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#222321]">Индекс удовлетворенности сервисом (NPS):</span>
                      <div className="space-x-3 text-right">
                        <span className="text-[#747775]">Среднее по SZR: 78%</span>
                        <span className="font-bold text-[#222321]">Премиум стандарт: 96%</span>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-[#EFEDE8] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#222321] rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: B2B PARTNERSHIP WITH FAIRMONT DUBAI */}
      {/* ================================================================= */}
      {researchTab === 'b2b' && (
        <div className="space-y-12">
          
          {/* Top Value Proposition Card */}
          <div className="bg-[#222321] text-white p-8 sm:p-10 rounded-3xl border border-[#353633] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs uppercase font-semibold text-[#7FA9BC] tracking-widest">
                  Стратегия B2B-партнерства
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-1">
                  Fairmont Dubai & Modern Medicine (Suite 2105)
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F6F3]/70 mt-1 max-w-2xl">
                  Трансформация локации на 21-м этаже из логистического барьера в эксклюзивное преимущество отельного медицинского консьержа (Concierge Medicine) без CapEx для отеля.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsB2BModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-[#7FA9BC] hover:bg-[#6894A8] text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Открыть официальный B2B Proposal</span>
                </button>

                <button
                  onClick={copyCoverLetter}
                  className="px-6 py-3 rounded-full bg-white text-[#222321] hover:bg-[#EFEDE8] text-xs font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5 text-[#7FA9BC]" />
                  <span>Скопировать Cover Letter для GM</span>
                </button>
              </div>
            </div>

            {/* Strategic Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {FAIRMONT_B2B_PARTNERSHIP.commercialBenefits.map((b, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#7FA9BC]" />
                    <span>{b.title}</span>
                  </div>
                  <p className="text-xs text-[#F7F6F3]/60 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Medical Menu */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest">
                Специализированный каталог
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
                Hotel Medical Menu: Услуги для постояльцев и делегатов WTC
              </h3>
              <p className="text-xs text-[#747775] mt-1">
                Продуктовая линейка адаптирована под туристов, бизнес-делегатов и участников выставок в соседнем Dubai World Trade Centre.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FAIRMONT_B2B_PARTNERSHIP.hotelMedicalMenu.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-[#E2DFD7] bg-[#F7F6F3] flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#7FA9BC] font-semibold uppercase">{item.category}</span>
                      <span className="bg-white px-2 py-0.5 rounded-full border border-[#E2DFD7] font-medium text-[#222321]">{item.time}</span>
                    </div>
                    <h4 className="font-serif font-bold text-lg text-[#222321]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#747775] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2DFD7] flex items-center justify-between">
                    <span className="text-xs text-[#747775]">{item.format}</span>
                    <span className="font-serif font-bold text-base text-[#222321]">{item.priceAED} AED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call Script & Objections for Concierge Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Phone Script */}
            <div className="bg-white p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-[#7FA9BC]" />
                <h4 className="font-serif text-2xl font-bold text-[#222321]">
                  Скрипт звонка в консьерж-службу отеля
                </h4>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-[#747775]">
                <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-1.5">
                  <span className="font-bold text-[#222321]">Целевой контакт: </span>
                  <span>{FAIRMONT_B2B_PARTNERSHIP.phoneScript.target}</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#E2DFD7] space-y-1.5">
                  <span className="font-bold text-[#222321]">Elevator Pitch (45 секунд): </span>
                  <p className="italic text-[#222321]/90">
                    «{FAIRMONT_B2B_PARTNERSHIP.phoneScript.elevatorPitch}»
                  </p>
                </div>
              </div>
            </div>

            {/* Objections Handling */}
            <div className="bg-white p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#7FA9BC]" />
                <h4 className="font-serif text-2xl font-bold text-[#222321]">
                  Отработка возражений консьержей
                </h4>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                {FAIRMONT_B2B_PARTNERSHIP.phoneScript.objections.map((obj, i) => (
                  <div key={i} className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-1.5">
                    <div className="font-bold text-red-700">Возражение: {obj.objection}</div>
                    <div className="text-[#222321]"><span className="font-semibold text-emerald-700">Ответ: </span>{obj.response}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Week Rollout Roadmap */}
          <div className="bg-white p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-5">
            <h4 className="font-serif text-2xl font-bold text-[#222321]">
              Дорожная карта запуска пилота B2B-партнерства (3 недели)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {FAIRMONT_B2B_PARTNERSHIP.rolloutRoadmap.map((step, i) => (
                <div key={i} className="p-5 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#7FA9BC]">{step.week}</span>
                  <p className="text-[#222321] leading-relaxed">{step.task}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 3: DOCTORS MEDIA PLAN & ORM REPUTATION */}
      {/* ================================================================= */}
      {researchTab === 'media-plan' && (
        <div className="space-y-12">
          
          {/* ORM Emergency Strategy Banner */}
          <div className="bg-[#EFEDE8] p-8 sm:p-10 rounded-3xl border border-[#E2DFD7] space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h3 className="font-serif text-2xl sm:text-3xl text-[#222321] font-bold">
                Антикризисный ORM: Выход из 1.0★ на картах Google & 2GIS
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#747775] leading-relaxed max-w-3xl">
              Текущий рейтинг 1.0 сформирован на основе единичных устаревших отзывов и блокирует до 70% конверсии отельного трафика в пользу Ora Care (5.0★). 
              Внедряется протокол **Feedback Capture** на стойке рецепции в Suite 2105: выявление довольных пациентов сразу после консультации и стимулирование публикации верифицированных отзывов для достижения паритета.
            </p>
          </div>

          {/* 4-Week Media Plan Matrix */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest">
                Контент-план клиники в Дубае
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
                Медиаплан продвижения врачей: Д-р Ольга Димова & Д-р Николай Руденко
              </h3>
              <p className="text-xs text-[#747775] mt-1">
                Фокус на доказательную медицину, разбор биомаркеров в личном кабинете и жизнь в климате ОАЭ для аудитории резидентов и туристов (до 23% медицинских туристов из СНГ и Европы).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCTORS_MEDIA_PLAN.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-[#E2DFD7] bg-[#F7F6F3] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#7FA9BC] font-bold uppercase">Неделя {item.week} • {item.day}</span>
                      <span className="bg-white px-2 py-0.5 rounded-full border border-[#E2DFD7] font-medium text-[#222321]">Reels / Telegram</span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#222321] leading-snug">
                      {item.topic}
                    </h4>

                    <div className="text-[11px] text-[#B49E87] font-semibold">
                      Спикер: {item.speaker}
                    </div>

                    <p className="text-xs text-[#747775] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2DFD7] text-xs text-[#7FA9BC] font-medium flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    <span>CTA: {item.cta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Official B2B Commercial Proposal Modal for Fairmont Dubai */}
      <B2BProposalModal
        isOpen={isB2BModalOpen}
        onClose={() => setIsB2BModalOpen(false)}
      />

    </div>
  );
};
