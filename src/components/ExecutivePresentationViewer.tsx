import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Building2, 
  UserCheck, 
  FileText,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Slide {
  number: number;
  totalSlides: number;
  tag: string;
  title: string;
  subtitle: string;
  accentBadge: string;
  blocks: {
    label: string;
    sublabel?: string;
    bullets: string[];
  }[];
  keyTakeaway: string;
}

export const ExecutivePresentationViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const slides: Slide[] = [
    {
      number: 1,
      totalSlides: 8,
      tag: 'СТРАТЕГИЧЕСКИЙ ДОКУМЕНТ • 2026',
      title: 'Цифровая платформа и маркетинг Modern Medicine в Дубае',
      subtitle: 'Стратегический план развития веб-платформы, интеграции EHR/PACS, комплаенса DHA и коммерческого роста клиники',
      accentBadge: 'Fairmont Dubai • Suite 2105',
      blocks: [
        {
          label: 'Локация & Позиционирование',
          bullets: [
            'Отель Fairmont Dubai (Sheikh Zayed Road, Trade Centre 1), 21-й этаж, Suite 2105 (205 м²).',
            'Премиальный сегмент доказательной медицины: Out-of-pocket & Cash-pay услуги.',
            'Целевая аудитория: Резиденты ОАЭ, русскоязычные экспаты (23% турпотока) и гости люксов Fairmont.',
          ],
        },
        {
          label: 'Ключевые вызовы рынка Дубая',
          bullets: [
            'Регуляторные барьеры обязательного страхования (EBP) и требования DHA / NABIDH v2.4.',
            'Конкурент Ora Care на 1-м этаже отеля с рейтингом 5.0★ (134 отзыва) против текущего рейтинга Modern Medicine 1.0★.',
            'Необходимость прямого B2B-консьерж шлюза со службой Front Desk Fairmont Dubai.',
          ],
        },
      ],
      keyTakeaway: 'Вводная презентация для руководства Modern Medicine (Елены Киреевой). Охватывает инженерный стек, Личный кабинет (EHR), регламент DHA и маркетинговую стратегию победы над конкурентами.',
    },
    {
      number: 2,
      totalSlides: 8,
      tag: 'СЕРВИСНАЯ ЭКОСИСТЕМА',
      title: 'Трансформация сайта в сервисную экосистему обеспечит лидерство',
      subtitle: 'Переход от информационного буклета к высокотехнологичной сервисной платформе 24/7',
      accentBadge: '3 языка • HL7 FHIR • Core Web Vitals < 2.2s',
      blocks: [
        {
          label: 'Мультиязычный UX & RTL',
          sublabel: '3 ЯЗЫКА (RU, EN, AR)',
          bullets: [
            'Полная адаптация под арабоязычных VIP-пациентов со сквозной RTL-версткой справа налево.',
            'Русскоязычная и англоязычная версии для резидентов и туристов (паритетный охват).',
            'Мгновенный перевод лидов в WhatsApp-консьерж с русскоязычной координацией.',
          ],
        },
        {
          label: 'Интеграции & Скорость',
          sublabel: 'CORE WEB VITALS < 2.2s',
          bullets: [
            'Поддержка стандартов HL7 FHIR и SMART on FHIR для надежной синхронизации медкарт.',
            'Просмотр снимков PACS через DICOMweb (WADO-RS) прямо в браузере без утяжеления сайта.',
            'Оптимизация под 5G-сети ОАЭ: LCP ≤ 2.2с, INP ≤ 150мс, CLS ≤ 0.05.',
          ],
        },
        {
          label: 'Защита данных & Комплаенс',
          sublabel: '100% DHA & NABIDH READY',
          bullets: [
            'Банковский уровень шифрования AES-256 и строгая изоляция медицинских записей (PHI).',
            'Полный отказ от сторонних пикселей (Meta/Google) в авторизованном контуре пациентов.',
            'Фокус на высокомаржинальные прямые услуги: IV Drip (900 AED), Чек-апы (2,400 AED), Эстетика (1,350 AED).',
          ],
        },
      ],
      keyTakeaway: 'Ключевые результаты: 3 языка с нативным RTL, ультрабыстрый 5G-фронтенд, интеграция с клиническими системами и 100% юридическая защита от штрафов DHA.',
    },
    {
      number: 3,
      totalSlides: 8,
      tag: 'ПУТЬ ПАЦИЕНТА (CJM)',
      title: 'Безупречный UX, WhatsApp-консьерж и выезд в номер 24/7',
      subtitle: 'Сокращение пути от первого контакта до подтверждения записи с 14 минут до 45 секунд',
      accentBadge: 'SLA прибытия в номер 15–25 мин',
      blocks: [
        {
          label: '01. Нативная мультиязычность и RTL-адаптация',
          bullets: [
            'Культурная и визуальная адаптация: поддержка нативного арабского шрифта, переключение в 1 клик.',
            'Автоконвертер цен в 3 валюты: Дирхамы ОАЭ (AED), Доллары США (USD) и Рубли (RUB).',
          ],
        },
        {
          label: '02. Мгновенная запись через WhatsApp Direct 1-Click',
          bullets: [
            'Прямой переход с форм сайта в зашифрованный чат с дежурным администратором Suite 2105.',
            'Генерация предзаполненного сообщения с кодом выбранной процедуры и желаемым временем визита.',
          ],
        },
        {
          label: '03. Заказ выездных услуг (Fairmont Suite Visit 24/7)',
          bullets: [
            'Вызов врача или медсестры в номер отеля Fairmont Dubai за 15–25 минут с мобильным набором Jet Lag IV.',
            'Автоматический расчет 15% агентской комиссии для включения в фолио отеля (Non-Room Revenue).',
          ],
        },
        {
          label: '04. Региональные среднерыночные цены Дубая (2026)',
          bullets: [
            'Прием терапевта (GP) + УЗИ экспертного класса: 700 AED (Д-р Николай Руденко).',
            'Прием ведущего гинеколога: 675 AED (Д-р Ольга Димова) | Выезд дежурного врача: 950 AED.',
          ],
        },
      ],
      keyTakeaway: 'Фронтенд ориентирован на мобильные устройства, бесшовный переход в мессенджеры и оперативное бронирование инфузий в номера люкс.',
    },
    {
      number: 4,
      totalSlides: 8,
      tag: 'ПАЦИЕНТСКИЙ СЕРВИС',
      title: 'Личный кабинет объединяет биомаркеры, историю и телемедицину',
      subtitle: 'Инструмент удержания пациентов и роста пожизненной ценности (LTV) клиники',
      accentBadge: 'EHR Portal • Графики D3 • Digital Intake',
      blocks: [
        {
          label: 'МОДУЛЬ 01: Мониторинг биомаркеров',
          bullets: [
            'Интерактивные графики динамики Ферритина, Витамина D3, Кортизола и клеточного баланса.',
            'Наглядная визуализация эффекта от курсов инфузионной терапии и нутрицевтиков.',
          ],
        },
        {
          label: 'МОДУЛЬ 02: История процедур & Протоколы УЗИ',
          bullets: [
            'Архив курсов капельниц Jet Lag Recovery, процедур ZO Skin Health (1,350 AED) и назначений.',
            'Безопасное хранение сонографических отчетов сканера Mindray и цифровых заключений.',
          ],
        },
        {
          label: 'МОДУЛЬ 03: Digital Intake (Pre-Check-in)',
          bullets: [
            'Дистанционное заполнение анкеты здоровья и подписание согласий до визита в клинику.',
            'Полная ликвидация очередей на стойке регистрации Suite 2105 и экономия 12 минут на первичном приеме.',
          ],
        },
        {
          label: 'МОДУЛЬ 04: Телемедицина & ИИ-Триаж',
          bullets: [
            'Зашифрованный чат повторных консультаций и ИИ-ассистент маршрутизации жалоб (Gemini AI).',
            'Строгое соблюдение циркуляров DHA: ИИ как координатор, исключающий автоматические клинические диагнозы.',
          ],
        },
      ],
      keyTakeaway: 'Функционал Цифрового кабинета стимулирует повторные визиты за счет персонального трекинга здоровья и освобождает до 35% времени врачей.',
    },
    {
      number: 5,
      totalSlides: 8,
      tag: 'КЛИНИЧЕСКИЙ СТЕК',
      title: 'Стандарты HL7 FHIR и DICOMweb обеспечивают безопасность',
      subtitle: 'Архитектура корпоративного уровня с нулевым риском утечки медицинских данных',
      accentBadge: 'OAuth 2.0 PKCE • API Gateway • WADO-RS',
      blocks: [
        {
          label: '1. Авторизация & Доступ: SMART on FHIR',
          bullets: [
            'Протокол OAuth 2.0 с PKCE для динамической аутентификации веб-приложения в защищенной EHR.',
            'Поддержка двухфакторной аутентификации (MFA) и доверенного семейного доступа (Proxy Access).',
          ],
        },
        {
          label: '2. Промежуточный слой: HL7 FHIR REST API Gateway',
          bullets: [
            'Изолированный слой Middleware фильтрует запросы и полностью исключает прямой доступ клиента к базе данных.',
            'Совместимость с протоколами единой государственной платформы NABIDH v2.4 (DHA).',
          ],
        },
        {
          label: '3. Хранение снимков: DICOMweb & WADO-RS',
          bullets: [
            'Прямая передача медицинских снимков с УЗИ-аппарата в веб-просмотрщик без перегрузки трафика.',
            'Локальное кэширование и мгновенное открытие снимков высокого разрешения на планшетах врачей.',
          ],
        },
      ],
      keyTakeaway: 'Архитектура полностью изолирует медицинскую базу данных клиники, обеспечивая мгновенную скорость работы при абсолютном соответствии нормам ОАЭ.',
    },
    {
      number: 6,
      totalSlides: 8,
      tag: 'БЕЗОПАСНОСТЬ & ПЕРСОНАЛ',
      title: 'Защита PHI и протоколы против выгорания врачей (PACE)',
      subtitle: 'Баланс между бескомпромиссным юридическим комплаенсом и комфортом работы докторов',
      accentBadge: 'Защита от штрафов DHA • Протокол PACE',
      blocks: [
        {
          label: 'Стандарты безопасности ОАЭ',
          bullets: [
            'Строгий запрет на Meta Pixel, Google Analytics и сторонние скрипты в авторизованной зоне пациентов.',
            'Шифрование данных PHI на уровне AES-256 и размещение серверов в локальном контуре ОАЭ (UAE Cloud).',
            'Автоматическая генерация аудиторского журнала обращений к медицинским записям для проверок DHA.',
          ],
        },
        {
          label: 'Защита врачей от цифрового выгорания',
          bullets: [
            'Протокол командного триажа (PACE): снятие 26% рутинной нагрузки с Д-ра Димовой и Д-ра Руденко.',
            'Администраторы клиники обрабатывают рутинные вопросы, запись и рецепты, освобождая врачебный ресурс.',
            'Выделенные буферные слоты в расписании для качественной подготовки к сложным пациентам.',
          ],
        },
      ],
      keyTakeaway: 'Платформа юридически страхует клинику от регуляторных санкций DHA и создает бережный рабочий график для ведущих докторов клиники.',
    },
    {
      number: 7,
      totalSlides: 8,
      tag: 'МАРКЕТИНГОВАЯ СТРАТЕГИЯ',
      title: 'Фокус на out-of-pocket услуги, антикризисный ORM и бренд отеля',
      subtitle: 'План преодоления рейтинга 1.0★ и привлечения платежеспособных резидентов и туристов',
      accentBadge: 'План победы над Ora Care 5.0★ • Non-Room Revenue',
      blocks: [
        {
          label: 'СТРАТЕГИЯ 01: Out-of-pocket Услуги',
          bullets: [
            'Продвижение high-margin процедур: IV Drip «Jetlag Recovery» (900 AED), уход ZO Skin Health (1,350 AED) и Check-Up (2,400 AED).',
            'Интеграция рассрочки BNPL (Tabby / Tamara 4 частями) для чеков от 1,000 AED.',
          ],
        },
        {
          label: 'СТРАТЕГИЯ 02: Антикризисный ORM (Сбор отзывов)',
          bullets: [
            'План нейтрализации конкурента Ora Care (1-й этаж Fairmont, 5.0★ / 134 отзыва): запуск QR-сбора отзывов на стойке Suite 2105.',
            'Цель: преодолеть рейтинг 1.0★ и выйти на 4.8+★ в Google Maps и 2GIS за первые 60 дней работы.',
          ],
        },
        {
          label: 'СТРАТЕГИЯ 03: Личные бренды врачей',
          bullets: [
            'Экспертный видеоконтент и клинические разборы в соцсетях: Д-р Ольга Димова и Д-р Николай Руденко.',
            'Формирование статуса ключевых русскоязычных и международных экспертов доказательной медицины в Дубае.',
          ],
        },
        {
          label: 'СТРАТЕГИЯ 04: B2B Консьерж Fairmont & WTC',
          bullets: [
            'Партнерство с Front Desk отеля: генерация Non-Room Revenue (15% комиссия отелю).',
            'Спецпредложение для участников выставок Dubai World Trade Centre (WTC Energy Pass 750 AED).',
          ],
        },
      ],
      keyTakeaway: 'Синхронизация безупречного сервиса в Suite 2105, QR-сбора отзывов и B2B-партнерства с Fairmont позволит клинике доминировать в локации Trade Centre.',
    },
    {
      number: 8,
      totalSlides: 8,
      tag: 'ДОРОЖНАЯ КАРТА & БЮДЖЕТ',
      title: 'Быстрый запуск MVP за 3.5 недели с окупаемостью от 28 дней',
      subtitle: 'Актуализированный поэтапный график внедрения взамен устаревшего 12-недельного плана',
      accentBadge: 'MVP за 3.5 нед. • 32,500 AED • Окупаемость ~28 дней',
      blocks: [
        {
          label: 'ЭТАП 1: MVP Старт (3.5 недели)',
          sublabel: 'БЮДЖЕТ: 32,500 AED (~$8,850 USD)',
          bullets: [
            'Сайт RU/EN/AR с поддержкой RTL, мультивалютный прайс и карточки услуг.',
            'WhatsApp 1-Click запись, B2B-шлюз для отеля Fairmont и QR-перехват отзывов ORM.',
            'Результат: Клиника уже начинает принимать заявки и генерировать выручку!',
          ],
        },
        {
          label: 'ЭТАП 2: Сбалансированный релиз (+3.0 недели / Всего 6.5 нед.)',
          sublabel: 'БЮДЖЕТ: 47,500 AED (~$12,950 USD)',
          bullets: [
            'Личный кабинет пациента (EHR) и трекеры биомаркеров (Ферритин, D3).',
            'Digital Intake (онлайн-анамнез), ИИ-триаж симптомов (Gemini) и защита PACE.',
            'Результат: Полноценная экосистема клиники с высоким удержанием пациентов.',
          ],
        },
        {
          label: 'ЭТАП 3: Full Premium VIP (+2.5 недели / Всего 9.0 нед.)',
          sublabel: 'БЮДЖЕТ: 60,000 AED (~$16,350 USD)',
          bullets: [
            'Онлайн-эквайринг Stripe, Apple Pay и рассрочка BNPL (Tabby / Tamara 4 платежа).',
            'Пентест безопасности PHI, интеграция с кассовыми системами и финальная сдача в Suite 2105.',
          ],
        },
      ],
      keyTakeaway: 'Поэтапный график (30% аванс / 40% бета / 30% релиз) дает запуск коммерческого потока уже через 3.5 недели с быстрой окупаемостью за 28–45 дней.',
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleCopyPresentationText = () => {
    let fullText = `ПРЕЗЕНТАЦИЯ ДЛЯ РУКОВОДСТВА КЛИНИКИ MODERN MEDICINE DUBAI (2026)\n\n`;
    slides.forEach((s) => {
      fullText += `=========================================\n`;
      fullText += `СЛАЙД ${s.number} ИЗ ${s.totalSlides}: ${s.title.toUpperCase()}\n`;
      fullText += `Подзаголовок: ${s.subtitle}\n`;
      fullText += `Бейдж: ${s.accentBadge}\n\n`;
      s.blocks.forEach((b) => {
        fullText += `[${b.label}${b.sublabel ? ` — ${b.sublabel}` : ''}]\n`;
        b.bullets.forEach((bullet) => {
          fullText += `• ${bullet}\n`;
        });
        fullText += `\n`;
      });
      fullText += `Главный вывод слайда: ${s.keyTakeaway}\n\n`;
    });

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    confetti({ particleCount: 30, spread: 60 });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#E2DFD7] shadow-sm space-y-8">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1EDE6] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7FA9BC]" />
            <span className="text-[10px] font-bold text-[#7FA9BC] uppercase tracking-widest">
              Актуализированная презентация • 8 слайдов
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#222321] font-bold mt-0.5">
            Презентация для руководства клиники (Елены Киреевой)
          </h3>
          <p className="text-xs text-[#747775] mt-0.5">
            Синхронизирована со среднерыночными тарифами Дубая 2026 и быстрым запуском MVP за 3.5 недели.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyPresentationText}
            className="px-4 py-2 rounded-full bg-[#F7F6F3] hover:bg-[#EFEDE8] border border-[#E2DFD7] text-[#222321] text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#7FA9BC]" />}
            <span>{copied ? 'Текст скопирован!' : 'Скопировать все 8 слайдов'}</span>
          </button>
        </div>
      </div>

      {/* Slide Navigation Pagination Tracker */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar pb-2">
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.number}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                currentSlideIndex === idx
                  ? 'bg-[#222321] text-white shadow-xs'
                  : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321] hover:bg-[#EFEDE8]'
              }`}
            >
              Слайд 0{s.number}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-[#747775] shrink-0">
          {currentSlideIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Slide Frame (Card mimicking high-end presentation deck) */}
      <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-10 border border-[#E2DFD7] shadow-md space-y-6 relative overflow-hidden transition-all duration-300">
        
        {/* Subtle decorative watermark */}
        <div className="absolute right-4 bottom-4 text-[120px] font-serif font-bold text-[#E2DFD7]/20 select-none pointer-events-none">
          0{currentSlide.number}
        </div>

        {/* Slide Header */}
        <div className="space-y-2 border-b border-[#E2DFD7] pb-5 relative z-10">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#7FA9BC] bg-white px-2.5 py-0.5 rounded-full border border-[#E2DFD7]">
              {currentSlide.tag}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#222321] text-white">
              {currentSlide.accentBadge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#222321] font-bold leading-tight">
            {currentSlide.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#747775] font-light max-w-3xl leading-relaxed">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Slide Body Content Blocks */}
        <div className={`grid grid-cols-1 ${currentSlide.blocks.length === 3 ? 'md:grid-cols-3' : currentSlide.blocks.length === 4 ? 'sm:grid-cols-2' : 'md:grid-cols-2'} gap-4 relative z-10`}>
          {currentSlide.blocks.map((block, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-[#E2DFD7] space-y-3 shadow-xs"
            >
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#222321]">
                  {block.label}
                </h4>
                {block.sublabel && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7FA9BC] font-semibold block mt-0.5">
                    {block.sublabel}
                  </span>
                )}
              </div>

              <ul className="space-y-2 text-xs text-[#747775]">
                {block.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] shrink-0 mt-1.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Slide Footer Key Takeaway Box */}
        <div className="p-4 rounded-2xl bg-white border border-[#E2DFD7] flex items-start gap-3 text-xs text-[#222321] relative z-10">
          <Sparkles className="w-4 h-4 text-[#7FA9BC] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#222321]">Вывод слайда: </strong>
            <span className="text-[#747775]">{currentSlide.keyTakeaway}</span>
          </div>
        </div>

      </div>

      {/* Slide Navigation Buttons Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentSlideIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-[#F7F6F3] text-[#A8AAA5]'
              : 'bg-white hover:bg-[#EFEDE8] border border-[#E2DFD7] text-[#222321] cursor-pointer shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Предыдущий слайд</span>
        </button>

        <span className="text-xs text-[#747775] hidden sm:inline">
          Используйте стрелки или верхние кнопки для переключения
        </span>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
          className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentSlideIndex === slides.length - 1
              ? 'opacity-40 cursor-not-allowed bg-[#F7F6F3] text-[#A8AAA5]'
              : 'bg-[#222321] hover:bg-black text-white cursor-pointer shadow-md'
          }`}
        >
          <span>Следующий слайд</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
