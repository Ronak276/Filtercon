import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronUp } from 'lucide-react';

export default function FloatingCartBar({ 
  items = [], 
  onGoToCart 
}) {
  if (!items || items.length === 0) return null;

  const totalQty = items.reduce((sum, it) => sum + it.quantity, 0);
  const totalPrice = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
  const latestItem = items[items.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="w-full z-30"
    >
      <div 
        onClick={onGoToCart}
        className="w-full bg-white rounded-2xl p-2.5 pl-3 border-2 border-[#0284C7] shadow-[0_4px_20px_rgba(2,132,199,0.18)] flex items-center justify-between cursor-pointer hover:border-[#0369A1] hover:shadow-[0_6px_24px_rgba(2,132,199,0.25)] transition-all"
      >
        {/* Left: Product Thumbnail & Title (Exact Reference Layout) */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-sky-50 border border-sky-100 flex-shrink-0 relative">
            <img
              src={latestItem?.image || '/whole-house.jpg'}
              alt={latestItem?.name || 'Water System'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=300&q=80';
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-black text-[#0F172A] tracking-tight">
                {totalQty} {totalQty === 1 ? 'service' : 'services'}
              </span>
              <span className="text-[10px] font-bold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 flex-shrink-0">
                ${totalPrice.toLocaleString()}
              </span>
              <ChevronUp className="w-3.5 h-3.5 text-[#0284C7] flex-shrink-0" />
            </div>
            <p className="text-[10px] text-slate-500 truncate mt-1 font-medium leading-tight">
              {latestItem?.name}
            </p>
          </div>
        </div>

        {/* Right: "Go to cart ->" Pill Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGoToCart();
          }}
          className="ml-2 py-2 px-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-sky-900/20 transition-all cursor-pointer flex-shrink-0 select-none"
        >
          <span>Go to cart</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
        </button>
      </div>
    </motion.div>
  );
}
