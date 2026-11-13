import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck, 
  HelpCircle, Droplet, Calendar, Phone, Award
} from 'lucide-react';
import { WATER_TEST_QUESTIONS } from '../data/products';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function DiagnosticScreen({ onSelectProduct }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [consultationDate, setConsultationDate] = useState('');

  const question = WATER_TEST_QUESTIONS[currentStep];

  const handleSelectOption = (optionId) => {
    const updated = { ...answers, [question.id]: optionId };
    setAnswers(updated);

    if (currentStep < WATER_TEST_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setBookingDone(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-16">
      {/* Top Banner with Safe Top Padding */}
      <div className="px-5 pt-12 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#0F172A]">Water Diagnostics</h2>
          <p className="text-[11px] text-[#64748B]">Filtercon Smart Advisor</p>
        </div>
        <button
          onClick={resetQuiz}
          className="text-xs text-[#0284C7] font-semibold hover:underline cursor-pointer"
        >
          Restart
        </button>
      </div>

      {!isCompleted ? (
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider">
                Question {currentStep + 1} of {WATER_TEST_QUESTIONS.length}
              </span>
              <span className="text-xs text-[#64748B]">
                {Math.round(((currentStep + 1) / WATER_TEST_QUESTIONS.length) * 100)}%
              </span>
            </div>

            {/* Progress Bar in HydroPure Primary Blue */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-[#0284C7] rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / WATER_TEST_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-lg font-bold text-[#0F172A] mb-4 leading-snug">
              {question.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {question.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className="w-full text-left p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0284C7] hover:bg-[#F0F9FF] transition-all flex items-center justify-between group shadow-xs cursor-pointer active:scale-[0.99]"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0284C7]">
                      {opt.label}
                    </h4>
                    {opt.desc && (
                      <p className="text-[11px] text-[#64748B] mt-0.5">{opt.desc}</p>
                    )}
                  </div>
                  <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#0284C7] group-hover:bg-[#0284C7] transition-all flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 text-center">
            <p className="text-[11px] text-[#64748B] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              Over 30 years of Southern California water treatment expertise
            </p>
          </div>
        </div>
      ) : (
        /* Diagnostic Result & Recommendation */
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#0F172A] text-white shadow-xl"
          >
            <div className="flex items-center gap-2 text-sky-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-sky-300" />
              Prescribed Filtration System
            </div>
            <h3 className="text-xl font-black mb-1">Filtercon 5-Stage Hybrid Duo</h3>
            <p className="text-xs text-sky-100/90 mb-4 leading-relaxed">
              Based on your water hardness profile, this patented system eliminates 99% chlorine, prevents scale buildup, and preserves essential minerals without salt.
            </p>
            <div className="flex items-center justify-between border-t border-sky-400/30 pt-3 text-xs">
              <div>
                <span className="text-[10px] text-sky-200 block">Recommended System</span>
                <span className="text-lg font-black text-white">$2,999</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSelectProduct('fc-hybrid-combo')}
                className="bg-white text-[#0284C7] hover:bg-sky-50 font-bold"
              >
                View System Specs
              </Button>
            </div>
          </motion.div>

          {/* Schedule Free In-Home Consultation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#0284C7]" />
              <h4 className="text-xs font-bold text-[#0F172A]">Free In-Home Water Test</h4>
            </div>
            <p className="text-[11px] text-[#64748B] mb-3">
              A Filtercon certified technician will test your tap water hardness and inspect your plumbing layout at zero cost.
            </p>

            {bookingDone ? (
              <div className="p-3 bg-green-50 rounded-xl border border-green-100 text-center">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] mx-auto mb-1" />
                <span className="text-xs font-bold text-[#0F172A] block">Consultation Scheduled!</span>
                <span className="text-[11px] text-[#16A34A]">We'll call you to confirm your address and appointment.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="date"
                  value={consultationDate}
                  onChange={(e) => setConsultationDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
                />
                <Button
                  onClick={() => setBookingDone(true)}
                  className="w-full"
                >
                  Book Free Consultation
                </Button>
              </div>
            )}
          </div>

          {/* Direct Phone Assistance */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#0F172A] block">Need Immediate Advice?</span>
                <span className="text-[11px] text-[#64748B]">Call (800) 244-5999</span>
              </div>
            </div>
            <a
              href="tel:8002445999"
              className="py-1.5 px-3 rounded-lg bg-[#F0F9FF] border border-sky-200 font-bold text-[#0284C7] text-[11px] hover:bg-sky-100 cursor-pointer"
            >
              Call Us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
