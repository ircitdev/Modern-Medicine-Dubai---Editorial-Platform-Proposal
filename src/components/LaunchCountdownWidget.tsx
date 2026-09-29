import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Share2, 
  Rocket, 
  CalendarCheck,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LaunchCountdownWidgetProps {
  totalWeeks: number;
  selectedModulesCount: number;
  onNavigateToTimeline?: () => void;
}

export const LaunchCountdownWidget: React.FC<LaunchCountdownWidgetProps> = ({
  totalWeeks,
  selectedModulesCount,
  onNavigateToTimeline,
}) => {
  // Current simulated base date in Dubai
  const [currentDate] = useState<Date>(() => new Date());
  
  // Calculate total calendar days based on weeks
  const totalDays = useMemo(() => {
    return Math.max(14, Math.ceil(totalWeeks * 7));
  }, [totalWeeks]);

  // Projected Launch Date (Current date + total days)
  const targetLaunchDate = useMemo(() => {
    const target = new Date(currentDate.getTime());
    target.setDate(target.getDate() + totalDays);
    target.setHours(10, 0, 0, 0); // 10:00 AM Dubai Time
    return target;
  }, [currentDate, totalDays]);

  // Live countdown state (Days, Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: totalDays,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  const [calendarDownloaded, setCalendarDownloaded] = useState<boolean>(false);

  // Live ticking countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diffMs = targetLaunchDate.getTime() - now.getTime();

      if (diffMs > 0) {
        const d = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const h = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diffMs % (1000 * 60)) / 1000);

        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      } else {
        setTimeLeft({ days: totalDays, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetLaunchDate, totalDays]);

  // Formatted date string in Russian
  const formattedLaunchDate = useMemo(() => {
    return targetLaunchDate.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [targetLaunchDate]);

  // Generate .ics calendar invite
  const handleDownloadCalendarEvent = () => {
    const startStr = targetLaunchDate.toISOString().replace(/-|:|\.\d\d\d/g, '').substring(0, 15) + 'Z';
    const endStr = new Date(targetLaunchDate.getTime() + 2 * 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '')
      .substring(0, 15) + 'Z';

    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Modern Medicine Dubai//Launch Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Боевой запуск (Go-Live) платформы Modern Medicine в Fairmont Dubai
DESCRIPTION:Торжественный запуск сервисной платформы Modern Medicine Medical Center (Suite 2105, 21-й этаж Fairmont Dubai). Включает прием заявок, Личный кабинет и шлюз отеля.
LOCATION:Suite 2105, Fairmont Dubai, Sheikh Zayed Road, Dubai
DTSTART:${startStr}
DTEND:${endStr}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Modern_Medicine_Dubai_GoLive.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarDownloaded(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCalendarDownloaded(false), 3000);
  };

  // Milestone phases based on days
  const milestones = [
    {
      title: 'Старт спринта & Депозит',
      daysOffset: 0,
      date: new Date(currentDate.getTime()).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      status: 'active',
      desc: 'Подписание ТЗ и старт сборки',
    },
    {
      title: 'Alpha-версия (RU/EN/AR)',
      daysOffset: Math.round(totalDays * 0.35),
      date: new Date(currentDate.getTime() + Math.round(totalDays * 0.35) * 86400000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      status: 'pending',
      desc: 'RTL верстка и каталог услуг',
    },
    {
      title: 'Beta-релиз & Консьерж',
      daysOffset: Math.round(totalDays * 0.7),
      date: new Date(currentDate.getTime() + Math.round(totalDays * 0.7) * 86400000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      status: 'pending',
      desc: 'B2B шлюз Fairmont и ORM 5.0★',
    },
    {
      title: 'Go-Live в Suite 2105',
      daysOffset: totalDays,
      date: targetLaunchDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      status: 'target',
      desc: 'Финальная сдача и запуск потока',
    },
  ];

  return (
    <div className="bg-[#222321] text-white rounded-3xl p-6 sm:p-9 border border-[#353633] shadow-xl space-y-7 relative overflow-hidden">
      
      {/* Subtle background luxury blur */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#7FA9BC]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#7FA9BC]/20 text-[#7FA9BC] flex items-center justify-center border border-[#7FA9BC]/30">
            <Rocket className="w-4 h-4 text-[#7FA9BC]" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#7FA9BC] font-semibold flex items-center gap-1.5">
              <span>Time-to-Market • Запуск в Suite 2105</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Обратный отсчет: Дней до запуска
            </h3>
          </div>
        </div>

        {/* Calendar Add Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCalendarEvent}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
          >
            {calendarDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Событие скачано (.ics)</span>
              </>
            ) : (
              <>
                <CalendarCheck className="w-3.5 h-3.5 text-[#7FA9BC]" />
                <span>Добавить запуск в Календарь</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Countdown Displays Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left: Huge Countdown Digits (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider text-[#A8AAA5] font-mono">
              Расчетный срок готовности платформы:
            </span>
          </div>

          {/* 4 Digit Clock Cubes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg">
            
            {/* Days */}
            <div className="bg-[#141513] p-3 sm:p-5 rounded-2xl border border-white/10 text-center space-y-1 shadow-inner">
              <div className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-[#7FA9BC] tracking-wider">
                Дней
              </div>
            </div>

            {/* Hours */}
            <div className="bg-[#141513] p-3 sm:p-5 rounded-2xl border border-white/10 text-center space-y-1 shadow-inner">
              <div className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-[#A8AAA5] tracking-wider">
                Часов
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-[#141513] p-3 sm:p-5 rounded-2xl border border-white/10 text-center space-y-1 shadow-inner">
              <div className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-[#A8AAA5] tracking-wider">
                Минут
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-[#141513] p-3 sm:p-5 rounded-2xl border border-white/10 text-center space-y-1 shadow-inner">
              <div className="text-3xl sm:text-5xl font-mono font-bold text-emerald-400 tracking-tight">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase text-emerald-500/80 tracking-wider">
                Секунд
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2 text-xs text-[#E2DFD7]/80 pt-1">
            <Calendar className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>
              Дата выхода в промышленную эксплуатацию: <strong className="text-white capitalize">{formattedLaunchDate}</strong>
            </span>
          </div>
        </div>

        {/* Right: Launch Target Summary & Speedup Advice (5 cols) */}
        <div className="lg:col-span-5 bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono uppercase text-[#7FA9BC] font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Скорость запуска проекта</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              {totalWeeks} нед. ({totalDays} дней)
            </span>
          </div>

          <p className="text-xs text-[#E2DFD7] leading-relaxed">
            Срок рассчитан на основе <strong>{selectedModulesCount} выбранных модулей</strong>. 
            При двухэтапной сдаче клиника сможет запустить генерацию заявок и шлюз отеля Fairmont уже через <strong>25 дней</strong>, не дожидаясь финала сложных финтех-интеграций.
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            {onNavigateToTimeline && (
              <button
                onClick={onNavigateToTimeline}
                className="text-[#7FA9BC] hover:text-white transition-colors flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>Смотреть подробный план в Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Milestone Step Progress Line */}
      <div className="pt-2 border-t border-white/10 relative z-10">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#A8AAA5] mb-3">
          Контрольные точки реализации (Milestones):
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {milestones.map((m, idx) => (
            <div 
              key={idx}
              className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${
                m.status === 'target'
                  ? 'bg-[#7FA9BC]/15 border-[#7FA9BC] text-white shadow-sm'
                  : m.status === 'active'
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/5 border-white/10 text-white/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#7FA9BC] font-bold">
                  {idx === 0 ? 'СТАРТ' : `ДЕНЬ ${m.daysOffset}`}
                </span>
                <span className="text-[10px] font-mono text-[#A8AAA5]">
                  {m.date}
                </span>
              </div>

              <div className="font-semibold text-white text-[12px] leading-snug">
                {m.title}
              </div>

              <div className="text-[11px] text-[#A8AAA5] leading-tight">
                {m.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
