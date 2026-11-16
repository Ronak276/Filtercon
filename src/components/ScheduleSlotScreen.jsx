import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Calendar as CalendarIcon, Clock, ShieldCheck, 
  MapPin, CheckCircle2, ArrowRight, User, Wrench, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from './ui/button';

export default function ScheduleSlotScreen({ 
  totalAmount, 
  selectedLocation = 'San Diego (Downtown)', 
  onBack, 
  onConfirmBooking 
}) {
  // Generate Next 7 Days
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedDay = days[selectedDayIndex];
  const selectedTime = timeSlots.find((s) => s.id === selectedSlotId);

  const handleCompleteOrder = () => {
    if (onConfirmBooking) {
      onConfirmBooking({
        day: selectedDay,
        slot: selectedTime,
        location: selectedLocation
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-6 overflow-y-auto no-scrollbar font-sans select-none">
      {/* Top Header */}
      <div className="px-5 pt-12 pb-3.5 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-[#0F172A] leading-tight">
              Select Installation Slot
            </h2>
            <p className="text-[10px] text-slate-500">Step 2 of 2 • Filtercon Certified Dispatch</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold text-xs">
          <CalendarIcon className="w-4 h-4" />
        </div>
      </div>

      {!isSuccess ? (
        <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Service Address Card */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
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
              <span className="text-[10px] font-bold text-[#0284C7] bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">
                Active Zone
              </span>
            </div>

            {/* 1. Date Picker (Horizontal Day Pills) */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-black text-[#0F172A] uppercase tracking-wide">
                  Choose Preferred Date
                </span>
                <span className="text-[10px] font-bold text-[#0284C7]">Nov 2026</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {days.map((item, idx) => {
                  const isSelected = selectedDayIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDayIndex(idx)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-sky-50 border-2 border-[#0284C7] shadow-xs'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <span className={`text-[9.5px] font-bold uppercase tracking-tight ${isSelected ? 'text-[#0284C7]' : 'text-slate-400'}`}>
                        {item.day}
                      </span>
                      <span className={`text-sm font-black mt-0.5 leading-none ${isSelected ? 'text-[#0284C7]' : 'text-[#0F172A]'}`}>
                        {item.date}
                      </span>
                      <span className="text-[9px] text-slate-400 mt-0.5 font-medium">
                        {item.slot}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Time Slot Selection */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
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
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-50 border-2 border-[#0284C7] shadow-xs'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#0284C7] text-white' : 'bg-slate-100 text-slate-500'}`}>
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
                className="w-full text-xs text-[#0F172A] p-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
              />
            </div>
          </div>

          {/* Bottom Confirmation CTA Dock */}
          <div className="pt-2">
            <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs mb-3 flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase block">Selected Appointment</span>
                <span className="text-xs font-black text-[#0284C7]">
                  {selectedDay.day} ({selectedDay.date}), {selectedTime?.time.split('-')[0]}
                </span>
              </div>
              <span className="text-sm font-black text-[#0F172A]">
                ${totalAmount}
              </span>
            </div>

            <Button
              size="lg"
              onClick={handleCompleteOrder}
              className="w-full text-sm font-black py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Proceed to Payment • ${totalAmount}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
          </div>
        </div>
      ) : (
        /* Order Confirmed Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 flex-1 flex flex-col items-center justify-center text-center my-auto"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 text-[#16A34A] flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-[10px] font-black text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider mb-2">
            BOOKING CONFIRMED
          </span>

          <h3 className="text-xl font-black text-[#0F172A] mb-1">
            Installation Scheduled!
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mb-5 leading-relaxed font-medium">
            Your Filtercon technician has been dispatched for <b>{selectedDay.day} ({selectedDay.date})</b> between <b>{selectedTime?.time}</b>.
          </p>

          <div className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-xs mb-6 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Service Location</span>
              <span className="font-bold text-[#0F172A]">{selectedLocation}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Time Window</span>
              <span className="font-bold text-[#0284C7]">{selectedTime?.time}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-500">Total Charged</span>
              <span className="font-black text-[#0F172A]">${totalAmount}</span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={onBack}
            className="w-full text-xs font-bold rounded-2xl bg-[#0284C7] hover:bg-[#0369A1]"
          >
            Back to Home
          </Button>
        </motion.div>
      )}
    </div>
  );
}

