import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function MobileWrapper({ children }) {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#E2E8F0] via-[#EDF2F7] to-[#E2E8F0] flex items-center justify-center p-0 md:py-6 md:px-4 text-slate-900 select-none overflow-hidden">
      {/* 
        Precision Mobile Shell:
        - Small/Real mobile screen (< sm: 640px): 100% full screen (w-full h-screen) with 0 margins/padding/borders.
        - Desktop / Tablet showcase: iPhone 16 Pro chassis.
      */}
      <div className="w-full sm:w-[414px] h-[100dvh] sm:h-[868px] bg-[#1E293B] sm:rounded-[54px] p-0 sm:p-[10px] sm:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35),0_0_0_1px_rgba(255,255,255,0.4),0_0_0_3px_#334155] relative flex flex-col overflow-hidden transition-all duration-300">

        {/* Hardware Detail: Volume buttons (Desktop Showcase Only) */}
        <div className="hidden sm:block absolute -left-[14px] top-28 w-1 h-8 bg-slate-600 rounded-l-sm pointer-events-none"></div>
        <div className="hidden sm:block absolute -left-[14px] top-40 w-1 h-12 bg-slate-600 rounded-l-sm pointer-events-none"></div>
        <div className="hidden sm:block absolute -left-[14px] top-56 w-1 h-12 bg-slate-600 rounded-l-sm pointer-events-none"></div>
        <div className="hidden sm:block absolute -right-[14px] top-36 w-1 h-16 bg-slate-600 rounded-r-sm pointer-events-none"></div>

        {/* Dynamic Island Floating Notch (Desktop Showcase Only) */}
        <div className="hidden sm:flex absolute top-3.5 left-1/2 -translate-x-1/2 w-[122px] h-[32px] bg-black rounded-full z-50 items-center justify-between px-3 shadow-md pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#18181B] border border-neutral-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#082f49]/80 border border-neutral-800"></div>
        </div>

        {/* Inner OLED Glass Screen (On real mobile: 100% height, zero border radius) */}
        <div className="w-full h-full bg-white sm:rounded-[44px] flex flex-col overflow-hidden relative">
          {/* iOS Status Bar (Desktop Showcase Only) */}
          <header className="hidden sm:flex h-10 px-7 pt-2 items-center justify-between text-[13px] font-bold text-white z-40 select-none bg-transparent absolute top-0 left-0 right-0 pointer-events-none">
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
          <main className="flex-1 w-full h-full overflow-hidden relative flex flex-col bg-white">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
