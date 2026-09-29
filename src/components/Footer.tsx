import React from 'react';
import { MapPin, Phone, MessageCircle, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#222321] text-[#F7F6F3] py-16 sm:py-20 mt-24 border-t border-[#353633]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[#353633] pb-12">
          <div>
            <div className="text-2xl sm:text-3xl font-serif tracking-tight font-medium text-white flex items-center gap-2">
              <span>MODERN MEDICINE</span>
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#7FA9BC] bg-white/10 px-2.5 py-0.5 rounded-full font-medium">
                DUBAI
              </span>
            </div>
            <div className="text-xs sm:text-sm text-[#F7F6F3]/70 mt-2 font-light max-w-md">
              Премиальная медицинская платформа • Fairmont Dubai, 21st Floor, Sheikh Zayed Road, Trade Centre 1. Лицензия DHA.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href="https://wa.me/971529266594"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#7FA9BC]" />
              <span>WhatsApp: +971 52 926 6594</span>
            </a>

            <a
              href="https://t.me/uspeshnyy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 group"
            >
              <img
                src="https://uspeshnyy.ru/assets/logo.svg"
                alt="Uspeshnyy dev"
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-medium group-hover:text-[#7FA9BC] transition-colors">Uspeshnyy dev</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-[#F7F6F3]/50 gap-4 font-light">
          <p>© 2026 Modern Medicine Dubai. Все права защищены. Индивидуальный проект для Елены Киреевой.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1 text-[#7FA9BC]">
              <ShieldCheck className="w-3.5 h-3.5" />
              DHA & NABIDH Compliance
            </span>
            <span>Fairmont Concierge Service 24/7</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
