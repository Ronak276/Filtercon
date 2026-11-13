import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function MobileWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-0 md:p-6 text-slate-900">
      {/* Sleek, Realistic iPhone Device Mockup without floating top bars */}
      <div className="w-full max-w-[412px] h-[860px] bg-slate-950 rounded-[50px] p-[10px] shadow-[0_20px_60px_-15px_rgba(2,132,199,0.18),0_0_0_1px_rgba(0,0,0,0.1)] relative border-4 border-slate-800 ring-1 ring-slate-900 overflow-hidden flex flex-col">
        {/* Dynamic Island Notch */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-950/60 border border-neutral-800"></div>
        </div>

        {/* Inner Phone Screen */}
        <div className="w-full h-full bg-white rounded-[40px] flex flex-col overflow-hidden relative shadow-inner">
          {/* iOS Status Bar */}
          <header className="h-11 px-7 pt-2 flex items-center justify-between text-[13px] font-bold text-white z-40 select-none bg-transparent absolute top-0 left-0 right-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 opacity-90">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center">
                <Battery className="w-4 h-4 fill-white" />
              </div>
            </div>
          </header>

          {/* Viewport */}
          <main className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-white">
            {children}
          </main>

          {/* iOS Bottom Indicator Bar */}
          <footer className="h-5 flex items-center justify-center bg-white z-40">
            <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
          </footer>
        </div>
      </div>
    </div>
  );
}
