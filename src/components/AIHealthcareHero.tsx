import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Download, 
  LayoutGrid, 
  X, 
  Maximize2,
  Menu
} from 'lucide-react';
import { playBlip } from '../utils/audio';

interface AIHealthcareHeroProps {
  onOpenBooking: () => void;
  onExploreDashboard?: () => void;
}

export const AIHealthcareHero: React.FC<AIHealthcareHeroProps> = ({ 
  onOpenBooking 
}) => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCard3Click = () => {
    setIsCardExpanded(!isCardExpanded);
    playBlip(isCardExpanded ? 700 : 900);
  };

  return (
    <div className="w-full bg-[#fcfbfa] text-slate-900 font-sans selection:bg-[#ea8d53]/20 selection:text-slate-950">
      
      {/* Real Top Navigation Bar (Clean, sticky, full-width) */}
      <header className="sticky top-0 z-40 w-full bg-[#fcfbfa]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Logo matching reference */}
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

          {/* Right Action: Download App Button */}
          <div className="hidden sm:flex items-center gap-4">
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
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                playBlip(850);
                onOpenBooking();
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white font-medium text-xs tracking-tight shadow-md"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download App</span>
            </button>
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

        {/* 4-Card Hero Gallery Section */}
        <div className="py-8 sm:py-10 border-b border-slate-200/80 relative">
          
          {!isCardExpanded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Card 1: Clinical Practice (Clean crop with pristine built-in widget, zero duplicate overlay) */}
              <div className="lg:col-span-4 rounded-3xl overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow bg-[#f0ede8] aspect-[877/899]">
                <img
                  src="/images/card1-clean-full.png"
                  alt="Clinical practice"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

              {/* Card 2: Biomechanical Spine (Clean crop, no artificial overlay badge) */}
              <div className="lg:col-span-3 rounded-3xl overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow bg-[#ecebe9] aspect-[473/899]">
                <img
                  src="/images/card2-clean-full.png"
                  alt="Biomechanical spine"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

              {/* Card 3: Serene Meditation & Neural Recovery (Interactive: Click to Expand!) */}
              <div
                onClick={handleCard3Click}
                className="lg:col-span-3 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all bg-[#ebdccc] aspect-[562/899] border-2 border-transparent hover:border-[#ea8d53]/50"
                title="Click to expand"
              >
                <img
                  src="/images/card3-clean-full.png"
                  alt="Neural recovery and meditation"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Subtle Hover Pill */}
                <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                  <Maximize2 className="w-3 h-3" />
                  <span>Click to Expand</span>
                </div>
              </div>

              {/* Card 4: Diagnostic Perception (Click to preview video) */}
              <div
                onClick={() => {
                  setIsPlayingVideo(true);
                  playBlip(880);
                }}
                className="lg:col-span-2 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-[#d9dcd6] aspect-[404/899]"
                title="Take a look"
              >
                <img
                  src="/images/card4-clean-full.png"
                  alt="Facial and diagnostic perception"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

            </div>
          ) : (
            /* Card 3 Cinema View when clicked */
            <div className="w-full rounded-3xl overflow-hidden relative min-h-[440px] sm:min-h-[540px] lg:min-h-[600px] bg-[#ebdccc] shadow-2xl animate-fade-in flex items-center justify-center">
              <img
                src="/images/card3-expanded-clean.png"
                alt="Artificial Intelligence Future Healtech"
                className="w-full h-full object-cover object-center absolute inset-0"
              />

              {/* Close / Shrink Button */}
              <button
                onClick={handleCard3Click}
                className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95"
                title="Collapse back to gallery"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Floating Return Pill */}
              <div
                onClick={handleCard3Click}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-slate-950/80 hover:bg-slate-950 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-xs font-mono flex items-center gap-2 cursor-pointer shadow-xl transition-all hover:scale-105"
              >
                <span>Return to gallery</span>
                <X className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

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

      {/* Video Modal if Card 4 is clicked */}
      {isPlayingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 max-w-2xl w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Diagnostic Stream Telemetry
              </span>
              <button
                onClick={() => setIsPlayingVideo(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="w-full h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <video
                src="/videos/clean-heart-loop.mp4"
                poster="/images/heart-clean.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
