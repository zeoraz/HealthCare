import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Activity, 
  TrendingUp, 
  Zap,
  Play
} from 'lucide-react';
import { AnatomicalVisualizer } from './AnatomicalVisualizer';
import { playBlip } from '../utils/audio';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenBooking, 
  onScrollToDashboard 
}) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [modelType, setModelType] = useState<'heart' | 'body'>('heart');

  const headlines = [
    {
      title: "Next-Gen Biomarker Monitoring with AI Precision",
      sub: "Vitalis helps you track, understand, and act on your bloodwork — with smart medical AI insights, continuous vitals, and clean clinician dashboards.",
      badge: "Clinical Intelligence Engine"
    },
    {
      title: "Your Health Data, Decoded by Deep AI",
      sub: "Transform complex lab numbers into crystal-clear actionable health protocols. No doctor-speak, zero ambiguity, 100% medical-grade fidelity.",
      badge: "Real-time Telemetry Active"
    },
    {
      title: "Proactive Cardiometabolic Surveillance in 3D",
      sub: "Predict cardiovascular and endocrine trends up to 24 months before clinical symptoms emerge with high-dimensional biometric pattern recognition.",
      badge: "FDA Class II Registered Algorithms"
    }
  ];

  // Auto-cycle headline every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [headlines.length]);

  const activeHeadline = headlines[headlineIndex];

  return (
    <section className="relative pt-10 pb-20 overflow-hidden" id="about">
      {/* Background Ambient Glows (Emerald & Cyan luminescence) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-cyan-500/20 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Avatar Stack, and CTA */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            
            {/* Social Proof / Avatar Stack matching reference video */}
            <div className="inline-flex items-center gap-3.5 bg-slate-900/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 shadow-xl">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-emerald-500 object-cover" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Dr. Elena Vance" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-teal-500 object-cover" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                  alt="Dr. Michael Chen" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-cyan-500 object-cover" 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                  alt="Sarah Lin, RN" 
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm text-white tracking-wide">
                  +15K
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Clinicians & Patients
                </span>
              </div>
            </div>

            {/* Micro Badge for Active Headline */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{activeHeadline.badge}</span>
            </div>

            {/* Dynamic Animated Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] min-h-[140px] sm:min-h-[130px] lg:min-h-[160px] transition-all duration-500">
              {activeHeadline.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              {activeHeadline.sub}
            </p>

            {/* Headline Switcher Indicators */}
            <div className="flex items-center gap-2 mt-6 mb-8">
              {headlines.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setHeadlineIndex(idx);
                    playBlip(750 + idx * 50);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === headlineIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Switch to headline ${idx + 1}`}
                />
              ))}
            </div>

            {/* Call To Action Buttons (Matching Video's Split Pill Button) */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Split Pill Button: [ See Dashboard | ↗ ] */}
              <div 
                onClick={() => {
                  playBlip(950);
                  onScrollToDashboard();
                }}
                className="group cursor-pointer inline-flex items-center bg-white text-slate-950 font-bold rounded-full p-1 pl-6 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <span className="text-sm font-display tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors mr-4">
                  See Dashboard
                </span>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-md group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Secondary Button: AI Decoder Demo */}
              <a
                href="#decoder"
                onClick={() => playBlip(820)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-panel border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white font-medium text-sm transition-all"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Try AI Lab Decoder</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-white/10 w-full flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>HIPAA & GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>99.4% Clinical Diagnostic Correlation</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Anatomical Canvas */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Real 3D Anatomical Video Visualizer */}
              <AnatomicalVisualizer 
                modelType={modelType}
                onModelChange={(newModel) => setModelType(newModel)}
                bpm={74}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
