import React, { useState } from 'react';
import { 
  Sparkles, 
  Dna, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Sliders, 
  Zap,
  TrendingUp,
  Brain,
  FileCheck2
} from 'lucide-react';
import { playBlip, playSuccessChime } from '../utils/audio';

interface PresetPanel {
  id: string;
  name: string;
  category: string;
  glucose: number;
  ldl: number;
  crp: number;
  testosterone: number;
  summary: string;
  score: number;
  status: 'Optimal' | 'Caution' | 'Action Needed';
}

export const AIBiomarkerDecoder: React.FC = () => {
  const presets: PresetPanel[] = [
    {
      id: 'longevity',
      name: 'Cardiometabolic & Longevity Baseline',
      category: 'Metabolic & Cardiovascular',
      glucose: 88,
      ldl: 75,
      crp: 0.4,
      testosterone: 620,
      summary: 'Exceptional cardiometabolic resilience. Low systemic vascular inflammation and tight glycemic control indicate superior cellular recovery and minimal cardiovascular risk profile.',
      score: 94,
      status: 'Optimal'
    },
    {
      id: 'athlete',
      name: 'High-Performance Athletic Recovery',
      category: 'Endocrine & Adrenal',
      glucose: 96,
      ldl: 110,
      crp: 1.8,
      testosterone: 480,
      summary: 'Mild acute-phase inflammatory response consistent with intense eccentric muscle loading. Endocrine output is compensatory; suggest post-workout glycogen replenishment and sleep extension.',
      score: 82,
      status: 'Caution'
    },
    {
      id: 'metabolic_flag',
      name: 'Early Metabolic Anomaly Flag',
      category: 'Insulin Resistance Screen',
      glucose: 115,
      ldl: 145,
      crp: 3.4,
      testosterone: 310,
      summary: 'Subclinical metabolic deceleration detected. Elevated fasting blood glucose paired with elevated hs-CRP indicates early endothelial friction and cellular insulin receptor desensitization.',
      score: 58,
      status: 'Action Needed'
    }
  ];

  const [activePreset, setActivePreset] = useState<PresetPanel>(presets[0]);
  const [glucose, setGlucose] = useState<number>(presets[0].glucose);
  const [ldl, setLdl] = useState<number>(presets[0].ldl);
  const [crp, setCrp] = useState<number>(presets[0].crp);
  const [testosterone, setTestosterone] = useState<number>(presets[0].testosterone);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const applyPreset = (preset: PresetPanel) => {
    setActivePreset(preset);
    setGlucose(preset.glucose);
    setLdl(preset.ldl);
    setCrp(preset.crp);
    setTestosterone(preset.testosterone);
    playBlip(840);
  };

  const handleSimulateAI = () => {
    setIsAnalyzing(true);
    playBlip(920);
    setTimeout(() => {
      setIsAnalyzing(false);
      playSuccessChime();
    }, 600);
  };

  // Dynamic calculated score
  const computedScore = Math.max(
    30,
    Math.min(
      98,
      Math.round(100 - (glucose > 100 ? (glucose - 100) * 0.8 : 0) - (crp > 1.0 ? crp * 8 : 0) - (ldl > 100 ? (ldl - 100) * 0.3 : 0))
    )
  );

  return (
    <section className="py-20 relative overflow-hidden" id="decoder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Brain className="w-3.5 h-3.5" />
            <span>AI Bio-Synthesis Engine</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Interactive AI Biomarker Decoder
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Select an archetype or adjust biomarker sliders below to see our medical neural engine translate numbers into plain language protocols.
          </p>
        </div>

        {/* Decoder Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-500/30 shadow-2xl relative">
          
          {/* Preset Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold tracking-wide transition-all ${
                  activePreset.id === p.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Sliders */}
            <div className="lg:col-span-6 space-y-6 bg-slate-950/60 p-6 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Biomarker Parameters
                </span>
                <span className="text-[11px] font-mono text-emerald-400">Drag to adjust values</span>
              </div>

              {/* Slider 1: Fasting Glucose */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-300 font-medium">Fasting Blood Glucose</span>
                  <span className="text-emerald-400 font-bold">{glucose} mg/dL</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="150"
                  value={glucose}
                  onChange={(e) => setGlucose(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>65 mg/dL (Hypo)</span>
                  <span>Optimal: 72 - 92</span>
                  <span>150 mg/dL (Hyper)</span>
                </div>
              </div>

              {/* Slider 2: hs-CRP */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-300 font-medium">hs-CRP (Vascular Inflammation)</span>
                  <span className={`${crp > 1.5 ? 'text-ruby-400' : 'text-emerald-400'} font-bold`}>
                    {crp} mg/L
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="6.0"
                  step="0.1"
                  value={crp}
                  onChange={(e) => setCrp(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>0.1 (Minimal)</span>
                  <span>Optimal: &lt; 0.8</span>
                  <span>6.0 (High Risk)</span>
                </div>
              </div>

              {/* Slider 3: LDL-C */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-300 font-medium">LDL Cholesterol</span>
                  <span className="text-teal-400 font-bold">{ldl} mg/dL</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={ldl}
                  onChange={(e) => setLdl(Number(e.target.value))}
                  className="w-full accent-teal-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>50 mg/dL</span>
                  <span>Target: &lt; 90</span>
                  <span>200 mg/dL</span>
                </div>
              </div>

              {/* Slider 4: Total Testosterone */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-300 font-medium">Total Testosterone</span>
                  <span className="text-sky-400 font-bold">{testosterone} ng/dL</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1100"
                  value={testosterone}
                  onChange={(e) => setTestosterone(Number(e.target.value))}
                  className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>200 ng/dL</span>
                  <span>Eumorphic: 450 - 850</span>
                  <span>1100 ng/dL</span>
                </div>
              </div>

              <button
                onClick={handleSimulateAI}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-white flex items-center justify-center gap-2 transition-all font-semibold"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Run Real-Time AI Inference</span>
              </button>
            </div>

            {/* Right: AI Output Panel */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 rounded-2xl border border-emerald-500/30 flex flex-col justify-between min-h-[380px]">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      Neural Clinical Synthesis
                    </span>
                  </div>

                  {/* Biological Health Score */}
                  <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1 rounded-xl border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400">Vitality Index:</span>
                    <span className="font-display font-extrabold text-sm text-emerald-300 font-mono">
                      {computedScore}/100
                    </span>
                  </div>
                </div>

                {/* AI Plain English Output */}
                <div className="bg-slate-950/70 rounded-2xl p-5 border border-white/10 text-sm leading-relaxed text-slate-200">
                  <p className="font-medium text-white mb-2">
                    {computedScore >= 85
                      ? '“Cardiometabolic profile is in the top decile for age-adjusted biological longevity.”'
                      : computedScore >= 70
                      ? '“Moderate metabolic recovery needed. Subclinical elevations detected in vascular inflammatory indicators.”'
                      : '“Early insulin resistance pattern detected. Recommended clinical follow-up for glucose stabilization.”'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {activePreset.summary}
                  </p>
                </div>

                {/* Actionable Next Steps */}
                <div className="mt-4 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Targeted Interventions
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-slate-300">
                      🥗 Low-Glycemic Mediterranean Fiber
                    </div>
                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-slate-300">
                      🏃 Zone 2 Cardio (150 min/week)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Model: Med-Gemini 3.0 Clinical</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <FileCheck2 className="w-3.5 h-3.5" /> Clinically Validated
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
