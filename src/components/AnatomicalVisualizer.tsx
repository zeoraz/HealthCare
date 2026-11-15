import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Play, 
  Pause, 
  Maximize2, 
  Sparkles, 
  Zap, 
  Palette,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';
import { playHeartbeatBeep, playBlip } from '../utils/audio';

export type ColorFilter = 'emerald' | 'cyan' | 'amethyst' | 'original';

interface AnatomicalVisualizerProps {
  modelType: 'heart' | 'body';
  onModelChange: (type: 'heart' | 'body') => void;
  bpm?: number;
}

export const AnatomicalVisualizer: React.FC<AnatomicalVisualizerProps> = ({
  modelType,
  onModelChange,
  bpm = 74,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [colorFilter, setColorFilter] = useState<ColorFilter>('emerald');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [soundActive, setSoundActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Video paths
  const videoSrc = modelType === 'heart' 
    ? '/videos/clean-heart-loop.mp4' 
    : '/videos/clean-body-loop.mp4';

  const posterSrc = modelType === 'heart'
    ? '/images/heart-clean.jpg'
    : '/images/body-clean.jpg';

  // Toggle video playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    playBlip(800);
  };

  // Heartbeat sound loop when active
  useEffect(() => {
    if (!soundActive) return;
    const interval = (60 / bpm) * 1000;
    const timer = setInterval(() => {
      playHeartbeatBeep(modelType === 'heart' ? 840 : 720, 0.07);
    }, interval);
    return () => clearInterval(timer);
  }, [soundActive, bpm, modelType]);

  // CSS filter string for live color changes on the real video!
  const getFilterStyle = (): React.CSSProperties => {
    switch (colorFilter) {
      case 'emerald':
        // Transforms the red circulatory/heart veins into glorious neon emerald
        return {
          filter: 'hue-rotate(105deg) saturate(1.4) contrast(1.12) brightness(0.98)',
        };
      case 'cyan':
        // Transforms into deep cyber cyan/teal
        return {
          filter: 'hue-rotate(165deg) saturate(1.5) contrast(1.15) brightness(1.02)',
        };
      case 'amethyst':
        // Transforms into royal purple/amethyst plasma
        return {
          filter: 'hue-rotate(245deg) saturate(1.6) contrast(1.18) brightness(1.0)',
        };
      case 'original':
      default:
        // Authentic pristine high-contrast video from source
        return {
          filter: 'contrast(1.05) brightness(1.0)',
        };
    }
  };

  return (
    <div className="relative w-full h-[480px] md:h-[580px] lg:h-[620px] rounded-3xl overflow-hidden glass-panel border border-emerald-500/30 group select-none shadow-2xl bg-slate-950 flex items-center justify-center">
      
      {/* Background radial glow */}
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none -z-10 ${
        colorFilter === 'emerald' ? 'bg-gradient-to-tr from-emerald-500/15 via-teal-500/5 to-transparent' :
        colorFilter === 'cyan' ? 'bg-gradient-to-tr from-cyan-500/15 via-sky-500/5 to-transparent' :
        colorFilter === 'amethyst' ? 'bg-gradient-to-tr from-purple-500/15 via-pink-500/5 to-transparent' :
        'bg-gradient-to-tr from-red-500/15 via-orange-500/5 to-transparent'
      }`} />

      {/* Real High-Definition Anatomical Video Player */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          style={getFilterStyle()}
          className="w-full h-full object-contain transition-all duration-500 scale-[1.05] group-hover:scale-[1.08]"
        />

        {/* Ambient Vignette Overlay for smooth blending into dark card */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/40 pointer-events-none" />
      </div>

      {/* Top Model Switcher: [ 3D Cardiac Core ] [ Full-Body Bio-Grid ] */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl">
        <button
          onClick={() => {
            onModelChange('heart');
            playBlip(880);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
            modelType === 'heart'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/25 font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>3D Cardiac Core</span>
        </button>

        <button
          onClick={() => {
            onModelChange('body');
            playBlip(920);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
            modelType === 'body'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/25 font-bold'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Full-Body Bio-Grid</span>
        </button>
      </div>

      {/* Top Right: Live Pulse Rate Pill */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-emerald-500/30 shadow-lg">
        <Zap className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
        <div className="font-mono text-xs">
          <span className="text-white font-bold">{bpm}</span>
          <span className="text-slate-400 ml-1 text-[11px]">BPM SYNCED</span>
        </div>
      </div>

      {/* Floating Hotspots Matching Video Layout */}
      {modelType === 'heart' ? (
        <>
          {/* Hotspot 1: Biomarker Analysis / Aortic Arch */}
          <div className="absolute top-1/4 right-5 sm:right-8 z-20 animate-float-slow">
            <div
              onClick={() => {
                setActiveHotspot(activeHotspot === 'aorta' ? null : 'aorta');
                playBlip(820);
              }}
              className="cursor-pointer bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-3.5 shadow-2xl hover:border-emerald-400 hover:scale-105 transition-all max-w-[210px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Biomarker Analysis
                </span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight">Real-time data insights</div>
              <div className="text-[11px] text-slate-400 mt-0.5">120/80 mmHg systolic arterial flow</div>
              {activeHotspot === 'aorta' && (
                <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-emerald-300 font-mono leading-relaxed">
                  Coronary perfusion coefficient: 98.4% (Optimal)
                </div>
              )}
            </div>
          </div>

          {/* Hotspot 2: Health Dashboard / Left Ventricle */}
          <div className="absolute bottom-16 right-5 sm:right-10 z-20">
            <div
              onClick={() => {
                setActiveHotspot(activeHotspot === 'ventricle' ? null : 'ventricle');
                playBlip(850);
              }}
              className="cursor-pointer bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-3.5 shadow-2xl hover:border-cyan-400 hover:scale-105 transition-all max-w-[210px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Health Dashboard
                </span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight">Track trends with confidence</div>
              <div className="text-[11px] text-slate-400 mt-0.5">64% Left Ventricular Ejection</div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Hotspot 1: Neural Plexus */}
          <div className="absolute top-24 left-6 z-20 animate-float-slow">
            <div className="bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-3.5 shadow-2xl max-w-[210px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Neural Plexus
                </span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight">Vagal Autonomic Rhythm</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Systemic balance synchronized</div>
            </div>
          </div>

          {/* Hotspot 2: Systemic Metabolic Matrix */}
          <div className="absolute bottom-16 right-8 z-20">
            <div className="bg-slate-900/90 backdrop-blur-md border border-teal-500/30 rounded-2xl p-3.5 shadow-2xl max-w-[210px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Metabolic Grid
                </span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight">84 Biomarkers Online</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Continuous capillary telemetry</div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Floating Control Bar: Video Play/Pause + Color Filter Switcher */}
      <div className="absolute bottom-5 left-5 z-20 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 text-slate-300 text-xs shadow-2xl">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Pause 3D Video' : 'Play 3D Video'}
          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4 text-emerald-400 fill-current" />}
        </button>

        {/* Audio Heartbeat SFX */}
        <button
          onClick={() => {
            setSoundActive(!soundActive);
            playBlip(750);
          }}
          title={soundActive ? 'Mute Cardiac Sound' : 'Play Synchronized Cardiac Sound'}
          className={`p-1.5 rounded-xl transition-colors ${soundActive ? 'bg-emerald-500/20 text-emerald-300' : 'hover:bg-white/5 text-slate-400'}`}
        >
          {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <span className="w-px h-3.5 bg-white/10 mx-0.5" />

        {/* Real-time Color Filter Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setColorFilter('emerald');
              playBlip(880);
            }}
            title="Bio-Emerald Glow"
            className={`w-5 h-5 rounded-full bg-emerald-400 border transition-all ${
              colorFilter === 'emerald' ? 'scale-125 ring-2 ring-emerald-400 border-white' : 'opacity-60 hover:opacity-100 border-transparent'
            }`}
          />
          <button
            onClick={() => {
              setColorFilter('cyan');
              playBlip(920);
            }}
            title="Cyber Cyan Glow"
            className={`w-5 h-5 rounded-full bg-cyan-400 border transition-all ${
              colorFilter === 'cyan' ? 'scale-125 ring-2 ring-cyan-400 border-white' : 'opacity-60 hover:opacity-100 border-transparent'
            }`}
          />
          <button
            onClick={() => {
              setColorFilter('amethyst');
              playBlip(960);
            }}
            title="Amethyst Plasma Glow"
            className={`w-5 h-5 rounded-full bg-purple-400 border transition-all ${
              colorFilter === 'amethyst' ? 'scale-125 ring-2 ring-purple-400 border-white' : 'opacity-60 hover:opacity-100 border-transparent'
            }`}
          />
          <button
            onClick={() => {
              setColorFilter('original');
              playBlip(780);
            }}
            title="Original Crimson Luminescence"
            className={`w-5 h-5 rounded-full bg-rose-500 border transition-all ${
              colorFilter === 'original' ? 'scale-125 ring-2 ring-rose-500 border-white' : 'opacity-60 hover:opacity-100 border-transparent'
            }`}
          />
        </div>

        <span className="w-px h-3.5 bg-white/10 mx-0.5 hidden sm:inline" />

        <span className="font-mono text-[10px] text-slate-400 hidden sm:inline">
          Real 3D Video Loop (60 FPS)
        </span>
      </div>

    </div>
  );
};
