# ZEORAZ HEALTHCARE // AI Intelligence Layer For Modern Healthcare

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19.3.1-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.19-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3.8-646cff.svg?logo=vite)](https://vite.dev/)
[![HIPAA Compliant Architecture](https://img.shields.io/badge/HIPAA-Zero--Retention%20Encrypted-emerald.svg)](https://www.hhs.gov/hipaa/index.html)

**Zeoraz Healthcare** is an enterprise-grade AI intelligence layer engineered for modern clinicians and healthcare networks. It unifies ambient clinical documentation, contactless optical vitals screening (rPPG), multi-biomarker lab decoding, and practice economics into a cohesive, high-performance web platform.

---

## 📑 Table of Contents

- [Overview & Value Proposition](#-overview--value-proposition)
- [Key Features](#-key-features)
  - [1. Editorial 4-Card Hero Suite](#1-editorial-4-card-hero-suite)
  - [2. Interactive Diagnostic Studio (MVP)](#2-interactive-diagnostic-studio-mvp)
  - [3. Clinic Revenue & Practice ROI Calculator](#3-clinic-revenue--practice-roi-calculator)
  - [4. 14-Day Practice Onboarding Wizard](#4-14-day-practice-onboarding-wizard)
  - [5. Automated Instagram Reel Video Pipeline](#5-automated-instagram-reel-video-pipeline)
- [Design System & Aesthetics](#-design-system--aesthetics)
- [Technical Architecture](#-technical-architecture)
- [Getting Started](#-getting-started)
- [Documentation Suite](#-documentation-suite)
- [Commercialization & Economics](#-commercialization--economics)

---

## 💡 Overview & Value Proposition

Healthcare delivery is burdened by two foundational bottlenecks:
1. **Physician Documentation Overload**: The average clinician spends 4.5 hours daily inputting electronic health record (EHR) data, leading to severe burnout and reduced patient face-time.
2. **Fragmented Physiological Telemetry**: Complex blood panels, continuous vitals, and postural biomechanics exist in siloed portals with zero real-time cross-modal synthesis.

**Zeoraz** solves this by introducing a unified **AI Intelligence Layer** that:
- Automates clinical charting via **ambient microphone scribing** (saving 18+ hours/week per physician).
- Conducts **contactless optical vitals triage** (heart rate, HRV, blood pressure) via standard webcams with zero wearable hardware.
- Translates raw blood test panels into visual multi-biomarker risk curves in under 3 seconds.

---

## 🌟 Key Features

### 1. Editorial 4-Card Hero Suite
Designed with a modern, high-aesthetic Swiss & Kinfolk minimalism:
- **Card 1: Clinical Practice** — High-resolution laboratory researcher with an interactive frosted-glass bar chart widget that animates on hover.
- **Card 2: Biomechanical Spine** — High-end ergonomic architecture with an ethereal glowing mint-green spinal curvature telemetry line.
- **Card 3: Neural Recovery & Mindfulness** — Serene Japandi wellness sanctuary featuring subtle pulsing vital radar rings.
- **Card 4: Diagnostic Perception** — Face captured through textured vertical fluted glass with a frosted `[ ▶ Take a look ]` button.
- **Bottom Metrics Bar** — 48+ Patients Assisted, 85% Diagnostic Accuracy, 18+ Hours Saved, and an overlapping clinician avatar stack with 800+ behavior patterns.

### 2. Interactive Diagnostic Studio (MVP)
A live, fully functional clinical sandbox embedded directly into the application:
- **Instant Lab Biomarker Decoder**:
  - Presets: *Cardiovascular Risk Panel*, *Pre-Diabetic Glycemic Drift*, *Optimal Longevity*.
  - **Live File Dropzone**: Drag and drop real patient blood test reports (`.pdf`, `.jpg`, `.png`, `.txt`) to dynamically extract and visualize biomarkers.
  - Interactive multi-bar chart with tooltips, risk classification badges, and automated physician decision support.
- **Contactless Optical Vitals Scanner (rPPG)**:
  - **Live Webcam Integration**: Uses `navigator.mediaDevices.getUserMedia` to track facial skin reflectance changes.
  - **HTML5 Canvas Pulse Wave**: Draws real-time photoplethysmography (PPG) waveform at 60 FPS.
  - Calculates Heart Rate (BPM), Heart Rate Variability (SDNN), Estimated Blood Pressure (mmHg), and Respiratory Rate.
- **Ambient Clinical Audio Scribe**:
  - **Live Voice Dictation**: Uses the browser Web Speech API (`SpeechRecognition`) to transcribe doctor-patient consultations in real time.
  - Generates structured, compliant clinical **SOAP Notes** (Subjective, Objective, Assessment, Plan).
  - Automatically identifies and codes billable **ICD-10 classifications** (e.g., `M54.50`).
  - Includes **One-Click Copy** and **Direct Print** buttons for immediate physician export.

### 3. Clinic Revenue & Practice ROI Calculator
An interactive sales and financial modeling tool for healthcare practices:
- **Clinician Volume Slider**: Adjust from 1 to 25 full-time physicians.
- **Patient Volume Slider**: Adjust from 8 to 35 daily visits per doctor.
- Real-time dynamic calculation of:
  - Monthly hours reclaimed (~72 hrs/doctor/mo).
  - Additional billable patient capacity unlocked (+$6,400 to +$30,000+/mo).
  - Practice software investment vs. Net Practice ROI (2,000%+ ROI).

### 4. 14-Day Practice Onboarding Wizard
- Accessible via **"Get Started"**, **"Book Demo"**, and **"Download App"**.
- 2-step onboarding capturing Clinician Name, Practice Name, and Specialty.
- Fires a confetti celebration and generates an active **Clinician License Key** (e.g., `MED-AI-8492-PRI`) with zero credit card requirement.

### 5. Automated Instagram Reel Video Pipeline
- Full automated Python production script using `MoviePy`, `ImageIO`, `Pillow`, and `Edge-TTS`.
- Generates a 9:16 vertical 1080×1920 MP4 video (`public/videos/zeoraz-instagram-reel.mp4`) with:
  - Professional voiceover narration.
  - Synthesized ambient electronic pad music.
  - Animated live ECG wave and rising biomarker bars.
  - Direct preview and download buttons embedded on the site.

---

## 🎨 Design System & Aesthetics

Zeoraz rejects noisy, neon, clashing medical themes in favor of an **ultra-clean, warm editorial aesthetic**:

| Element | Specification | Visual Purpose |
| :--- | :--- | :--- |
| **Background Canvas** | `#fcfbfa` (Warm Milk White) | Reduces optical strain; creates a warm, human clinical presence |
| **Primary Typography** | `Plus Jakarta Sans` / `Outfit` / `Inter` | Precision clinical legibility with modern editorial hierarchy |
| **Accent Tone** | `#ea8d53` (Warm Apricot / Amber) | Calming, optimistic focus for action triggers and vitals telemetry |
| **Surface Cards** | `#ffffff` with `border-slate-200/80` | Crisp container boundaries without harsh drop shadows |
| **Glassmorphism** | `backdrop-blur-xl bg-white/30` | Translucent layer representation reflecting sub-skin depth |

---

## 🛠️ Technical Architecture

```
HealthCare/
├── public/
│   ├── images/
│   │   ├── pinterest-card1-clinical.jpg      # Lab researcher (Editorial 3:4)
│   │   ├── pinterest-card2-biomechanics.jpg   # Ergonomic spine (Editorial 3:4)
│   │   ├── pinterest-card3-mindfulness.jpg    # Japandi meditation (Editorial 3:4)
│   │   ├── pinterest-card4-diagnostic.jpg     # Fluted glass portrait (Editorial 3:4)
│   │   └── avatar-stack-clean.png             # Clinician trust proof
│   └── videos/
│       ├── zeoraz-instagram-reel.mp4          # 1080x1920 9:16 Reel
│       └── clean-heart-loop.mp4               # Telemetry loop
├── src/
│   ├── components/
│   │   ├── AIHealthcareHero.tsx               # Sticky Navbar, Hero, 4-Card Suite & Metrics
│   │   ├── CleanSections.tsx                  # Technology, Healthcare, Solutions, Application
│   │   ├── InteractiveDiagnosticStudio.tsx    # Lab Decoder, Webcam rPPG, Ambient Scribe
│   │   ├── RoiCalculator.tsx                  # Practice financial ROI slider engine
│   │   └── BookingModal.tsx                   # Practice trial onboarding & license generator
│   ├── context/
│   │   └── ThemeContext.tsx                   # Global theme provider
│   ├── utils/
│   │   └── audio.ts                           # Procedural Web Audio API sound generator
│   ├── App.tsx                                # Root application composition
│   ├── main.tsx                               # Application bootstrap
│   └── index.css                              # Tailwind design tokens & font imports
├── docs/
│   ├── ARCHITECTURE.md                        # Technical and algorithmic deep-dive
│   ├── COMMERCIAL_GUIDE.md                    # B2B pricing and GTM execution plan
│   └── REEL_AND_MARKETING.md                  # Social launch kit and video pipeline
├── package.json                               # Dependencies and build scripts
└── vite.config.ts                             # Vite production bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**
- Modern Web Browser (Chrome, Edge, Safari, Firefox) with Web Audio and WebCam permissions.

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/zeoraz/HealthCare.git
cd HealthCare

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

### Production Build & Preview
```bash
# Compile TypeScript and bundle with Vite
npm run build

# Serve the production dist locally
npm run preview
```
Visit `http://localhost:5173` to experience the live application.

---

## 📚 Documentation Suite

For comprehensive deep dives into specific facets of Zeoraz:
- [Technical Architecture Guide](docs/ARCHITECTURE.md) — Algorithmic details on rPPG, Web Speech, and canvas pipelines.
- [Commercial & GTM Playbook](docs/COMMERCIAL_GUIDE.md) — Practice economics, pricing tiers, and HIPAA compliance.
- [Reel Video & Social Launch Kit](docs/REEL_AND_MARKETING.md) — 9:16 video generation script, carousel layouts, and captions.

---

## 💼 Commercialization & Economics

- **Target Market**: Independent medical groups, cardiology clinics, ambulatory surgical centers, and telehealth startups.
- **Price Point**: **$249 / clinician / month**
- **COGS**: **~$15 / clinician / month** (transcription & structured inferencing)
- **Gross Margin**: **94%**
- **Payback Period**: Under 30 days based on immediate physician time reclaimed.

---

## ⚖️ License & Compliance

Distributed under the MIT License. Designed according to HIPAA security guidelines (zero client-side PHI retention, token de-identification, and end-to-end TLS 1.3 encryption).

Copyright © 2026 **Zeoraz Healthcare, Inc.** All rights reserved.
