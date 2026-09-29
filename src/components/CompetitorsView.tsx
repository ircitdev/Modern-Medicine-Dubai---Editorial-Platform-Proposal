import React, { useState } from 'react';
import { COMPETITORS_LIST } from '../constants';
import { Competitor } from '../types';
import { 
  Building2, 
  Star, 
  ShieldAlert, 
  MapPin, 
  TrendingUp, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Filter,
  Info,
  ExternalLink,
  FileText
} from 'lucide-react';
import { AudioPodcastPlayer } from './AudioPodcastPlayer';

export const CompetitorsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThreatFilter, setSelectedThreatFilter] = useState<string>('all');
  const [activeCompetitor, setActiveCompetitor] = useState<Competitor | null>(COMPETITORS_LIST[0]);

  const filteredCompetitors = COMPETITORS_LIST.filter((comp) => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comp.keyFocus.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedThreatFilter === 'all' || comp.threatLevel === selectedThreatFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-16">
      
      {/* Editorial Header */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E2DFD7] bg-white text-[#222321] text-xs font-medium tracking-wide shadow-sm">
          <Building2 className="w-3.5 h-3.5 text-[#7FA9BC]" />
          <span>Аналитический аудит & Сравнительный бенчмаркинг клиник</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#222321] leading-[0.95] tracking-tight">
          Макроэкономический ландшафт<br className="hidden sm:inline" /> и конкурентная среда.
        </h1>

        <p className="text-[#747775] text-base sm:text-lg max-w-2xl leading-relaxed">
          Глубокий анализ позиционирования Modern Medicine на рынке Дубая. Исследование охватывает 
          регулирование DHA, барьеры обязательного страхования (EBP) и стратегию победы над конкурентами в локации Fairmont Dubai.
        </p>

        {/* Google Docs Full Report Button & Audio Companion */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 pt-2">
          <a
            href="https://docs.google.com/document/d/1wjQwo9_VX9mKpHHRYct2M3Ize07yGo6zK5sDm4qz1PQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#222321] hover:bg-black text-white rounded-full text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95 group cursor-pointer shrink-0"
          >
            <FileText className="w-4 h-4 text-[#7FA9BC]" />
            <span>Открыть полный отчет в Google Docs</span>
            <ExternalLink className="w-4 h-4 text-[#7FA9BC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <div className="flex-1 min-w-0 max-w-lg">
            <AudioPodcastPlayer
              initialEpisodeId="podcast-market-risks"
              variant="compact"
              titleOverride="Аудиоразбор: «Что убивает медицинский бизнес в Дубае»"
            />
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2DFD7] shadow-sm flex flex-col justify-between space-y-5 hover:border-[#7FA9BC] transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-semibold text-[#747775] uppercase tracking-widest">
              Объем рынка ОАЭ
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#DCEAF0] text-[#222321]">
              +7.5% CAGR
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#222321]">
              $33.0 B
            </div>
            <div className="text-xs text-[#747775] mt-1.5">
              Прогноз расходов на медицину ($60B к 2030 г.)
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2DFD7] shadow-sm flex flex-col justify-between space-y-5 hover:border-[#7FA9BC] transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-semibold text-[#747775] uppercase tracking-widest">
              Мед. туризм Дубая
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFEDE8] text-[#222321]">
              1.03B AED Доход
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#222321]">
              691 478
            </div>
            <div className="text-xs text-[#747775] mt-1.5">
              Иностранных пациентов посетили клиники за год
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2DFD7] shadow-sm flex flex-col justify-between space-y-5 hover:border-[#7FA9BC] transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-semibold text-[#747775] uppercase tracking-widest">
              Страховой сектор
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E9DFD5] text-[#222321]">
              EBP Лимит 150k
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#222321]">
              $10.11 B
            </div>
            <div className="text-xs text-[#747775] mt-1.5">
              Объем рынка обязательного медстрахования в ОАЭ
            </div>
          </div>
        </div>

        {/* Card 4: Critical Threat */}
        <div className="bg-[#222321] text-[#F7F6F3] rounded-3xl p-6 border border-[#222321] shadow-md flex flex-col justify-between space-y-5">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest">
              Угроза 0-го километра
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E9DFD5] text-[#222321]">
              Fairmont Dubai
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F6F3] flex items-center gap-2">
              <span className="text-red-400">1.0★</span>
              <span className="text-xs text-white/50">vs</span>
              <span className="text-emerald-400">5.0★</span>
            </div>
            <div className="text-xs text-[#F7F6F3]/70 mt-1.5">
              Modern Medicine (21 эт.) vs Ora Care (1 эт.)
            </div>
          </div>
        </div>

      </div>

      {/* Section 1: Market Drivers & DHA Demographics */}
      <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
        <div className="border-b border-[#F1EDE6] pb-5">
          <div className="text-[10px] text-[#7FA9BC] font-semibold uppercase tracking-widest mb-1.5">
            Раздел 1
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#222321]">
            Драйверы рынка здравоохранения и медицинский туризм
          </h3>
          <p className="text-xs sm:text-sm text-[#747775] mt-2 max-w-4xl leading-relaxed">
            Частный сектор Дубая генерирует более 65% совокупных национальных расходов на медицину. 
            Обязательный характер страхования гарантирует базовый поток, однако жесткие лимиты сооплаты вынуждают клиники развивать высокомаржинальные коммерческие направления (Anti-Age, IV Therapy, Check-Up).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Tourism Origin */}
          <div className="bg-[#F7F6F3] p-6 rounded-2xl border border-[#E2DFD7] space-y-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-[#222321]">
                География медицинского туризма в Дубае
              </h4>
              <p className="text-xs text-[#747775]">Распределение иностранных пациентов по регионам (DHA Data)</p>
            </div>

            {/* Custom SVG Donut for Geography */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Asia 33% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#7FA9BC" strokeWidth="16" strokeDasharray="82.9 251.2" strokeDashoffset="0" />
                  {/* GCC 28% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#222321" strokeWidth="16" strokeDasharray="70.3 251.2" strokeDashoffset="-82.9" />
                  {/* Europe & CIS 23% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#B49E87" strokeWidth="16" strokeDasharray="57.8 251.2" strokeDashoffset="-153.2" />
                  {/* Others 16% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#D4CFC5" strokeWidth="16" strokeDasharray="40.2 251.2" strokeDashoffset="-211.0" />
                </svg>
                <div className="absolute text-center">
                  <div className="text-sm font-serif font-bold text-[#222321]">691k</div>
                  <div className="text-[9px] text-[#747775]">туристов</div>
                </div>
              </div>

              <div className="space-y-2 text-xs flex-1 w-full">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#747775]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7FA9BC]" />
                    Страны Азии
                  </span>
                  <span className="font-semibold text-[#222321]">33%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#747775]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#222321]" />
                    Страны Залива (GCC)
                  </span>
                  <span className="font-semibold text-[#222321]">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#747775]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B49E87]" />
                    Европа и СНГ (Целевая аудитория)
                  </span>
                  <span className="font-semibold text-[#222321]">23%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#747775]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4CFC5]" />
                    Другие регионы
                  </span>
                  <span className="font-semibold text-[#222321]">16%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 2: Medical Specialties Demand */}
          <div className="bg-[#F7F6F3] p-6 rounded-2xl border border-[#E2DFD7] space-y-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-[#222321]">
                Востребованность коммерческих направлений
              </h4>
              <p className="text-xs text-[#747775]">Доля визитов иностранных пациентов по профилям</p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#222321] font-medium">Стоматология & Челюстно-лицевая:</span>
                  <span className="font-bold text-[#222321]">29%</span>
                </div>
                <div className="h-2.5 w-full bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#7FA9BC] rounded-full" style={{ width: '29%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#222321] font-medium">Дерматология, Эстетика & ZO Skin:</span>
                  <span className="font-bold text-[#222321]">27%</span>
                </div>
                <div className="h-2.5 w-full bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#222321] rounded-full" style={{ width: '27%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#222321] font-medium">Комплексные Check-Up & IV Longevity:</span>
                  <span className="font-bold text-[#222321]">31%</span>
                </div>
                <div className="h-2.5 w-full bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#B49E87] rounded-full" style={{ width: '31%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#222321] font-medium">Гинекология & Урология:</span>
                  <span className="font-bold text-[#222321]">13%</span>
                </div>
                <div className="h-2.5 w-full bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4CFC5] rounded-full" style={{ width: '13%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Deep Competitor Benchmarking */}
      <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F1EDE6] pb-5">
          <div>
            <div className="text-[10px] text-[#7FA9BC] font-semibold uppercase tracking-widest mb-1.5">
              Раздел 2
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#222321]">
              Сравнительный бенчмаркинг ключевых игроков SZR
            </h3>
            <p className="text-xs sm:text-sm text-[#747775] mt-1">
              Репутация в картах (Google Rating), страховые договоры и реальное позиционирование.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#747775]" />
              <input
                type="text"
                placeholder="Поиск клиники..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#F7F6F3] border border-[#E2DFD7] rounded-full text-xs focus:outline-none focus:border-[#222321] w-40 sm:w-48 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Visual Benchmark Bar: Rating vs Insurance */}
        <div className="bg-[#F7F6F3] p-6 rounded-2xl border border-[#E2DFD7] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-serif text-lg font-bold text-[#222321]">
                Соотношение репутации (Google ★) и страхового охвата
              </h4>
              <p className="text-xs text-[#747775]">Сравнение уязвимостей и преимуществ клиник</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-[#222321] font-medium">
                <span className="w-3 h-3 rounded-sm bg-[#222321]" />
                Google Рейтинг (из 5.0)
              </span>
              <span className="flex items-center gap-1.5 text-[#7FA9BC] font-medium">
                <span className="w-3 h-3 rounded-sm bg-[#7FA9BC]" />
                Страховые планы (кол-во)
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {COMPETITORS_LIST.map((comp) => (
              <div key={comp.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#222321] flex items-center gap-2">
                    <span>{comp.name}</span>
                    <span className="text-[10px] text-[#747775] font-normal">({comp.location})</span>
                  </span>
                  <div className="space-x-3 text-right">
                    <span className={`font-bold ${comp.rating <= 2.0 ? 'text-red-500' : 'text-[#222321]'}`}>
                      ★ {comp.rating.toFixed(1)}
                    </span>
                    <span className="text-[#7FA9BC] font-medium">
                      {comp.insurancePlansCount} сетей
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Rating Bar */}
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${comp.rating <= 2.0 ? 'bg-red-400' : 'bg-[#222321]'}`} 
                      style={{ width: `${(comp.rating / 5) * 100}%` }} 
                    />
                  </div>
                  {/* Insurance Bar */}
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#7FA9BC] rounded-full" 
                      style={{ width: `${(comp.insurancePlansCount / 50) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto custom-scrollbar border border-[#E2DFD7] rounded-2xl">
          <table className="w-full text-left text-sm border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#E2DFD7] bg-[#F7F6F3] text-[#747775] text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Клиника</th>
                <th className="py-3 px-4 font-semibold">Локация</th>
                <th className="py-3 px-4 font-semibold">Рейтинг Google</th>
                <th className="py-3 px-4 font-semibold">Страховые планы</th>
                <th className="py-3 px-4 font-semibold">Ключевой фокус</th>
                <th className="py-3 px-4 font-semibold">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EDE6] text-xs">
              {filteredCompetitors.map((comp) => {
                const isSelected = activeCompetitor?.id === comp.id;
                return (
                  <tr
                    key={comp.id}
                    onClick={() => setActiveCompetitor(comp)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#DCEAF0]/30 font-medium' : 'hover:bg-[#F7F6F3]'
                    }`}
                  >
                    <td className="py-4 px-4 font-bold text-[#222321]">
                      {comp.name}
                    </td>
                    <td className="py-4 px-4 text-[#747775]">
                      {comp.location}
                    </td>
                    <td className="py-4 px-4 font-bold">
                      <span className={comp.rating <= 2.0 ? 'text-red-500' : 'text-[#222321]'}>
                        ★ {comp.rating.toFixed(1)}
                      </span>
                      <span className="text-[#747775] font-normal text-[11px] ml-1">
                        ({comp.reviewsCount})
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#222321]">
                      {comp.insurancePlansCount} планов
                    </td>
                    <td className="py-4 px-4 text-[#747775]">
                      {comp.keyFocus}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        comp.threatLevel === 'subject'
                          ? 'bg-[#222321] text-white'
                          : comp.threatLevel === 'threat-zero-km'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-[#EFEDE8] text-[#222321]'
                      }`}>
                        {comp.threatLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Competitor Insights Box */}
        {activeCompetitor && (
          <div className="p-6 rounded-2xl bg-[#EFEDE8] border border-[#E2DFD7] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#7FA9BC]" />
                <h4 className="font-serif text-lg font-bold text-[#222321]">
                  Детальный профиль: {activeCompetitor.name}
                </h4>
              </div>
              <span className="text-xs text-[#747775] font-mono">
                {activeCompetitor.location}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white rounded-xl border border-[#E2DFD7] space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Сильные стороны:
                </span>
                <p className="text-[#747775] leading-relaxed">
                  {activeCompetitor.pros}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E2DFD7] space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Слабые стороны & Уязвимости:
                </span>
                <p className="text-[#747775] leading-relaxed">
                  {activeCompetitor.cons}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Section 3: The Hotel Polyclinic Paradox & Strategic Escape */}
      <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
        <div className="border-b border-[#F1EDE6] pb-5">
          <div className="text-[10px] text-[#7FA9BC] font-semibold uppercase tracking-widest mb-1.5">
            Раздел 3
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#222321]">
            Стратегия преодоления «Парадокса отеля Fairmont»
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#E9DFD5]/80 p-6 rounded-2xl border border-[#B49E87]/30 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800">
              Уязвимость: Путь пациента
            </span>
            <h4 className="font-serif text-2xl font-bold text-[#222321]">
              Ловушка 1-го этажа
            </h4>
            <p className="text-xs text-[#222321]/80 leading-relaxed">
              Гость отеля Fairmont спускается на ресепшн или открывает карты в поиске клиники. Он видит рейтинг 1.0★ у Modern Medicine и тут же заходит в Ora Care (5.0★) прямо в вестибюле. Подъем на 21 этаж требует непреодолимого психологического доверия.
            </p>
          </div>

          <div className="bg-[#DCEAF0] p-6 rounded-2xl border border-[#7FA9BC]/40 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#222321]">
              Решение: Цифровая платформа
            </span>
            <h4 className="font-serif text-2xl font-bold text-[#222321]">
              Модель Destination Clinic
            </h4>
            <p className="text-xs text-[#222321]/80 leading-relaxed">
              1) QR-коды консьержа в люксах с вызовом капельниц от джетлага в номер за 30 мин; 
              2) Экспертный личный кабинет EHR с графиками биомаркеров; 
              3) Прозрачный мультивалютный прайс (AED/USD/RUB) и прямой контакт с врачом в WhatsApp.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
