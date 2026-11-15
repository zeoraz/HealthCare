import React, { useState } from 'react';
import { 
  Heart, 
  Dna, 
  Activity, 
  BarChart3, 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
  TrendingDown,
  Check
} from 'lucide-react';
import { playBlip } from '../utils/audio';

export const FeaturesBento: React.FC = () => {
  const [selectedOrgan, setSelectedOrgan] = useState<string>('Hormones');
  const [showPlainSpeak, setShowPlainSpeak] = useState<boolean>(true);
  const [simulatedRisk, setSimulatedRisk] = useState<boolean>(false);

  const organPanels = [
    { name: 'Hormones', count: '14 markers', preview: 'Testosterone, DHEA-S, Cortisol, SHBG, Estradiol' },
    { name: 'Liver & Hepatic', count: '8 markers', preview: 'ALT, AST, Bilirubin, Albumin, GGT' },
    { name: 'Metabolic & Lipids', count: '12 markers', preview: 'ApoB, HbA1c, Fasting Insulin, Triglycerides' },
    { name: 'Iron & Anemia', count: '6 markers', preview: 'Ferritin, Serum Iron, TIBC, Transferrin Saturation' },
    { name: 'Vitamins & Minerals', count: '9 markers', preview: 'Active B12, 25-OH Vitamin D3, Magnesium RBC' },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching reference video */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Precision Meets Human Clarity</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Designed to Deliver Clarity and Trust
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Trusted by clinics, accredited reference labs, and proactive health practitioners worldwide.
          </p>
        </div>

        {/* 4 Bento Feature Cards (Matching Layout in Video Frame 6 with Elevated High-Tech Aesthetics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Early Detection of Health Risks */}
          <div className="group relative rounded-3xl p-7 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/20 glass-card-hover flex flex-col justify-between overflow-hidden">
            {/* Top Icon Badge */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 stroke-[2]" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Predictive AI
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                Early detection of health risks
              </h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Spot cardiovascular, metabolic, and hormonal anomalies months before they become clinical emergencies.
              </p>
            </div>

            {/* Interactive Simulation Widget */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="bg-slate-950/60 rounded-2xl p-3 border border-white/5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-mono text-[11px]">Subclinical Plaque Risk</span>
                  <span className={`font-mono font-bold ${simulatedRisk ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {simulatedRisk ? 'Moderate Flag (hs-CRP 3.1)' : 'Nominal (hs-CRP 0.6)'}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      simulatedRisk ? 'w-3/4 bg-amber-400' : 'w-1/4 bg-emerald-400'
                    }`} 
                  />
                </div>
                <button
                  onClick={() => {
                    setSimulatedRisk(!simulatedRisk);
                    playBlip(780);
                  }}
                  className="mt-2.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  <span>{simulatedRisk ? 'Reset simulation' : 'Simulate anomaly detection'}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: AI-Powered Interpretation (No Doctor-Speak) */}
          <div className="group relative rounded-3xl p-7 bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950/90 border border-emerald-500/30 glass-card-hover flex flex-col justify-between overflow-hidden">
            {/* Glowing Aura Accent */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300 mb-6 group-hover:scale-110 transition-transform">
                <Dna className="w-6 h-6 stroke-[2]" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Natural Language AI
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                AI-powered interpretation <span className="text-emerald-400">(no doctor-speak)</span>
              </h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Dense biomarker terminology translated instantly into straightforward, human-friendly insights and immediate action items.
              </p>
            </div>

            {/* Interactive Plain-Speak Toggle */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400">View Mode:</span>
                <button
                  onClick={() => {
                    setShowPlainSpeak(!showPlainSpeak);
                    playBlip(850);
                  }}
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                >
                  {showPlainSpeak ? 'Plain English' : 'Clinical Term'}
                </button>
              </div>

              <div className="bg-slate-950/70 rounded-xl p-3 border border-emerald-500/20 text-xs">
                {showPlainSpeak ? (
                  <p className="text-emerald-300 leading-relaxed font-sans">
                    "Your liver enzymes are slightly fatigued due to strenuous resistance training; hydrate and retest in 14 days."
                  </p>
                ) : (
                  <p className="text-slate-400 font-mono text-[11px] leading-relaxed">
                    "AST 48 U/L (mild transaminitis, secondary to rhabdomyolytic microtrauma vs hepatic steatosis)."
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Track Iron, Liver, Hormones, B12 */}
          <div className="group relative rounded-3xl p-7 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/20 glass-card-hover flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 stroke-[2]" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  80+ Biomarkers
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                Track your Iron, Liver, Hormones, B12
              </h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Connect external lab tests or continuous wearable monitors to build a dynamic lifetime metabolic profile.
              </p>
            </div>

            {/* Organ Panel Selector */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {organPanels.slice(0, 3).map((panel) => (
                  <button
                    key={panel.name}
                    onClick={() => {
                      setSelectedOrgan(panel.name);
                      playBlip(790);
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${
                      selectedOrgan === panel.name
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-slate-400 hover:text-white bg-white/5'
                    }`}
                  >
                    {panel.name}
                  </button>
                ))}
              </div>

              <div className="bg-slate-950/60 rounded-xl p-2.5 border border-white/5 text-[11px] text-slate-300 font-mono">
                {organPanels.find(p => p.name === selectedOrgan)?.preview}
              </div>
            </div>
          </div>

          {/* Card 4: Visual Dashboards, Alerts & Smart Reports */}
          <div className="group relative rounded-3xl p-7 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/10 glass-card-hover flex flex-col justify-between overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 stroke-[2]" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Clinical Exports
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                Visual dashboards, alerts & smart reports
              </h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                One-click doctor-ready PDF summaries, encrypted physician portal sharing, and longitudinal trend visualizers.
              </p>
            </div>

            {/* Smart Report Feature Pill */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="bg-slate-950/60 rounded-2xl p-3 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                    PDF
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Full Bloodwork Report</div>
                    <div className="text-[10px] font-mono text-slate-400">Signed with SHA-256</div>
                  </div>
                </div>
                <div className="text-emerald-400 text-xs font-mono font-bold">Ready</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
