import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, CreditCard, ShieldCheck, Lock, 
  CheckCircle2, Sparkles, AlertCircle, Building2, 
  Smartphone, ArrowRight, Shield, Award, Landmark, Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from './ui/button';

export default function PaymentScreen({ 
  amount, 
  bookingInfo, 
  onBack, 
  onPaymentSuccess 
}) {
  // Saved Cards (Last used / previous checkout cards)
  const savedCards = [
    {
      id: 'saved-1',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/28',
      holder: 'Ronak Patel',
      isDefault: true,
      label: 'Personal Primary'
    },
    {
      id: 'saved-2',
      brand: 'Mastercard',
      last4: '8819',
      expiry: '09/27',
      holder: 'Ronak Patel',
      isDefault: false,
      label: 'Home Office Card'
    }
  ];

  const [activeCardTab, setActiveCardTab] = useState('saved'); // 'saved' | 'new'
  const [selectedSavedCardId, setSelectedSavedCardId] = useState('saved-1');
  const [saveCardForFuture, setSaveCardForFuture] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [selectedBank, setSelectedBank] = useState('chase');
  const [accountNumber, setAccountNumber] = useState('•••• 6789');
  const [routingNumber, setRoutingNumber] = useState('021000021');
  const [accountType, setAccountType] = useState('checking'); // 'checking' | 'savings'
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newCvc, setNewCvc] = useState('');
  const [newNameOnCard, setNewNameOnCard] = useState('Ronak Patel');

  // Currently active card details for display & processing
  const currentSavedCard = savedCards.find((c) => c.id === selectedSavedCardId) || savedCards[0];
  const displayedCardNumber = activeCardTab === 'saved' 
    ? `•••• •••• •••• ${currentSavedCard.last4}` 
    : (newCardNumber || '•••• •••• •••• 4242');
  const displayedExpiry = activeCardTab === 'saved' ? currentSavedCard.expiry : (newExpiry || '12/28');
  const displayedHolder = activeCardTab === 'saved' ? currentSavedCard.holder : (newNameOnCard || 'Ronak Patel');
  const displayedBrand = activeCardTab === 'saved' ? currentSavedCard.brand : 'Visa';

  const [paymentState, setPaymentState] = useState('idle'); // 'idle' | 'processing' | 'coin-animation' | 'success'

  const handlePayNow = () => {
    setPaymentState('processing');

    setTimeout(() => {
      // Trigger 3D Coin Drop & Swirl Animation
      setPaymentState('coin-animation');

      setTimeout(() => {
        setPaymentState('success');

        setTimeout(() => {
          if (onPaymentSuccess) {
            onPaymentSuccess({
              method: selectedMethod,
              transactionId: 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
              amount,
              timestamp: new Date().toLocaleTimeString()
            });
          }
        }, 1800);
      }, 1600);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-6 overflow-y-auto no-scrollbar font-sans select-none relative">
      {/* Top Header */}
      <div className="px-5 pt-12 pb-3.5 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            disabled={paymentState !== 'idle'}
            className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-[#0F172A] leading-tight">Secure Payment</h2>
            <p className="text-[10px] text-slate-500">Stripe 256-Bit SSL Encrypted</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold">
          <Lock className="w-3 h-3" />
          <span>Stripe Live</span>
        </div>
      </div>

      {paymentState !== 'coin-animation' && paymentState !== 'success' ? (
        <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Amount Summary Card */}
            <div className="p-4 rounded-3xl bg-white border border-sky-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  PAYMENT DUE
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-[#0284C7]">${amount}</span>
                  <span className="text-[11px] text-slate-400 font-bold">USD</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                  Includes Installation & Lifetime Tank Warranty
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100 shadow-2xs">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <span className="text-xs font-black text-[#0F172A] uppercase tracking-wide block mb-2 px-1">
                Select Payment Method
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', name: 'Card', icon: CreditCard },
                  { id: 'apple', name: 'Apple Pay', icon: Smartphone },
                  { id: 'bank', name: 'ACH Bank', icon: Building2 },
                ].map((m) => {
                  const MIcon = m.icon;
                  const isSelected = selectedMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-sky-50 border-2 border-[#0284C7] shadow-xs text-[#0284C7]'
                          : 'bg-white border-slate-200/80 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <MIcon className="w-4 h-4" />
                      <span className="text-[11px] font-bold">{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1. CREDIT/DEBIT CARD VIEW */}
            {selectedMethod === 'card' && (
              <>
                {/* Modern Clean White Virtual Card Preview (Apple Card / Stripe minimalist style) */}
                <motion.div
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-5 rounded-3xl bg-white border-2 border-sky-100 text-slate-800 shadow-md shadow-sky-900/5 relative overflow-hidden"
                >
                  {/* Subtle light cyan accent glow in corner */}
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 rounded-full bg-sky-100/60 blur-xl pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <span className="text-[10px] font-bold text-[#0284C7] tracking-wider uppercase block">
                        FILTERCON TECHNOLOGIES
                      </span>
                      <span className="text-xs font-black text-[#0F172A]">Stripe Verified Card</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black italic tracking-widest text-[#0284C7]">
                        {displayedBrand.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 relative z-10">
                    <span className="text-[9.5px] text-slate-400 font-mono tracking-widest uppercase block mb-0.5">Card Number</span>
                    <span className="text-base font-black font-mono tracking-widest text-[#0F172A]">
                      {displayedCardNumber}
                    </span>
                  </div>

                  <div className="flex justify-between items-end text-xs relative z-10">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Cardholder</span>
                      <span className="font-bold text-[#0F172A] tracking-wide">{displayedHolder}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Expires</span>
                      <span className="font-bold text-[#0F172A] font-mono">{displayedExpiry}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Saved vs New Card Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setActiveCardTab('saved')}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCardTab === 'saved'
                        ? 'bg-white text-[#0284C7] shadow-xs'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Saved Cards (Last Used)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCardTab('new')}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCardTab === 'new'
                        ? 'bg-white text-[#0284C7] shadow-xs'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    + New Card
                  </button>
                </div>

                {/* If Saved Cards Tab Selected */}
                {activeCardTab === 'saved' ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Choose Saved Card
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        Auto-Fill Ready
                      </span>
                    </div>

                    <div className="space-y-2">
                      {savedCards.map((card) => {
                        const isSelected = selectedSavedCardId === card.id;
                        return (
                          <div
                            key={card.id}
                            onClick={() => setSelectedSavedCardId(card.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-sky-50/60 border-2 border-[#0284C7] shadow-xs'
                                : 'bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isSelected ? 'bg-[#0284C7] text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {card.brand === 'Visa' ? 'VISA' : 'MC'}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-black text-[#0F172A]">
                                    {card.brand} •••• {card.last4}
                                  </span>
                                  {card.isDefault && (
                                    <span className="text-[9px] font-bold text-[#0284C7] bg-sky-100/70 px-1.5 py-0.2 rounded-md">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10.5px] text-slate-400 font-medium block">
                                  {card.label} • Exp: {card.expiry}
                                </span>
                              </div>
                            </div>

                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-[#0284C7] bg-[#0284C7]' : 'border-slate-300'
                            }`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* New Card Inputs Form with Save Card Toggle */
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-2.5">
                    <div>
                      <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        value={newCardNumber}
                        onChange={(e) => setNewCardNumber(e.target.value)}
                        className="w-full text-xs font-mono font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                          Expires (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={newExpiry}
                          onChange={(e) => setNewExpiry(e.target.value)}
                          className="w-full text-xs font-mono font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                        />
                      </div>
                      <div>
                        <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                          CVC Code
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={newCvc}
                          onChange={(e) => setNewCvc(e.target.value)}
                          className="w-full text-xs font-mono font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={newNameOnCard}
                        onChange={(e) => setNewNameOnCard(e.target.value)}
                        className="w-full text-xs font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>

                    {/* Save card for future check */}
                    <div 
                      onClick={() => setSaveCardForFuture(!saveCardForFuture)}
                      className="flex items-center justify-between pt-1 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                          saveCardForFuture ? 'bg-[#0284C7] border-[#0284C7] text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {saveCardForFuture && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-[11px] font-bold text-[#0F172A]">
                          Save card for future 1-click orders
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* 2. APPLE PAY VIEW */}
            {selectedMethod === 'apple' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {/* Apple Pay Device Card Container */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm text-center relative overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                    <span className="text-xl font-black"></span>
                  </div>

                  <h4 className="text-sm font-black text-[#0F172A]">Apple Pay Ready</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Biometric 1-touch confirmation with Face ID or Touch ID on your iPhone.
                  </p>

                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500">Wallet Card</span>
                      <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Apple Card (•••• 1084)
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500">Billing Address</span>
                      <span className="font-bold text-[#0F172A]">Ronak Patel, San Diego</span>
                    </div>
                    <div className="flex justify-between items-center pt-0.5">
                      <span className="text-slate-500">Device Auth</span>
                      <span className="font-bold text-[#0284C7]">Face ID Enabled</span>
                    </div>
                  </div>
                </div>

                <div className="bg-sky-50 rounded-2xl p-3 border border-sky-100 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <p className="text-[11px] text-[#0369A1] font-medium leading-tight">
                    Your real card number is never shared with merchants or stored on servers.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 3. ACH DIRECT BANK TRANSFER VIEW */}
            {selectedMethod === 'bank' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {/* Popular Banks Selector */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Select Financial Institution
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Stripe Financial
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'chase', name: 'Chase Bank', icon: Landmark },
                      { id: 'bofa', name: 'Bank of America', icon: Building2 },
                      { id: 'wells', name: 'Wells Fargo', icon: Building },
                    ].map((b) => {
                      const BIcon = b.icon;
                      const isSel = selectedBank === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setSelectedBank(b.id)}
                          className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                            isSel
                              ? 'bg-sky-50 border-2 border-[#0284C7] text-[#0284C7] shadow-xs'
                              : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <BIcon className="w-5 h-5" />
                          <span className="text-[10px] font-bold leading-tight">{b.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual Account Details */}
                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    <div>
                      <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                        Routing Number (9 Digits)
                      </label>
                      <input
                        type="text"
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value)}
                        className="w-full text-xs font-mono font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>

                    <div>
                      <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full text-xs font-mono font-bold text-[#0F172A] p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      {['checking', 'savings'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setAccountType(type)}
                          className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold capitalize transition-all cursor-pointer border ${
                            accountType === type
                              ? 'bg-[#0284C7] text-white border-[#0284C7]'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          {type} Account
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <p className="text-[10.5px] text-emerald-800 font-medium">
                    Verified by NACHA & Plaid standard 256-bit secure bank rails.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Certified Level 1 PCI-DSS Security Compliance</span>
            </div>
          </div>

          {/* Pay Button */}
          <div className="pt-2">
            <Button
              size="lg"
              onClick={handlePayNow}
              disabled={paymentState === 'processing'}
              className="w-full text-sm font-black py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer"
            >
              {paymentState === 'processing' ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Connecting to Stripe...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Pay with Stripe • ${amount}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </div>
      ) : null}

      {/* 3D GOLD COIN DROP & CIRCULAR PULSE ANIMATION OVERLAY */}
      <AnimatePresence>
        {paymentState === 'coin-animation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Animated Golden Coin with Circular Rings & Sparkles */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              {/* Expanding Gold Circular Glow Rings */}
              {[0, 0.4, 0.8].map((delay, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.6, opacity: 0.8 }}
                  animate={{ scale: [0.6, 1.35, 1.8], opacity: [0.8, 0.35, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: delay,
                    ease: 'easeOut'
                  }}
                  className="absolute inset-0 rounded-full border-2 border-amber-400/60"
                />
              ))}

              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-28 h-28 rounded-full bg-amber-200/50 blur-xl"
              />

              {/* 3D Gold Coin with 360 Spin & Bounce Drop */}
              <motion.div
                initial={{ y: -90, scale: 0.3, rotateY: 0 }}
                animate={{ 
                  y: [ -90, 0, -12, 0 ], 
                  scale: [ 0.3, 1.15, 1 ], 
                  rotateY: [ 0, 720, 1080 ] 
                }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#D97706] via-[#FBBF24] to-[#FDE68A] shadow-[0_16px_36px_rgba(245,158,11,0.45)] flex items-center justify-center border-4 border-amber-100 relative z-10"
              >
                {/* Coin Inner Gold Bezel */}
                <div className="w-18 h-18 rounded-full border-2 border-dashed border-amber-800/40 flex items-center justify-center bg-gradient-to-br from-[#F59E0B] to-[#D97706] shadow-inner">
                  <span className="text-2xl font-black text-white drop-shadow-md select-none">
                    $
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-black text-[#0F172A] mb-1 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
              <span>Processing Payment...</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-amber-600 font-bold"
            >
              Securing Payment via Stripe Vault...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL SUCCESS SCREEN */}
      <AnimatePresence>
        {paymentState === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 text-[#16A34A] flex items-center justify-center mb-4 shadow-md"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>

            <span className="text-[10px] font-black text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider mb-2">
              PAYMENT VERIFIED BY STRIPE
            </span>

            <h3 className="text-xl font-black text-[#0F172A] mb-1">
              Payment Successful!
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mb-6 leading-relaxed font-medium">
              Your payment of <b className="text-[#0F172A]">${amount}</b> has been settled. Your Filtercon technician will arrive on schedule.
            </p>

            <div className="w-full max-w-xs bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-2 text-xs mb-6">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Transaction ID</span>
                <span className="font-mono font-bold text-[#0F172A]">TXN_STRIPE_LIVE</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Payment Channel</span>
                <span className="font-bold text-[#0284C7]">Stripe Verified</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Amount Paid</span>
                <span className="font-black text-emerald-600">${amount}</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={onBack}
              className="w-full max-w-xs text-xs font-bold rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer"
            >
              View My Bookings
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
