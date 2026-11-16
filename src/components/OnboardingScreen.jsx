import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Droplets, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

export default function OnboardingScreen({ onComplete, onOpenAuth }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-40 bg-white flex flex-col justify-between select-none font-sans overflow-hidden"
    >
      {/* 1. TOP 70% IMMERSIVE FULL-WIDTH BACKGROUND PHOTO */}
      <div className="relative w-full h-[66%] overflow-hidden">
        <img
          src="/onboarding-vertical.jpg"
          alt="Filtercon Pure Living Home"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = '/onboarding-family.jpg';
          }}
        />

        {/* Seamless Soft Gradient Blend from image into the bottom white content container */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white pointer-events-none" />
      </div>

      {/* 2. BOTTOM 34% CONTENT & CTAs (Exact Reference Typography & Alignment) */}
      <div className="flex-1 -mt-8 relative z-10 px-6 pb-6 flex flex-col justify-between bg-gradient-to-t from-white via-white to-transparent">
        <div>
          {/* Welcome Pill Tag matching reference */}
          <div className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-100/80 px-3 py-1 rounded-full text-[10px] font-extrabold text-[#0284C7] uppercase tracking-wider mb-2.5">
            <Droplets className="w-3 h-3 text-[#0284C7]" />
            <span>WELCOME TO FILTERCON</span>
          </div>

          {/* Bold Modern Headline */}
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight mb-2">
            Whole House Pure & <br />Salt-Free Living
          </h1>

          {/* Subtitle description */}
          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[320px]">
            Patented 5-stage hydromagnetic conditioning. Experience silky soft skin, scale-free plumbing, and pure alkaline drinking water.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-3">
          <Button
            onClick={() => {
              if (onOpenAuth) onOpenAuth();
              else onComplete();
            }}
            size="lg"
            className="w-full text-xs font-black py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Sign In / Create Account</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>

          <button
            onClick={onComplete}
            className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-center"
          >
            Explore Catalog as Guest
          </button>
        </div>
      </div>
    </motion.div>
  );
}
