import React from 'react';
import { ViewMode } from '../types';
import { Sliders, BarChart3, Activity, TrendingUp, Laptop, Calendar } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  selectedModulesCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onViewChange,
  selectedModulesCount,
}) => {
  const navItems = [
    {
      id: 'configurator' as ViewMode,
      label: 'ТЗ & Цены',
      icon: Sliders,
      badge: selectedModulesCount,
    },
    {
      id: 'research' as ViewMode,
      label: 'Анализ',
      icon: BarChart3,
    },
    {
      id: 'analytics' as ViewMode,
      label: 'ROI',
      icon: Activity,
      tag: 'ROI',
    },
    {
      id: 'competitors' as ViewMode,
      label: 'Рынок SZR',
      icon: TrendingUp,
    },
    {
      id: 'site' as ViewMode,
      label: 'Прототип',
      icon: Laptop,
      dot: true,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2DFD7] px-1.5 pt-1.5 pb-[max(0.35rem,env(safe-area-inset-bottom))] shadow-[0_-4px_25px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-[#222321] font-bold'
                  : 'text-[#8A8D87] hover:text-[#222321]'
              }`}
            >
              {/* Icon Container with active highlight pill */}
              <div
                className={`relative px-3 py-1 rounded-full transition-all flex items-center justify-center ${
                  isActive ? 'bg-[#222321] text-white shadow-xs' : 'text-[#747775]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />

                {/* Badge if module count exists */}
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span
                    className={`absolute -top-1 -right-1.5 text-[9px] font-mono font-bold px-1 min-w-[15px] h-[15px] rounded-full flex items-center justify-center ${
                      isActive ? 'bg-[#7FA9BC] text-[#222321]' : 'bg-[#222321] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Active live dot */}
                {item.dot && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#7FA9BC] animate-pulse" />
                )}
              </div>

              {/* Text label */}
              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
