import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Calendar, 
  Heart, 
  Dna, 
  Home, 
  Shield, 
  BarChart2, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Maximize2, 
  Minimize2, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { playBlip, playHeartbeatBeep } from '../utils/audio';

interface BiomarkerRecord {
  id: string;
  indicator: string;
  category: 'Hormonal' | 'Metabolic' | 'Cardiovascular' | 'Liver' | 'Renal';
  low: string;
  result: string;
  numericVal: number;
  unit: string;
  high: string;
  status: 'Normal' | 'High' | 'Low' | 'Critical';
  clinicalNote: string;
  recommendation: string;
}

export const MedicalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'biomarkers' | 'cardiac' | 'metabolic'>('biomarkers');
  const [isIsometric, setIsIsometric] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'High' | 'Low' | 'Normal'>('All');
  const [selectedBiomarker, setSelectedBiomarker] = useState<BiomarkerRecord | null>(null);
  const [isSimulatingLive, setIsSimulatingLive] = useState<boolean>(true);
  const [heartRate, setHeartRate] = useState<number>(76);
  const ecgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initial Biomarker Data mirroring video with enhanced accuracy
  const [biomarkers, setBiomarkers] = useState<BiomarkerRecord[]>([
    {
      id: '1',
      indicator: 'SHBG (Sex Hormone-Binding Globulin)',
      category: 'Hormonal',
      low: '< 25',
      result: '16 nmol/L',
      numericVal: 16,
      unit: 'nmol/L',
      high: '> 100',
      status: 'Low',
      clinicalNote: 'Decreased SHBG elevates free bioavailable steroid hormones. Often associated with metabolic syndrome or hyperinsulinemia.',
      recommendation: 'Evaluate fasting insulin levels; optimize dietary fiber and moderate saturated fat intake.'
    },
    {
      id: '2',
      indicator: 'Testosterone (Total)',
      category: 'Hormonal',
      low: '< 0.15',
      result: '0.56 ng/mL',
      numericVal: 0.56,
      unit: 'ng/mL',
      high: '> 0.45',
      status: 'High',
      clinicalNote: 'Total circulating testosterone exceeds upper threshold for age-matched cohort reference range.',
      recommendation: 'Monitor free androgen index (FAI) and LH/FSH axis. Review exogenous supplementation.'
    },
    {
      id: '3',
      indicator: 'DHEA-S (Dehydroepiandrosterone)',
      category: 'Hormonal',
      low: '< 35',
      result: '136 ug/dL',
      numericVal: 136,
      unit: 'ug/dL',
      high: '> 250',
      status: 'Normal',
      clinicalNote: 'Adrenal androgen precursor synthesis within balanced neuroendocrine homeostasis.',
      recommendation: 'Maintain circadian sleep rhythm and adaptogenic micronutrient protocol.'
    },
    {
      id: '4',
      indicator: 'hs-CRP (Cardio Inflammation)',
      category: 'Cardiovascular',
      low: '< 0.5',
      result: '0.8 mg/L',
      numericVal: 0.8,
      unit: 'mg/L',
      high: '> 3.0',
      status: 'Normal',
      clinicalNote: 'Low vascular inflammatory burden; low acute-phase cardiovascular risk profile.',
      recommendation: 'Sustain omega-3 EPA/DHA intake and zone 2 aerobic conditioning.'
    },
    {
      id: '5',
      indicator: 'Fasting Blood Glucose',
      category: 'Metabolic',
      low: '< 70',
      result: '104 mg/dL',
      numericVal: 104,
      unit: 'mg/dL',
      high: '> 99',
      status: 'High',
      clinicalNote: 'Impaired fasting glucose indicating early insulin sensitivity downregulation.',
      recommendation: 'Incorporate 10-minute post-prandial walks; reduce refined glycemic index carbohydrates.'
    },
    {
      id: '6',
      indicator: 'Ferritin (Iron Reserve)',
      category: 'Metabolic',
      low: '< 30',
      result: '42 ng/mL',
      numericVal: 42,
      unit: 'ng/mL',
      high: '> 300',
      status: 'Normal',
      clinicalNote: 'Adequate iron stores without intracellular oxidative hemochromatosis.',
      recommendation: 'Retest in 6 months to evaluate iron turnover dynamics.'
    }
  ]);

  // Real-time animated ECG Waveform Canvas
  useEffect(() => {
    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;
    const points: number[] = [];
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    const renderECG = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ECG Line Waveform
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const t = (x + offset) % 180;
        let y = midY;

        // P Wave
        if (t >= 30 && t < 45) {
          y -= Math.sin(((t - 30) / 15) * Math.PI) * 10;
        }
        // Q Wave
        else if (t >= 55 && t < 60) {
          y += 8;
        }
        // R Spike (Sharp Vitals Contraction)
        else if (t >= 60 && t < 70) {
          const ratio = (t - 60) / 10;
          y -= Math.sin(ratio * Math.PI) * 55;
        }
        // S Wave
        else if (t >= 70 && t < 75) {
          y += 14;
        }
        // T Wave
        else if (t >= 95 && t < 125) {
          y -= Math.sin(((t - 95) / 30) * Math.PI) * 18;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offset = (offset + 2) % 3600;
      animationId = requestAnimationFrame(renderECG);
    };

    renderECG();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Filtered Biomarkers
  const filteredBiomarkers = biomarkers.filter((b) => {
    const matchesSearch = b.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="py-20 relative overflow-hidden" id="dashboard">
      {/* Background radial spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Telemetry Terminal</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Clinician dashboard for group analytics
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Live longitudinal biometric surveillance, automated range stratification, and decision workflows.
            </p>
          </div>

          {/* Perspective View Toggle */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 text-xs font-medium">
            <button
              onClick={() => {
                setIsIsometric(true);
                playBlip(750);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                isIsometric 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D Tablet View
            </button>
            <button
              onClick={() => {
                setIsIsometric(false);
                playBlip(780);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                !isIsometric 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Workstation
            </button>
          </div>
        </div>

        {/* Tablet Frame / Perspective Container */}
        <div className={`transition-all duration-700 ease-out ${
          isIsometric ? 'perspective-container' : ''
        }`}>
          <div className={`rounded-3xl bg-slate-950/95 border-2 border-emerald-500/30 p-2 sm:p-4 md:p-6 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.25)] transition-all ${
            isIsometric 
              ? 'transform lg:rotate-x-12 lg:-rotate-y-2 lg:scale-[0.98] hover:rotate-x-0 hover:rotate-y-0 duration-500' 
              : ''
          }`}>
            
            {/* Inner Dashboard Workspace */}
            <div className="bg-[#0b111e] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              
              {/* Top Navigation & Patient Header */}
              <div className="border-b border-white/10 px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-slate-900/60">
                
                {/* Search Bar */}
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search biomarker, organ, hormone..."
                    className="w-full bg-slate-950/80 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>

                {/* Patient Profile Card (Matching Video: Charles Robbie, 25 years old • New York, USA) */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-full border border-white/10">
                    <span className="text-emerald-400 font-bold">O+</span> Blood
                    <span className="text-white/20">•</span>
                    <span className="text-cyan-400 font-bold">186cm</span>
                    <span className="text-white/20">•</span>
                    <span className="text-teal-400 font-bold">90kg</span>
                  </div>

                  <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                      alt="Charles Robbie"
                      className="w-8 h-8 rounded-full ring-2 ring-emerald-500/50 object-cover"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold text-white leading-tight">Charles Robbie</div>
                      <div className="text-[10px] text-slate-400 font-mono">25 yrs • New York, USA</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Main Workspace Body: Sidebar + Dynamic Panel */}
              <div className="grid grid-cols-12 min-h-[580px]">
                
                {/* Vertical Sidebar */}
                <div className="col-span-12 sm:col-span-2 md:col-span-1 border-b sm:border-b-0 sm:border-r border-white/10 p-3 flex sm:flex-col items-center justify-between bg-slate-950/40">
                  <div className="flex sm:flex-col gap-2">
                    <button
                      onClick={() => {
                        setActiveTab('biomarkers');
                        playBlip(750);
                      }}
                      title="Biomarker Panel"
                      className={`p-3 rounded-2xl transition-all ${
                        activeTab === 'biomarkers'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Dna className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('cardiac');
                        playBlip(820);
                      }}
                      title="Cardiovascular & ECG Telemetry"
                      className={`p-3 rounded-2xl transition-all ${
                        activeTab === 'cardiac'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('metabolic');
                        playBlip(890);
                      }}
                      title="Metabolic & Organ Health"
                      className={`p-3 rounded-2xl transition-all ${
                        activeTab === 'metabolic'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Shield className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => playBlip(600)}
                      title="Clinical Reports"
                      className="p-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <BarChart2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex sm:flex-col gap-2">
                    <button
                      onClick={() => playBlip(500)}
                      title="System Settings"
                      className="p-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Center Area */}
                <div className="col-span-12 sm:col-span-10 md:col-span-11 p-4 md:p-6 flex flex-col justify-between">
                  
                  {/* Top Row: Title + Status Filter Chips */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                        {activeTab === 'biomarkers' && 'Endocrine & Blood Panel'}
                        {activeTab === 'cardiac' && 'Cardiovascular Telemetry & Arrhythmia Monitor'}
                        {activeTab === 'metabolic' && 'Systemic Metabolic & Organ Function'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">
                        Last Lab Assay: 2026-11-14 08:30 EST • Certified LabCorp Interface
                      </p>
                    </div>

                    {/* Status Filter Badges */}
                    <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs">
                      {(['All', 'High', 'Low', 'Normal'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            playBlip(720);
                          }}
                          className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                            statusFilter === status
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Content based on Active Tab */}
                  {activeTab === 'biomarkers' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left: Real Anatomical Holographic Body Video Monitor (Matching Video Frame 7 & 10) */}
                      <div className="lg:col-span-4 bg-slate-900/70 rounded-2xl border border-emerald-500/30 p-4 flex flex-col items-center justify-between overflow-hidden relative shadow-xl">
                        <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            Live Anatomical Twin
                          </span>
                          <span className="text-slate-400 text-[10px]">60 FPS Telemetry</span>
                        </div>

                        {/* Real High-Def Body Video */}
                        <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-white/5">
                          <video
                            src="/videos/clean-body-loop.mp4"
                            poster="/images/body-clean.jpg"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain filter contrast-110"
                          />
                          <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400">Cardiovascular Core</span>
                            <span className="text-emerald-400 font-bold">Synchronized</span>
                          </div>
                        </div>

                        {/* Micro Vitals Bar below video */}
                        <div className="w-full mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                            <div className="text-slate-400 text-[9px] uppercase">Thoracic Index</div>
                            <div className="text-white font-bold">Optimal</div>
                          </div>
                          <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                            <div className="text-slate-400 text-[9px] uppercase">Autonomic Tone</div>
                            <div className="text-cyan-400 font-bold">Vagal Balance</div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Dials & Biomarker Table */}
                      <div className="lg:col-span-8 space-y-5">
                        
                        {/* 3 Radial Speedometer Dials (Matching Video Frame 7 & 10) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          
                          {/* Dial 1: SHBG */}
                          <div className="bg-slate-900/60 rounded-2xl p-3.5 border border-white/10 flex flex-col items-center justify-between">
                            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                              <span className="font-bold text-white">SHBG</span>
                              <span className="text-cyan-400 text-[10px]">Optimal</span>
                            </div>
                            
                            {/* Speedometer Arc SVG */}
                            <div className="relative w-28 h-16 flex items-end justify-center">
                              <svg className="w-28 h-16 overflow-visible" viewBox="0 0 120 70">
                                <path
                                  d="M 10 60 A 50 50 0 0 1 110 60"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.1)"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M 10 60 A 50 50 0 0 1 45 18"
                                  fill="none"
                                  stroke="#06b6d4"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute bottom-0 text-center">
                                <div className="font-display font-extrabold text-xl text-white">36</div>
                                <div className="text-[9px] text-slate-400 font-mono">nmol/L</div>
                              </div>
                            </div>

                            <div className="w-full flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                              <span>&lt; 25</span>
                              <span>&gt; 100</span>
                            </div>
                          </div>

                          {/* Dial 2: Testosterone */}
                          <div className="bg-slate-900/60 rounded-2xl p-3.5 border border-ruby-500/20 flex flex-col items-center justify-between relative overflow-hidden">
                            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                              <span className="font-bold text-white">Testosterone</span>
                              <span className="text-ruby-400 font-bold text-[10px] animate-pulse">High</span>
                            </div>

                            <div className="relative w-28 h-16 flex items-end justify-center">
                              <svg className="w-28 h-16 overflow-visible" viewBox="0 0 120 70">
                                <path
                                  d="M 10 60 A 50 50 0 0 1 110 60"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.1)"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M 10 60 A 50 50 0 0 1 100 35"
                                  fill="none"
                                  stroke="#f43f5e"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute bottom-0 text-center">
                                <div className="font-display font-extrabold text-xl text-ruby-400">0.56</div>
                                <div className="text-[9px] text-slate-400 font-mono">ng/mL</div>
                              </div>
                            </div>

                            <div className="w-full flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                              <span>&lt; 0.15</span>
                              <span className="text-ruby-400 font-bold">&gt; 0.45</span>
                            </div>
                          </div>

                          {/* Dial 3: DHEA-S */}
                          <div className="bg-slate-900/60 rounded-2xl p-3.5 border border-white/10 flex flex-col items-center justify-between">
                            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                              <span className="font-bold text-white">DHEA-S</span>
                              <span className="text-emerald-400 text-[10px]">Normal</span>
                            </div>

                            <div className="relative w-28 h-16 flex items-end justify-center">
                              <svg className="w-28 h-16 overflow-visible" viewBox="0 0 120 70">
                                <path
                                  d="M 10 60 A 50 50 0 0 1 110 60"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.1)"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M 10 60 A 50 50 0 0 1 70 12"
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute bottom-0 text-center">
                                <div className="font-display font-extrabold text-xl text-white">130</div>
                                <div className="text-[9px] text-slate-400 font-mono">ug/dL</div>
                              </div>
                            </div>

                            <div className="w-full flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                              <span>&lt; 25</span>
                              <span>&gt; 100</span>
                            </div>
                          </div>

                        </div>

                        {/* Biomarker Data Table */}
                        <div className="bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-950/60 font-mono text-slate-400 text-[11px] uppercase tracking-wider border-b border-white/10">
                                <tr>
                                  <th className="py-2.5 px-3">Indicator</th>
                                  <th className="py-2.5 px-3">Low</th>
                                  <th className="py-2.5 px-3">Result</th>
                                  <th className="py-2.5 px-3">High</th>
                                  <th className="py-2.5 px-3">Status</th>
                                  <th className="py-2.5 px-3 text-right">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {filteredBiomarkers.map((row) => (
                                  <tr 
                                    key={row.id} 
                                    onClick={() => {
                                      setSelectedBiomarker(row);
                                      playBlip(800);
                                    }}
                                    className="hover:bg-emerald-500/5 cursor-pointer transition-colors"
                                  >
                                    <td className="py-2.5 px-3 font-semibold text-white">
                                      {row.indicator}
                                    </td>
                                    <td className="py-2.5 px-3 font-mono text-slate-500">
                                      {row.low}
                                    </td>
                                    <td className="py-2.5 px-3 font-mono font-bold text-white">
                                      {row.result}
                                    </td>
                                    <td className="py-2.5 px-3 font-mono text-slate-500">
                                      {row.high}
                                    </td>
                                    <td className="py-2.5 px-3">
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                        row.status === 'Normal' 
                                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                          : row.status === 'High'
                                          ? 'bg-ruby-500/15 text-ruby-400 border border-ruby-500/30'
                                          : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                                      }`}>
                                        {row.status}
                                      </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                      <span className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                                        View <ArrowUpRight className="w-3 h-3" />
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* Cardiovascular & ECG View (Matching Video Frame 11) */}
                  {activeTab === 'cardiac' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left: Real 3D Anatomical Glass Heart Video Monitor (Matching Video Frame 11) */}
                      <div className="lg:col-span-4 bg-slate-900/70 rounded-2xl border border-emerald-500/30 p-4 flex flex-col items-center justify-between overflow-hidden relative shadow-xl">
                        <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            Live Myocardial Video
                          </span>
                          <span className="text-slate-400 text-[10px]">72 BPM Pulse</span>
                        </div>

                        {/* Real High-Def Heart Video */}
                        <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-white/5">
                          <video
                            src="/videos/clean-heart-loop.mp4"
                            poster="/images/heart-clean.jpg"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain filter contrast-115 brightness-105"
                          />
                          <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400">Left Ventricle EF</span>
                            <span className="text-cyan-400 font-bold">64% Optimal</span>
                          </div>
                        </div>

                        {/* Micro Cardiac Indices */}
                        <div className="w-full mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                            <div className="text-slate-400 text-[9px] uppercase">Myocardial Wall</div>
                            <div className="text-emerald-400 font-bold">11 mm (Nominal)</div>
                          </div>
                          <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                            <div className="text-slate-400 text-[9px] uppercase">Aortic Velocity</div>
                            <div className="text-white font-bold">1.2 m/s</div>
                          </div>
                        </div>
                      </div>

                      {/* Right: ECG Waveform & Telemetry History */}
                      <div className="lg:col-span-8 space-y-4">
                        {/* ECG Waveform Canvas */}
                        <div className="bg-slate-900/70 rounded-2xl p-4 border border-emerald-500/30 relative overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                              <span className="text-xs font-mono font-bold text-white">
                                Continuous Lead II ECG Stream
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-mono">
                              <span className="text-slate-400">Scale: 25mm/s</span>
                              <span className="text-emerald-400 font-bold">Sinus Rhythm Confirmed</span>
                            </div>
                          </div>

                          <canvas 
                            ref={ecgCanvasRef} 
                            width={850} 
                            height={130} 
                            className="w-full h-32 rounded-xl bg-slate-950/80 border border-white/5"
                          />
                        </div>

                        {/* Cardiac Telemetry History Table */}
                        <div className="bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-950/60 font-mono text-slate-400 text-[11px] uppercase tracking-wider border-b border-white/10">
                                <tr>
                                  <th className="py-2.5 px-3">Date / Time</th>
                                  <th className="py-2.5 px-3">HR (bpm)</th>
                                  <th className="py-2.5 px-3">BP (mmHg)</th>
                                  <th className="py-2.5 px-3">SpO2</th>
                                  <th className="py-2.5 px-3">HRV</th>
                                  <th className="py-2.5 px-3">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5 font-mono text-xs">
                                <tr className="hover:bg-white/5">
                                  <td className="py-2.5 px-3 text-slate-300">2026-11-15 05:45</td>
                                  <td className="py-2.5 px-3 font-bold text-white">78</td>
                                  <td className="py-2.5 px-3 text-slate-300">120/80</td>
                                  <td className="py-2.5 px-3 text-cyan-400 font-bold">98%</td>
                                  <td className="py-2.5 px-3 text-emerald-400">55 ms</td>
                                  <td className="py-2.5 px-3">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                      Optimal
                                    </span>
                                  </td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                  <td className="py-2.5 px-3 text-slate-300">2026-11-15 01:20</td>
                                  <td className="py-2.5 px-3 font-bold text-white">95</td>
                                  <td className="py-2.5 px-3 text-slate-300">135/85</td>
                                  <td className="py-2.5 px-3 text-cyan-400 font-bold">95%</td>
                                  <td className="py-2.5 px-3 text-amber-400">40 ms</td>
                                  <td className="py-2.5 px-3">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                      Elevated
                                    </span>
                                  </td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                  <td className="py-2.5 px-3 text-slate-300">2026-11-14 18:30</td>
                                  <td className="py-2.5 px-3 font-bold text-ruby-400">110</td>
                                  <td className="py-2.5 px-3 text-ruby-400 font-bold">140/90</td>
                                  <td className="py-2.5 px-3 text-cyan-400 font-bold">96%</td>
                                  <td className="py-2.5 px-3 text-ruby-400">30 ms</td>
                                  <td className="py-2.5 px-3">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-ruby-500/15 text-ruby-400 border border-ruby-500/30">
                                      High Alert
                                    </span>
                                  </td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                  <td className="py-2.5 px-3 text-slate-300">2026-11-14 12:15</td>
                                  <td className="py-2.5 px-3 font-bold text-white">72</td>
                                  <td className="py-2.5 px-3 text-slate-300">118/78</td>
                                  <td className="py-2.5 px-3 text-cyan-400 font-bold">99%</td>
                                  <td className="py-2.5 px-3 text-emerald-400">58 ms</td>
                                  <td className="py-2.5 px-3">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                      Normal
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Metabolic & Organ Health View */}
                  {activeTab === 'metabolic' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900/60 rounded-2xl p-5 border border-white/10">
                        <h4 className="font-display font-bold text-base text-white mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-emerald-400" />
                          Hepatic & Renal Safety Indices
                        </h4>
                        <div className="space-y-3 text-xs font-mono">
                          <div className="flex justify-between py-1.5 border-b border-white/5">
                            <span className="text-slate-400">eGFR (Kidney Filtration)</span>
                            <span className="text-emerald-400 font-bold">&gt; 90 mL/min (Normal)</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-white/5">
                            <span className="text-slate-400">ALT (Alanine Aminotransferase)</span>
                            <span className="text-white font-bold">28 U/L (Healthy)</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-white/5">
                            <span className="text-slate-400">AST (Aspartate Aminotransferase)</span>
                            <span className="text-white font-bold">24 U/L (Healthy)</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span className="text-slate-400">Serum Creatinine</span>
                            <span className="text-emerald-400 font-bold">0.92 mg/dL</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 rounded-2xl p-5 border border-white/10">
                        <h4 className="font-display font-bold text-base text-white mb-3 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-400" />
                          Metabolic Glycemic Profile
                        </h4>
                        <div className="space-y-3 text-xs font-mono">
                          <div className="flex justify-between py-1.5 border-b border-white/5">
                            <span className="text-slate-400">HbA1c (3-Month Glycation)</span>
                            <span className="text-emerald-400 font-bold">5.2% (Optimal)</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-white/5">
                            <span className="text-slate-400">Fasting Insulin</span>
                            <span className="text-amber-400 font-bold">8.4 uIU/mL (Sub-optimal)</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-white/5">
                            <span className="text-slate-400">HOMA-IR Insulin Resistance</span>
                            <span className="text-white font-bold">1.4 (Slightly Elevated)</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span className="text-slate-400">ApoB Atherogenic Particles</span>
                            <span className="text-emerald-400 font-bold">78 mg/dL (Low Risk)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dashboard Action Bottom Bar */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Telemetry Feed: 120 packets/sec</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => {
                          playBlip(920);
                          alert('Generating SHA-256 Verified Clinical PDF Summary for Doctor Robbie...');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export PDF</span>
                      </button>

                      <button
                        onClick={() => {
                          playBlip(950);
                          alert('Secure encrypted physician link copied to clipboard.');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs text-emerald-300 font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share with Doctor</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Biomarker Detail Modal */}
      {selectedBiomarker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Biomarker Intelligence Drill-down
              </span>
              <button
                onClick={() => setSelectedBiomarker(null)}
                className="text-slate-400 hover:text-white text-sm font-mono p-1 rounded-lg hover:bg-white/10"
              >
                ✕ Close
              </button>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              {selectedBiomarker.indicator}
            </h3>

            <div className="flex items-center gap-3 mb-6 font-mono text-xs">
              <div className="bg-white/5 px-3 py-1 rounded-lg text-slate-300">
                Measured: <span className="font-bold text-white">{selectedBiomarker.result}</span>
              </div>
              <div className={`px-3 py-1 rounded-lg font-bold ${
                selectedBiomarker.status === 'Normal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-ruby-500/20 text-ruby-400'
              }`}>
                {selectedBiomarker.status}
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 font-mono">
                  Clinical Meaning
                </div>
                <p className="leading-relaxed text-xs sm:text-sm">
                  {selectedBiomarker.clinicalNote}
                </p>
              </div>

              <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/30">
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1 font-mono">
                  Recommended Action Plan
                </div>
                <p className="leading-relaxed text-xs sm:text-sm text-emerald-200">
                  {selectedBiomarker.recommendation}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedBiomarker(null)}
              className="mt-6 w-full py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider text-center"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
