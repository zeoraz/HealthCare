import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Stethoscope, 
  FileText, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight,
  Download,
  Video
} from 'lucide-react';
import { playBlip } from '../utils/audio';
import { InteractiveDiagnosticStudio } from './InteractiveDiagnosticStudio';
import { RoiCalculator } from './RoiCalculator';

interface CleanSectionsProps {
  onOpenBooking: () => void;
}

export const CleanSections: React.FC<CleanSectionsProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-[#fcfbfa] text-slate-900 font-sans">
      
      {/* 1. Technology Section */}
      <section id="technology" className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-20 border-t border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ea8d53]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                Foundational Architecture
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
              Next-Generation Clinical AI Intelligence
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md font-normal leading-relaxed">
            Multi-modal medical neural models fine-tuned on peer-reviewed clinical telemetry, delivering sub-second diagnostic assistance.
          </p>
        </div>

        {/* 3 Architecture Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Tech Card 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#fdeee4] text-[#ea8d53] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="text-xs font-mono font-bold text-slate-400 mb-2">01 / ARCHITECTURE</div>
            <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
              Multi-Modal Medical LLM
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              Directly digests pathology imagery, continuous ECG waveforms, lab panels, and clinician voice dictation into unified semantic vectors.
            </p>
          </div>

          {/* Tech Card 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="text-xs font-mono font-bold text-slate-400 mb-2">02 / COMPLIANCE</div>
            <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
              Zero-Retention Privacy
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              Fully HIPAA, GDPR, and SOC2 Type II certified. Real-time token de-identification ensures protected health information never leaks.
            </p>
          </div>

          {/* Tech Card 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="text-xs font-mono font-bold text-slate-400 mb-2">03 / PRECISION</div>
            <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
              85%+ Diagnostic Accuracy
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              Validated against double-blind multi-specialty clinical benchmarks, reducing diagnostic oversight in emergency and acute care settings.
            </p>
          </div>
        </div>

        {/* Live Interactive Product Diagnostic Studio */}
        <InteractiveDiagnosticStudio />
      </section>

      {/* 2. Healthcare Section */}
      <section id="healthcare" className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-20 border-t border-slate-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ea8d53]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                Clinical Workflow
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight leading-tight mb-6">
              Built with Clinicians, Designed for Care
            </h2>
            <p className="text-sm text-slate-500 font-normal leading-relaxed mb-8">
              Physicians spend up to 4.5 hours per day on electronic health record documentation. AI Healthcare automates ambient chart generation so doctors can focus directly on patients.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#ea8d53] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-slate-900">Ambient Clinical Scribe</div>
                  <div className="text-xs text-slate-500">Auto-generates structured SOAP notes in real-time during consultations.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#ea8d53] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-slate-900">Differential Diagnosis Ranking</div>
                  <div className="text-xs text-slate-500">Surfaces prioritized probabilities with cited peer-reviewed literature.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#ea8d53] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-slate-900">Drug Interaction Alerting</div>
                  <div className="text-xs text-slate-500">Continuous contraindication checks against live patient medication profiles.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-3xl text-slate-950 tracking-tight mb-1">
                18+ hrs
              </div>
              <div className="text-xs font-semibold text-slate-700 mb-2">Saved Weekly Per Clinician</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Replaces tedious clerical data entry with automated EHR field population.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#fdeee4] flex items-center justify-center text-[#ea8d53] mb-4">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-3xl text-slate-950 tracking-tight mb-1">
                48,000+
              </div>
              <div className="text-xs font-semibold text-slate-700 mb-2">Patients Assisted</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Deployed across leading university medical centers, regional clinics, and ICUs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm sm:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">Longitudinal Health Predictor</div>
                    <div className="text-xs text-slate-500">800+ behavior patterns tracked for preventative intervention</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                  99.2% Uptake
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Correlates biomechanics, sleep telemetry, and vital sign trends to flag early cardiac, respiratory, and neurological drift days before acute symptoms emerge.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Solutions Section with Interactive Practice ROI Calculator */}
      <section id="solutions" className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-20 border-t border-slate-200/80">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ea8d53]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              Enterprise Integration
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
            Tailored Solutions Across Healthcare Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
                Hospitals & Health Networks
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                Seamless bidirectional integration with Epic, Cerner, Meditech, and AthenaHealth via standard FHIR APIs.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-6">
              <li>✓ Enterprise Single Sign-On (SSO)</li>
              <li>✓ Role-based access control (RBAC)</li>
              <li>✓ Custom on-premise inference options</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border-2 border-slate-950 shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3 right-8 bg-slate-950 text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fdeee4] flex items-center justify-center text-[#ea8d53] mb-6">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
                Specialty & Private Practices
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                Rapid 10-minute setup for independent medical groups, cardiology clinics, orthopedic centers, and primary care.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-6">
              <li>✓ Zero IT infrastructure required</li>
              <li>✓ Instant audio ambient scribe</li>
              <li>✓ Automated billing and ICD-10 coding</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">
                Telehealth & Remote Care
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                Continuous patient vitals monitoring with automated threshold alerts and video consult transcription.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-6">
              <li>✓ Wearable device sync (Apple Health, Garmin)</li>
              <li>✓ 24/7 autonomous triage assistant</li>
              <li>✓ Emergency clinical dispatch triggers</li>
            </ul>
          </div>
        </div>

        {/* Live ROI Calculator */}
        <RoiCalculator onOpenBooking={onOpenBooking} />
      </section>

      {/* 4. Application Section */}
      <section id="application" className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-20 border-t border-slate-200/80">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-14 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-[#fdeee4] text-[#ea8d53] text-[11px] font-bold uppercase tracking-wider font-mono">
                MOBILE & DESKTOP
              </span>
              <span className="text-xs font-medium text-slate-500">
                Universal Availability
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-6 leading-tight">
              AI Healthcare Companion In Your Pocket
            </h2>

            <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed mb-8">
              Designed for clinicians on the move and patients managing complex recovery. Review patient briefs, record voice notes, and receive critical telemetry alerts anytime.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  playBlip(850);
                  onOpenBooking();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download for iOS & Android</span>
              </button>

              <button
                onClick={() => {
                  playBlip(900);
                  onOpenBooking();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs tracking-wide transition-all"
              >
                <span>Request Provider Access</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="/videos/zeoraz-instagram-reel.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#fdeee4] hover:bg-[#fadbc8] text-[#ea8d53] border border-[#ea8d53]/30 font-semibold text-xs tracking-wide transition-all shadow-sm"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Watch Reel (1080x1920 MP4)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Modern Footer */}
      <footer className="border-t border-slate-200/80 bg-[#fcfbfa] py-14">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-[#fcfbfa] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
              </div>
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-slate-950">
              AI Healthcare
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500 font-normal">
              AI Intelligence Layer For Modern Healthcare
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
            <a href="#technology" className="hover:text-slate-950 transition-colors">Technology</a>
            <a href="#healthcare" className="hover:text-slate-950 transition-colors">Healthcare</a>
            <a href="#solutions" className="hover:text-slate-950 transition-colors">Solutions</a>
            <a href="#application" className="hover:text-slate-950 transition-colors">Application</a>
          </div>

          {/* Status & Legal */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-600 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <span>·</span>
            <span>© 2026 AI Healthcare, Inc.</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
