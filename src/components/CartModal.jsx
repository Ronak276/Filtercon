import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, Plus, Minus, ArrowRight, ShieldCheck, 
  Sparkles, Gift, CheckCircle, CreditCard, Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function CartModal({ 
  items, 
  onUpdateQty, 
  onRemove, 
  onClear, 
  onExplore,
  onProceedToSchedule
}) {
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const installationFee = subtotal > 1000 ? 0 : 99;
  const discount = subtotal > 1500 ? 150 : 0;
  const total = Math.max(0, subtotal + (subtotal > 0 ? installationFee : 0) - discount);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckoutSuccess(true);
      onClear();
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-16 overflow-y-auto no-scrollbar">
      {/* Top Header with Safe Top Padding */}
      <div className="px-5 pt-12 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#0F172A]">Your Selection</h2>
          <p className="text-[11px] text-[#64748B]">Filtercon Verified Consultation Request</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-rose-500 hover:text-rose-600 font-semibold cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 && !showCheckoutSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-auto">
          <div className="w-20 h-20 rounded-3xl bg-[#F0F9FF] border border-sky-100 flex items-center justify-center mb-4 text-[#0284C7]">
            <Sparkles className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] mb-1">Your Cart is Empty</h3>
          <p className="text-xs text-[#64748B] max-w-xs mb-6">
            Discover Filtercon's patented 5-stage systems and luxury shower filters.
          </p>
          <Button
            onClick={onExplore}
            className="shadow-md shadow-sky-900/20"
          >
            Explore Systems
          </Button>
        </div>
      ) : showCheckoutSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center my-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 text-[#16A34A]"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-1">Order Confirmed!</h3>
          <p className="text-xs text-[#64748B] max-w-xs mb-4">
            Thank you! A Filtercon certified hydration specialist will contact you to coordinate delivery & free installation.
          </p>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 w-full max-w-xs text-left text-xs mb-6 space-y-1.5 shadow-sm">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Order ID:</span>
              <span className="font-mono font-bold text-[#0F172A]">#FC-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Delivery Status:</span>
              <span className="text-[#16A34A] font-bold">Priority Dispatched</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Estimated Arrival:</span>
              <span className="text-[#0F172A] font-semibold">2-3 Business Days</span>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowCheckoutSuccess(false);
              onExplore();
            }}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
          {/* Complimentary gift pill */}
          <div className="p-3.5 rounded-2xl bg-[#F0F9FF] border border-sky-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0284C7] text-white flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div className="flex-1 text-xs">
              <span className="font-bold text-[#0F172A] block">Complimentary Filter Tester Kit</span>
              <span className="text-[#0284C7] text-[11px] font-medium">Free electronic water purity meter included</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="space-y-3">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#0F172A] truncate">{item.name}</h4>
                  <p className="text-[11px] text-[#64748B] capitalize">{item.category}</p>
                  <p className="text-xs font-black text-[#0284C7] mt-1">${item.price}</p>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-[#0F172A] w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing Breakdown Card */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2 text-xs shadow-sm">
            <div className="flex justify-between text-[#64748B]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#0F172A]">${subtotal}</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Professional Home Installation</span>
              <span className="font-bold text-[#16A34A]">
                {installationFee === 0 ? 'FREE' : `$${installationFee}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#16A34A] font-semibold">
                <span>Direct Homeowner Discount</span>
                <span>-${discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline text-sm">
              <span className="font-bold text-[#0F172A]">Total</span>
              <span className="text-xl font-black text-[#0284C7]">${total}</span>
            </div>
          </div>

          {/* Security & Warranty pill */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748B]">
            <Lock className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>256-Bit Encrypted • 30-Day Money-Back Guarantee</span>
          </div>

          {/* Proceed to Schedule Button (Selecting Date & Slot before completing order) */}
          <Button
            size="lg"
            onClick={onProceedToSchedule || handleCheckout}
            disabled={isProcessing}
            className="w-full text-sm font-black py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] shadow-lg shadow-sky-900/20 active:scale-95 transition-all cursor-pointer"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            <span>Proceed to Schedule Slot • ${total}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
