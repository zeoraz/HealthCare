import React from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  ShieldCheck 
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';
import { playBlip } from '../utils/audio';

interface FooterProps {
  onScrollToDashboard: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onScrollToDashboard
}) => {
  return (
    <footer className="relative border-t border-white/10 pt-20 pb-12 overflow-hidden bg-slate-950">
      
      {/* Bottom CTA Banner (Matching Video's End Section) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <div className="relative glass-panel rounded-3xl p-8 sm:p-14 border border-emerald-500/30 shadow-2xl overflow-hidden">
          
          {/* Real Ambient Bio-Visual Backdrop */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <img 
              src="/images/bento-ai-cell.jpg" 
              alt="Neural medical network" 
              className="w-full h-full object-cover mix-blend-screen filter hue-rotate-90 scale-125"
            />
          </div>

          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-emerald-500/20 blur-3xl pointer-events-none" />

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight relative z-10">
            Your Health Data, Decoded by AI
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed relative z-10">
            Vitalis helps you track, understand, and act on your bloodwork — with smart AI insights, continuous telemetry, and clean clinical dashboards.
          </p>

          {/* Centered Split Pill Button */}
          <div className="mt-8 flex justify-center">
            <div 
              onClick={() => {
                playBlip(950);
                onScrollToDashboard();
              }}
              className="group cursor-pointer inline-flex items-center bg-white text-slate-950 font-bold rounded-full p-1 pl-6 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.03]"
            >
              <span className="text-sm font-display tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors mr-4">
                See Dashboard
              </span>
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-md group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
          
          {/* Left: Brand & Legal */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2.5 select-none">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-md">
                <Activity className="w-4 h-4 font-black" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-white">
                vitalis
              </span>
            </a>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Empowering individuals and clinicians with proactive biomarker monitoring, real-time telemetry, and natural language clinical intelligence.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-2">
              <span>© Vitalis AI 2026</span>
              <span>•</span>
              <span>All rights reserved</span>
              <span>•</span>
              <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of service</a>
            </div>
          </div>

          {/* Middle: Links matching video structure */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-4">
              Navigation Links
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 text-sm text-slate-300">
              <a href="#about" onClick={() => playBlip(700)} className="hover:text-emerald-400 transition-colors">
                About us
              </a>
              <a href="#how-it-works" onClick={() => playBlip(700)} className="hover:text-emerald-400 transition-colors">
                How it works
              </a>
              <a href="#services" onClick={() => playBlip(700)} className="hover:text-emerald-400 transition-colors">
                Services
              </a>
              <a href="#download" onClick={() => playBlip(700)} className="hover:text-emerald-400 transition-colors">
                Download App
              </a>
              <a href="#dashboard" onClick={() => playBlip(700)} className="hover:text-emerald-400 transition-colors">
                Clinician Hub
              </a>
              <a href="#decoder" onClick={() => playBlip(700)} className="hover:text-emerald-400 transition-colors">
                AI Lab Decoder
              </a>
            </div>
          </div>

          {/* Right: Social & Regulatory */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Social & Community
            </h4>
            <div className="flex items-center gap-3 text-slate-400">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors"
                title="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-500 leading-relaxed">
              Medical Disclaimer: Vitalis provides analytical tools and AI synthesis for educational and clinical decision support. Not a standalone replacement for acute medical emergencies.
            </div>
          </div>

        </div>

        {/* Bottom micro note */}
        <div className="pt-6 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FDA 510(k) Exempt Clinical Software Class II</span>
          </div>
          <div>
            Built with modern WebGL, React & Precision Clinical AI
          </div>
        </div>
      </div>
    </footer>
  );
};
