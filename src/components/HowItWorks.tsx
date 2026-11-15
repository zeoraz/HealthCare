import React from 'react';
import { 
  UploadCloud, 
  Cpu, 
  Activity, 
  FileCheck, 
  ArrowRight, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';
import { playBlip } from '../utils/audio';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Upload or Continuous Sync',
      desc: 'Seamlessly upload PDF lab panels from Quest, LabCorp, or EHR portals, or pair Apple Watch, Oura, and continuous glucose monitors in seconds.',
      icon: UploadCloud,
      color: 'emerald',
      badge: 'Zero Manual Entry'
    },
    {
      step: '02',
      title: 'Neural Biomarker Synthesis',
      desc: 'Our clinical AI correlates over 80+ metabolic, hormone, and cardiovascular markers against longitudinal health cohorts to pinpoint hidden friction points.',
      icon: Cpu,
      color: 'teal',
      badge: 'Med-Gemini Engine'
    },
    {
      step: '03',
      title: '3D Holographic Telemetry',
      desc: 'Inspect your cardiac efficiency, systemic vascular elasticity, and organ functions via an interactive 3D anatomical twin with real-time rhythm sync.',
      icon: Activity,
      color: 'cyan',
      badge: 'Real-Time WebGL'
    },
    {
      step: '04',
      title: 'Targeted Action & Doctor Sharing',
      desc: 'Receive personalized nutritional, supplemental, and recovery directives in plain English, with instant encrypted exports for your primary care physician.',
      icon: FileCheck,
      color: 'sky',
      badge: 'HIPAA Encrypted'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="how-it-works">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Four-Stage Clinical Pipeline</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            How Vitalis Transforms Your Biomarkers
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From raw blood chemistry to clinical clarity in under four seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative rounded-3xl p-7 bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 glass-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-emerald-400/40 group-hover:text-emerald-400 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-semibold text-emerald-300 mb-3">
                    {item.badge}
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Learn protocol</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
