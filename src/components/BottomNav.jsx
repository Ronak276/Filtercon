import React from 'react';
import { Home, Grid, ShoppingBag, Sparkles } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, cartCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'categories', label: 'CATEGORIES', icon: Grid },
    { id: 'cart', label: 'CART', icon: ShoppingBag, badge: cartCount },
    { id: 'diagnostic', label: 'QUIZ', icon: Sparkles },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="w-full bg-white/95 backdrop-blur-md rounded-[28px] py-2 px-1 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-slate-200/80 select-none"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer select-none outline-none group"
          >
            {/* Icon with circular notification badge */}
            <div className="relative flex items-center justify-center mb-0.5">
              <Icon
                className={`w-[20px] h-[20px] transition-transform duration-200 ${
                  isActive
                    ? 'text-[#0284C7] stroke-[2.4] scale-105'
                    : 'text-[#64748B] group-hover:text-slate-700 stroke-[1.8]'
                }`}
              />
              {tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#0284C7] text-white text-[8.5px] font-black min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center ring-1.5 ring-white shadow-2xs">
                  {tab.badge}
                </span>
              )}
            </div>

            {/* Tab Label: Crisp bold uppercase */}
            <span
              className={`text-[9px] font-black tracking-wider uppercase transition-colors duration-200 ${
                isActive ? 'text-[#0284C7]' : 'text-[#64748B] group-hover:text-slate-700'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
