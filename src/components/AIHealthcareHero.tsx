import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Download, 
  Play, 
  FlaskConical, 
  LayoutGrid, 
  X, 
  Sparkles,
  Lock,
  RotateCw,
  Share2,
  Maximize2
} from 'lucide-react';
import { playBlip } from '../utils/audio';

interface AIHealthcareHeroProps {
  onOpenBooking: () => void;
  onExploreDashboard: () => void;
}

export const AIHealthcareHero: React.FC<AIHealthcareHeroProps> = ({ 
  onOpenBooking, 
  onExploreDashboard 
}) => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeBarChartHover, setActiveBarChartHover] = useState<number | null>(null);

  // 10 bar heights matching Card 1 in video
  const barHeights = [45, 68, 55, 50, 80, 40, 42, 60, 52, 65];

  const handleCard3Click = () => {
    setIsCardExpanded(!isCardExpanded);
    playBlip(isCardExpanded ? 700 : 900);
  };

  return (
    <section className="relative w-full bg-[#fcfbfa] text-slate-900 pb-16 pt-3 px-3 sm:px-6 lg:px-8 font-sans select-none">
      
      {/* Outer macOS / Browser Container Card (Directly mirroring the video) */}
      <div className="max-w-[1400px] mx-auto rounded-3xl bg-white border border-slate-200 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] overflow-hidden relative">
        
        {/* Browser Top Window Chrome Bar */}
        <div className="px-6 py-3.5 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between text-xs text-slate-400">
          {/* macOS Window Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          </div>

          {/* URL Pill Bar */}
          <div className="flex items-center justify-center gap-2 bg-white px-5 py-1.5 rounded-full border border-slate-200 shadow-sm text-slate-600 font-mono text-[11px] min-w-[240px] sm:min-w-[320px]">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>aihealthcare.com</span>
            <RotateCw className="w-3 h-3 text-slate-400 ml-auto cursor-pointer hover:text-slate-700" />
          </div>

          {/* Right Window Icons */}
          <div className="flex items-center gap-3">
            <Share2 className="w-3.5 h-3.5 hover:text-slate-700 cursor-pointer" />
            <button
              onClick={onExploreDashboard}
              title="View Clinician Medical Dashboard"
              className="text-[11px] font-mono font-medium text-slate-600 hover:text-slate-950 flex items-center gap-1"
            >
              <span>Clinician Hub</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Website Header Bar */}
        <header className="px-8 py-5 border-b border-slate-200/80 flex items-center justify-between">
          {/* Minimalist Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-900 to-slate-700 p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-slate-900" />
              </div>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#technology" className="hover:text-slate-950 transition-colors">Technology</a>
            <a href="#healthcare" className="hover:text-slate-950 transition-colors">Healthcare</a>
            <a href="#solutions" className="hover:text-slate-950 transition-colors">Solutions</a>
            <a href="#application" className="hover:text-slate-950 transition-colors">Application</a>
          </nav>

          {/* Download App Pill Button */}
          <div>
            <button
              onClick={() => playBlip(850)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-medium text-xs tracking-tight shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download App</span>
            </button>
          </div>
        </header>

        {/* Hero Section Container */}
        <div className="px-6 sm:px-10 lg:px-12 pt-10 pb-8 relative">
          
          {/* Hero Top Grid: Headline on Left, Description & CTAs on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10 border-b border-slate-200/80">
            
            {/* Left Headline Area */}
            <div className="lg:col-span-7">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-[#fdeee4] text-[#ea8d53] text-[11px] font-bold uppercase tracking-wider font-mono">
                  NEW
                </span>
                <span className="text-xs font-medium text-slate-500">
                  AI Healthcare Assistant
                </span>
              </div>

              {/* Massive Bold Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-slate-950 tracking-tight leading-[1.06]">
                AI Intelligence Layer<br />
                For Modern Healthcare
              </h1>
            </div>

            {/* Right Subtitle and CTAs */}
            <div className="lg:col-span-5 lg:pl-6 flex flex-col justify-between h-full pt-2">
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Secure AI-powered healthcare assistant for diagnosis support, patient summaries, and medical workflows.
              </p>

              {/* Action Buttons matching the video */}
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

          {/* The 4-Card Hero Gallery Section */}
          <div className="pt-8 pb-10 border-b border-slate-200/80 relative">
            
            {/* Standard 4-Card Layout */}
            {!isCardExpanded ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
                
                {/* Card 1: Clinical Practice (Lab Scientist with Bar Chart) */}
                <div className="lg:col-span-4 rounded-3xl overflow-hidden relative group min-h-[340px] sm:min-h-[380px] shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src="/images/card1-clinical.jpg"
                    alt="Clinical practice"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Frosted Glass Bar Chart Overlay Widget */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-white" />
                        <span className="text-xs font-semibold tracking-tight">Clinical practice</span>
                      </div>
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/40 cursor-pointer transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bar Chart Bars with Axis Labels */}
                    <div className="flex items-end gap-2 h-20 pt-2">
                      <div className="flex flex-col justify-between text-[9px] font-mono text-white/80 pr-1 h-full select-none">
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
                              setActiveBarChartHover(i);
                              playBlip(600 + i * 40);
                            }}
                            onMouseLeave={() => setActiveBarChartHover(null)}
                            style={{ height: `${h}%` }}
                            className={`flex-1 rounded-md transition-all duration-300 cursor-pointer ${
                              activeBarChartHover === i
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

                {/* Card 2: 3D Holographic Spine on Chair */}
                <div className="lg:col-span-3 rounded-3xl overflow-hidden relative group min-h-[340px] sm:min-h-[380px] bg-[#ecebe9] shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src="/images/card2-spine.jpg"
                    alt="Biomechanical holographic spine"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-slate-700">
                    Spinal Biomechanics
                  </div>
                </div>

                {/* Card 3: Serene Meditation & Neural Recovery (EXPANDABLE!) */}
                <div
                  onClick={handleCard3Click}
                  className="lg:col-span-3 rounded-3xl overflow-hidden relative group min-h-[340px] sm:min-h-[380px] cursor-pointer shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-[#ea8d53]/40"
                >
                  <img
                    src="/images/card3-meditation.jpg"
                    alt="Cellular and neural relaxation"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Circular Audio / Radar Indicators */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full border-2 border-white/60 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-white animate-ping" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#ea8d53] shadow-md flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Hover prompt pill */}
                  <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to Expand
                  </div>
                </div>

                {/* Card 4: Diagnostic Perception (Face Behind Fluted Glass) */}
                <div 
                  onClick={() => {
                    setIsPlayingVideo(true);
                    playBlip(880);
                  }}
                  className="lg:col-span-2 rounded-3xl overflow-hidden relative group min-h-[340px] sm:min-h-[380px] bg-[#d9dcd6] cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src="/images/card4-glass.jpg"
                    alt="Facial and diagnostic perception"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Take A Look Button matching video */}
                  <div className="absolute bottom-5 left-4 right-4">
                    <button className="w-full py-2 px-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-slate-800 text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-md hover:bg-white/50 transition-colors">
                      <Play className="w-3 h-3 fill-slate-800 stroke-none" />
                      <span>Take a look</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* Expanded Card 3 Cinema View (Matching frame_005.png of video) */
              <div className="w-full rounded-3xl overflow-hidden relative min-h-[500px] sm:min-h-[580px] bg-[#ebdccc] shadow-2xl animate-fade-in flex items-center justify-center">
                {/* Background Video / High-Res Image */}
                <img
                  src="/images/expanded-meditation-hero.jpg"
                  alt="Artificial Intelligence Future Healtech"
                  className="w-full h-full object-cover object-center absolute inset-0"
                />

                {/* Close / Shrink Button */}
                <button
                  onClick={handleCard3Click}
                  className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all shadow-xl"
                  title="Collapse to Gallery"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Large Editorial Condensed Typography overlay */}
                <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-12 pointer-events-none z-10">
                  <div className="font-condensed text-5xl sm:text-7xl lg:text-9xl font-black text-slate-950 tracking-tight max-w-xs sm:max-w-md leading-none">
                    ARTIFICIAL<br />INTELLIGENCE
                  </div>

                  <div className="font-condensed text-5xl sm:text-7xl lg:text-9xl font-black text-slate-950 tracking-tight max-w-xs sm:max-w-md leading-none text-right">
                    FUTURE<br />HEALTECH
                  </div>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-slate-950/80 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-mono flex items-center gap-2 cursor-pointer shadow-xl"
                  onClick={handleCard3Click}
                >
                  <span>Click to return to gallery</span>
                  <X className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

          </div>

          {/* Bottom Metrics Bar (Matching video frame_001.png) */}
          <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left Bento Icon & 3 Key Metrics */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-14">
              {/* 4-Square Bento Icon */}
              <div className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer">
                <LayoutGrid className="w-4 h-4" />
              </div>

              {/* Metric 1 */}
              <div>
                <div className="font-display font-extrabold text-2xl text-slate-950 tracking-tight">
                  48+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Patients Assisted
                </div>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="font-display font-extrabold text-2xl text-slate-950 tracking-tight">
                  85%
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Diagnostic Accuracy
                </div>
              </div>

              {/* Metric 3 */}
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
              <div className="h-9 w-auto">
                <img
                  src="/images/avatar-stack.jpg"
                  alt="Doctors and clinicians"
                  className="h-9 w-auto rounded-full object-cover shadow-sm"
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

        </div>

      </div>

      {/* Video Modal if Card 4 'Take a Look' is clicked */}
      {isPlayingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 max-w-2xl w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Continuous Telemetry Video Stream
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

    </section>
  );
};
