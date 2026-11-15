import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Mail, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { playBlip, playSuccessChime } from '../utils/audio';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [accountType, setAccountType] = useState<'individual' | 'clinic' | 'enterprise'>('individual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('2026-11-20');
  const [timeSlot, setTimeSlot] = useState('10:00 AM EST');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    playSuccessChime();

    // Trigger Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#34d399', '#ffffff']
      });
    } catch {
      // fallback
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-emerald-500/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Clinical Consultation Booking
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Schedule Your AI Biomarker Consultation
            </h3>

            <p className="text-slate-400 text-sm mt-1 mb-6">
              Connect with our medical AI engineering team or arrange a tailored deployment for your clinical practice.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Account / User Type */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAccountType('individual');
                    playBlip(750);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold font-mono transition-all border ${
                    accountType === 'individual'
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'border-white/10 text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountType('clinic');
                    playBlip(780);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold font-mono transition-all border ${
                    accountType === 'clinic'
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'border-white/10 text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  Medical Clinic
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountType('enterprise');
                    playBlip(820);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold font-mono transition-all border ${
                    accountType === 'enterprise'
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'border-white/10 text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  Hospital System
                </button>
              </div>

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Alexander Reed"
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Work / Clinical Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@healthlabs.org"
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Time Slot</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 font-mono appearance-none"
                    >
                      <option value="10:00 AM EST">10:00 AM EST (Available)</option>
                      <option value="02:00 PM EST">02:00 PM EST (Available)</option>
                      <option value="04:30 PM EST">04:30 PM EST (Available)</option>
                      <option value="06:00 PM EST">06:00 PM EST (Available)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Clinical Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected under HIPAA BAA & TLS 1.3 Encryption</span>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display font-extrabold text-2xl text-white">
              Consultation Scheduled!
            </h3>

            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-white font-bold">{name || 'Doctor'}</span>. A calendar invitation and HIPAA compliance packet have been dispatched to <span className="text-emerald-400 font-mono">{email}</span>.
            </p>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/10 font-mono text-xs text-left max-w-sm mx-auto space-y-1.5">
              <div className="text-slate-400">Scheduled: <span className="text-white font-bold">{date}</span></div>
              <div className="text-slate-400">Time: <span className="text-emerald-400 font-bold">{timeSlot}</span></div>
              <div className="text-slate-400">Meeting ID: <span className="text-cyan-400 font-bold">VIT-9482-MED</span></div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-bold transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
