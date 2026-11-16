import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Bell, CheckCircle2, ShieldCheck, 
  Droplet, Calendar, Sparkles, Clock, Trash2, ArrowRight
} from 'lucide-react';

export default function NotificationScreen({ onBack, onOpenTab }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Free In-Home Water Test Available',
      desc: 'Technicians are servicing San Diego Downtown this week. Tap to schedule free on-site testing.',
      time: '10m ago',
      unread: true,
      type: 'test',
      action: 'diagnostic'
    },
    {
      id: 2,
      title: 'Whole House System Estimate Saved',
      desc: 'Your consultation selection for 5-Stage Whole House System is reserved in your cart.',
      time: '2h ago',
      unread: true,
      type: 'cart',
      action: 'cart'
    },
    {
      id: 3,
      title: 'Annual Filter Health: Good (88%)',
      desc: 'Your hydromagnetic conditioning bed is operating at optimum polarity. Zero maintenance needed.',
      time: '1d ago',
      unread: false,
      type: 'system',
      action: 'account'
    },
    {
      id: 4,
      title: 'Doctor Recommended Pure Living',
      desc: 'Dr. Mark Drucker, M.D. shared new insights on non-chemical chlorine elimination for skin health.',
      time: '3d ago',
      unread: false,
      type: 'article',
      action: 'home'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-6 overflow-y-auto no-scrollbar font-sans select-none">
      {/* Top Header */}
      <div className="px-5 pt-12 pb-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-[#0F172A] leading-tight">Notifications</h2>
            <p className="text-[10px] text-slate-500">Filtercon Updates & Alerts</p>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-[11px] font-bold text-[#0284C7] hover:underline cursor-pointer"
            >
              Mark all read
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={clearAll}
              className="text-[11px] font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-2.5 flex-1">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                if (onOpenTab && item.action) onOpenTab(item.action);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                item.unread
                  ? 'bg-white border-[#0284C7]/30 shadow-xs ring-1 ring-[#0284C7]/10'
                  : 'bg-white/80 border-slate-100 hover:bg-white shadow-2xs'
              }`}
            >
              {/* Type Icon */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  item.type === 'test'
                    ? 'bg-sky-50 text-[#0284C7]'
                    : item.type === 'cart'
                    ? 'bg-emerald-50 text-emerald-600'
                    : item.type === 'system'
                    ? 'bg-cyan-50 text-cyan-600'
                    : 'bg-amber-50 text-amber-500'
                }`}
              >
                {item.type === 'test' && <Droplet className="w-4 h-4" />}
                {item.type === 'cart' && <Sparkles className="w-4 h-4" />}
                {item.type === 'system' && <ShieldCheck className="w-4 h-4" />}
                {item.type === 'article' && <Bell className="w-4 h-4" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className={`text-xs leading-tight truncate ${item.unread ? 'font-black text-[#0F172A]' : 'font-bold text-slate-700'}`}>
                    {item.title}
                  </h4>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#0284C7] flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug font-normal line-clamp-2 mb-1.5">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[9.5px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {item.time}
                  </span>
                  <span className="text-[9.5px] font-bold text-[#0284C7] hover:underline flex items-center gap-0.5">
                    View <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-3xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-3">
              <Bell className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">No Notifications</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
              You're all caught up with your Filtercon service and filter updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

