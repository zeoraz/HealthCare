import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Download, 
  LayoutGrid, 
  X, 
  Menu,
  FlaskConical,
  Play,
  Sparkles,
  User,
  LogOut
} from 'lucide-react';
import { playBlip } from '../utils/audio';
import { ClinicianUser } from './AuthModal';

interface AIHealthcareHeroProps {
  onOpenBooking: () => void;
  onExploreDashboard?: () => void;
  user?: ClinicianUser | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const AIHealthcareHero: React.FC<AIHealthcareHeroProps> = ({ 
  onOpenBooking,
  user,
  onOpenAuth,
  onSignOut
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeBarHover, setActiveBarHover] = useState<number | null>(null);

  // 10 bar heights for Card 1 widget
  const barHeights = [45, 68, 55, 50, 80, 40, 42, 60, 52, 65];

  return (
    <div className="w-full bg-[#fcfbfa] text-slate-900 font-sans selection:bg-[#ea8d53]/20 selection:text-slate-950">
      
      {/* Real Top Navigation Bar (Clean, sticky, full-width) */}
      <header className="sticky top-0 z-40 w-full bg-[#fcfbfa]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-slate-950 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#fcfbfa] flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-950" />
              </div>
            </div>
            <span className="font-display font-bold text-base tracking-tight text-slate-950">
              AI Healthcare
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-slate-600">
            <a href="#technology" className="hover:text-slate-950 transition-colors">Technology</a>
            <a href="#healthcare" className="hover:text-slate-950 transition-colors">Healthcare</a>
            <a href="#solutions" className="hover:text-slate-950 transition-colors">Solutions</a>
            <a href="#application" className="hover:text-slate-950 transition-colors">Application</a>
          </nav>

          {/* Right Action: Clinician Auth or Profile + Download App */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs border border-slate-800 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ea8d53]/20 text-[#ea8d53] border border-[#ea8d53]/30">
                    PILOT PRO
                  </span>
                </div>
                <button
                  onClick={() => {
                    playBlip(600);
                    onSignOut();
                  }}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    playBlip(800);
                    onOpenAuth();
                  }}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all"
                >
                  Doctor Sign In
                </button>
                <button
                  onClick={() => {
                    playBlip(850);
                    onOpenBooking();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-medium text-xs tracking-tight shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download App</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-lg px-6 py-4 space-y-3">
            {user && (
              <div className="p-3 rounded-xl bg-slate-100 flex items-center justify-between text-xs mb-2">
                <div>
                  <div className="font-semibold text-slate-950">{user.name}</div>
                  <div className="text-[11px] text-slate-500">{user.clinic}</div>
                </div>
                <button
                  onClick={() => {
                    playBlip(600);
                    onSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            )}
            <a 
              href="#technology" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1"
            >
              Technology
            </a>
            <a 
              href="#healthcare" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1"
            >
              Healthcare
            </a>
            <a 
              href="#solutions" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1"
            >
              Solutions
            </a>
            <a 
              href="#application" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1"
            >
              Application
            </a>
            {!user ? (
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    playBlip(800);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-full border border-slate-200 text-slate-800 font-semibold text-xs text-center"
                >
                  Doctor Sign In
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    playBlip(850);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white font-medium text-xs tracking-tight shadow-md"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download App</span>
                </button>
              </div>
            ) : null}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-10 sm:pt-14 pb-16">
        
        {/* Top Content Row: Headline Left, Subtitle & CTAs Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10 border-b border-slate-200/80">
          
          {/* Left: Badge + Large Headline */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-[#fdeee4] text-[#ea8d53] text-[11px] font-bold uppercase tracking-wider font-mono">
                NEW
              </span>
              <span className="text-xs font-medium text-slate-500">
                AI Healthcare Assistant
              </span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-slate-950 tracking-tight leading-[1.08]">
              AI Intelligence Layer<br />
              For Modern Healthcare
            </h1>
          </div>

          {/* Right: Subtitle & Action Buttons */}
          <div className="lg:col-span-5 lg:pl-6 flex flex-col justify-between h-full pt-2">
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Secure AI-powered healthcare assistant for diagnosis support, patient summaries, and medical workflows.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playBlip(900);
                  onOpenBooking();
                }}
                className="group px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-lg hover:shadow-slate-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Get Started</span>
              </button>

              <button
                onClick={() => {
                  playBlip(820);
                  onOpenBooking();
                }}
                className="group px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold tracking-wide flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book Demo</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* 4-Card Hero Photos Section (Curated Pinterest-Aesthetic Editorial Visuals) */}
        <div className="py-8 sm:py-10 border-b border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Card 1: Clinical Practice (Pinterest Lab Researcher with Crisp Frosted Glass Bar Chart) */}
            <div className="lg:col-span-4 rounded-3xl overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow bg-[#f0ede8] min-h-[360px] sm:min-h-[420px]">
              <img
                src="/images/pinterest-card1-clinical.jpg"
                alt="Clinical practice researcher"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Frosted Glass Bar Chart Overlay Widget */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-4 text-white shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold tracking-tight text-white drop-shadow-sm">Clinical practice</span>
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/40 cursor-pointer transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* 10 Bar Chart Bars with Axis Labels */}
                <div className="flex items-end gap-2 h-16 pt-1">
                  <div className="flex flex-col justify-between text-[9px] font-mono text-white/90 pr-1 h-full select-none font-bold">
                    <span>500</span>
                    <span>300</span>
                    <span>100</span>
                    <span>0</span>
                  </div>

                  <div className="flex-1 flex items-end justify-between gap-1 h-full">
                    {barHeights.map((h, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => {
                          setActiveBarHover(i);
                          playBlip(600 + i * 35);
                        }}
                        onMouseLeave={() => setActiveBarHover(null)}
                        style={{ height: `${h}%` }}
                        className={`flex-1 rounded-md transition-all duration-300 cursor-pointer ${
                          activeBarHover === i
                            ? 'bg-white shadow-md scale-105'
                            : i % 2 === 0
                            ? 'bg-[#ea8d53]'
                            : 'bg-[#fcdbc2]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Biomechanical Spine (Pinterest Minimalist Ergonomic Spine Architecture) */}
            <div className="lg:col-span-3 rounded-3xl overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow bg-[#ecebe9] min-h-[360px] sm:min-h-[420px]">
              <img
                src="/images/pinterest-card2-biomechanics.jpg"
                alt="Biomechanical spine architecture"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>

            {/* Card 3: Serene Meditation & Neural Recovery (Pinterest Japandi Mindfulness) */}
            <div className="lg:col-span-3 rounded-3xl overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow bg-[#ebdccc] min-h-[360px] sm:min-h-[420px]">
              <img
                src="/images/pinterest-card3-mindfulness.jpg"
                alt="Neural recovery and meditation"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Circular Audio / Radar Indicators */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full border-2 border-white/70 flex items-center justify-center shadow-sm">
                  <div className="w-3.5 h-3.5 rounded-full bg-white animate-ping" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#ea8d53] shadow-md flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 4: Diagnostic Perception (Pinterest Fluted Ribbed Glass Portrait) */}
            <div className="lg:col-span-2 rounded-3xl overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow bg-[#d9dcd6] min-h-[360px] sm:min-h-[420px]">
              <img
                src="/images/pinterest-card4-diagnostic.jpg"
                alt="Facial and diagnostic perception"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Take a Look Pill Button */}
              <div className="absolute bottom-5 left-4 right-4">
                <button 
                  onClick={() => playBlip(880)}
                  className="w-full py-2 px-3 rounded-full bg-white/35 backdrop-blur-md border border-white/50 text-slate-900 text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-md hover:bg-white/50 transition-colors"
                >
                  <Play className="w-3 h-3 fill-slate-900 stroke-none" />
                  <span>Take a look</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Metrics Bar (Pristine layout matching video) */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left: Bento Icon & Key Metrics */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-14">
            
            {/* 4-Square Bento Icon */}
            <div className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm">
              <LayoutGrid className="w-4 h-4" />
            </div>

            {/* Metric 1: Patients Assisted */}
            <div>
              <div className="font-display font-extrabold text-2xl text-slate-950 tracking-tight">
                48+
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Patients Assisted
              </div>
            </div>

            {/* Metric 2: Diagnostic Accuracy */}
            <div>
              <div className="font-display font-extrabold text-2xl text-slate-950 tracking-tight">
                85%
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Diagnostic Accuracy
              </div>
            </div>

            {/* Metric 3: Hours Saved */}
            <div>
              <div className="font-display font-extrabold text-2xl text-slate-950 tracking-tight">
                18+
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Hours Saved
              </div>
            </div>

          </div>

          {/* Right: Avatar Stack + Behavior Patterns */}
          <div className="flex items-center gap-4">
            <div className="h-9 w-auto flex items-center">
              <img
                src="/images/avatar-stack-clean.png"
                alt="Clinicians and physicians"
                className="h-8 w-auto rounded-full object-cover shadow-sm"
              />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-sm text-slate-950 tracking-tight">
                800+
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Behavior patterns
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
