import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Bell, MapPin, Star, ShieldCheck, 
  CreditCard, Gift, Globe, HelpCircle, ChevronRight,
  LogOut, Droplet, User, Phone, Edit2, Wrench, FileText,
  X, Check, Camera, Award, Download, Share2, Shield, Sparkles
} from 'lucide-react';
import { Button } from './ui/button';

export default function AccountScreen({ 
  user, 
  onLogout, 
  onOpenAuth, 
  onBack, 
  onOpenNotifications, 
  onOpenBookings,
  onUpdateUser,
  selectedLocation = 'San Diego (Downtown)',
  onUpdateLocation
}) {
  const filterHealth = 88;

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'San Diego Homeowner');
  const [editPhone, setEditPhone] = useState(user?.phone || '+1 (858) 555-0192');
  const [editLocation, setEditLocation] = useState(user?.location || selectedLocation || 'San Diego, CA');
  const [editEmail, setEditEmail] = useState(user?.email || 'homeowner@sandiego.com');
  const [editAvatarInitial, setEditAvatarInitial] = useState(user?.name ? user.name.charAt(0).toUpperCase() : 'S');
  const [toastMessage, setToastMessage] = useState('');

  // Installation Residence Sheet State
  const [isResidenceModalOpen, setIsResidenceModalOpen] = useState(false);
  const [streetAddress, setStreetAddress] = useState('742 Evergreen Terrace');
  const [unitApt, setUnitApt] = useState('Gate Code: #4821');
  const [residenceCity, setResidenceCity] = useState(selectedLocation || 'San Diego, CA');
  const [residenceZip, setResidenceZip] = useState('92101');
  const [plumbingType, setPlumbingType] = useState('garage'); // 'garage' | 'sideyard' | 'basement' | 'undersink'
  const [gateEntryNotes, setGateEntryNotes] = useState('Side gate is unlocked. Main shut-off valve located next to water heater.');

  const [californiaHubs] = useState([
    { name: 'San Diego (Downtown)', zip: '92101', hardness: '18.5 GPG (Very Hard)' },
    { name: 'La Jolla & Pacific Beach', zip: '92037', hardness: '16.8 GPG (Very Hard)' },
    { name: 'Carlsbad & Encinitas', zip: '92008', hardness: '17.2 GPG (Very Hard)' },
    { name: 'Irvine & Orange County', zip: '92612', hardness: '15.4 GPG (Hard)' }
  ]);

  // Lifetime Tank Certificate Modal State
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isDownloadingCert, setIsDownloadingCert] = useState(false);

  // Language State
  const [currentLanguage, setCurrentLanguage] = useState('en'); // 'en' | 'es'

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    setToastMessage(lang === 'es' ? 'Idioma cambiado a Español' : 'Language switched to English');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDownloadCertificate = () => {
    setIsDownloadingCert(true);
    setTimeout(() => {
      setIsDownloadingCert(false);
      setToastMessage('Warranty certificate downloaded to device!');
      setTimeout(() => setToastMessage(''), 3000);
    }, 1200);
  };

  const handleShareCertificate = () => {
    setToastMessage('Certificate link copied to clipboard for insurance/realtor!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenResidence = () => {
    setIsResidenceModalOpen(true);
  };

  const handleSaveResidence = (e) => {
    e.preventDefault();
    const formattedLocation = `${residenceCity}`;
    if (onUpdateLocation) {
      onUpdateLocation(formattedLocation);
    }
    if (onUpdateUser) {
      onUpdateUser({
        ...(user || {}),
        location: formattedLocation,
        streetAddress: streetAddress,
        plumbingType: plumbingType
      });
    }
    setIsResidenceModalOpen(false);
    setToastMessage('Installation residence updated successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenEdit = () => {
    setEditName(user?.name || 'San Diego Homeowner');
    setEditPhone(user?.phone || '+1 (858) 555-0192');
    setEditLocation('San Diego, CA');
    setEditEmail(user?.email || 'homeowner@sandiego.com');
    setEditAvatarInitial(user?.name ? user.name.charAt(0).toUpperCase() : 'S');
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...(user || {}),
      name: editName.trim() || 'San Diego Homeowner',
      phone: editPhone.trim() || '+1 (858) 555-0192',
      email: editEmail.trim(),
      location: editLocation.trim()
    };
    if (onUpdateUser) {
      onUpdateUser(updated);
    }
    setIsEditModalOpen(false);
    setToastMessage('Profile updated successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-3 overflow-y-auto no-scrollbar font-sans select-none">
      {/* 1. TOP HEADER (Pure Clean Filtercon Cyan Theme) */}
      <div className="px-5 pt-12 pb-3 flex items-center justify-between bg-white border-b border-slate-100">
        <button 
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200/70 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-extrabold text-[#0F172A]">Filtercon Customer Profile</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200/70 shadow-xs flex items-center justify-center text-slate-700 relative hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#0284C7] absolute top-2 right-2 ring-1.5 ring-white"></span>
          </button>
          <div className="w-9 h-9 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-black text-xs shadow-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
          </div>
        </div>
      </div>

      <div className="px-5 space-y-3.5 mt-3">
        {/* 2. USER PROFILE CARD (Cleanly balanced, no squished or overflowing text) */}
        <div className="bg-white rounded-[24px] p-3.5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div 
              onClick={handleOpenEdit}
              className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer group"
              title="Click to edit profile"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-sky-50 border-2 border-sky-100 flex items-center justify-center text-[#0284C7] font-black text-base shadow-xs group-hover:bg-sky-100 transition-colors">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEdit();
                  }}
                  className="w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center absolute -bottom-0.5 -right-0.5 shadow-xs border border-white hover:bg-[#0369A1] transition-all cursor-pointer"
                  title="Edit Profile"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                </button>
              </div>

              <div className="min-w-0 flex-1 pr-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-[#0F172A] truncate leading-tight group-hover:text-[#0284C7] transition-colors">
                    {user?.name || 'San Diego Homeowner'}
                  </h3>
                  <span className="text-[9px] font-bold text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity">
                    Edit
                  </span>
                </div>
                <p className="text-[10px] text-[#64748B] font-medium leading-tight mt-0.5 truncate">
                  {user?.phone || '+1 (858) 555-0192'}
                </p>
                <p className="text-[9.5px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-[#0284C7] flex-shrink-0" />
                  {user?.location || 'San Diego, CA'}
                </p>
              </div>
            </div>

            {user ? (
              <span className="px-2 py-0.5 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200 text-[8.5px] font-black uppercase tracking-tight flex items-center gap-1 flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200 text-[8.5px] font-black uppercase tracking-tight flex items-center gap-1 flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED
              </span>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-1 p-2 bg-slate-50 rounded-xl text-center border border-slate-100">
            <div>
              <span className="text-xs font-black text-[#0F172A] block leading-none mb-0.5">
                {user ? '01' : '00'}
              </span>
              <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider">SYSTEM</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-xs font-black text-[#0F172A] flex items-center justify-center gap-0.5 leading-none mb-0.5">
                {user ? '4.95' : '—'} {user && <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />}
              </span>
              <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider">PURITY</span>
            </div>
            <div>
              <span className="text-xs font-black text-[#0F172A] block leading-none mb-0.5">
                {user ? '5-Yr' : 'Standard'}
              </span>
              <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider">WARRANTY</span>
            </div>
          </div>
        </div>

        {/* 3. FILTERCON WATER CARE STATUS (Theme Aligned, Clean Balanced Spacing) */}
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center flex-shrink-0">
              <Droplet className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-tight block truncate">
                HOME WATER PURITY
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11.5px] font-black text-[#16A34A] leading-tight">
                  {filterHealth}% Optimal
                </span>
                <span className="text-[9.5px] text-slate-400 font-medium">
                  • Backrinse OK
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => alert("Free In-Home Tap Water Hardness Test scheduled!")}
            className="px-3 py-1.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold text-[11px] shadow-xs cursor-pointer flex-shrink-0"
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
            <div 
              onClick={onOpenBookings}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#0F172A]">My Installation Bookings</h4>
                    <span className="text-[8px] font-black bg-sky-50 text-[#0284C7] px-1.5 py-0.2 rounded-full border border-sky-100">
                      1 ACTIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-[#64748B]">View appointment, technician & dispatch</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            <div 
              onClick={handleOpenResidence}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                      Installation Residence
                    </h4>
                    <span className="text-[8px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-full border border-emerald-100">
                      SERVICE ZONE
                    </span>
                  </div>
                  <p className="text-[10px] text-[#64748B]">
                    {residenceCity} • {streetAddress}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0284C7] transition-colors" />
            </div>

            <div 
              onClick={() => setIsCertificateModalOpen(true)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                      Lifetime Tank Certificate
                    </h4>
                    <span className="text-[8px] font-black bg-sky-50 text-[#0284C7] px-1.5 py-0.2 rounded border border-sky-100">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-[#64748B]">NSF Certified Stainless Steel Shell</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0284C7] transition-colors" />
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">
                    {currentLanguage === 'es' ? 'Idioma del Sistema' : 'Language'}
                  </h4>
                  <p className="text-[10px] text-[#64748B]">
                    {currentLanguage === 'es' ? 'Dialecto de interfaz' : 'App interface dialect'}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    currentLanguage === 'en'
                      ? 'bg-white text-[#0284C7] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('es')}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    currentLanguage === 'es'
                      ? 'bg-white text-[#0284C7] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Español
                </button>
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
        <div className="pb-3">
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

      {/* ================= EDIT PROFILE MODAL ================= */}
      <AnimatePresence>
        {isEditModalOpen && (
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
                    <Edit2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0F172A]">Edit Profile Details</h3>
                    <p className="text-[10px] text-slate-500">Filtercon Homeowner Account</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Avatar Initial Preview */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-black text-xl shadow-xs">
                  {editName.trim() ? editName.trim().charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0F172A]">Avatar Preview</h4>
                  <p className="text-[10.5px] text-slate-500">Automatically generated from your first name</p>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    Full Name / Homeowner
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    placeholder="e.g. San Diego Homeowner"
                    className="w-full text-xs font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+1 (858) 555-0192"
                    className="w-full text-xs font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    Residence / Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="San Diego, CA"
                    className="w-full text-xs font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-3 text-xs font-bold rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 text-xs font-black py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/10 cursor-pointer"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= INSTALLATION RESIDENCE MODAL BOTTOM SHEET ================= */}
      <AnimatePresence>
        {isResidenceModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="bg-white rounded-t-[32px] p-5 pb-6 space-y-4 max-h-[88%] overflow-y-auto w-full no-scrollbar"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-1 mb-2" />

              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0F172A]">Installation Residence</h3>
                    <p className="text-[10px] text-slate-500">Service address & plumbing intake details</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsResidenceModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Select Popular California Hubs */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                  Select Regional Service Zone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {californiaHubs.map((hub) => {
                    const isSel = residenceCity === hub.name;
                    return (
                      <button
                        key={hub.name}
                        type="button"
                        onClick={() => {
                          setResidenceCity(hub.name);
                          setResidenceZip(hub.zip);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSel
                            ? 'bg-sky-50 border-2 border-[#0284C7] text-[#0284C7]'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-[10.5px] font-bold block truncate">{hub.name}</span>
                        <span className="text-[9px] text-slate-400 font-semibold block">{hub.hardness}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Residence Address Form */}
              <form onSubmit={handleSaveResidence} className="space-y-3 pt-1">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                    placeholder="e.g. 742 Evergreen Terrace"
                    className="w-full text-xs font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                      Apt / Suite / Gate Code
                    </label>
                    <input
                      type="text"
                      value={unitApt}
                      onChange={(e) => setUnitApt(e.target.value)}
                      placeholder="e.g. Gate #4821"
                      className="w-full text-xs font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={residenceZip}
                      onChange={(e) => setResidenceZip(e.target.value)}
                      placeholder="92101"
                      className="w-full text-xs font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                {/* Plumbing In-Take Location */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                    Main Plumbing Water Loop Location
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'garage', label: 'Garage / Heater Closet' },
                      { id: 'sideyard', label: 'Side Yard Main Line' },
                      { id: 'basement', label: 'Basement / Utility' },
                      { id: 'undersink', label: 'Point of Use (Under Sink)' }
                    ].map((item) => {
                      const isSel = plumbingType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPlumbingType(item.id)}
                          className={`p-2 rounded-xl border text-center text-[10.5px] font-bold transition-all cursor-pointer ${
                            isSel
                              ? 'bg-sky-50 border-[#0284C7] text-[#0284C7]'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Technician Entry Notes */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    Special Technician Entry Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={gateEntryNotes}
                    onChange={(e) => setGateEntryNotes(e.target.value)}
                    placeholder="e.g. Side gate is unlocked. Main shut-off valve is behind water heater."
                    className="w-full text-xs text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                {/* Save CTA */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsResidenceModalOpen(false)}
                    className="flex-1 py-3 text-xs font-bold rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 text-xs font-black py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/10 cursor-pointer"
                  >
                    Save Installation Residence
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= LIFETIME TANK CERTIFICATE MODAL BOTTOM SHEET ================= */}
      <AnimatePresence>
        {isCertificateModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="bg-white rounded-t-[32px] p-5 pb-6 space-y-4 max-h-[88%] overflow-y-auto w-full no-scrollbar"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-1 mb-2" />

              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0F172A]">Digital Warranty Certificate</h3>
                    <p className="text-[10px] text-slate-500">Official Filtercon Technologies Inc.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCertificateModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Certificate Minimalist Pure Light Card (Consistent with Apple Card / Filtercon Light Theme) */}
              <div className="p-4.5 rounded-3xl bg-white text-slate-800 shadow-md border-2 border-sky-100 relative overflow-hidden">
                {/* Subtle light cyan accent glow in corner */}
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-sky-100/60 blur-xl pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="text-[9.5px] font-black tracking-wider text-[#0284C7] uppercase block">
                      FILTERCON TECHNOLOGIES • USA
                    </span>
                    <h4 className="text-base font-black tracking-tight text-[#0F172A] mt-0.5">
                      Lifetime Tank Warranty
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-[9px] font-black">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>NSF-61 CERTIFIED</span>
                  </div>
                </div>

                {/* Serial & Registration Info */}
                <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2 mb-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500 text-[10.5px]">Certificate ID</span>
                    <span className="font-mono font-bold text-[#0F172A] tracking-wider">FC-WARRANTY-94821</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500 text-[10.5px]">Registered Owner</span>
                    <span className="font-bold text-[#0F172A]">{user?.name || 'San Diego Homeowner'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500 text-[10.5px]">Service Property</span>
                    <span className="font-bold text-[#0F172A] text-right max-w-[180px] truncate">
                      {streetAddress}, {residenceCity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10.5px]">Shell Material</span>
                    <span className="font-bold text-[#0284C7]">316L Solid Stainless Steel</span>
                  </div>
                </div>

                {/* Key Benefits Guarantee list */}
                <div className="space-y-1.5 text-[10.5px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>Guaranteed against cracking, corrosion, and UV breakdown.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>100% Transferable to next home buyer (Increases resale value).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>Lead-free NSF/ANSI 372 plumbing compliance guarantee.</span>
                  </div>
                </div>
              </div>

              {/* Actions: Download PDF & Share with Insurance/Realtor */}
              <div className="space-y-2 pt-1">
                <Button
                  size="lg"
                  onClick={handleDownloadCertificate}
                  disabled={isDownloadingCert}
                  className="w-full text-xs font-black py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/15 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloadingCert ? 'Generating Certified PDF...' : 'Download Official PDF Certificate'}</span>
                </Button>

                <button
                  type="button"
                  onClick={handleShareCertificate}
                  className="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Share Certificate (Insurance / Property Appraisal)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification (Contained cleanly inside mobile screen) */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute bottom-20 left-4 right-4 z-50 bg-[#0F172A]/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 pointer-events-none"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-tight">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
