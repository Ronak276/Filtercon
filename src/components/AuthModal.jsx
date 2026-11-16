import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Phone, ShieldCheck, ArrowRight, CheckCircle2, 
  KeyRound, RefreshCw, User, Mail, Sparkles, Lock, ChevronLeft
} from 'lucide-react';
import { Button } from './ui/button';

export default function AuthModal({ onLogin, onGuest, onClose }) {
  // Modes: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState('signin');
  
  // Step: 'credentials' | 'otp'
  const [step, setStep] = useState('credentials');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Mock auto-generated demonstration OTP code
  const [generatedOtp, setGeneratedOtp] = useState('4829');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phoneNumber) {
      setErrorMsg('Please enter a valid phone number');
      return;
    }
    if (authMode === 'signup' && !fullName) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`auth-otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: fullName || (authMode === 'signup' ? 'New Customer' : 'San Diego Homeowner'),
        phone: phoneNumber.startsWith('+1') ? phoneNumber : `+1 ${phoneNumber}`,
        email: email || 'homeowner@filtercon.com'
      });
    }, 700);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden select-none font-sans">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 240 }}
        className="bg-white rounded-t-[36px] p-6 pt-3 pb-8 shadow-2xl border-t border-slate-100 max-h-[92vh] overflow-y-auto no-scrollbar"
      >
        {/* Grab Handle */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-3" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            {step === 'otp' ? (
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-9 h-9 rounded-2xl bg-sky-50 text-[#0284C7] border border-sky-100 flex items-center justify-center font-black">
                <KeyRound className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-black text-[#0F172A] leading-tight">
                {step === 'otp'
                  ? 'Verify Phone OTP'
                  : authMode === 'signin'
                  ? 'Sign In to Filtercon'
                  : 'Create Customer Account'}
              </h3>
              <p className="text-[10.5px] text-[#64748B] font-medium leading-tight">
                {step === 'otp'
                  ? `Enter 4-digit code sent to ${phoneNumber}`
                  : authMode === 'signin'
                  ? 'Access your saved warranties & scheduled service'
                  : 'Join 50,000+ pure water California homeowners'}
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

        {/* Auth Mode Toggle (Sign In vs Sign Up Tabs) */}
        {step === 'credentials' && (
          <div className="flex p-1 bg-slate-100 rounded-2xl mt-4 mb-3">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-white text-[#0284C7] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white text-[#0284C7] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              New Account (Sign Up)
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold my-2 text-center">
            {errorMsg}
          </div>
        )}

        {/* 1. CREDENTIALS STEP */}
        {step === 'credentials' ? (
          <form onSubmit={handleSendOtp} className="space-y-3 mt-2">
            {authMode === 'signup' && (
              <>
                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center bg-[#F8FAFC] border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#0284C7] focus-within:bg-white transition-all">
                    <User className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Ronak Patel"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-transparent text-xs text-[#0F172A] font-semibold focus:outline-none"
                      required={authMode === 'signup'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="flex items-center bg-[#F8FAFC] border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#0284C7] focus-within:bg-white transition-all">
                    <Mail className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-xs text-[#0F172A] font-semibold focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <div className="flex items-center bg-[#F8FAFC] border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#0284C7] focus-within:bg-white transition-all">
                <span className="text-xs font-bold text-[#0F172A] mr-2 pr-2 border-r border-slate-200 flex-shrink-0">
                  +1
                </span>
                <input
                  type="tel"
                  placeholder="(858) 549-2500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#0F172A] font-semibold focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full text-xs font-bold py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer mt-1"
            >
              <span>{isLoading ? 'Sending SMS OTP...' : 'Send Verification OTP'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>
        ) : (
          /* 2. OTP VERIFICATION STEP */
          <form onSubmit={handleVerifyOtp} className="space-y-4 my-4">
            {/* Demo hint pill */}
            <div className="p-2.5 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between">
              <span className="text-[11px] text-[#0284C7] font-bold">
                SMS Code Demo:
              </span>
              <span className="font-mono font-black text-xs text-[#0F172A] bg-white px-2 py-0.5 rounded-lg border border-sky-200">
                {generatedOtp}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 py-1">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`auth-otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-13 h-14 text-center text-xl font-mono font-black rounded-2xl bg-[#F8FAFC] border-2 border-slate-200 focus:border-[#0284C7] focus:bg-white outline-none transition-all"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.some((d) => !d)}
              size="lg"
              className="w-full text-xs font-bold py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isLoading ? 'Verifying OTP...' : 'Verify OTP & Log In'}</span>
              <CheckCircle2 className="w-4 h-4 ml-1.5" />
            </Button>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer"
              >
                Change Phone
              </button>
              <button
                type="button"
                onClick={() => {
                  const newCode = Math.floor(1000 + Math.random() * 9000).toString();
                  setGeneratedOtp(newCode);
                }}
                className="text-[#0284C7] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* Guest access option */}
        {step === 'credentials' && (
          <>
            <div className="flex items-center gap-3 my-3">
              <div className="h-[1px] flex-1 bg-slate-200"></div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Or</span>
              <div className="h-[1px] flex-1 bg-slate-200"></div>
            </div>

            <button
              onClick={onGuest}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs transition-colors cursor-pointer"
            >
              Continue as Guest
            </button>
          </>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#64748B] mt-4 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>256-Bit SSL Encrypted Filtercon Member Portal</span>
        </div>
      </motion.div>
    </div>
  );
}
