import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Mail, 
  Building2, 
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Key,
  Copy
} from 'lucide-react';
import { playBlip, playSuccessChime } from '../utils/audio';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [specialty, setSpecialty] = useState('Primary Care');
  const [clinicSize, setClinicSize] = useState('1-5 Doctors');
  const [generatedKey, setGeneratedKey] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = `MED-AI-${Math.floor(1000 + Math.random() * 9000)}-${specialty.slice(0, 3).toUpperCase()}`;
    setGeneratedKey(key);
    setStep(2);
    playSuccessChime();

    // Trigger Confetti Celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ea8d53', '#0f172a', '#10b981', '#38bdf8']
      });
    } catch {
      // fallback
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    setIsCopied(true);
    playBlip(880);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-2xl overflow-hidden text-slate-900">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-[#ea8d53]/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-950 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ea8d53] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#ea8d53] font-bold">
                14-Day Free Clinical Trial
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 tracking-tight">
              Start Your Practice Trial
            </h3>

            <p className="text-slate-500 text-sm mt-1 mb-6">
              Instant access to the Ambient Scribe, Optical Vitals scanner, and Lab Decoder. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name / Clinician Title
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Dr. Sarah Jenkins, MD"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Work / Clinic Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="s.jenkins@metropolitanhealth.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Practice Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Metro Health Clinic"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Primary Specialty
                  </label>
                  <div className="relative">
                    <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:border-slate-950 transition-colors cursor-pointer"
                    >
                      <option value="Primary Care">Primary Care</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Physical Therapy">Physical Therapy</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Pill */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero PHI retention · HIPAA & SOC2 Type II Certified</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-6 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Activate Free 14-Day Trial</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

            </form>
          </div>
        ) : (
          /* Step 2: Confirmation & Key Display */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 tracking-tight mb-2">
              Practice Workspace Activated!
            </h3>

            <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto mb-6">
              Welcome, <span className="font-semibold text-slate-900">{name || 'Doctor'}</span>! Your 14-day full access license for <span className="font-semibold text-slate-900">{clinicName || 'your practice'}</span> has been generated.
            </p>

            {/* License Key Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 text-left">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>Clinician License Key</span>
                <span className="text-emerald-600 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between font-mono text-sm font-bold text-slate-950 bg-white p-2.5 rounded-xl border border-slate-200">
                <span>{generatedKey}</span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition-colors"
                  title="Copy Key"
                >
                  {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-3 px-6 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-md transition-all hover:scale-[1.01]"
              >
                Launch Practice Studio
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
