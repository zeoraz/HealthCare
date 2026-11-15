# VITALIS // Next-Gen Biomarker & Vitals Intelligence

A cutting-edge, medical-grade health landing page and interactive clinician dashboard inspired by modern medtech and bio-analytics interfaces, featuring an elevated **Cyber-Clinical / Emerald & Aurora Obsidian** design system.

---

## 🌟 Key Features

### 1. Interactive 3D Anatomical Canvas (WebGL / Three.js)
- **Dual Visualizer**: Toggle between **3D Cardiac Core** (anatomical pulsating glass heart) and **Full-Body Bio-Grid** (holographic neural & vascular twin).
- **Synchronized Heartbeat Pulse**: Real-time contraction & dilation synced with custom BPM telemetry (with optional synthesizer sound effects via Web Audio API).
- **3D Orbit & Zoom Controls**: Smooth drag-to-rotate, auto-rotation toggle, and zoom controls.
- **Interactive Hotspot Badges**: Clickable anatomical nodes (Aortic Arch, Left Ventricle, Neural Plexus) with live physiological telemetry.

### 2. High-Impact Hero Section
- **Dynamic Headline Engine**: Cycles between key value propositions with silky transitions:
  - *Next-Gen Biomarker Monitoring with AI Precision*
  - *Your Health Data, Decoded by Deep AI*
  - *Proactive Cardiometabolic Surveillance in 3D*
- **Social Proof Counter**: Doctor and patient avatar stack with `+15K Clinicians & Patients`.
- **Signature Split-Pill Button**: High-conversion `[ See Dashboard ↗ ]` trigger with hover micro-interactions.

### 3. "Clarity and Trust" Bento Grid
- **Early Detection of Health Risks**: Interactive subclinical plaque risk simulation widget.
- **AI-Powered Interpretation (Zero Doctor-Speak)**: Live toggle between complex medical jargon and plain-English translations.
- **Multi-Organ Biomarker Tracker**: Interactive preview across Hormones, Liver, Lipids, Iron & Micronutrients.
- **Visual Dashboards & Smart Reports**: Instant PDF medical export previews.

### 4. Interactive Clinician & Patient Dashboard
- **Perspective View Switcher**: Toggle between **3D Isometric Tablet View** and **Full Workstation Mode**.
- **Live Search & Filter**: Real-time search across indicators and categories, plus filter chips (`All`, `High`, `Low`, `Normal`).
- **Speedometer Arc Gauges**: Radial SVG meters with color zones for **SHBG**, **Testosterone**, and **DHEA-S**.
- **Live Animated ECG Waveform**: HTML5 Canvas rendering real-time Lead II cardiac rhythm at 72 BPM with pulse spikes.
- **Interactive Detail Modal**: Click any biomarker row for an in-depth clinical diagnosis and personalized action plan.

### 5. AI Biomarker Decoder & Health Simulator
- Preset archetypes (*Cardiometabolic & Longevity Baseline*, *High-Performance Athletic Recovery*, *Early Metabolic Anomaly Flag*).
- Real-time interactive sliders for **Fasting Glucose**, **hs-CRP**, **LDL Cholesterol**, and **Total Testosterone**.
- Instant neural synthesis calculation with Vitality Index score (1–100) and actionable dietary/training interventions.

### 6. Mobile Companion Showcase & Consultation Modal
- Modern smartphone viewport showcasing Apple Health and Oura Ring synchronization.
- Interactive booking modal with date & time selection, clinician options, and confetti celebration.

---

## 🎨 Design & Palette Transformation

| Element | Reference Video | Vitalis Redesign |
| :--- | :--- | :--- |
| **Color Scheme** | Sky Blue & Red Veins on Gray | **Neo-Obsidian & Luminescent Emerald** (`#080c14`, `#10b981`, `#06b6d4`, `#f43f5e`) |
| **Theme System** | Single Static Scheme | **Live 3-Palette Switcher** (Obsidian Emerald, Clinical Pearl Light, Cyber Amethyst) |
| **3D Rendering** | Static prerendered video | **Real-time WebGL / Three.js 3D Canvas** with interactive orbit and pulse |
| **Dashboard** | Video mockup | **Fully interactive functional dashboard** with live search, filters, modal drill-downs, and canvas ECG |
| **Interactivity** | Passive display | **Live AI Lab Decoder, Risk Slider, Audio Telemetry SFX toggle, and Booking Drawer** |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/zeoraz/HealthCare.git
cd HealthCare

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Glassmorphism & Mesh Shaders
- **3D Graphics**: Three.js (Procedural geometries, physical glass materials, point lights)
- **Audio**: Web Audio API Procedural Synthesizer (0 external files)
- **Icons**: Lucide Icons + Handcrafted SVG Brand Vectors
- **Celebration Effects**: Canvas Confetti
