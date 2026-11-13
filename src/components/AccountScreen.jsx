import React from 'react';
import { 
  ChevronLeft, Bell, MapPin, Star, ShieldCheck, 
  CreditCard, Gift, Globe, HelpCircle, ChevronRight,
  LogOut, Droplet, User, Phone, Edit2, Wrench, FileText
} from 'lucide-react';

export default function AccountScreen({ user, onLogout, onOpenAuth }) {
  const filterHealth = 88;

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-24 overflow-y-auto no-scrollbar font-sans select-none">
      {/* 1. TOP HEADER (Pure Clean Filtercon Cyan Theme) */}
      <div className="px-5 pt-12 pb-3 flex items-center justify-between bg-white border-b border-slate-100">
        <button className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200/70 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-extrabold text-[#0F172A]">Filtercon Customer Profile</h2>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200/70 shadow-xs flex items-center justify-center text-slate-700 relative hover:bg-slate-100 cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#0284C7] absolute top-2 right-2 ring-1.5 ring-white"></span>
          </button>
          <div className="w-9 h-9 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-black text-xs shadow-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'FC'}
          </div>
        </div>
      </div>

      <div className="px-5 space-y-3.5 mt-3">
        {/* 2. USER PROFILE CARD */}
        <div className="bg-white rounded-[28px] p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-sky-50 border-2 border-sky-100 flex items-center justify-center text-[#0284C7] font-black text-lg shadow-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'FC'}
                </div>
                <div className="w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center absolute bottom-0 right-0 shadow-xs">
                  <Edit2 className="w-2.5 h-2.5" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {user?.name || 'San Diego Homeowner'}
                </h3>
                <p className="text-[11px] text-[#64748B] font-medium">+1 (800) 244-5999</p>
                <p className="text-[10px] text-[#64748B] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#0284C7]" />
                  San Diego, California
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200 text-[9px] font-black uppercase tracking-tight flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              VERIFIED
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50/80 rounded-2xl text-center border border-slate-100">
            <div>
              <span className="text-sm font-black text-[#0F172A] block leading-none mb-1">01</span>
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">SYSTEM</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-sm font-black text-[#0F172A] flex items-center justify-center gap-0.5 leading-none mb-1">
                4.95 <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">PURITY</span>
            </div>
            <div>
              <span className="text-sm font-black text-[#0F172A] block leading-none mb-1">5-Yr</span>
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">WARRANTY</span>
            </div>
          </div>
        </div>

        {/* 3. FILTERCON WATER CARE STATUS (Theme Aligned) */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center flex-shrink-0">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-tight block">
                FILTERCON HOME PURITY
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-[#16A34A]">{filterHealth}% Optimal</span>
                <span className="text-[10px] text-[#64748B]">• Auto Backrinse OK</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => alert("Free In-Home Tap Water Hardness Test scheduled!")}
            className="px-3.5 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Free Test Kit
          </button>
        </div>

        {/* 4. ACCOUNT & PREFERENCES LIST */}
        <div>
          <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider block px-1 mb-2">
            SYSTEM & CONSULTATION SETTINGS
          </span>

          <div className="bg-white rounded-[24px] border border-slate-100 shadow-xs overflow-hidden divide-y divide-slate-100">
            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Installation Residence</h4>
                  <p className="text-[10px] text-[#64748B]">San Diego, California</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Technician Service History</h4>
                  <p className="text-[10px] text-[#64748B]">Routine checkups & media inspection</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#0F172A]">Lifetime Tank Certificate</h4>
                    <span className="text-[8px] font-black bg-sky-50 text-[#0284C7] px-1.5 py-0.2 rounded">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-[#64748B]">NSF Certified Stainless Steel Shell</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Language</h4>
                  <p className="text-[10px] text-[#64748B]">App interface dialect</p>
                </div>
              </div>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold bg-white text-[#0F172A] px-2 py-0.5 rounded-md shadow-xs">
                  English
                </span>
                <span className="text-[10px] font-medium text-[#64748B] px-2 py-0.5">
                  Español
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. SUPPORT & CONTACT (Direct Filtercon Lines) */}
        <div>
          <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider block px-1 mb-2">
            FILTERCON SUPPORT & TRUST
          </span>

          <div className="bg-white rounded-[24px] border border-slate-100 shadow-xs overflow-hidden">
            <a 
              href="tel:8002445999"
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Call Factory Support</h4>
                  <p className="text-[10px] text-[#64748B]">Direct Line: (800) 244-5999</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </a>
          </div>
        </div>

        {/* Action Button */}
        {user ? (
          <button
            onClick={onLogout}
            className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-rose-600 font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full py-3.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Sign In / Create Account</span>
          </button>
        )}
      </div>
    </div>
  );
}
