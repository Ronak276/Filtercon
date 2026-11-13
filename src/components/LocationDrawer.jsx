import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Navigation, Search, Check, 
  MapPin, Clock, ShieldCheck, X
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const LOCALITIES = [
  {
    id: 'sd-central',
    name: 'San Diego (Downtown & Gaslamp)',
    county: 'San Diego County • Fast Install',
    pincode: '92101',
    eta: '~24 hrs',
    isAvailable: true,
  },
  {
    id: 'sd-lajolla',
    name: 'La Jolla & Pacific Beach',
    county: 'Coastal San Diego • Certified',
    pincode: '92037',
    eta: '~Same Day',
    isAvailable: true,
  },
  {
    id: 'sd-carlsbad',
    name: 'Carlsbad & Encinitas',
    county: 'North County Coastal',
    pincode: '92008',
    eta: '~24 hrs',
    isAvailable: true,
  },
  {
    id: 'oc-irvine',
    name: 'Irvine & Newport Beach',
    county: 'Orange County Region',
    pincode: '92612',
    eta: '~48 hrs',
    isAvailable: true,
  },
  {
    id: 'la-beverly',
    name: 'Beverly Hills & West LA',
    county: 'Los Angeles Metro',
    pincode: '90210',
    eta: '~48 hrs',
    isAvailable: true,
  },
  {
    id: 'palm-springs',
    name: 'Palm Springs & Coachella Valley',
    county: 'Riverside County High Hardness Zone',
    pincode: '92262',
    eta: '~2-3 Days',
    isAvailable: true,
  }
];

export default function LocationDrawer({ isOpen, onClose, selectedLocality, onSelectLocality }) {
  const [search, setSearch] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  const filteredLocalities = LOCALITIES.filter(
    (loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.county.toLowerCase().includes(search.toLowerCase()) ||
      loc.pincode.includes(search)
  );

  const handleAutoDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      onSelectLocality(LOCALITIES[1].name); // La Jolla
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="bg-white rounded-t-[36px] h-[92%] flex flex-col overflow-hidden shadow-2xl border-t border-slate-100"
          >
            {/* Grab Bar */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3" />

            {/* Header matching Reference Image #2 */}
            <div className="px-5 pb-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    Choose Delivery Locality
                  </h3>
                  <p className="text-[11px] text-[#64748B]">
                    Showing service areas in Southern California (18 technicians ready)
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-[#0284C7]">
                <MapPin className="w-4 h-4" />
              </div>
            </div>

            {/* Auto Detect Button Card (Exact match with reference #2) */}
            <div className="p-4 pb-2">
              <button
                onClick={handleAutoDetect}
                disabled={isDetecting}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 via-sky-50/60 to-white border border-[#0284C7]/30 hover:border-[#0284C7] transition-all flex items-center justify-between group shadow-xs cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center shadow-sm">
                    <Navigation className="w-5 h-5 fill-white/20" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0284C7] flex items-center gap-1.5">
                      {isDetecting ? 'Detecting your GPS...' : 'Auto Detect My Current Location'}
                    </h4>
                    <p className="text-[10px] text-[#64748B]">
                      GPS precision pinpoint to nearest California service hub
                    </p>
                  </div>
                </div>
                <div className="text-[#0284C7] font-bold">›</div>
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="px-4 py-2">
              <div className="relative">
                <Search className="w-4 h-4 text-[#0284C7] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search locality, zip code, or county..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </div>

            {/* Available Localities List (Reference #2 Card List format) */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2 space-y-2.5">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block px-1">
                Available Service Zones
              </span>

              {filteredLocalities.map((loc) => {
                const isSelected = selectedLocality === loc.name;
                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      onSelectLocality(loc.name);
                      onClose();
                    }}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50/70 border-[#0284C7] shadow-xs'
                        : 'bg-white border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#0284C7] text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-[#0F172A]">{loc.name}</h4>
                          <span className="text-[9px] font-bold text-[#16A34A] bg-green-50 px-1.5 py-0.2 rounded">
                            {loc.eta}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#64748B]">
                          Zip: {loc.pincode} • {loc.county}
                        </p>
                      </div>
                    </div>

                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="text-slate-400 font-bold">›</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer Verification Badge */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B] px-5">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                100% Filtercon Factory Installation Guarantee
              </span>
              <span className="font-bold text-[#0284C7]">18 Techs Active</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

