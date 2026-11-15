import React, { useState } from 'react';
import { 
  Activity, 
  Volume2, 
  VolumeX, 
  Palette, 
  Menu, 
  X, 
  ArrowUpRight
} from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { useTheme, type ThemeMode } from '../context/ThemeContext';
import { playBlip, setSoundEnabled } from '../utils/audio';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { theme, setTheme, isSoundOn, setIsSoundOn } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = !isSoundOn;
    setIsSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) playBlip(980);
  };

  const selectTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setThemeMenuOpen(false);
    playBlip(1040);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <nav className="max-w-7xl mx-auto glass-panel rounded-full px-5 py-3 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={() => playBlip(880)}
          className="flex items-center gap-2.5 group select-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-slate-950 font-black animate-pulse" />
            <div className="absolute -inset-0.5 rounded-xl bg-emerald-400/30 blur-sm -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                vitalis
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                AI 3.0
              </span>
            </div>
          </div>
        </a>

        {/* Center Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#about" onClick={() => playBlip(750)} className="hover:text-emerald-400 transition-colors">
            About us
          </a>
          <a href="#services" onClick={() => playBlip(750)} className="hover:text-emerald-400 transition-colors">
            Services
          </a>
          <a href="#how-it-works" onClick={() => playBlip(750)} className="hover:text-emerald-400 transition-colors">
            How it works
          </a>
          <a href="#dashboard" onClick={() => playBlip(750)} className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            Clinician Hub
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </a>
          <a href="#decoder" onClick={() => playBlip(750)} className="hover:text-emerald-400 transition-colors">
            AI Lab Decoder
          </a>
          <a href="#download" onClick={() => playBlip(750)} className="hover:text-emerald-400 transition-colors">
            Download App
          </a>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Social Links matching video */}
          <div className="hidden lg:flex items-center gap-2 text-slate-400 mr-1">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
              title="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Audio Telemetry Toggle */}
          <button
            onClick={toggleSound}
            title={isSoundOn ? 'Mute Medical Telemetry SFX' : 'Enable Medical Telemetry SFX'}
            className={`p-2 rounded-xl text-xs font-mono transition-all border ${
              isSoundOn 
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-sm shadow-emerald-500/20' 
                : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Palette Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeMenuOpen(!themeMenuOpen);
                playBlip(800);
              }}
              title="Switch Color Theme"
              className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
            >
              <Palette className="w-4 h-4 text-emerald-400" />
            </button>

            {themeMenuOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-2 shadow-2xl z-50">
                <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10 font-bold">
                  Select Theme Palette
                </div>
                <button
                  onClick={() => selectTheme('emerald')}
                  className={`w-full flex items-center justify-between px-3 py-2 mt-1 rounded-xl text-xs font-semibold transition-all ${
                    theme === 'emerald' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white/20 shadow-sm" />
                    <span>Neo-Obsidian Emerald</span>
                  </div>
                  {theme === 'emerald' && <span className="text-[10px] font-mono">Active</span>}
                </button>
                <button
                  onClick={() => selectTheme('pearl')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    theme === 'pearl' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-400 border border-white/20 shadow-sm" />
                    <span>Clinical Pearl (Light)</span>
                  </div>
                  {theme === 'pearl' && <span className="text-[10px] font-mono">Active</span>}
                </button>
                <button
                  onClick={() => selectTheme('amethyst')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    theme === 'amethyst' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 border border-white/20 shadow-sm" />
                    <span>Cyber Amethyst</span>
                  </div>
                  {theme === 'amethyst' && <span className="text-[10px] font-mono">Active</span>}
                </button>
              </div>
            )}
          </div>

          {/* Contact Us / Book Demo Button (Matching Video's Pill Button) */}
          <button
            onClick={() => {
              playBlip(1000);
              onOpenBooking();
            }}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <span>Contact Us</span>
            <div className="w-5 h-5 rounded-full bg-slate-950/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-3xl p-6 border border-emerald-500/30 shadow-2xl flex flex-col gap-4 text-sm font-medium">
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-slate-200 border-b border-white/5"
          >
            About us
          </a>
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-slate-200 border-b border-white/5"
          >
            Services
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-slate-200 border-b border-white/5"
          >
            How it works
          </a>
          <a 
            href="#dashboard" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-emerald-400 border-b border-white/5 font-semibold"
          >
            Clinician Hub
          </a>
          <a 
            href="#decoder" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-slate-200 border-b border-white/5"
          >
            AI Lab Decoder
          </a>
          <a 
            href="#download" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-slate-200"
          >
            Download App
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider text-center"
          >
            Schedule Consultation
          </button>
        </div>
      )}
    </header>
  );
};
