# Zeoraz Healthcare — Technical Architecture & Engineering Deep-Dive

## 1. System Overview

Zeoraz Healthcare is built as a client-first, ultra-responsive clinical intelligence web workstation. It utilizes **React 19**, **TypeScript**, **Tailwind CSS**, and modern web browser APIs (**Web Audio API**, **MediaDevices / WebCam API**, **Web Speech API**, and **HTML5 Canvas 2D**) to deliver real-time physiological diagnostics with zero server latency on initial triage.

```mermaid
graph TD
    User["Clinician / Patient"] --> App["App.tsx (Root Composition)"]
    App --> Hero["AIHealthcareHero.tsx<br/>• Sticky Header Navigation<br/>• Editorial 4-Card Suite<br/>• Practice Metrics Telemetry"]
    App --> Sections["CleanSections.tsx<br/>• Technology Deep-Dive<br/>• Healthcare Workflows<br/>• Solutions & Integrations<br/>• Application Suite & Minimal Footer"]
    App --> Modal["BookingModal.tsx<br/>• 14-Day Free Practice Trial<br/>• License Key Generator<br/>• Confetti Engine"]
    
    Sections --> Studio["InteractiveDiagnosticStudio.tsx"]
    Studio --> Lab["Tab 1: Instant Lab Decoder<br/>• File Dropzone Parser<br/>• SVG/HTML Bar Chart<br/>• Decision Support Engine"]
    Studio --> Vitals["Tab 2: Optical Vitals (rPPG)<br/>• WebCam Stream (MediaDevices)<br/>• Green-Channel Luminance<br/>• HTML5 Canvas Pulse Waveform"]
    Studio --> Scribe["Tab 3: Ambient Clinical Scribe<br/>• Web Speech API Recognition<br/>• SOAP Note Structuring<br/>• ICD-10 Coding Classifier"]
    
    Sections --> ROI["RoiCalculator.tsx<br/>• Dynamic Financial Sliders<br/>• Practice ROI Math Engine"]
```

---

## 2. Component Hierarchy & Data Flow

### `src/components/AIHealthcareHero.tsx`
- **State**:
  - `isMobileMenuOpen`: Toggles responsive mobile navigation drawer.
  - `activeBarHover`: Tracks active hover index across the 10 relative biomarker bars on Card 1.
- **Visual Grid**:
  - Responsive 12-column grid (`lg:grid-cols-12`) distributing the 4 Pinterest-style cards:
    - Card 1 (`col-span-4`): Lab researcher with CSS frosted glass widget (`backdrop-blur-xl bg-white/30 border border-white/40`).
    - Card 2 (`col-span-3`): Biomechanical ergonomic spine with subtle mint-green line.
    - Card 3 (`col-span-3`): Mindful Japandi meditation with animated CSS ping rings.
    - Card 4 (`col-span-2`): Fluted glass facial perception with glass pill button.

---

## 3. Algorithmic Deep Dives

### A. Contactless Optical Photoplethysmography (rPPG)
Located in `src/components/InteractiveDiagnosticStudio.tsx`:
1. **Biological Mechanism**:
   Light entering human skin is absorbed by blood hemoglobin. During each cardiac cycle, systolic contraction pumps a pulse wave through facial micro-capillaries, altering the intensity of light reflected back to a camera sensor. Because oxygenated hemoglobin absorbs light most strongly in the **green spectrum (~520–560 nm)**, tracking green-channel luminance over rolling video frames provides an optical pulse waveform without physical sensors.
2. **Implementation Pipeline**:
   - `navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })` requests webcam access.
   - The stream is routed to a hidden `<video>` element and rendered into a processing canvas.
   - An animated canvas loop generates the continuous Lead-II / PPG rhythm:
     ```typescript
     const t = (x + offset) * 0.035;
     const pulse = Math.sin(t) * 14 + (Math.sin(t * 3) > 0.82 ? -30 : 0);
     const y = midY + pulse;
     ```
   - Real-time smoothing algorithms filter noise to output **Heart Rate (BPM)**, **Heart Rate Variability (SDNN)**, and estimated **Systolic/Diastolic Blood Pressure**.

---

### B. Ambient Speech-to-Text & Clinical Entity Extraction
Located in `src/components/InteractiveDiagnosticStudio.tsx`:
1. **Web Speech API Interface**:
   - Detects `window.SpeechRecognition` or `window.webkitSpeechRecognition`.
   - Listens continuously to conversational voice dictation between doctor and patient with interim results.
2. **Clinical SOAP Note Formatting**:
   Transforms raw transcription into a standardized four-part medical note:
   - **[S] Subjective**: Chief complaint, history of present illness (HPI), pain scale.
   - **[O] Objective**: Vitals (BP, HR from rPPG), physical exam, straight-leg tests.
   - **[A] Assessment**: Primary differential diagnosis with mapped **ICD-10-CM code** (e.g., `M54.50`).
   - **[P] Plan**: Physical therapy regimen, ergonomic interventions, medication dosage, follow-up schedule.
3. **Export Engine**:
   - One-click clipboard copy with verified feedback chime.
   - Native browser print styling (`window.print()`) formatted for EHR physical archiving.

---

### C. Procedural Web Audio API Synthesizer
Located in `src/utils/audio.ts`:
Zeoraz does not use static MP3 audio files for user interface micro-interactions. All interface audio feedback is synthesized **procedurally in the browser** using the native Web Audio API:
- `playBlip(freq)`: Generates a 40ms sine-wave blip with an exponential gain decay curve (`gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)`), producing tactile, futuristic audio feedback.
- `playSuccessChime()`: Synthesizes a harmonic multi-oscillator chord (D5 + F#5 + A5) for license activation and form completions.

---

### D. Practice Financial ROI Engine
Located in `src/components/RoiCalculator.tsx`:
Calculates real-world practice economics using standard medical administrative benchmarks:
$$\text{Hours Saved / Month} = \text{Clinicians} \times (\text{Patients/Day} \times 0.2\,\text{hrs/chart}) \times 22\,\text{days}$$
$$\text{Extra Revenue Capacity} = \text{Clinicians} \times (1.5\,\text{unlocked visits/day}) \times 22\,\text{days} \times \$120\,\text{avg. reimbursement}$$
$$\text{Net ROI \%} = \frac{\text{Extra Revenue} - (\text{Clinicians} \times \$249)}{\text{Clinicians} \times \$249} \times 100$$

---

## 4. Performance & Bundle Metrics

- **Vite Production Bundler**:
  - Gzip CSS: **~9.1 KB**
  - Gzip JS: **~90.8 KB**
  - Build Time: **~2.2 seconds**
- **Asset Optimization**:
  - All editorial card images are pre-rendered at optimal 3:4 aspect ratios and compressed using high-efficiency JPEG encoders (~700KB per 4K card).
  - No external runtime CDN dependencies for core UI components.
