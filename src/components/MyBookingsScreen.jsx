import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Calendar as CalendarIcon, Clock, MapPin, 
  Wrench, CheckCircle2, ChevronRight, Phone, ShieldCheck, 
  AlertCircle, ArrowUpRight, Droplet, UserCheck, RefreshCw,
  X, MessageSquare, Headphones
} from 'lucide-react';
import { Button } from './ui/button';

export default function MyBookingsScreen({ onBack, onBookNew, newEstimateBooking = null }) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed'

  const initialUpcoming = [
    {
      id: 'FC-94821',
      title: '5-Stage Whole House System Installation',
      category: 'Certified Installation',
      date: 'Tomorrow, Nov 17, 2026',
      timeSlot: '09:00 AM - 11:00 AM',
      technician: {
        name: 'David Miller',
        role: 'Master Plumber • Level 4',
        rating: '4.98',
        phone: '+1 (858) 555-0192',
        verified: true
      },
      address: '742 Evergreen Terrace, San Diego, CA 92101',
      amount: '$1,749',
      status: 'Technician Assigned',
      statusColor: 'text-[#0284C7] bg-sky-50 border-sky-200'
    }
  ];

  const [bookingList, setBookingList] = useState(
    newEstimateBooking ? [newEstimateBooking, ...initialUpcoming] : initialUpcoming
  );

  // Modal states for Reschedule & Contact Dispatch
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [contactDispatchBooking, setContactDispatchBooking] = useState(null);

  // Reschedule Date & Slot selection
  const rescheduleDays = [
    { label: 'Tomorrow, Nov 17', slot: 'Tue' },
    { label: 'Wednesday, Nov 18', slot: 'Wed' },
    { label: 'Thursday, Nov 19', slot: 'Thu' },
    { label: 'Friday, Nov 20', slot: 'Fri' },
    { label: 'Saturday, Nov 21', slot: 'Sat' },
  ];
  const rescheduleSlots = [
    '09:00 AM - 11:00 AM',
    '11:30 AM - 01:30 PM',
    '02:00 PM - 04:00 PM',
    '04:30 PM - 06:30 PM'
  ];

  const [selectedRescheduleDay, setSelectedRescheduleDay] = useState(rescheduleDays[1].label);
  const [selectedRescheduleSlot, setSelectedRescheduleSlot] = useState(rescheduleSlots[0]);
  const [rescheduleReason, setRescheduleReason] = useState('Schedule Conflict');
  const [rescheduleSuccessToast, setRescheduleSuccessToast] = useState(false);

  // Dispatch live chat/call state
  const [dispatchConnecting, setDispatchConnecting] = useState(false);
  const [dispatchConnected, setDispatchConnected] = useState(false);

  const handleConfirmReschedule = () => {
    if (!rescheduleBooking) return;
    setBookingList((prev) =>
      prev.map((b) =>
        b.id === rescheduleBooking.id
          ? {
              ...b,
              date: selectedRescheduleDay,
              timeSlot: selectedRescheduleSlot,
              status: 'Rescheduled Confirmed',
              statusColor: 'text-amber-700 bg-amber-50 border-amber-200'
            }
          : b
      )
    );
    setRescheduleBooking(null);
    setRescheduleSuccessToast(true);
    setTimeout(() => setRescheduleSuccessToast(false), 3000);
  };

  const handleStartDispatchCall = () => {
    setDispatchConnecting(true);
    setTimeout(() => {
      setDispatchConnecting(false);
      setDispatchConnected(true);
    }, 1200);
  };

  const completedBookings = [
    {
      id: 'FC-81044',
      title: 'Whole House Water Hardness & TDS Diagnostic',
      category: 'Diagnostic Service',
      date: 'Nov 02, 2026',
      timeSlot: '02:00 PM - 03:30 PM',
      technician: {
        name: 'Alex Hernandez',
        role: 'Filtercon Water Specialist',
        rating: '5.0',
        phone: '+1 (858) 555-0144',
        verified: true
      },
      address: '742 Evergreen Terrace, San Diego, CA 92101',
      amount: '$0 (Complimentary)',
      status: 'Completed',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    }
  ];

  const currentList = activeTab === 'upcoming' ? bookingList : completedBookings;

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-24 overflow-y-auto no-scrollbar font-sans select-none">
      {/* 1. Top Header */}
      <div className="px-5 pt-12 pb-3.5 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-[#0F172A] leading-tight">My Bookings</h2>
            <p className="text-[10px] text-slate-500">Service visits & installations</p>
          </div>
        </div>

        <button
          onClick={onBookNew}
          className="text-[11px] font-bold text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 hover:bg-sky-100 transition-all cursor-pointer"
        >
          + Book New
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* 2. Filter Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-white text-[#0284C7] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Upcoming ({bookingList.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-white text-[#0284C7] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Past History ({completedBookings.length})
          </button>
        </div>

        {/* 3. Bookings List */}
        {currentList.length > 0 ? (
          <div className="space-y-3.5">
            {currentList.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-wide block">
                      Booking #{booking.id}
                    </span>
                    <h3 className="text-xs font-black text-[#0F172A] mt-0.5 leading-snug">
                      {booking.title}
                    </h3>
                  </div>
                  <span className={`text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full border ${booking.statusColor} shrink-0`}>
                    {booking.status}
                  </span>
                </div>

                {/* Date & Time pill */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-2xl text-xs">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Date</span>
                      <span className="text-[11px] font-bold text-[#0F172A]">{booking.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-200 pl-2">
                    <Clock className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Window</span>
                      <span className="text-[11px] font-bold text-[#0F172A]">{booking.timeSlot}</span>
                    </div>
                  </div>
                </div>

                {/* Assigned Technician Card */}
                <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#0284C7] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                      {booking.technician.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#0F172A] truncate">
                          {booking.technician.name}
                        </span>
                        <ShieldCheck className="w-3 h-3 text-[#0284C7] shrink-0" />
                      </div>
                      <span className="text-[9.5px] text-slate-500 font-medium block truncate">
                        {booking.technician.role}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`tel:${booking.technician.phone}`}
                    className="w-8 h-8 rounded-full bg-white border border-sky-200 text-[#0284C7] flex items-center justify-center hover:bg-sky-50 shadow-2xs cursor-pointer shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Service Address */}
                <div className="flex items-start gap-2 text-xs text-slate-500 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                  <span className="text-[10.5px] font-medium leading-tight">{booking.address}</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-1 flex items-center gap-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setRescheduleBooking(booking);
                      setSelectedRescheduleDay(rescheduleDays[1].label);
                      setSelectedRescheduleSlot(booking.timeSlot || rescheduleSlots[0]);
                    }}
                    className="flex-1 py-2 text-[11px] font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => {
                      setContactDispatchBooking(booking);
                      setDispatchConnected(false);
                      setDispatchConnecting(false);
                    }}
                    className="flex-1 py-2 text-[11px] font-bold rounded-xl bg-[#0284C7] text-white hover:bg-[#0369A1] active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    Contact Dispatch
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 mt-4">
            <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-xs font-black text-[#0F172A]">No bookings found</h4>
            <p className="text-[11px] text-slate-400 mt-1">You have no active appointments scheduled.</p>
          </div>
        )}
      </div>

      {/* ================= RESCHEDULE MODAL BOTTOM SHEET ================= */}
      <AnimatePresence>
        {rescheduleBooking && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="bg-white rounded-t-[32px] p-5 pb-6 space-y-4 max-h-[85%] overflow-y-auto w-full no-scrollbar"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-1 mb-2" />
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-[#0F172A]">Reschedule Appointment</h3>
                  <p className="text-[11px] text-slate-500">
                    Booking #{rescheduleBooking.id} • Filtercon Dispatch
                  </p>
                </div>
                <button
                  onClick={() => setRescheduleBooking(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Service Info Recap */}
              <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-100">
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block">
                  Current Scheduled Window
                </span>
                <span className="text-xs font-black text-[#0F172A] block mt-0.5">
                  {rescheduleBooking.date} • {rescheduleBooking.timeSlot}
                </span>
                <span className="text-[10.5px] text-[#0284C7] font-semibold mt-0.5 block">
                  Assigned: {rescheduleBooking.technician.name}
                </span>
              </div>

              {/* Select New Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                  Select New Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {rescheduleDays.map((d) => {
                    const isSel = selectedRescheduleDay === d.label;
                    return (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() => setSelectedRescheduleDay(d.label)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSel
                            ? 'bg-sky-50 border-2 border-[#0284C7] text-[#0284C7]'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-[10.5px] font-bold block">{d.label}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{d.slot} Available</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select New Time Window */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                  Select Arrival Window
                </label>
                <div className="space-y-1.5">
                  {rescheduleSlots.map((slot) => {
                    const isSel = selectedRescheduleSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedRescheduleSlot(slot)}
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSel
                            ? 'bg-sky-50 border-2 border-[#0284C7] text-[#0284C7]'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold">{slot}</span>
                        </div>
                        <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          Free Reschedule
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reason Optional */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                  Reason for Rescheduling
                </label>
                <select
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  className="w-full text-xs font-medium text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#0284C7]"
                >
                  <option value="Schedule Conflict">Schedule Conflict</option>
                  <option value="Away from Residence">Away from Residence</option>
                  <option value="Need Different Plumber">Request Alternative Technician</option>
                  <option value="Plumbing Area Not Ready">Plumbing Area Not Ready Yet</option>
                </select>
              </div>

              {/* Confirm Reschedule CTA */}
              <Button
                size="lg"
                onClick={handleConfirmReschedule}
                className="w-full text-xs font-black py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/10 active:scale-95 transition-all cursor-pointer"
              >
                Confirm Rescheduled Slot →
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= CONTACT DISPATCH MODAL ================= */}
      <AnimatePresence>
        {contactDispatchBooking && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="bg-white rounded-t-[32px] p-5 pb-6 space-y-4 max-h-[85%] overflow-y-auto w-full no-scrollbar"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-1 mb-2" />

              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0F172A]">Filtercon Dispatch Center</h3>
                    <p className="text-[10px] text-slate-500">Live Support • San Diego Operations</p>
                  </div>
                </div>
                <button
                  onClick={() => setContactDispatchBooking(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dispatch Status */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Booking Reference</span>
                  <span className="font-bold text-[#0F172A]">#{contactDispatchBooking.id}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Lead Technician</span>
                  <span className="font-bold text-[#0284C7]">{contactDispatchBooking.technician.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Dispatch Status</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Technician En Route Available
                  </span>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-2 pt-1">
                <a
                  href={`tel:${contactDispatchBooking.technician.phone}`}
                  className="w-full py-3 px-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Technician Directly ({contactDispatchBooking.technician.phone})</span>
                </a>

                <a
                  href="tel:8002445999"
                  className="w-full py-3 px-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Headphones className="w-4 h-4 text-[#0284C7]" />
                  <span>Call Central Dispatch: (800) 244-5999</span>
                </a>

                <button
                  type="button"
                  onClick={handleStartDispatchCall}
                  className="w-full py-2.5 px-3 rounded-2xl bg-sky-50 border border-sky-100 hover:bg-sky-100 text-[#0284C7] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {dispatchConnecting
                      ? 'Paging Dispatch Officer...'
                      : dispatchConnected
                      ? 'Paging Sent • Dispatch will call back in 2 mins'
                      : 'Send Instant Priority Alert to Dispatch'}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification (Contained cleanly inside mobile screen) */}
      <AnimatePresence>
        {rescheduleSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute bottom-20 left-4 right-4 z-50 bg-[#0F172A]/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 pointer-events-none"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-tight">Appointment successfully rescheduled with Filtercon dispatch!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

