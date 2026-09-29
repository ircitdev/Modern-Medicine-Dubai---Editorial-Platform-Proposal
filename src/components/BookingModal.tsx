import React, { useState } from 'react';
import { X, Send, Calendar, Clock, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Currency } from '../types';
import { CURRENCY_RATES } from '../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  priceAED: number;
  currentCurrency: Currency;
  onSuccess: (msg: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  serviceTitle,
  priceAED,
  currentCurrency,
  onSuccess,
}) => {
  const [patientName, setPatientName] = useState('Елена');
  const [patientPhone, setPatientPhone] = useState('+971 52 926 6594');
  const [preferredDate, setPreferredDate] = useState('Сегодня / Ближайшее время');
  const [locationType, setLocationType] = useState<'clinic' | 'fairmont-room' | 'home'>('clinic');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const formatPrice = (amountAED: number) => {
    if (currentCurrency === 'USD') return `$${Math.round(amountAED * CURRENCY_RATES.USD).toLocaleString('en-US')}`;
    if (currentCurrency === 'RUB') return `${Math.round(amountAED * CURRENCY_RATES.RUB).toLocaleString('ru-RU')} ₽`;
    return `${Math.round(amountAED).toLocaleString('en-US')} AED`;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });

    const locText = locationType === 'fairmont-room' 
      ? 'В номер отеля Fairmont Dubai' 
      : locationType === 'home' 
      ? 'Выезд на дом / частную резиденцию' 
      : 'Клиника (Fairmont Dubai, 21st Floor)';

    const msg = encodeURIComponent(
      `Здравствуйте! Хочу записаться на прием в Modern Medicine:\n` +
      `🩺 Услуга: ${serviceTitle} (${formatPrice(priceAED)})\n` +
      `👤 Пациент: ${patientName}\n` +
      `📞 Телефон: ${patientPhone}\n` +
      `📍 Формат: ${locText}\n` +
      `📅 Желаемое время: ${preferredDate}\n` +
      (notes ? `💬 Пожелания: ${notes}\n` : '')
    );

    window.open(`https://wa.me/971529266594?text=${msg}`, '_blank');
    onSuccess(`Заявка сформирована и передана медицинскому консьержу!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#222321]/40 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#E2DFD7] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-9 space-y-5 sm:space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F7F6F3] text-[#747775] hover:text-[#222321] hover:bg-[#EFEDE8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="text-[10px] font-semibold text-[#7FA9BC] uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Прямая запись • Fairmont Dubai 21st Floor</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#222321] font-bold">
            Запись на процедуру
          </h3>
          <p className="text-xs text-[#747775]">
            Медицинский координатор подтвердит бронь в течение 10 минут в WhatsApp.
          </p>
        </div>

        {/* Service Highlight */}
        <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E2DFD7] flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#747775] uppercase">Выбранная программа:</div>
            <div className="font-serif font-bold text-[#222321] text-base sm:text-lg">
              {serviceTitle}
            </div>
          </div>
          <div className="text-right">
            <div className="font-serif font-bold text-lg text-[#222321]">
              {formatPrice(priceAED)}
            </div>
            <div className="text-[10px] text-[#747775]">Без скрытых комиссий</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleConfirm} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-medium text-[#222321]">Имя пациента:</label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full p-3 bg-[#F7F6F3] border border-[#E2DFD7] rounded-xl focus:outline-none focus:border-[#222321]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-[#222321]">Номер WhatsApp:</label>
              <input
                type="text"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full p-3 bg-[#F7F6F3] border border-[#E2DFD7] rounded-xl focus:outline-none focus:border-[#222321]"
              />
            </div>
          </div>

          {/* Location Choice */}
          <div className="space-y-1">
            <label className="font-medium text-[#222321]">Место проведения:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLocationType('clinic')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  locationType === 'clinic'
                    ? 'bg-[#222321] text-white border-[#222321]'
                    : 'bg-[#F7F6F3] border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
                }`}
              >
                21 этаж
              </button>

              <button
                type="button"
                onClick={() => setLocationType('fairmont-room')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  locationType === 'fairmont-room'
                    ? 'bg-[#222321] text-white border-[#222321]'
                    : 'bg-[#F7F6F3] border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
                }`}
              >
                В номер отеля
              </button>

              <button
                type="button"
                onClick={() => setLocationType('home')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  locationType === 'home'
                    ? 'bg-[#222321] text-white border-[#222321]'
                    : 'bg-[#F7F6F3] border-[#E2DFD7] text-[#747775] hover:text-[#222321]'
                }`}
              >
                Выезд на дом
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-[#222321]">Желаемая дата и время:</label>
            <input
              type="text"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              placeholder="Например: Сегодня в 16:00"
              className="w-full p-3 bg-[#F7F6F3] border border-[#E2DFD7] rounded-xl focus:outline-none focus:border-[#222321]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#222321] hover:bg-black text-white rounded-full font-medium transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-99"
          >
            <Send className="w-4 h-4 text-[#7FA9BC]" />
            <span>Подтвердить запись в WhatsApp</span>
          </button>
        </form>

      </div>
    </div>
  );
};
