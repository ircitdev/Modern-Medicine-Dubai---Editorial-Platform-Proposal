import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Printer, 
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AudioPodcastPlayer } from './AudioPodcastPlayer';

interface B2BProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2B_PROPOSAL_TEXT = `B2B Proposal: Modern Medicine × Fairmont Dubai
КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ
Стратегическое партнерство в сфере премиального медицинского консьерж-сервиса (Concierge Medicine) для постояльцев отеля Fairmont Dubai
КОМУ: Генеральному менеджменту & Concierge Team, Fairmont Dubai
ОТ КЕМ: Modern Medicine Medical Center (Office 2105, 21-й этаж)
ДАТА: 2026 год
СТАТУС: Конфиденциально / B2B Партнерство

1. Исполнительное резюме и Концепция партнерства
Размещение многопрофильного медицинского центра Modern Medicine Medical Center на 21-м этаже (офис 2105) пятизвездочного отеля Fairmont Dubai создает уникальную возможность для формирования эксклюзивного сервиса медицинского консьержа (Concierge Medicine). Наличие лицензированной клиники Управления здравоохранения Дубая (DHA) непосредственно в здании отеля позволяет превратить архитектурную локацию в ценное инфраструктурное преимущество для гостей Fairmont Dubai.
Основная цель партнерства — предоставление постояльцам отеля, туристам, бизнес-делегатам и участникам международных выставок в Dubai World Trade Centre (WTC) круглосуточного бесшовного доступа к премиальной медицинской помощи, быстрой экспресс-диагностике и восстановительной терапии без необходимости покидать территорию отельного комплекса.

2. Меню медицинских услуг для гостей отеля (Hotel Medical Menu)
Продуктовая линейка Modern Medicine адаптирована под специфические запросы постояльцев пятизвездочного отеля:

• Jet Lag Recovery & Hydration IV Drips
  Описание: Восстановительные витаминные капельницы после длительных перелетов. Снятие обезвоживания, джетлага, восстановление сил перед встречами.
  Формат: В клинике (21 эт.) или в номер отеля
  Время: 35–45 мин

• Home / Room Visit 24/7
  Описание: Оперативный выезд врача общей практики (GP) или медсестры в номер отеля за 15–30 минут при недомоганиях, симптомах ОРВИ или травмах.
  Формат: Круглосуточно в номер гостя
  Время: Прибытие 15–25 мин

• Executive Health Check-up
  Описание: Экспресс-диагностика здоровья: ультразвуковое исследование (УЗИ), забор биомаркеров (Ферритин, D3) с выдачей цифрового отчета.
  Формат: В клинике (21 эт.), 45–60 минут

• Urgent Dental & Dermatology Care
  Описание: Неотложная помощь при острой зубной боли, аллергических реакциях кожи на солнце или кондиционеры, эстетический уход ZO Skin Health.
  Формат: В клинике (офис 2105)

3. Операционная модель и взаимодействие с службой консьержей
• Выделенный канал связи (Concierge Direct Line): Прямой зашифрованный чат в WhatsApp для службы Concierge Desk и Front Desk отеля для моментальной передачи заявок.
• Приоритет VIP Fast-Track: Прием гостей отеля без очередей и личное сопровождение администратором от лифтового холла 21-го этажа.
• Многоязычный персонал: Врачи и медицинские координаторы свободно владеют арабским, английским и русским языками, что исключает языковой барьер для постояльцев из любых стран.
• Интеграция цифровых материалов: Размещение стильных QR-карт и информационных брошюр в номерах (Guest Directory), на стойке консьержа и в Executive Lounges.

4. Коммерческие условия и преимущества для отеля Fairmont Dubai
Партнерство строится на взаимовыгодной основе и создает дополнительные финансовые и репутационные преимущества для отеля:
• Агентское вознаграждение / Партнерский бонус: Отель получает фиксированную комиссию за каждую направленную медицинскую процедуру или выезд в номер (out-of-pocket услуги).
• Рост удовлетворенности гостей (CSAT / NPS): Наличие собственного 24/7 медицинского сервиса повышает оценки отеля в отзывах и снижает стресс гостей при экстренных ситуациях.
• Корпоративные привилегии для сотрудников: Специальные льготные тарифы на медицинское обслуживание, чек-апы и УЗИ-диагностику для менеджмента и персонала отеля Fairmont Dubai.

5. Стандарты безопасности, лицензирование и соблюдение норм ОАЭ
Modern Medicine Medical Center оперирует в полном соответствии с жесткими требованиями законодательства эмирата Дубай:
• Лицензирование DHA: Все медицинские специалисты клиники и выездные бригады обладают действующими лицензиями Управления здравоохранения Дубая (Dubai Health Authority).
• Защита персональных данных (PHI): Полное соответствие стандартам конфиденциальности ОАЭ и безопасный обмен информацией без использования открытых публичных каналов.
• Страховое покрытие и ответственность: Профессиональная медицинская ответственность клиники застрахована ведущими страховыми институтами ОАЭ.

6. Дорожная карта запуска пилотного проекта (3 недели)
• Неделя 1: Подписание B2B-соглашения, утверждение регламентов взаимодействия и выездного прейскуранта. (Ответственные: Руководство Modern Medicine & Fairmont)
• Неделя 2: Проведение брифинга для Concierge Desk / Front Desk, передача брендированных QR-карт и настройка WhatsApp-линии. (Ответственные: Маркетинг & Операционный отдел)
• Неделя 3: Официальный старт сервиса, запуск выездных капельниц и подведение первых итогов через 30 дней. (Ответственные: Служба консьержей & Мед. координаторы)

С уважением и готовностью к сотрудничеству,
Команда руководства Modern Medicine Medical Center
Fairmont Dubai, Office 2105, Sheikh Zayed Road, Dubai, UAE
WhatsApp / Direct Concierge Line: +971 52 926 6594 | info@modernmedicine.ae
Modern Medicine Medical Center | Office 2105, Fairmont Dubai`;

