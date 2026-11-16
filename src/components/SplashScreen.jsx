import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Sparkles, ShieldCheck } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, transition: { duration: 0.45, ease: 'easeInOut' } }}
      className="absolute inset-0 z-50 bg-white text-[#0F172A] flex flex-col items-center justify-between p-8 overflow-hidden select-none font-sans"
    >
      {/* Soft Ambient Light Glows on Pure White Canvas */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-sky-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl pointer-events-none" />

      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pt-10 flex items-center gap-1.5 text-[#0284C7] text-[11px] tracking-widest uppercase font-extrabold"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Filtercon Technologies USA
      </motion.div>

      {/* Centerpiece: AI Generated 3D Water Droplet on White Background */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        className="flex flex-col items-center text-center my-auto"
      >
        <div className="w-28 h-28 rounded-[32px] overflow-hidden shadow-xl shadow-sky-900/10 border border-slate-100 mb-5 relative group">
          <img
            src="/splash-purity.jpg"
            alt="Filtercon Purity"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 via-transparent to-transparent"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl font-black tracking-tight text-[#0F172A] mb-1"
        >
          FILTERCON<span className="text-[#0284C7]">®</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-[#64748B] max-w-xs font-medium leading-relaxed"
        >
          Pure water from every tap. Salt-free whole home conditioning.
        </motion.p>
      </motion.div>

      {/* Bottom Loading Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full flex flex-col items-center pb-6"
      >
        <div className="w-36 h-1 bg-slate-100 rounded-full overflow-hidden mb-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-sky-400 to-[#0284C7] rounded-full"
          />
        </div>
        <p className="text-[10px] text-[#64748B] font-bold">Initializing Southern CA service...</p>
      </motion.div>
    </motion.div>
  );
}
