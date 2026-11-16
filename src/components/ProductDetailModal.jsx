import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, ShieldCheck, Check, Truck, RotateCcw, 
  Droplets, Heart, Sparkles, ChevronRight, Zap, Phone, Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

export default function ProductDetailModal({ product, onClose, onOpenConsultation }) {
  const [selectedImg, setSelectedImg] = useState(product?.image);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        className="bg-white rounded-t-[36px] h-[92%] flex flex-col overflow-hidden shadow-2xl relative font-sans"
      >
        {/* Grab bar */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3" />

        {/* Top Header Actions */}
        <div className="px-5 flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
              {product.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium capitalize">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className="rounded-full w-9 h-9 border-slate-100"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="rounded-full w-9 h-9 border-slate-100 text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-3">
          {/* Main Media Showcase */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 mb-3.5 aspect-[4/3] group shadow-inner">
            <img
              src={selectedImg || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {product.rating}
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-[#0F172A]/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-white flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-sky-400" />
              Filtercon Certified
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    selectedImg === img ? 'border-[#0284C7] scale-105 shadow-sm' : 'border-slate-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Tagline (Zero Price Tags) */}
          <h2 className="text-lg font-black text-slate-900 leading-snug mb-1">
            {product.name}
          </h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            {product.tagline}
          </p>

          {/* Perks Bar */}
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-center mb-4 text-[11px]">
            <div className="flex flex-col items-center">
              <Truck className="w-4 h-4 text-[#0284C7] mb-1" />
              <span className="font-bold text-slate-800">Free In-Home Install</span>
              <span className="text-[9px] text-slate-400">California Techs</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#0284C7] mb-1" />
              <span className="font-bold text-slate-800">Lifetime Tank</span>
              <span className="text-[9px] text-slate-400">NSF Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-[#0284C7] mb-1" />
              <span className="font-bold text-slate-800">100% Salt-Free</span>
              <span className="text-[9px] text-slate-400">Eco-Friendly</span>
            </div>
          </div>

          {/* Tabs: 5-Stage / Specs / Benefits */}
          <Tabs defaultValue="stages" className="w-full mb-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stages">5-Stages</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="stages" className="mt-3">
              <div className="space-y-2">
                {product.stages ? (
                  product.stages.map((st) => (
                    <div key={st.num} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {st.num}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-800 text-[11px]">{st.title}</h4>
                        <p className="text-slate-500 text-[10px] mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-xs">Patented Filtercon pure water filtration technology.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-3">
              <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {product.specs && Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1.5 border-b border-slate-200/60 last:border-b-0 text-[11px]">
                    <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-semibold text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="mt-3">
              <ul className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {product.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700 text-[11px]">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky Bottom Actions Bar: Clean Call or Estimate button */}
        <div className="p-3.5 bg-white border-t border-slate-100 flex items-center gap-2">
          <a
            href="tel:8002445999"
            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 cursor-pointer flex-shrink-0"
          >
            <Phone className="w-4 h-4 text-[#0284C7]" />
          </a>
          <button
            onClick={() => {
              if (onOpenConsultation) {
                onOpenConsultation(product);
              }
            }}
            className="flex-1 py-3 px-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all truncate"
          >
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Schedule Free Estimate</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
