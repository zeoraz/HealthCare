import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Stethoscope, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { playBlip, playSuccessChime } from '../utils/audio';

export interface ClinicianUser {
  name: string;
  email: string;
  clinic: string;
  npiNumber: string;
  role: string;
  plan: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: ClinicianUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [clinic, setClinic] = useState('');
  const [npi, setNpi] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickDemoLogin = () => {
    playBlip(880);
    setIsLoading(true);
    setTimeout(() => {
      const demoDoctor: ClinicianUser = {
        name: 'Dr. Sarah Reynolds, MD',
        email: 'dr.reynolds@zeoraz.health',
        clinic: 'Apex Primary Health Group',
        npiNumber: '1849204912',
        role: 'Attending Physician',
        plan: '14-Day Enterprise Trial'
      };
      setIsLoading(false);
      playSuccessChime();
      onLoginSuccess(demoDoctor);
      onClose();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playBlip(850);
    setIsLoading(true);

    setTimeout(() => {
      const user: ClinicianUser = {
        name: name || (mode === 'login' ? 'Dr. Sarah Reynolds, MD' : 'Dr. Attending Clinician'),
        email: email || 'doctor@zeoraz.health',
        clinic: clinic || 'Apex Medical Associates',
        npiNumber: npi || '1049285012',
        role: 'Licensed Clinician',
        plan: 'Pro Clinician Pilot'
      };
      setIsLoading(false);
      playSuccessChime();
      onLoginSuccess(user);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fade-in font-sans">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-6 sm:p-7 bg-[#fcfbfa] border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 flex items-center justify-center text-[#ea8d53] shadow-sm">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#ea8d53]">
                Clinician Portal
              </div>
              <h3 className="font-display font-bold text-lg text-slate-950">
                {mode === 'login' ? 'Sign In to Zeoraz' : 'Register Practice Account'}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playBlip(600);
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="px-6 pt-5">
          <div className="flex p-1 rounded-xl bg-slate-100 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setMode('login'); playBlip(750); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Doctor Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); playBlip(780); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              New Practice
            </button>
          </div>
        </div>

        {/* 1-Click Fast Demo Login for Investors / Testers */}
        <div className="px-6 pt-4">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 text-xs font-medium flex items-center justify-between group transition-all"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ea8d53]" />
              <span><strong>1-Click Demo Login:</strong> Dr. Sarah Reynolds, MD</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="relative px-6 py-2 flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-mono uppercase text-slate-400 absolute">
            or continue with credentials
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name & Credentials
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Marcus Vance, MD"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-950"
                  />
                  <Stethoscope className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinic / Hospital
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Metro Health"
                      value={clinic}
                      onChange={(e) => setClinic(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-950"
                    />
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NPI / License #
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="10-digit NPI"
                      value={npi}
                      onChange={(e) => setNpi(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-950"
                    />
                    <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Professional Clinic Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="doctor@hospital.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-950"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              {mode === 'login' && (
                <a href="#" className="text-[11px] text-[#ea8d53] hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-950"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-md transition-all mt-2 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Portal' : 'Create Clinician Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Security & Compliance Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>HIPAA Compliant</span>
          </div>
          <span>256-Bit Encrypted</span>
          <span>SOC-2 Type II</span>
        </div>

      </div>
    </div>
  );
};
