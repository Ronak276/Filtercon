import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Calendar as CalendarIcon, Clock, MapPin, 
  Wrench, CheckCircle2, ChevronRight, Phone, ShieldCheck, 
  AlertCircle, ArrowUpRight, Droplet, UserCheck, RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';

export default function MyBookingsScreen({ onBack, onBookNew }) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed'

  const upcomingBookings = [
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

  const currentList = activeTab === 'upcoming' ? upcomingBookings : completedBookings;

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
            Upcoming ({upcomingBookings.length})
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
                    onClick={() => alert(`Reschedule request initiated for #${booking.id}`)}
                    className="flex-1 py-2 text-[11px] font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => alert(`Support connected for booking #${booking.id}`)}
                    className="flex-1 py-2 text-[11px] font-bold rounded-xl bg-[#0284C7] text-white hover:bg-[#0369A1] transition-all cursor-pointer shadow-xs"
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
    </div>
  );
}