export const B2BProposalModal: React.FC<B2BProposalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(B2B_PROPOSAL_TEXT);
    setCopied(true);
    confetti({ particleCount: 30, spread: 60 });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([B2B_PROPOSAL_TEXT], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'B2B_Proposal_ModernMedicine_FairmontDubai.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(`B2B Proposal: Modern Medicine × Fairmont Dubai (Suite 2105)\n\nУважаемый менеджмент отеля Fairmont Dubai, направляем официальное коммерческое предложение по медицинскому консьерж-сервису 24/7.\n\n${B2B_PROPOSAL_TEXT.slice(0, 1500)}...\n\nПолный текст предложения доступен по запросу.`);
    window.open(`https://wa.me/971529266594?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF9F5] w-full max-w-4xl max-h-[92vh] rounded-3xl border border-[#E2DFD7] shadow-2xl flex flex-col overflow-hidden text-[#222321]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="p-5 sm:p-7 bg-[#222321] text-white flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7FA9BC]/20 text-[#7FA9BC] flex items-center justify-center border border-[#7FA9BC]/30">
              <Building2 className="w-5 h-5 text-[#7FA9BC]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7FA9BC] font-semibold">
                  Официальный документ • B2B Partnership
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-white/10 text-white font-mono">
                  Suite 2105
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                B2B Proposal: Modern Medicine × Fairmont Dubai
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              title="Скопировать текст"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#7FA9BC]" />}
              <span className="hidden sm:inline">{copied ? 'Скопировано!' : 'Копировать'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              title="Скачать документ .md"
            >
              <Download className="w-3.5 h-3.5 text-[#7FA9BC]" />
              <span className="hidden sm:inline">Скачать .md</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-xs sm:text-sm leading-relaxed font-sans">
          
          {/* Executive Audio Briefing for Fairmont GM */}
          <AudioPodcastPlayer
            initialEpisodeId="podcast-vip-fairmont"
            variant="compact"
            titleOverride="Аудио-брифинг: «Цифровая стратегия Modern Medicine для VIP-пациентов (Fairmont Suite 2105)»"
          />
          
          {/* Document Header Plaque */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2DFD7] shadow-xs space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-[#F1EDE6] pb-4">
              <div>
                <span className="text-[#747775] block text-[10px] uppercase">КОМУ:</span>
                <strong className="text-[#222321] text-xs">Генеральному менеджменту & Concierge Team, Fairmont Dubai</strong>
              </div>
              <div>
                <span className="text-[#747775] block text-[10px] uppercase">ОТ КОГО:</span>
                <strong className="text-[#222321] text-xs">Modern Medicine Medical Center (Office 2105, 21-й этаж)</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#747775]">
              <div><strong>ДАТА:</strong> 2026 год</div>
              <div><strong>СТАТУС:</strong> <span className="text-emerald-700 font-bold">Конфиденциально / B2B Партнерство</span></div>
              <div><strong>ЛОКАЦИЯ:</strong> Suite 2105, Fairmont Dubai (205 м²)</div>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#222321] border-b border-[#E2DFD7] pb-1.5 flex items-center gap-2">
              <span className="text-[#7FA9BC] font-mono text-sm">1.</span>
              <span>Исполнительное резюме и Концепция партнерства</span>
            </h4>
            <p className="text-[#474A45] leading-relaxed">
              Размещение многопрофильного медицинского центра <strong>Modern Medicine Medical Center</strong> на 21-м этаже (офис 2105) пятизвездочного отеля Fairmont Dubai создает уникальную возможность для формирования эксклюзивного сервиса медицинского консьержа (Concierge Medicine). Наличие лицензированной клиники Управления здравоохранения Дубая (DHA) непосредственно в здании отеля позволяет превратить архитектурную локацию в ценное инфраструктурное преимущество для гостей Fairmont Dubai.
            </p>
            <p className="text-[#474A45] leading-relaxed">
              Основная цель партнерства — предоставление постояльцам отеля, туристам, бизнес-делегатам и участникам международных выставок в Dubai World Trade Centre (WTC) круглосуточного бесшовного доступа к премиальной медицинской помощи, быстрой экспресс-диагностике и восстановительной терапии без необходимости покидать территорию отельного комплекса.
            </p>
          </div>

          {/* Section 2: Hotel Medical Menu Table */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#222321] border-b border-[#E2DFD7] pb-1.5 flex items-center gap-2">
              <span className="text-[#7FA9BC] font-mono text-sm">2.</span>
              <span>Меню медицинских услуг для гостей отеля (Hotel Medical Menu)</span>
            </h4>
            <p className="text-[#747775] text-xs">
              Продуктовая линейка Modern Medicine адаптирована под специфические запросы постояльцев пятизвездочного отеля:
            </p>

            <div className="overflow-x-auto border border-[#E2DFD7] rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFEDE8] text-[#222321] font-serif border-b border-[#E2DFD7]">
                  <tr>
                    <th className="p-3.5 font-bold">Направление услуги</th>
                    <th className="p-3.5 font-bold">Описание и ценность для гостя</th>
                    <th className="p-3.5 font-bold">Формат оказания</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EDE6]">
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="p-3.5 font-bold text-[#222321]">
                      Jet Lag Recovery & Hydration IV Drips
                    </td>
                    <td className="p-3.5 text-[#474A45]">
                      Восстановительные витаминные капельницы после длительных перелетов. Снятие обезвоживания, джетлага, восстановление сил перед встречами.
                    </td>
                    <td className="p-3.5 text-[#7FA9BC] font-medium">
                      В клинике (21 эт.) или в номер отеля
                    </td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="p-3.5 font-bold text-[#222321]">
                      Home / Room Visit 24/7
                    </td>
                    <td className="p-3.5 text-[#474A45]">
                      Оперативный выезд врача общей практики (GP) или медсестры в номер отеля за 15–30 минут при недомоганиях, симптомах ОРВИ или травмах.
                    </td>
                    <td className="p-3.5 text-emerald-700 font-medium">
                      Круглосуточно в номер гостя (SLA 15–25 мин)
                    </td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="p-3.5 font-bold text-[#222321]">
                      Executive Health Check-up
                    </td>
                    <td className="p-3.5 text-[#474A45]">
                      Экспресс-диагностика здоровья: ультразвуковое исследование (УЗИ), забор биомаркеров (Ферритин, D3) с выдачей цифрового отчета.
                    </td>
                    <td className="p-3.5 text-[#7FA9BC] font-medium">
                      В клинике (21 эт.), 45–60 минут
                    </td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="p-3.5 font-bold text-[#222321]">
                      Urgent Dental & Dermatology Care
                    </td>
                    <td className="p-3.5 text-[#474A45]">
                      Неотложная помощь при острой зубной боли, аллергических реакциях кожи на солнце или кондиционеры, эстетический уход ZO Skin Health.
                    </td>
                    <td className="p-3.5 text-[#222321] font-medium">
                      В клинике (офис 2105)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#222321] border-b border-[#E2DFD7] pb-1.5 flex items-center gap-2">
              <span className="text-[#7FA9BC] font-mono text-sm">3.</span>
              <span>Операционная модель и взаимодействие с службой консьержей</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-[#E2DFD7] space-y-1">
                <strong className="text-[#222321] text-xs block">• Выделенный канал связи (Concierge Direct Line)</strong>
                <p className="text-[#747775] text-xs">Прямой зашифрованный чат в WhatsApp для службы Concierge Desk и Front Desk отеля для моментальной передачи заявок.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2DFD7] space-y-1">
                <strong className="text-[#222321] text-xs block">• Приоритет VIP Fast-Track</strong>
                <p className="text-[#747775] text-xs">Прием гостей отеля без очередей и личное сопровождение администратором от лифтового холла 21-го этажа.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2DFD7] space-y-1">
                <strong className="text-[#222321] text-xs block">• Многоязычный персонал</strong>
                <p className="text-[#747775] text-xs">Врачи и медицинские координаторы свободно владеют арабским, английским и русским языками.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2DFD7] space-y-1">
                <strong className="text-[#222321] text-xs block">• Интеграция цифровых материалов</strong>
                <p className="text-[#747775] text-xs">Размещение стильных QR-карт и информационных брошюр в номерах (Guest Directory), на стойке консьержа и в Executive Lounges.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#222321] border-b border-[#E2DFD7] pb-1.5 flex items-center gap-2">
              <span className="text-[#7FA9BC] font-mono text-sm">4.</span>
              <span>Коммерческие условия и преимущества для отеля Fairmont Dubai</span>
            </h4>
            <ul className="space-y-2 text-[#474A45]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] mt-2 shrink-0" />
                <span><strong>Агентское вознаграждение / Партнерский бонус: </strong> Отель получает фиксированную комиссию (15% Non-Room Revenue) за каждую направленную медицинскую процедуру или выезд в номер (out-of-pocket услуги).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] mt-2 shrink-0" />
                <span><strong>Рост удовлетворенности гостей (CSAT / NPS): </strong> Наличие собственного 24/7 медицинского сервиса повышает оценки отеля в отзывах и снижает стресс гостей при экстренных ситуациях.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] mt-2 shrink-0" />
                <span><strong>Корпоративные привилегии для сотрудников: </strong> Специальные льготные тарифы на медицинское обслуживание, чек-апы и УЗИ-диагностику для менеджмента и персонала отеля Fairmont Dubai.</span>
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#222321] border-b border-[#E2DFD7] pb-1.5 flex items-center gap-2">
              <span className="text-[#7FA9BC] font-mono text-sm">5.</span>
              <span>Стандарты безопасности, лицензирование и соблюдение норм ОАЭ</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#E2DFD7] space-y-1">
                <div className="font-bold text-[#222321] text-xs">Лицензирование DHA</div>
                <p className="text-[11px] text-[#747775]">Все специалисты и выездные бригады имеют действующие лицензии Dubai Health Authority.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E2DFD7] space-y-1">
                <div className="font-bold text-[#222321] text-xs">Защита данных (PHI)</div>
                <p className="text-[11px] text-[#747775]">Соответствие стандартам ОАЭ и безопасный зашифрованный обмен данными.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E2DFD7] space-y-1">
                <div className="font-bold text-[#222321] text-xs">Страховое покрытие</div>
                <p className="text-[11px] text-[#747775]">Профессиональная ответственность застрахована ведущими институтами ОАЭ.</p>
              </div>
            </div>
          </div>

          {/* Section 6: Roadmap Table */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#222321] border-b border-[#E2DFD7] pb-1.5 flex items-center gap-2">
              <span className="text-[#7FA9BC] font-mono text-sm">6.</span>
              <span>Дорожная карта запуска пилотного проекта (3 недели)</span>
            </h4>

            <div className="overflow-x-auto border border-[#E2DFD7] rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFEDE8] text-[#222321] font-serif border-b border-[#E2DFD7]">
                  <tr>
                    <th className="p-3.5 font-bold">Этап</th>
                    <th className="p-3.5 font-bold">Ключевые мероприятия</th>
                    <th className="p-3.5 font-bold">Ответственные</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EDE6]">
                  <tr>
                    <td className="p-3.5 font-bold font-mono text-[#7FA9BC]">Неделя 1</td>
                    <td className="p-3.5 text-[#474A45]">Подписание B2B-соглашения, утверждение регламентов взаимодействия и выездного прейскуранта.</td>
                    <td className="p-3.5 font-medium text-[#222321]">Руководство Modern Medicine & Fairmont</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-mono text-[#7FA9BC]">Неделя 2</td>
                    <td className="p-3.5 text-[#474A45]">Проведение брифинга для Concierge Desk / Front Desk, передача брендированных QR-карт и настройка WhatsApp-линии.</td>
                    <td className="p-3.5 font-medium text-[#222321]">Маркетинг & Операционный отдел</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-mono text-emerald-700">Неделя 3</td>
                    <td className="p-3.5 text-[#474A45]">Официальный старт сервиса, запуск выездных капельниц и подведение первых итогов через 30 дней.</td>
                    <td className="p-3.5 font-medium text-[#222321]">Служба консьержей & Мед. координаторы</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Signature Plaque */}
          <div className="p-6 rounded-2xl bg-[#EFEDE8] border border-[#E2DFD7] space-y-2 text-xs">
            <p className="font-serif italic text-sm text-[#222321]">С уважением и готовностью к сотрудничеству,</p>
            <div className="font-bold text-[#222321]">Команда руководства Modern Medicine Medical Center</div>
            <div className="text-[#747775]">Fairmont Dubai, Office 2105, Sheikh Zayed Road, Dubai, UAE</div>
            <div className="text-[#7FA9BC] font-mono">WhatsApp / Direct Concierge Line: +971 52 926 6594 | info@modernmedicine.ae</div>
          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="p-5 bg-white border-t border-[#E2DFD7] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#747775]">
            Modern Medicine Medical Center • Suite 2105, Fairmont Dubai
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Отправить в WhatsApp GM</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#222321] hover:bg-black text-white text-xs font-medium transition-all cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
