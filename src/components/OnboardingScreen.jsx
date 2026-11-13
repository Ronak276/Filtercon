import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function OnboardingScreen({ onComplete }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="absolute inset-0 z-40 bg-white flex flex-col justify-between p-6 select-none font-sans"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pt-8">
        <span className="text-[10px] font-black text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 uppercase tracking-wider">
          WELCOME TO PURE LIVING
        </span>
        <button
          onClick={onComplete}
          className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Single Feature Hero Card */}
      <div className="my-auto py-2 flex flex-col items-center text-center">
        {/* Photorealistic Family enjoying clean tap water */}
        <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden mb-5 shadow-xl shadow-sky-900/10 border border-slate-100">
          <img
            src="/onboarding-family.jpg"
            alt="Filtercon Healthy Family"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0F172A] flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            100% Chemical & Salt-Free
          </div>
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight mb-2">
          Clean Water. Better You.
        </h2>
        <p className="text-slate-500 text-xs leading-relaxed max-w-xs font-medium">
          Filtercon patented 5-stage hydromagnetic whole-house water conditioning. Experience soft skin, scale-free pipes, and pure drinking water at every tap.
        </p>
      </div>

      {/* Single Clear Action Button */}
      <div className="pb-4">
        <Button
          onClick={onComplete}
          size="lg"
          className="w-full text-xs font-bold shadow-lg shadow-sky-950/20"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  );
}
