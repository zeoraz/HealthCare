import React, { useState, useEffect, useRef } from 'react';
import { 
  FlaskConical, 
  Camera, 
  Mic, 
  Play, 
  Square, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  ArrowUpRight,
  Activity,
  Heart,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { playBlip } from '../utils/audio';

type StudioTab = 'labs' | 'vitals' | 'scribe';

export const InteractiveDiagnosticStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudioTab>('labs');

  // Lab Decoder State
  const [selectedLabPreset, setSelectedLabPreset] = useState<'cardio' | 'metabolic' | 'optimal'>('cardio');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Vitals Scanner State
  const [isScanningVitals, setIsScanningVitals] = useState(false);
  const [vitalsProgress, setVitalsProgress] = useState(0);
  const [bpm, setBpm] = useState(72);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Scribe State
  const [isScribing, setIsScribing] = useState(false);
  const [scribeText, setScribeText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Lab Presets Data
  const labData = {
    cardio: {
      name: 'Advanced Cardiometabolic Panel',
      summary: 'Elevated atherogenic lipoproteins and borderline fasting glucose.',
      risk: 'Moderate Cardiovascular Risk',
      riskColor: 'text-amber-600 bg-amber-50 border-amber-200',
      bars: [85, 45, 92, 60, 78, 35, 88, 52, 70, 64],
      labels: ['LDL-C', 'HDL-C', 'ApoB', 'Trig', 'HbA1c', 'hs-CRP', 'Gluc', 'Homocys', 'eGFR', 'Lp(a)'],
      metrics: [
        { name: 'LDL Cholesterol', value: '148 mg/dL', status: 'High', flag: 'elevated' },
        { name: 'Apolipoprotein B', value: '112 mg/dL', status: 'High', flag: 'elevated' },
        { name: 'Fasting Glucose', value: '108 mg/dL', status: 'Borderline', flag: 'warning' },
        { name: 'hs-CRP (Inflammation)', value: '1.2 mg/L', status: 'Optimal', flag: 'optimal' },
      ],
      aiAction: 'Recommend initiation of low-intensity statin therapy or dietary phytosterols. Repeat lipid subfraction in 90 days.'
    },
    metabolic: {
      name: 'Endocrine & Metabolic Health Panel',
      summary: 'Insulin resistance biomarkers flagged with preserved renal clearance.',
      risk: 'Pre-Diabetic Glycemic Drift',
      riskColor: 'text-[#ea8d53] bg-[#fdeee4] border-orange-200',
      bars: [40, 75, 55, 95, 88, 70, 62, 50, 82, 45],
      labels: ['HbA1c', 'Insulin', 'HOMA-IR', 'Glucose', 'ALT', 'AST', 'Trig', 'Uric', 'eGFR', 'Cortisol'],
      metrics: [
        { name: 'HbA1c', value: '5.9%', status: 'Pre-diabetic', flag: 'warning' },
        { name: 'Fasting Insulin', value: '16.4 uIU/mL', status: 'High', flag: 'elevated' },
        { name: 'HOMA-IR Score', value: '3.1', status: 'Insulin Resistant', flag: 'elevated' },
        { name: 'eGFR (Kidney)', value: '104 mL/min', status: 'Optimal', flag: 'optimal' },
      ],
      aiAction: 'Automated referral drafted: 16-week continuous glucose monitoring (CGM) + time-restricted feeding protocol.'
    },
    optimal: {
      name: 'Longevity & Performance Panel',
      summary: 'All cellular and metabolic biomarkers within optimal quintile.',
      risk: 'Optimal Metabolic Fitness',
      riskColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      bars: [30, 85, 40, 35, 45, 20, 48, 30, 95, 32],
      labels: ['LDL', 'HDL', 'ApoB', 'Trig', 'HbA1c', 'CRP', 'Gluc', 'Cortisol', 'eGFR', 'TSH'],
      metrics: [
        { name: 'ApoB', value: '68 mg/dL', status: 'Optimal', flag: 'optimal' },
        { name: 'HbA1c', value: '5.1%', status: 'Optimal', flag: 'optimal' },
        { name: 'Fasting Glucose', value: '84 mg/dL', status: 'Optimal', flag: 'optimal' },
        { name: 'hs-CRP', value: '0.4 mg/L', status: 'Ultra-low', flag: 'optimal' },
      ],
      aiAction: 'No pharmaceutical intervention required. Continue current exercise and recovery regimen.'
    }
  };

  const currentLab = labData[selectedLabPreset];

  // Animated Waveform for Vitals Scanner
  useEffect(() => {
    let animationFrameId: number;
    let offset = 0;

    const renderWaveform = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw Grid
      ctx.strokeStyle = 'rgba(234, 141, 83, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw ECG / PPG Pulse Waveform
      ctx.strokeStyle = '#ea8d53';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const midY = height / 2;
      for (let x = 0; x < width; x++) {
        const t = (x + offset) * 0.03;
        // Synthesize pulse wave with sharp systolic peak
        const pulse = Math.sin(t) * 12 + (Math.sin(t * 3) > 0.8 ? -32 : 0);
        const y = midY + pulse;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offset += isScanningVitals ? 3.5 : 1.2;
      animationFrameId = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isScanningVitals]);

  // Vitals Scan Simulation
  const handleToggleVitalsScan = () => {
    if (!isScanningVitals) {
      setIsScanningVitals(true);
      setVitalsProgress(0);
      playBlip(750);

      const interval = setInterval(() => {
        setVitalsProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanningVitals(false);
            playBlip(950);
            return 100;
          }
          setBpm(Math.floor(68 + Math.random() * 8));
          return prev + 5;
        });
      }, 150);
    } else {
      setIsScanningVitals(false);
      setVitalsProgress(0);
    }
  };

  // Scribe Simulation
  const sampleTranscript = `PATIENT VISIT NOTE (Auto-Generated by AI Healthcare)
DATE: November 15, 2026 | TIME: 11:42 AM
PATIENT: Anonymous Adult (48 y/o) | CLINICIAN: Dr. S. Reynolds, MD

[SUBJECTIVE]
Patient presents with 4-week history of dull axial lower back stiffness exacerbated after prolonged desk seating (>6 hours). Denies acute trauma, lower extremity numbness, or bowel/bladder incontinence. Rates pain 4/10.

[OBJECTIVE]
- Blood Pressure: 118/76 mmHg | Heart Rate: 71 BPM (rPPG Verified)
- Lumbar Spine: Mild paraspinal tenderness at L4-L5. Negative Straight Leg Raise test bilaterally (80°).
- Gait & Posture: Mild anterior pelvic tilt (12°) identified via optical biomechanical scan.

[ASSESSMENT]
1. Mechanical lower back strain (ICD-10: M54.50)
2. Postural muscle imbalance secondary to sedentary ergonomic load.

[PLAN]
1. Physical Therapy: 6-week core strengthening and hamstring flexibility protocol.
2. Ergonomic desk adjustment: Lumbar support seat alignment.
3. PRN Ibuprofen 400mg with meals.
4. Follow-up: 6 weeks if pain persists.`;

  const handleStartScribe = () => {
    setIsScribing(true);
    setScribeText('');
    playBlip(800);

    let i = 0;
    const interval = setInterval(() => {
      setScribeText(sampleTranscript.slice(0, i));
      i += 12;
      if (i > sampleTranscript.length) {
        clearInterval(interval);
        setScribeText(sampleTranscript);
        setIsScribing(false);
        playBlip(920);
      }
    }, 40);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scribeText || sampleTranscript);
    setIsCopied(true);
    playBlip(880);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden font-sans">
      
      {/* Studio Header & Tab Selector */}
      <div className="p-6 sm:p-8 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ea8d53] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Interactive Product Sandbox
            </span>
          </div>
          <h3 className="font-display font-extrabold text-2xl text-slate-950 tracking-tight">
            Test the AI Intelligence Layer Live
          </h3>
        </div>

        {/* 3-Tab Pill Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <button
            onClick={() => {
              setActiveTab('labs');
              playBlip(750);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all ${
              activeTab === 'labs'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Lab Decoder</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('vitals');
              playBlip(800);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all ${
              activeTab === 'vitals'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera Vitals (rPPG)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('scribe');
              playBlip(850);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all ${
              activeTab === 'scribe'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Ambient Scribe</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Instant Lab Biomarker Decoder */}
      {activeTab === 'labs' && (
        <div className="p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">SAMPLE BLOOD PANEL SIMULATION</div>
              <h4 className="font-display font-bold text-xl text-slate-950">
                {currentLab.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {currentLab.summary}
              </p>
            </div>

            {/* Presets Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium mr-1">Preset:</span>
              <button
                onClick={() => { setSelectedLabPreset('cardio'); playBlip(780); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedLabPreset === 'cardio'
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                Cardio Risk
              </button>
              <button
                onClick={() => { setSelectedLabPreset('metabolic'); playBlip(820); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedLabPreset === 'metabolic'
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                Pre-Diabetic
              </button>
              <button
                onClick={() => { setSelectedLabPreset('optimal'); playBlip(860); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedLabPreset === 'optimal'
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                Optimal Vitality
              </button>
            </div>
          </div>

          {/* Interactive Bar Chart (Matching Card 1 visual aesthetic!) */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#ea8d53]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Multimodal Biomarker Spectrum
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${currentLab.riskColor}`}>
                {currentLab.risk}
              </span>
            </div>

            {/* Bars */}
            <div className="h-36 pt-4 flex items-end justify-between gap-2 border-b border-white/10 pb-2">
              <div className="flex flex-col justify-between text-[9px] font-mono text-slate-400 h-full pr-2">
                <span>100%</span>
                <span>50%</span>
                <span>0%</span>
              </div>
              <div className="flex-1 flex items-end justify-between gap-2 h-full">
                {currentLab.bars.map((val, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => {
                      setHoveredBar(idx);
                      playBlip(600 + idx * 30);
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                    style={{ height: `${val}%` }}
                    className={`flex-1 rounded-t-md transition-all duration-300 cursor-pointer relative group ${
                      hoveredBar === idx
                        ? 'bg-white shadow-lg scale-105'
                        : val > 80
                        ? 'bg-[#ea8d53]'
                        : 'bg-slate-500 hover:bg-slate-400'
                    }`}
                  >
                    {/* Hover Tooltip */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      {val}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar Labels */}
            <div className="flex items-center justify-between gap-2 pl-9 pt-2 text-[10px] font-mono text-slate-400">
              {currentLab.labels.map((lbl, idx) => (
                <span key={idx} className="flex-1 text-center truncate">
                  {lbl}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metric Flags & AI Action */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentLab.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium mb-1">{m.name}</div>
                <div className="font-display font-bold text-lg text-slate-950">{m.value}</div>
                <div className={`text-[11px] font-semibold mt-1 flex items-center gap-1 ${
                  m.flag === 'elevated' ? 'text-rose-600' : m.flag === 'warning' ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {m.flag === 'optimal' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  <span>{m.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Clinical Action Suggestion */}
          <div className="mt-4 p-4 rounded-2xl bg-[#fdeee4]/70 border border-[#ea8d53]/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#ea8d53] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs text-slate-900 uppercase font-mono mr-2">
                Automated Physician Decision Support:
              </span>
              <span className="text-xs text-slate-700 leading-relaxed font-normal">
                {currentLab.aiAction}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Contactless Video Vitals Scanner (rPPG) */}
      {activeTab === 'vitals' && (
        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Camera View / Simulated Mesh */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-slate-950 aspect-video relative flex items-center justify-center border border-slate-800 shadow-lg">
              <img
                src="/images/card4-clean-full.png"
                alt="Optical photoplethysmography"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Face Mesh Scan Overlays */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-56 rounded-[40px] border-2 border-dashed border-[#ea8d53]/80 animate-pulse flex items-center justify-center">
                  <div className="w-40 h-48 rounded-[32px] border border-[#ea8d53]/30" />
                </div>
              </div>

              {/* Status Pill */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white flex items-center gap-2 border border-white/10">
                <span className={`w-2 h-2 rounded-full ${isScanningVitals ? 'bg-[#ea8d53] animate-ping' : 'bg-emerald-500'}`} />
                <span>{isScanningVitals ? `SCANNING: ${vitalsProgress}%` : 'LIVE OPTICAL FEED'}</span>
              </div>

              {/* Trigger Button Overlay */}
              <div className="absolute bottom-4 inset-x-4 flex justify-center">
                <button
                  onClick={handleToggleVitalsScan}
                  className="px-6 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md text-xs font-semibold tracking-wide flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                >
                  {isScanningVitals ? <Square className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isScanningVitals ? 'Halt Telemetry' : 'Run 10-Sec rPPG Scan'}</span>
                </button>
              </div>
            </div>

            {/* Right: Waveform and Measured Vitals */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-mono text-slate-400 mb-1">REAL-TIME OPTICAL CAPTURE</div>
                <h4 className="font-display font-bold text-xl text-slate-950">
                  Sub-Skin Blood Volume Pulse (rPPG)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Extracts micro-capillary reflectance shifts directly from facial video without contact sensors.
                </p>
              </div>

              {/* Live Canvas Waveform */}
              <div className="rounded-2xl border border-slate-200 bg-[#fbfaf8] p-3 shadow-inner">
                <canvas ref={canvasRef} width={500} height={90} className="w-full h-[90px]" />
              </div>

              {/* Measured Telemetry Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Heart Rate</span>
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-slate-950">
                    {bpm} <span className="text-xs font-normal text-slate-500">BPM</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Est. Blood Pressure</span>
                    <Activity className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-slate-950">
                    118/76 <span className="text-xs font-normal text-slate-500">mmHg</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>HRV (Autonomic)</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-slate-950">
                    54 <span className="text-xs font-normal text-slate-500">ms</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Respiratory Rate</span>
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-slate-950">
                    15 <span className="text-xs font-normal text-slate-500">rpm</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Ambient Clinical Audio Scribe */}
      {activeTab === 'scribe' && (
        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">AMBIENT CONSULTATION TRANSCRIBER</div>
              <h4 className="font-display font-bold text-xl text-slate-950">
                Automated Clinical SOAP Note Generator
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Converts natural conversational audio between clinician and patient into compliant EHR documentation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleStartScribe}
                disabled={isScribing}
                className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isScribing ? 'Transcribing Audio...' : 'Run Audio Simulation'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-medium flex items-center gap-2 transition-all"
              >
                {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied!' : 'Copy SOAP Note'}</span>
              </button>
            </div>
          </div>

          {/* Transcript / Output Window */}
          <div className="mt-6 rounded-2xl bg-slate-950 text-slate-100 p-6 font-mono text-xs leading-relaxed shadow-xl border border-slate-800 max-h-[380px] overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono">
              {scribeText || sampleTranscript}
            </pre>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
            <span>Verified ICD-10 Coding: M54.50 (Mechanical Low Back Strain)</span>
            <span className="text-emerald-600 font-bold">✓ FHIR & Epic Interoperability Ready</span>
          </div>
        </div>
      )}

    </div>
  );
};
