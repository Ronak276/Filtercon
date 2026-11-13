import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Bell, Search, Sparkles, ShieldCheck, 
  Droplets, ArrowRight, Star, CheckCircle2,
  Calendar, Layers, Zap, Gift, Share2, Clock, Check,
  Phone, Heart, Award, Wrench, Droplet, Users, ChevronRight, CheckCircle
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Badge } from './ui/badge';

export default function HomeScreen({ 
  onSelectProduct, 
  onOpenDiagnostic, 
  onOpenCategories, 
  onOpenLocation,
  selectedLocation = 'San Diego (Downtown)'
}) {
  // Hero Carousel State: Auto-switches every 3 seconds
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: '/hero-water.jpg',
      title: 'Filtercon Pure Home',
      tagline: '5-Stage whole home water conditioning',
      badge: '100% Salt-Free Purity',
      cta: 'Explore'
    },
    {
      id: 2,
      image: '/hero-shower.jpg',
      title: 'Spa Stream Purity',
      tagline: 'De-chlorinated spa showers for skin & hair',
      badge: 'Zero Chlorine Vapor',
      cta: 'View Shower'
    },
    {
      id: 3,
      image: '/hero-install.jpg',
      title: 'Whole House Towers',
      tagline: 'Dual stainless steel non-chemical filtration',
      badge: 'Lifetime Tank Quality',
      cta: 'View System'
    }
  ];

  // Auto-play carousel every 3 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);
  // Real Whole House Installations directly from filtercon.com
  const sanDiegoHomes = [
    {
      neighborhood: 'San Diego Residence',
      system: 'Whole House 5-Stage & Salt-Free Softener',
      image: '/sd-install-1.jpg',
      badge: 'Twin Stainless Towers'
    },
    {
      neighborhood: 'Del Mar Coastal Home',
      system: 'Fluoride & Chemical Removal System',
      image: '/sd-install-2.jpg',
      badge: 'Del Mar, CA'
    },
    {
      neighborhood: 'Carlsbad Luxury Home',
      system: 'Patented Hydromagnetic Conditioner',
      image: '/sd-install-3.jpg',
      badge: 'Carlsbad, CA'
    },
    {
      neighborhood: 'Encinitas Garage Install',
      system: 'Zero-Maintenance Whole Home Unit',
      image: '/sd-install-4.jpg',
      badge: 'Encinitas, CA'
    }
  ];

  // Real Doctors and Health Professionals from filtercon.com
  const realDoctors = [
    {
      name: 'Dr. Mark Drucker, M.D.',
      title: 'Integrative Medicine Specialist',
      location: 'San Diego, CA',
      image: '/doctor-drucker.jpg',
      quote: 'Water quality is the foundation of patient health. Filtercon removes toxic chemicals and chlorine without adding sodium.'
    },
    {
      name: 'Dr. William Kellas, Ph.D.',
      title: 'Biochemist & Health Advocate',
      location: 'Southern California',
      image: '/doctor-kellas.jpg',
      quote: 'The hydromagnetic and catalytic carbon beds provide the cleanest chemical-free water I have ever evaluated for home use.'
    },
    {
      name: 'Dr. David Nelson, D.C.',
      title: 'Clinical Nutritionist & Chiropractor',
      location: 'San Diego, CA',
      image: '/doctor-nelson.jpg',
      quote: 'Our family and patients love Filtercon. Bathing in de-chlorinated water makes a huge difference for allergies and eczema.'
    }
  ];

  // Benefits to Family & Home from website
  const familyBenefits = [
    {
      emoji: '✨',
      title: 'Silky Hair & Soft Skin',
      desc: 'Eliminates 99% free chlorine in shower steam that causes dry itchy skin, eczema & brittle hair.'
    },
    {
      emoji: '🛡️',
      title: 'Protects Plumbing & Water Heaters',
      desc: 'Prevents damaging mineral scale buildup inside tankless heaters, dishwashers, and copper pipes.'
    },
    {
      emoji: '🚰',
      title: 'Drinking Water at Every Tap',
      desc: 'Enjoy crisp, pure, chemical-free mountain-spring water from every faucet in your house.'
    },
    {
      emoji: '🌿',
      title: '100% Eco-Friendly & Garden Safe',
      desc: 'No salt discharge. Backwash water is completely safe for your lawn, trees, and California plants.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col bg-white pb-6 overflow-y-auto no-scrollbar font-sans"
    >
      {/* 1. HERO SECTION WITH 3-SECOND AUTO CAROUSEL */}
      <div className="relative w-full h-[330px] rounded-b-[40px] overflow-hidden shadow-md flex-shrink-0">
        {/* Animated Carousel Image with smooth crossfade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={heroIndex}
            src={heroSlides[heroIndex].image}
            alt={heroSlides[heroIndex].title}
            initial={{ opacity: 0.3, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/85"></div>

        {/* Top Navbar Header inside Hero */}
        <div className="absolute top-12 left-0 right-0 px-4 flex items-center justify-between z-20">
          <div 
            onClick={onOpenLocation}
            className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 mr-2"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 text-white flex-shrink-0">
              <MapPin className="w-5 h-5 text-sky-300" />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 leading-none mb-1">
                <span className="text-[10px] font-black text-white bg-[#0284C7] px-2 py-0.5 rounded-full shadow-xs uppercase tracking-tight flex-shrink-0">
                  10-15 MINS
                </span>
                <span className="text-xs text-white/90 font-bold truncate">
                  California
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-sm font-black text-white drop-shadow-sm leading-none">
                <span className="truncate">{selectedLocation}</span>
                <span className="text-[10px] text-sky-300 flex-shrink-0">▾</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button 
              onClick={onOpenCategories}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer border border-white/10"
            >
              <Search className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors relative cursor-pointer border border-white/10">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#0284C7] absolute top-2 right-2 ring-1.5 ring-black"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#0284C7] flex items-center justify-center text-white font-black text-xs shadow-md border border-white/30 cursor-pointer">
              FC
            </div>
          </div>
        </div>

        {/* Hero Title & CTA (Ultra clean, minimal text, matching Kaamzo) */}
        <div className="absolute bottom-6 left-5 right-5 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl font-black text-white tracking-tight leading-tight mb-1 drop-shadow-md">
                {heroSlides[heroIndex].title}
              </h1>
              <p className="text-xs text-white/90 font-normal mb-3 drop-shadow-sm">
                {heroSlides[heroIndex].tagline}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">
              {heroSlides[heroIndex].badge}
            </span>

            <button
              onClick={() => onSelectProduct('fc-wh-5stage')}
              className="px-4 py-2.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-950/40 cursor-pointer transition-all"
            >
              <span>{heroSlides[heroIndex].cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Carousel Dots */}
          <div className="flex items-center gap-1.5 mt-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  heroIndex === idx ? 'w-5 h-1.5 bg-[#0284C7]' : 'w-1.5 h-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. CORE WATER PURIFICATION LINEUP (No Prices) */}
      <div className="px-5 mt-6 mb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🚰</span>
            <h3 className="text-sm font-bold text-[#0F172A]">Filtercon Water Solutions</h3>
          </div>
          <p className="text-[10px] text-[#64748B]">Certified chemical & salt-free whole house systems</p>
        </div>
        <div className="flex items-center gap-1 bg-[#F0F9FF] text-[#0284C7] px-2.5 py-1 rounded-full text-[10px] font-bold border border-sky-100">
          <Clock className="w-3 h-3" />
          <span>24-48h ETA</span>
        </div>
      </div>

      {/* 3-Column Product Cards */}
      <div className="px-5 grid grid-cols-3 gap-2.5 mb-6">
        {PRODUCTS.slice(0, 6).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectProduct(item.id)}
            className="bg-white rounded-2xl border border-slate-100 p-2 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-1.5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <span className="absolute top-1 right-1 bg-black/60 backdrop-blur-xs text-white px-1 py-0.2 rounded text-[8px] font-bold flex items-center gap-0.5">
                <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
                {item.rating}
              </span>
            </div>

            <div className="mb-1">
              <h4 className="text-[11px] font-bold text-[#0F172A] line-clamp-1 leading-tight group-hover:text-[#0284C7] transition-colors">
                {item.name}
              </h4>
              <p className="text-[9px] text-[#64748B] line-clamp-1">
                {item.tagline}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-50">
              <span className="text-[9px] font-bold text-[#0284C7] uppercase tracking-tight">
                {item.badge}
              </span>
              <div className="w-6 h-6 rounded-full bg-[#0284C7] hover:bg-[#0369A1] active:scale-90 text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. WHOLE HOUSE SYSTEMS INSTALLED AROUND SAN DIEGO HOMES (Minimalist Title) */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">
            San Diego Installations
          </h3>
          <span className="text-[10px] text-[#0284C7] font-bold">25,000+ Homes</span>
        </div>

        {/* Real Installation Photos from Website */}
        <div className="grid grid-cols-2 gap-3">
          {sanDiegoHomes.map((home, idx) => (
            <div 
              key={idx}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={home.image}
                  alt={home.neighborhood}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {home.badge}
                </span>
              </div>
              <div className="p-2.5">
                <h4 className="text-xs font-bold text-[#0F172A] leading-tight mb-0.5">{home.neighborhood}</h4>
                <p className="text-[10px] text-[#0284C7] font-semibold">{home.system}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. OUR REPUTATION - REAL DOCTORS & HEALTH PROFESSIONALS (Direct from filtercon.com) */}
      <div className="px-5 mb-7">
        <div className="rounded-3xl bg-gradient-to-br from-[#F0F9FF] via-white to-sky-50 border border-sky-100 p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 text-[#0284C7] text-[10px] font-extrabold tracking-wider uppercase mb-1">
            <Award className="w-4 h-4" />
            Our Reputation & Medical Endorsements
          </div>
          
          <h3 className="text-sm font-black text-[#0F172A] mb-3 leading-snug">
            Used & Recommended by Doctors and Health Professionals Worldwide
          </h3>

          {/* Real Doctor Cards from Website */}
          <div className="space-y-3 mb-3">
            {realDoctors.map((doc, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-sky-100 p-3 shadow-xs flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-sky-200 flex-shrink-0 shadow-xs">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
                      {doc.name}
                    </h4>
                    <span className="text-[9px] text-[#0284C7] font-bold bg-sky-50 px-1.5 py-0.2 rounded">
                      {doc.location}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#16A34A] font-semibold mb-1">
                    {doc.title}
                  </p>
                  <p className="text-[10px] text-[#64748B] italic leading-tight line-clamp-2">
                    "{doc.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Medical Trust Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#0F172A] font-bold pt-1">
            <div className="p-2 bg-white rounded-xl border border-sky-100 flex flex-col items-center">
              <CheckCircle className="w-4 h-4 text-[#16A34A] mb-1" />
              <span>100% Chemical-Free</span>
            </div>
            <div className="p-2 bg-white rounded-xl border border-sky-100 flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-[#0284C7] mb-1" />
              <span>NSF Certified</span>
            </div>
            <div className="p-2 bg-white rounded-xl border border-sky-100 flex flex-col items-center">
              <Heart className="w-4 h-4 text-rose-500 mb-1" />
              <span>Eczema Relief</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. HEALTH & HOME BENEFITS */}
      <div className="px-5 mb-6">
        <div className="p-4 rounded-3xl bg-[#F0F9FF] border border-sky-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold text-[#0284C7] uppercase tracking-wider">
                Everyday Living
              </span>
              <h3 className="text-sm font-extrabold text-[#0F172A]">
                Whole House Family Benefits
              </h3>
            </div>
            <Award className="w-5 h-5 text-[#0284C7]" />
          </div>

          <div className="space-y-2.5">
            {familyBenefits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-white p-2.5 rounded-2xl border border-sky-100 shadow-xs">
                <span className="text-lg flex-shrink-0">{item.emoji}</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">{item.title}</h4>
                  <p className="text-[10px] text-[#64748B] leading-snug mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. UNIFIED CLEAN IN-HOME TEST & QUIZ SECTION (Modern, Single Card Layout) */}
      <div className="px-5 mb-4">
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#0F172A] to-slate-900 text-white shadow-sm border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-800">
              FREE HOME CONSULTATION
            </span>
            <span className="text-[10px] text-slate-400">Zero Charge</span>
          </div>

          <h3 className="text-sm font-black text-white leading-tight mb-1">
            Test Your Water Hardness & Chlorine
          </h3>
          <p className="text-[11px] text-slate-300 mb-3.5 leading-snug">
            A Filtercon technician will evaluate your plumbing and tap water hardness on-site.
          </p>

          <div className="flex items-center gap-2">
            <a
              href="tel:8002445999"
              className="flex-1 py-2.5 px-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-950/40 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call (800) 244-5999</span>
            </a>
            <button
              onClick={onOpenDiagnostic}
              className="py-2.5 px-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
