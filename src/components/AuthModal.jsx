import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Phone, ShieldCheck, ArrowRight, CheckCircle2, 
  KeyRound, RefreshCw, Smartphone
} from 'lucide-react';
import { Button } from './ui/button';

export default function AuthModal({ onLogin, onGuest, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 700);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: 'San Diego Homeowner',
        phone: phoneNumber || '+1 (858) 549-2500',
        email: 'homeowner@filtercon.com'
      });
    }, 800);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden select-none font-sans">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 240 }}
        className="bg-white rounded-t-[36px] p-6 pt-3 pb-8 shadow-2xl border-t border-slate-100"
      >
        {/* Grab Handle */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />

        {/* Top Header with Close */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center font-black">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                {step === 'phone' ? 'Instant OTP Sign In' : 'Verify Mobile OTP'}
              </h3>
              <p className="text-[11px] text-[#64748B]">
                {step === 'phone' ? 'Enter phone for consultation access' : `Code sent to ${phoneNumber}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4 my-4">
            <div>
              <label className="block text-[11px] font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <div className="flex items-center bg-[#F8FAFC] border border-slate-200 rounded-2xl px-3.5 py-3 focus-within:border-[#0284C7] transition-all">
                <span className="text-xs font-bold text-[#0F172A] mr-2 pr-2 border-r border-slate-200">
                  🇺🇸 +1
                </span>
                <input
                  type="tel"
                  placeholder="(858) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#0F172A] font-semibold focus:outline-none"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full text-xs font-bold shadow-md shadow-sky-950/20"
            >
              <span>{isLoading ? 'Sending SMS Code...' : 'Send Verification OTP'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 my-4">
            <div className="flex items-center justify-center gap-3 py-2">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-13 text-center text-lg font-black rounded-2xl bg-[#F8FAFC] border-2 border-slate-200 focus:border-[#0284C7] focus:bg-white outline-none transition-all"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.some((d) => !d)}
              size="lg"
              className="w-full text-xs font-bold shadow-md shadow-sky-950/20"
            >
              <span>{isLoading ? 'Verifying...' : 'Verify & Continue'}</span>
              <CheckCircle2 className="w-4 h-4 ml-1.5" />
            </Button>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer"
              >
                Change Number
              </button>
              <button
                type="button"
                onClick={() => alert("New OTP code sent: 4829")}
                className="text-[#0284C7] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* Guest access option */}
        <div className="flex items-center gap-3 my-3">
          <div className="h-[1px] flex-1 bg-slate-200"></div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Or</span>
          <div className="h-[1px] flex-1 bg-slate-200"></div>
        </div>

        <button
          onClick={onGuest}
          className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs transition-colors cursor-pointer"
        >
          Continue as Guest
        </button>

        <p className="text-[10px] text-center text-[#64748B] mt-3">
          By signing in you agree to Filtercon's privacy & warranty terms.
        </p>
      </motion.div>
    </div>
  );
}
