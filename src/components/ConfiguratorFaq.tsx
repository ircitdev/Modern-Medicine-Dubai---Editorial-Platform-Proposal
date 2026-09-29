import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Clock, DollarSign, Sparkles, Building2 } from 'lucide-react';

interface FaqItem {
  id: string;
  icon: React.ReactNode;
  question: string;
  category: string;
  answer: string;
  highlight?: string;
}

export const ConfiguratorFaq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('cost');

  const faqItems: FaqItem[] = [
    {
      id: 'cost',
      icon: <DollarSign className="w-4 h-4 text-[#7FA9BC]" />,
      category: 'Бюджет & Ценообразование',
      question: 'Как формируется итоговая стоимость разработки и есть ли скрытые расходы?',
      answer: 'Бюджет рассчитывается по фиксированной формуле: базовый инженерный сбор (15,000 AED) плюс 5,000 AED за каждую неделю производственного спринта выбранных модулей. Стоимость фиксируется в договоре и не подлежит пересмотру. В сумму включены дизайн, разработка, верстка RTL для арабского языка, настройка консьерж-шлюза и тестирование. Вы также видите пересчет в USD ($) и рубли (₽) по официальным курсам.',
      highlight: 'Фиксированный бюджет',
    },
    {
      id: 'timeline-mvp',
      icon: <Clock className="w-4 h-4 text-[#7FA9BC]" />,
      category: 'Сроки & MVP',
      question: 'Можно ли запустить платформу быстрее поэтапно (через MVP)?',
      answer: 'Да, для клиники Modern Medicine в Fairmont Dubai это оптимальная стратегия. Выбрав пресет «MVP Старт», вы получаете полностью работающий премиальный сайт, мультиязычный каталог услуг и 1-click запись в WhatsApp уже через 3–3.5 недели. Защищенный личный кабинет EHR, трекеры биомаркеров и ИИ-триаж запускаются следующим релизом, не прерывая поток первичных пациентов.',
      highlight: 'Запуск MVP за 3.5 нед.',
    },
    {
      id: 'payment-schedule',
      icon: <Sparkles className="w-4 h-4 text-[#7FA9BC]" />,
      category: 'Порядок расчетов',
      question: 'Какой график платежей предусмотрен для Елены Киреевой?',
      answer: 'Финансирование разделено на 3 прозрачных этапа: 30% аванс при согласовании ТЗ и старте Спринта 1; 40% после демонстрации рабочего MVP на dev-сервере и согласования с врачами; 30% финальный платеж после приемки всех модулей, аудита безопасности и развертывания платформы в Fairmont.',
      highlight: 'Оплата 30% / 40% / 30%',
    },
    {
      id: 'dha-security',
      icon: <ShieldCheck className="w-4 h-4 text-[#7FA9BC]" />,
      category: 'Регуляторика & Безопасность',
      question: 'Соответствует ли платформа законодательству ОАЭ и нормам DHA / NABIDH?',
      answer: 'Да. Архитектура разработана с учетом жестких нормативов Dubai Health Authority (DHA): используется банковское шифрование персональных данных PHI (AES-256), строгая изоляция баз данных и строгий запрет на сторонние маркетинговые трекеры (Meta Pixel, Google Analytics) в защищенных медицинских зонах, что защищает клинику от регуляторных штрафов.',
      highlight: '100% DHA & NABIDH Compliance',
    },
    {
      id: 'fairmont-integration',
      icon: <Building2 className="w-4 h-4 text-[#7FA9BC]" />,
      category: 'B2B Консьерж в отеле',
      question: 'Как организуется вызов врача в номер Fairmont и шлюз для консьержей?',
      answer: 'Мы внедряем закрытую консьерж-линию WhatsApp и QR-коды для Guest Directory в номерах. Служба Front Desk отеля Fairmont Dubai может оформить вызов врача в люкс за 1 минуту, норматив прибытия бригады из Suite 2105 составляет 15–25 минут. Отель получает автоматический расчет 15% агентской комиссии (Non-Room Revenue).',
      highlight: 'Выезд в номер за 15–25 мин',
    },
    {
      id: 'warranty-support',
      icon: <HelpCircle className="w-4 h-4 text-[#7FA9BC]" />,
      category: 'Гарантии & Обучение',
      question: 'Что входит в 30 дней бесплатной гарантийной поддержки после релиза?',
      answer: 'В гарантийный период включены: мониторинг доступности 99.9%, оперативное устранение любых возможных шероховатостей, резервное копирование данных, а также индивидуальное обучение администраторов рецепции и медицинских координаторов работе с заявками и Личным кабинетом.',
      highlight: '30 дней гарантии',
    },
  ];

  return (
    <div className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
      <div>
        <div className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Ответы на ключевые вопросы заказчика</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
          Частые вопросы по стоимости и срокам (FAQ)
        </h3>
        <p className="text-xs sm:text-sm text-[#747775] mt-1 max-w-2xl">
          Специально подготовлено для Елены Киреевой: финансовая модель, порядок спринтов, гарантии и регламент B2B-партнерства в Fairmont Dubai.
        </p>
      </div>

      <div className="space-y-3">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-[#F7F6F3] border-[#222321]' : 'bg-white border-[#E2DFD7] hover:border-[#7FA9BC]'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#E2DFD7] shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-wider mb-0.5">
                      {item.category}
                    </div>
                    <span className="font-serif font-bold text-base sm:text-lg text-[#222321] leading-snug">
                      {item.question}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.highlight && (
                    <span className="hidden sm:inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EFEDE8] text-[#222321]">
                      {item.highlight}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-5 h-5 text-[#747775] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#222321]' : ''
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#747775] leading-relaxed border-t border-[#E2DFD7]/60 mt-1 pl-14 animate-in fade-in duration-200">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
