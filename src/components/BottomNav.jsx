import React from 'react';
import { Home, Grid, ShoppingBag, ClipboardList, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, cartCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount },
    { id: 'diagnostic', label: 'Water Quiz', icon: ClipboardList },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 pointer-events-none px-3.5 pb-2 pt-1">
      {/* Floating Rounded Capsule Tab Bar */}
      <nav
        aria-label="Bottom Navigation"
        className="pointer-events-auto max-w-[390px] mx-auto bg-white rounded-[28px] shadow-[0_10px_30px_rgba(2,132,199,0.12),0_2px_8px_rgba(0,0,0,0.06)] border border-slate-100/90 px-2 py-2 flex items-center justify-around"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center justify-center relative py-1 px-1 rounded-2xl transition-all duration-200 cursor-pointer select-none outline-none group"
            >
              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-[22px] h-[22px] transition-all duration-200 ${
                    isActive
                      ? 'text-[#0284C7] stroke-[2.3] scale-105'
                      : 'text-slate-400 group-hover:text-slate-600 stroke-[1.8]'
                  }`}
                />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#0284C7] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Tab Label (Uppercase bold clean style like Kaamzo reference) */}
              <span
                className={`text-[9.5px] mt-1 tracking-wide uppercase transition-colors duration-200 ${
                  isActive
                    ? 'font-bold text-[#0284C7]'
                    : 'font-semibold text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
