import React, { useState } from 'react';
import { DollarSign, Clock, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playBlip } from '../utils/audio';

interface RoiCalculatorProps {
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBooking }) => {
  const [clinicians, setClinicians] = useState(3);
  const [patientsPerDay, setPatientsPerDay] = useState(18);

  // Financial Calculations
  // Avg time saved per patient note: 12 minutes (0.2 hrs)
  // Monthly working days: 22
  const hoursSavedPerDoc = Math.round(patientsPerDay * 0.2 * 22);
  const totalHoursSaved = hoursSavedPerDoc * clinicians;

  // Additional billable visits unlocked (approx 1.5 extra visits/day per doc)
  const extraVisitsPerMonth = Math.round(1.5 * 22 * clinicians);
  // Avg reimbursement per outpatient visit: $120
  const additionalRevenue = extraVisitsPerMonth * 120;

  // Software cost: $249 / doc / month
  const softwareCost = clinicians * 249;
  const netProfitUnlocked = additionalRevenue - softwareCost;
  const roiPercentage = Math.round((netProfitUnlocked / softwareCost) * 100);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm font-sans">
      
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Practice Economics
            </span>
          </div>
          <h3 className="font-display font-extrabold text-3xl text-slate-950 tracking-tight">
            Calculate Your Clinic's Revenue & Time ROI
          </h3>
        </div>
        <p className="text-sm text-slate-500 max-w-md font-normal leading-relaxed">
          See the tangible financial impact of automating documentation, lab triaging, and optical intake.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Sliders */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Slider 1: Clinicians */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#ea8d53]" />
                <span>Full-Time Clinicians</span>
              </label>
              <span className="font-display font-extrabold text-xl text-slate-950 px-3 py-1 rounded-xl bg-slate-100 font-mono">
                {clinicians} {clinicians === 1 ? 'doctor' : 'doctors'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={clinicians}
              onChange={(e) => {
                setClinicians(parseInt(e.target.value));
                playBlip(700 + parseInt(e.target.value) * 15);
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ea8d53]"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
              <span>1 Solo Practice</span>
              <span>12 Group Practice</span>
              <span>25+ Specialty Network</span>
            </div>
          </div>

          {/* Slider 2: Patients Seen Per Day */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ea8d53]" />
                <span>Patients Seen Daily (Per Clinician)</span>
              </label>
              <span className="font-display font-extrabold text-xl text-slate-950 px-3 py-1 rounded-xl bg-slate-100 font-mono">
                {patientsPerDay} / day
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="35"
              value={patientsPerDay}
              onChange={(e) => {
                setPatientsPerDay(parseInt(e.target.value));
                playBlip(650 + parseInt(e.target.value) * 15);
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ea8d53]"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
              <span>8 Specialized</span>
              <span>20 Typical Outpatient</span>
              <span>35 High-Volume Urgent Care</span>
            </div>
          </div>

          {/* Feature Guarantees */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full HIPAA, SOC2 Type II and HITECH certified encryption.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bidirectional export to Epic, Cerner, Athena, and PDF.</span>
            </div>
          </div>

        </div>

        {/* Right Output ROI Cards */}
        <div className="lg:col-span-6 rounded-3xl bg-slate-950 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#ea8d53] mb-2">
            PROJECTED MONTHLY VALUE
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Time Reclaimed</div>
              <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                {totalHoursSaved} <span className="text-sm font-normal text-slate-400">hrs/mo</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">~{hoursSavedPerDoc} hrs per physician</div>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Extra Revenue Capacity</div>
              <div className="font-display font-black text-3xl sm:text-4xl text-emerald-400 tracking-tight">
                +${additionalRevenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">+{extraVisitsPerMonth} patient consults</div>
            </div>
          </div>

          {/* Net ROI Summary Box */}
          <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-300">Software Investment</div>
              <div className="font-mono text-lg font-bold text-white">${softwareCost}/mo</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#ea8d53] font-bold uppercase font-mono">Net Practice ROI</div>
              <div className="font-display font-black text-2xl text-emerald-400">
                {roiPercentage}%
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => {
              playBlip(950);
              onOpenBooking();
            }}
            className="w-full py-3.5 px-6 rounded-full bg-[#ea8d53] hover:bg-[#d87b40] text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Start 14-Day Free Clinic Trial</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </button>

        </div>

      </div>

    </div>
  );
};
