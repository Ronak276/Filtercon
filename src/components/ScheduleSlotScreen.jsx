import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Calendar as CalendarIcon, Clock, ShieldCheck, 
  MapPin, CheckCircle2, ArrowRight, User, Wrench, Sparkles,
  Edit2
} from 'lucide-react';
import { Button } from './ui/button';

export default function ScheduleSlotScreen({ 
  totalAmount, 
  selectedLocation = 'San Diego (Downtown)', 
  onBack, 
  onConfirmBooking,
  isEstimateMode = false,
  estimateProduct = null
}) {
  // Step state: 1 = Date & Residence | 2 = Arrival Window & Notes
  const [currentStep, setCurrentStep] = useState(1);

  // Generate Next 6 Days
  const days = [
    { day: 'Today', date: 'Nov 16', slot: 'Mon', available: true },
    { day: 'Tomorrow', date: 'Nov 17', slot: 'Tue', available: true },
    { day: 'Wednesday', date: 'Nov 18', slot: 'Wed', available: true },
    { day: 'Thursday', date: 'Nov 19', slot: 'Thu', available: true },
    { day: 'Friday', date: 'Nov 20', slot: 'Fri', available: true },
    { day: 'Saturday', date: 'Nov 21', slot: 'Sat', available: true },
  ];

  // Time Slots
  const timeSlots = [
    { id: 'morning-1', time: '09:00 AM - 11:00 AM', label: 'Morning Slot', popular: true },
    { id: 'morning-2', time: '11:30 AM - 01:30 PM', label: 'Midday Slot', popular: false },
    { id: 'afternoon-1', time: '02:00 PM - 04:00 PM', label: 'Afternoon Slot', popular: true },
    { id: 'evening-1', time: '04:30 PM - 06:30 PM', label: 'Evening Slot', popular: false },
  ];

  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Default Tomorrow
  const [selectedSlotId, setSelectedSlotId] = useState('morning-1');
  const [addressDetails, setAddressDetails] = useState('');

  const selectedDay = days[selectedDayIndex];
  const selectedTime = timeSlots.find((s) => s.id === selectedSlotId);

  const handleHeaderBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      onBack();
    }
  };

  const handleProceedToPayment = () => {
    if (onConfirmBooking) {
      onConfirmBooking({
        day: selectedDay,
        slot: selectedTime,
        location: selectedLocation,
        note: addressDetails
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] font-sans select-none h-full overflow-hidden">
      {/* Top Header */}
      <div className="flex-shrink-0 px-5 pt-12 pb-3.5 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleHeaderBack}
            className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-[#0F172A] leading-tight">
              {isEstimateMode 
                ? (currentStep === 1 ? 'Free On-Site Estimate Date' : 'Choose Time Slot')
                : (currentStep === 1 ? 'Choose Installation Date' : 'Choose Time Slot')}
            </h2>
            <p className="text-[10px] text-slate-500">
              {isEstimateMode 
                ? `Step ${currentStep} of 2 • Filtercon Free In-Home Consultation`
                : `Step ${currentStep} of 2 • Filtercon Certified Dispatch`}
            </p>
          </div>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-1.5">
          <div className={`w-6 h-2 rounded-full transition-all ${
            currentStep === 1 ? 'bg-[#0284C7]' : 'bg-slate-200'
          }`} />
          <div className={`w-6 h-2 rounded-full transition-all ${
            currentStep === 2 ? 'bg-[#0284C7]' : 'bg-slate-200'
          }`} />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          <AnimatePresence mode="wait">
            {/* ================= STEP 1: DATE & SERVICE RESIDENCE ================= */}
          {currentStep === 1 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="space-y-4"
            >
              {/* Service Address Card */}
              {isEstimateMode && estimateProduct && (
                <div className="bg-white rounded-3xl p-3.5 border border-sky-100 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={estimateProduct.image} 
                      alt={estimateProduct.name}
                      className="w-12 h-12 rounded-2xl object-contain bg-slate-50 border border-slate-100 p-1 flex-shrink-0" 
                    />
                    <div>
                      <span className="text-[9px] font-bold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        FREE ESTIMATE FOR
                      </span>
                      <h4 className="text-xs font-black text-[#0F172A] leading-tight mt-1 truncate max-w-[190px]">
                        {estimateProduct.name}
                      </h4>
                      <p className="text-[10px] text-emerald-600 font-bold">$0 On-Site Evaluation</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                      SERVICE RESIDENCE
                    </span>
                    <h4 className="text-xs font-black text-[#0F172A] leading-tight mt-0.5">
                      {selectedLocation}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">Southern California Region</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#0284C7] bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
                  Active Zone
                </span>
              </div>

              {/* Date Selection Grid */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <span className="text-xs font-black text-[#0F172A] uppercase tracking-wide block">
                      Choose Installation Date
                    </span>
                    <p className="text-[10.5px] text-slate-400 font-medium">
                      Certified technician arrives with full system & equipment
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                    Nov 2026
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {days.map((item, idx) => {
                    const isSelected = selectedDayIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDayIndex(idx)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-sky-50/90 border-2 border-[#0284C7] shadow-xs'
                            : 'bg-slate-50/60 border-slate-200/70 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className={`text-[10px] font-bold uppercase tracking-tight ${isSelected ? 'text-[#0284C7]' : 'text-slate-400'}`}>
                          {item.day}
                        </span>
                        <span className={`text-base font-black mt-1 leading-none ${isSelected ? 'text-[#0284C7]' : 'text-[#0F172A]'}`}>
                          {item.date}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 font-medium">
                          {item.slot} • Available
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technician Dispatch Guarantee Pill */}
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                <p className="text-[11px] text-emerald-800 font-medium leading-snug">
                  Guaranteed on-time arrival by Filtercon licensed plumbing crew.
                </p>
              </div>
            </motion.div>
          ) : (
            /* ================= STEP 2: ARRIVAL WINDOW & ENTRY NOTE ================= */
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.22 }}
              className="space-y-4"
            >
              {/* Selected Date Summary Pill (Allows quick 1-tap edit back to Step 1) */}
              <div 
                onClick={() => setCurrentStep(1)}
                className="p-3 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-center justify-between cursor-pointer hover:bg-sky-50/40 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block">
                      SCHEDULED DATE
                    </span>
                    <span className="text-xs font-black text-[#0F172A]">
                      {selectedDay.day} ({selectedDay.date}, {selectedDay.slot})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-[#0284C7]">
                  <Edit2 className="w-3 h-3" />
                  <span>Change</span>
                </div>
              </div>

              {/* Arrival Window Selection */}
              <div>
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <span className="text-xs font-black text-[#0F172A] uppercase tracking-wide">
                    Choose Technician Arrival Window
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Free Arrival
                  </span>
                </div>

                <div className="space-y-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-sky-50 border-2 border-[#0284C7] shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#0284C7] text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className={`text-xs font-black ${isSelected ? 'text-[#0284C7]' : 'text-[#0F172A]'}`}>
                                {slot.time}
                              </h4>
                              {slot.popular && (
                                <span className="text-[8px] font-black uppercase tracking-tight bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.2 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium">
                              {slot.label} • 2 Technicians Allocated
                            </p>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#0284C7] bg-[#0284C7] text-white' : 'border-slate-300'}`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions Note */}
              <div className="p-3 bg-white rounded-2xl border border-slate-100 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Plumbing / Gate Entry Note (Optional)
                </span>
                <input
                  type="text"
                  placeholder="e.g. Ring bell 4B or side garage plumbing access"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  className="w-full text-xs text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        {/* ================= FIXED BOTTOM CTA DOCK ================= */}
        <div className="flex-shrink-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] z-20">
          {currentStep === 1 ? (
            <Button
              size="lg"
              onClick={() => setCurrentStep(2)}
              className="w-full text-sm font-black py-3.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Choose Time Slot</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
          ) : (
            <div className="space-y-2">
              <div className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase block">Selected Appointment</span>
                  <span className="text-xs font-black text-[#0284C7]">
                    {selectedDay.day} ({selectedDay.date}), {selectedTime?.time.split('-')[0]}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#0F172A] block">
                    {isEstimateMode ? '$0 Free' : `$${totalAmount}`}
                  </span>
                  {isEstimateMode && (
                    <span className="text-[9px] text-emerald-600 font-bold">100% Complimentary</span>
                  )}
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleProceedToPayment}
                className="w-full text-sm font-black py-3.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isEstimateMode 
                      ? 'Confirm Free Estimate Visit →' 
                      : `Proceed to Payment • $${totalAmount}`}
                  </span>
                  {!isEstimateMode && <ArrowRight className="w-4 h-4" />}
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
