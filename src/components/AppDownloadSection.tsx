import React from 'react';
import { 
  Smartphone, 
  Apple, 
  QrCode, 
  Check, 
  Sparkles, 
  Bell, 
  ShieldCheck, 
  Activity, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { playBlip } from '../utils/audio';

export const AppDownloadSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="download">
      {/* Background radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Health Companion</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Your biomarkers, bloodwork, and telemetry in your pocket.
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Connect your wearable monitors, sync Quest & LabCorp lab panels in one tap, and receive autonomous health alerts the moment your metrics drift.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Instant Apple Health & Oura Sync</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Real-time CGM Glucose Alerts</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Encrypted Doctor Messaging</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Biometric Fingerprint Vault</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => playBlip(900)}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-bold hover:bg-emerald-300 transition-all shadow-xl hover:scale-[1.02]"
                >
                  <Apple className="w-6 h-6 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-mono tracking-wider opacity-70 leading-none">
                      Download on the
                    </div>
                    <div className="text-sm font-display tracking-tight leading-tight">Apple App Store</div>
                  </div>
                </button>

                <button
                  onClick={() => playBlip(920)}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-900 border border-white/20 text-white font-bold hover:border-emerald-400 transition-all shadow-xl hover:scale-[1.02]"
                >
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 leading-none">
                      Get it on
                    </div>
                    <div className="text-sm font-display tracking-tight leading-tight">Google Play</div>
                  </div>
                </button>
              </div>

            </div>

            {/* Right: Modern Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 h-[520px] rounded-[48px] p-3 bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 shadow-2xl border-4 border-slate-700">
                
                {/* Inner Screen */}
                <div className="w-full h-full rounded-[40px] bg-slate-950 overflow-hidden relative flex flex-col justify-between p-5 border border-white/10">
                  
                  {/* Phone Notch */}
                  <div className="w-28 h-5 bg-slate-900 rounded-full mx-auto mb-4 border border-white/10" />

                  {/* App Screen Content */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400 font-mono">Good Morning</div>
                        <div className="font-bold text-white text-sm">Charles Robbie</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        94%
                      </div>
                    </div>

                    {/* Vitals Summary Card */}
                    <div className="bg-gradient-to-tr from-emerald-950/60 to-slate-900 rounded-2xl p-4 border border-emerald-500/30">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-emerald-400 font-mono text-[10px] font-bold">RECOVERY SCORE</span>
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="font-display font-extrabold text-3xl text-white">92 / 100</div>
                      <div className="text-[10px] text-slate-400 mt-1">HRV at 62ms (+8ms baseline)</div>
                    </div>

                    {/* Notification Pill in Phone */}
                    <div className="bg-slate-900/80 rounded-2xl p-3 border border-white/10 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="text-[11px] leading-tight">
                        <div className="font-bold text-white">LabCorp Results In</div>
                        <div className="text-slate-400">Fasting lipid panel verified</div>
                      </div>
                    </div>

                    {/* Mini Sparkline */}
                    <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/5">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
                        <span>Resting HR Trend</span>
                        <span className="text-emerald-400">54 bpm</span>
                      </div>
                      <div className="h-10 flex items-end gap-1.5">
                        {[40, 55, 60, 48, 70, 52, 65, 58, 75, 62].map((val, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${val}%` }} 
                            className="flex-1 rounded-t bg-emerald-400/40 hover:bg-emerald-400 transition-colors" 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phone Bottom Home Bar */}
                  <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-4" />

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
