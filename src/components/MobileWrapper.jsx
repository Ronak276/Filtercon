import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function MobileWrapper({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#E2E8F0] via-[#EDF2F7] to-[#E2E8F0] flex items-center justify-center p-0 md:py-8 md:px-4 text-slate-900 select-none">
      {/* Precision iPhone 16 Pro Titanium Bezel with Realistic Highlights & Dual-Layer Soft Shadows (Shows on iPad & Desktop) */}
      <div className="w-full sm:w-[414px] h-screen sm:h-[868px] bg-[#1E293B] sm:rounded-[56px] p-0 sm:p-[12px] sm:shadow-[0_30px_70px_-20px_rgba(15,23,42,0.35),0_0_0_1px_rgba(255,255,255,0.4),0_0_0_3px_#334155] relative flex flex-col overflow-hidden transition-all duration-300">

        {/* Hardware Detail: Left Volume & Action Keys */}
        <div className="hidden sm:block absolute -left-[14px] top-28 w-1 h-8 bg-slate-600 rounded-l-sm shadow-xs"></div>
        <div className="hidden sm:block absolute -left-[14px] top-40 w-1 h-12 bg-slate-600 rounded-l-sm shadow-xs"></div>
        <div className="hidden sm:block absolute -left-[14px] top-56 w-1 h-12 bg-slate-600 rounded-l-sm shadow-xs"></div>
        {/* Hardware Detail: Right Power Button */}
        <div className="hidden sm:block absolute -right-[14px] top-36 w-1 h-16 bg-slate-600 rounded-r-sm shadow-xs"></div>

        {/* Dynamic Island Floating Notch */}
        <div className="hidden sm:flex absolute top-4 left-1/2 -translate-x-1/2 w-[122px] h-[32px] bg-black rounded-full z-50 items-center justify-between px-3 shadow-md pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#18181B] border border-neutral-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#082f49]/80 border border-neutral-800"></div>
        </div>

        {/* Inner High-Precision OLED Glass Screen */}
        <div className="w-full h-full bg-white sm:rounded-[44px] flex flex-col overflow-hidden relative">
          {/* iOS Status Bar */}
          <header className="hidden sm:flex h-11 px-7 pt-2 items-center justify-between text-[13px] font-bold text-white z-40 select-none bg-transparent absolute top-0 left-0 right-0 pointer-events-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 opacity-90">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center">
                <Battery className="w-4 h-4 fill-white" />
              </div>
            </div>
          </header>

          {/* Main Mobile App Scrollable Viewport */}
          <main className="flex-1 overflow-hidden relative flex flex-col bg-white">
            {children}
          </main>

          {/* iOS Home Indicator Bar */}
          <footer className="hidden sm:flex h-5 items-center justify-center bg-white z-30 flex-shrink-0">
            <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
          </footer>
        </div>
      </div>
    </div>
  );
}
