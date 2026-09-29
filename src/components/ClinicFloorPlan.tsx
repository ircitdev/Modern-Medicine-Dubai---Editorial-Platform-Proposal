import React, { useState, useEffect, useRef } from 'react';
import { ConfigModule } from '../types';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Wifi, 
  ShieldCheck, 
  UserCheck, 
  Activity, 
  Clock, 
  ArrowRight,
  Maximize2,
  Sliders,
  Check,
  Zap,
  Info,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Layers,
  HelpCircle,
  Eye
} from 'lucide-react';

interface ClinicFloorPlanProps {
  modules: ConfigModule[];
  onToggleModule?: (id: string) => void;
}

interface FloorZone {
  id: string;
  name: string;
  roomNumber: string;
  areaSqm: number;
  doctorOrLead: string;
  scenarioDescription: string;
  itRole: string;
  hardware: string[];
  associatedModuleIds: string[];
  // SVG bounding box coords
  x: number;
  y: number;
  width: number;
  height: number;
  accentColor: string;
  // Recommended popover anchor position in %
  popoverAnchor: {
    top: string;
    left: string;
    align: 'left' | 'right' | 'center';
  };
}

export const ClinicFloorPlan: React.FC<ClinicFloorPlanProps> = ({
  modules,
  onToggleModule,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('reception');
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [tourIndex, setTourIndex] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<'all' | 'reception' | 'diagnostics' | 'vip'>('all');

  const containerRef = useRef<HTMLDivElement>(null);

  const zones: FloorZone[] = [
    {
      id: 'reception',
      name: 'Welcome Desk & Рецепция',
      roomNumber: 'Zone A • Вход Suite 2105',
      areaSqm: 38,
      doctorOrLead: 'Старший координатор & Front Desk',
      scenarioDescription: 'Зона экспресс-чекина. Пациент прикладывает Emirates ID к NFC-считывателю, данные из онлайн-анкеты (Digital Intake) мгновенно подтягиваются на экран администратора. При выходе с приема QR-дисплей перехватывает довольных пациентов и собирает отзывы 5.0★ в Google Maps и 2GIS.',
      itRole: 'Синхронизация WhatsApp 1-Click записи, Digital Intake планшетов и QR-перехвата отзывов ORM (Google / 2GIS)',
      hardware: ['Планшеты экспресс-чекина Fast Track', 'NFC-считыватели Emirates ID', 'QR-дисплей ORM сбора отзывов', 'POS-терминал Apple Pay / Stripe'],
      associatedModuleIds: ['feat-quickbook', 'feat-digital-intake', 'feat-orm-feedback', 'feat-payments'],
      x: 30,
      y: 40,
      width: 220,
      height: 180,
      accentColor: '#7FA9BC',
      popoverAnchor: { top: '48%', left: '16%', align: 'left' },
    },
    {
      id: 'gp-ultrasound',
      name: 'Кабинет Терапии & УЗИ Экспертного Класса',
      roomNumber: 'Suite 2105-1',
      areaSqm: 42,
      doctorOrLead: 'Д-р Николай Руденко (GP / УЗИ DHA)',
      scenarioDescription: 'Прием доказательного терапевта и сонография. Сканер Mindray передает снимки УЗИ через DICOMweb (WADO-RS) прямо в защищенный Личный кабинет пациента (EHR). Врач видит на экране предварительный анамнез и результаты ИИ-триажа жалоб.',
      itRole: 'Прямая выгрузка снимков и протоколов УЗИ в Личный кабинет пациента (EHR) и единый государственный контур NABIDH v2.4',
      hardware: ['Экспертный УЗИ-сканер Mindray', 'Врачебная станция с защищенным монитором', 'Терминал 2FA доступа к картам NABIDH'],
      associatedModuleIds: ['feat-portal', 'feat-aitriage', 'feat-dha-compliance', 'feat-card-details'],
      x: 270,
      y: 40,
      width: 280,
      height: 180,
      accentColor: '#3B82F6',
      popoverAnchor: { top: '48%', left: '46%', align: 'center' },
    },
    {
      id: 'aesthetic-derma',
      name: 'Кабинет Эстетики & Дерматологии',
      roomNumber: 'Suite 2105-2',
      areaSqm: 45,
      doctorOrLead: 'Д-р Ольга Димова (Aesthetic Specialist)',
      scenarioDescription: 'Премиальные уходы ZO Skin Health (1,350 AED) и плазмотерапия PRP. Цифровой фотокабинет фиксирует динамику биомаркеров кожи До/После в зашифрованное облако EHR. Пациент может оформить курс процедур в беспроцентную рассрочку Tabby / Tamara прямо в кабинете.',
      itRole: 'Цифровой трекинг динамики биомаркеров кожи, интеграция рассрочки Tabby/Tamara и защищенное облачное портфолио',
      hardware: ['Медицинское кресло премиум-класса', 'Аппарат фотодинамической терапии', 'Кабинетная камера для протокола До/После', 'Планшет оформления Tabby/Tamara'],
      associatedModuleIds: ['feat-portal', 'feat-biomarkers', 'feat-tabby', 'feat-payments'],
      x: 570,
      y: 40,
      width: 280,
      height: 180,
      accentColor: '#E29578',
      popoverAnchor: { top: '48%', left: '78%', align: 'right' },
    },
    {
      id: 'iv-lounge',
      name: 'IV Drip Lounge & Выездной Хаб в Номера',
      roomNumber: 'Suite 2105-3',
      areaSqm: 36,
      doctorOrLead: 'Инфузионная бригада Modern Medicine',
      scenarioDescription: 'Лаунж восстановления после перелетов и хаб выездных бригад в номера Fairmont Dubai. Заказы из отеля поступают в выделенный шлюз B2B-консьержа с автоматическим включением 15% Non-Room Revenue в отельный счет гостя. Норматив прибытия в номер — 15–25 минут.',
      itRole: 'Служебный шлюз заказов из отеля Fairmont, расчет 15% отельной комиссии и онлайн-отслеживание статуса выезда в номер 24/7',
      hardware: ['Эргономичные кресла-реклайнеры', 'Портативные мобильные чемоданы Jet Lag IV', 'Инфузоматы с прецизионным дозированием'],
      associatedModuleIds: ['feat-hotel-concierge', 'feat-payments', 'feat-quickbook'],
      x: 30,
      y: 240,
      width: 320,
      height: 160,
      accentColor: '#10B981',
      popoverAnchor: { top: '88%', left: '22%', align: 'left' },
    },
    {
      id: 'server-hub',
      name: 'Серверная & Защищенный шлюз NABIDH / DHA',
      roomNumber: 'Suite 2105-S',
      areaSqm: 14,
      doctorOrLead: 'Инженерная служба IT & Security',
      scenarioDescription: 'Аппаратное ядро клиники. Изолированные серверы локального шифрования AES-256 для защиты конфиденциальных данных пациентов (PHI) в соответствии с законами ОАЭ. Обеспечивает безопасное зеркалирование с единой системой NABIDH v2.4 без передачи сырых данных в открытый интернет.',
      itRole: 'Локальное шифрование данных пациентов, резервный 5G-канал, защита от утечек PHI и отказоустойчивость шлюза 99.9%',
      hardware: ['Серверный шкаф 42U с аппаратным шифрованием', 'Брандмауэр Fortinet', 'ИБП двойного преобразования APC', 'Резервный 5G роутер'],
      associatedModuleIds: ['feat-dha-compliance', 'feat-portal'],
      x: 370,
      y: 240,
      width: 180,
      height: 160,
      accentColor: '#8B5CF6',
      popoverAnchor: { top: '88%', left: '52%', align: 'center' },
    },
    {
      id: 'elevator-hall',
      name: 'Лифтовой Холл 21-го этажа & Консьерж-маршрут',
      roomNumber: 'Fairmont Corridor 21st Fl',
      areaSqm: 30,
      doctorOrLead: 'Служба консьержей Fairmont Dubai',
      scenarioDescription: 'Приватный коридор 21-го этажа, связывающий скоростные лифты отеля со входом в Suite 2105. Служит навигационной точкой для гостей и экспресс-маршрутом дежурного врача в номера отеля с аптечкой и мобильными капельницами.',
      itRole: 'Цифровой геолокационный трекинг и прямая интеграция со стойкой Front Desk отеля Fairmont',
      hardware: ['Навигационные экраны Fairmont', 'Двухсторонний домофонный консьерж-терминал Suite 2105'],
      associatedModuleIds: ['feat-hotel-concierge', 'feat-i18n'],
      x: 570,
      y: 240,
      width: 280,
      height: 160,
      accentColor: '#D97706',
      popoverAnchor: { top: '88%', left: '78%', align: 'right' },
    },
  ];

  // Auto-tour timer
  useEffect(() => {
    let timer: any = null;
    if (isTourActive) {
      timer = setInterval(() => {
        setTourIndex((prev) => {
          const next = (prev + 1) % zones.length;
          setSelectedZoneId(zones[next].id);
          setHoveredZoneId(zones[next].id);
          return next;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isTourActive, zones.length]);

  const activeZone = zones.find((z) => z.id === (hoveredZoneId || selectedZoneId)) || zones[0];
  const displayedZone = hoveredZoneId ? zones.find((z) => z.id === hoveredZoneId) || activeZone : activeZone;

  // Active module count
  const getZoneActiveModulesCount = (zone: FloorZone) => {
    return zone.associatedModuleIds.filter((id) => modules.some((m) => m.id === id && m.isSelected)).length;
  };

  const isZoneFiltered = (zone: FloorZone) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'reception' && (zone.id === 'reception' || zone.id === 'elevator-hall')) return true;
    if (filterCategory === 'diagnostics' && (zone.id === 'gp-ultrasound' || zone.id === 'aesthetic-derma')) return true;
    if (filterCategory === 'vip' && (zone.id === 'iv-lounge' || zone.id === 'elevator-hall' || zone.id === 'server-hub')) return true;
    return false;
  };

  return (
    <div className="bg-white p-6 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-7">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F1EDE6] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEDE8] text-[#7FA9BC] text-[10px] font-bold uppercase tracking-widest mb-2">
            <Eye className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Виртуальный осмотр 21 этажа • Интеграция ИТ в физическое пространство</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
            Виртуальный осмотр Suite 2105 • Fairmont Dubai
          </h3>

          <p className="text-xs sm:text-sm text-[#747775] mt-1 max-w-2xl leading-relaxed">
            Наведите курсор на любое помещение на схеме, чтобы увидеть <strong>всплывающую карточку</strong> с детальным описанием функциональности ИТ-модулей, установленного оборудования и врачебного сценария.
          </p>
        </div>

        {/* Quick Tour Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setIsTourActive(!isTourActive);
              if (!isTourActive) {
                setHoveredZoneId(zones[tourIndex].id);
                setSelectedZoneId(zones[tourIndex].id);
              }
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              isTourActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-[#222321] hover:bg-black text-white'
            }`}
          >
            {isTourActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#7FA9BC]" />}
            <span>{isTourActive ? 'Пауза осмотра' : 'Запустить авто-тур (6 зон)'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <span className="text-[11px] font-bold text-[#747775] uppercase mr-1">Фильтр зон:</span>
          
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-[#222321] text-white font-medium shadow-2xs'
                : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
            }`}
          >
            Все 6 помещений
          </button>

          <button
            onClick={() => setFilterCategory('reception')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              filterCategory === 'reception'
                ? 'bg-[#222321] text-white font-medium shadow-2xs'
                : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
            }`}
          >
            Рецепция & Входная группа
          </button>

          <button
            onClick={() => setFilterCategory('diagnostics')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              filterCategory === 'diagnostics'
                ? 'bg-[#222321] text-white font-medium shadow-2xs'
                : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
            }`}
          >
            Кабинеты врачей (Терапия/УЗИ/Эстетика)
          </button>

          <button
            onClick={() => setFilterCategory('vip')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              filterCategory === 'vip'
                ? 'bg-[#222321] text-white font-medium shadow-2xs'
                : 'bg-[#F7F6F3] text-[#747775] hover:text-[#222321]'
            }`}
          >
            IV Lounge & Выезд в Fairmont
          </button>
        </div>

        {/* Location Specs */}
        <div className="text-[11px] text-[#747775] font-mono bg-[#F7F6F3] px-3 py-1 rounded-xl border border-[#E2DFD7]">
          Suite 2105 • 205 м² • Потолки 3.4 м
        </div>
      </div>

      {/* Main Floor Plan Arena */}
      <div 
        ref={containerRef}
        className="relative bg-[#1A1B19] rounded-3xl p-4 sm:p-7 border border-[#353633] text-white shadow-xl overflow-hidden select-none"
      >
        
        {/* Top Arena Indicator */}
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-[#F7F6F3]/90">
              FAIRMONT DUBAI • 21ST FLOOR • INTERACTIVE ARCHITECTURAL SCHEMATIC
            </span>
          </div>

          <div className="text-[11px] text-[#7FA9BC] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Наведите курсор на зону для всплывающей карточки</span>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="w-full aspect-[880/440] relative bg-[#141513] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center p-2">
          
          <svg viewBox="0 0 880 440" className="w-full h-full">
            <defs>
              {/* Grid pattern */}
              <pattern id="grid-tour" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              
              {/* Glow filter for active/hovered zones */}
              <filter id="glow-tour" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Blueprint Grid */}
            <rect width="880" height="440" fill="url(#grid-tour)" />

            {/* Exterior Wall Boundary */}
            <rect
              x="20"
              y="30"
              width="840"
              height="380"
              fill="none"
              stroke="#474A45"
              strokeWidth="4"
              rx="16"
            />

            {/* Zones */}
            {zones.map((zone) => {
              const isSelected = selectedZoneId === zone.id;
              const isHovered = hoveredZoneId === zone.id;
              const isTargeted = isHovered || isSelected;
              const activeCount = getZoneActiveModulesCount(zone);
              const hasActiveModules = activeCount > 0;
              const visible = isZoneFiltered(zone);

              return (
                <g
                  key={zone.id}
                  onClick={() => {
                    setSelectedZoneId(zone.id);
                    setHoveredZoneId(zone.id);
                  }}
                  onMouseEnter={() => setHoveredZoneId(zone.id)}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  className="cursor-pointer transition-all duration-300"
                  opacity={visible ? 1 : 0.25}
                >
                  {/* Zone Background Box */}
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.width}
                    height={zone.height}
                    rx="12"
                    fill={
                      isTargeted
                        ? 'rgba(127, 169, 188, 0.22)'
                        : hasActiveModules
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(0, 0, 0, 0.25)'
                    }
                    stroke={
                      isTargeted
                        ? '#7FA9BC'
                        : hasActiveModules
                        ? 'rgba(127, 169, 188, 0.45)'
                        : '#353633'
                    }
                    strokeWidth={isTargeted ? '2.5' : '1.5'}
                    strokeDasharray={hasActiveModules ? undefined : '4 4'}
                    filter={isTargeted ? 'url(#glow-tour)' : undefined}
                  />

                  {/* Room Tag Label */}
                  <text
                    x={zone.x + 14}
                    y={zone.y + 24}
                    fill={isTargeted ? '#7FA9BC' : '#8F928D'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="0.05em"
                  >
                    {zone.roomNumber.toUpperCase()} • {zone.areaSqm} М²
                  </text>

                  {/* Room Name */}
                  <text
                    x={zone.x + 14}
                    y={zone.y + 45}
                    fill="#FFFFFF"
                    fontSize="13"
                    fontWeight="600"
                    fontFamily="serif"
                  >
                    {zone.name.length > 28 ? zone.name.slice(0, 26) + '...' : zone.name}
                  </text>

                  {/* Responsible Doctor or Lead */}
                  <text
                    x={zone.x + 14}
                    y={zone.y + 65}
                    fill="#A8AAA5"
                    fontSize="10"
                  >
                    {zone.doctorOrLead.length > 32 ? zone.doctorOrLead.slice(0, 30) + '...' : zone.doctorOrLead}
                  </text>

                  {/* IT Modules Indicator Pill in SVG */}
                  <g transform={`translate(${zone.x + 14}, ${zone.y + zone.height - 32})`}>
                    <rect
                      width={hasActiveModules ? 115 : 95}
                      height="22"
                      rx="11"
                      fill={hasActiveModules ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)'}
                      stroke={hasActiveModules ? '#10B981' : '#555'}
                      strokeWidth="1"
                    />
                    <circle
                      cx="11"
                      cy="11"
                      r="3.5"
                      fill={hasActiveModules ? '#10B981' : '#777'}
                    />
                    <text
                      x="22"
                      y="14.5"
                      fill={hasActiveModules ? '#34D399' : '#999'}
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {hasActiveModules ? `ИТ АКТИВЕН (${activeCount})` : 'БАЗОВЫЙ РЕЖИМ'}
                    </text>
                  </g>

                  {/* Pulsing Beacon when targeted */}
                  {isTargeted && (
                    <circle
                      cx={zone.x + zone.width - 20}
                      cy={zone.y + 20}
                      r="5"
                      fill="#7FA9BC"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* FLOATING HOVER CARD / POPUP OVERLAY */}
        {displayedZone && (
          <div className="mt-4 p-5 sm:p-6 bg-[#222321] rounded-2xl border border-[#7FA9BC]/40 shadow-2xl text-white space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-white/10 text-[#7FA9BC]">
                  <Building2 className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-mono text-[#7FA9BC] uppercase tracking-wider block">
                    {displayedZone.roomNumber} • Площадь: {displayedZone.areaSqm} м²
                  </span>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
                    {displayedZone.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#A8AAA5] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#7FA9BC]" />
                  <span>{displayedZone.doctorOrLead}</span>
                </span>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {getZoneActiveModulesCount(displayedZone)} ИТ-модуля подключено
                </span>
              </div>
            </div>

            {/* Scenario Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              
              {/* Detailed Physical & Digital Scenario */}
              <div className="md:col-span-7 space-y-2">
                <div className="text-[11px] font-bold text-[#7FA9BC] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7FA9BC]" />
                  <span>Физический сценарий работы в кабинете:</span>
                </div>
                <p className="text-xs text-[#E2DFD7] leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
                  {displayedZone.scenarioDescription}
                </p>
              </div>

              {/* Connected Modules in Configurator */}
              <div className="md:col-span-5 space-y-2">
                <div className="text-[11px] font-bold text-[#747775] uppercase tracking-wider text-[#A8AAA5]">
                  ИТ-модули платформы в этой зоне:
                </div>
                
                <div className="space-y-1.5">
                  {displayedZone.associatedModuleIds.map((modId) => {
                    const mod = modules.find((m) => m.id === modId);
                    if (!mod) return null;
                    const isSelected = mod.isSelected;

                    return (
                      <div
                        key={mod.id}
                        onClick={() => onToggleModule && onToggleModule(mod.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white/10 border-[#7FA9BC] text-white shadow-xs'
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                            isSelected ? 'bg-emerald-500 text-white' : 'border border-white/30'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span className="font-medium">{mod.title}</span>
                        </div>

                        <span className="text-[10px] font-mono opacity-70">
                          {mod.timeWeeks} нед.
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Hardware Bar */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#A8AAA5] mr-1">
                Оборудование & Гаджеты:
              </span>
              {displayedZone.hardware.map((hw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-white/10 text-white text-[10px] border border-white/5"
                >
                  {hw}
                </span>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Quick Navigation Footer */}
      <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#222321]">
          <Info className="w-4 h-4 text-[#7FA9BC] shrink-0" />
          <span>
            <strong>Совет: </strong> 
            Включение или отключение модулей в Конструкторе ТЗ мгновенно меняет подсветку и статус кабинетов на схеме 21 этажа.
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {zones.map((z, idx) => (
            <button
              key={z.id}
              onClick={() => {
                setSelectedZoneId(z.id);
                setHoveredZoneId(z.id);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center ${
                displayedZone.id === z.id
                  ? 'bg-[#222321] text-white shadow-xs'
                  : 'bg-white border border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
              }`}
              title={z.name}
            >
              0{idx + 1}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
