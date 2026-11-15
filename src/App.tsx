import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesBento } from './components/FeaturesBento';
import { HowItWorks } from './components/HowItWorks';
import { MedicalDashboard } from './components/MedicalDashboard';
import { AIBiomarkerDecoder } from './components/AIBiomarkerDecoder';
import { AppDownloadSection } from './components/AppDownloadSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const scrollToDashboard = () => {
    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col relative selection:bg-emerald-500/30 selection:text-emerald-300">
        
        {/* Navigation Bar */}
        <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Main Landing Page Content */}
        <main className="flex-1">
          {/* Hero Section with 3D Anatomical Visualizer */}
          <HeroSection 
            onOpenBooking={() => setIsBookingOpen(true)}
            onScrollToDashboard={scrollToDashboard}
          />

          {/* Value Proposition Bento Grid */}
          <FeaturesBento />

          {/* 4-Stage Clinical Pipeline */}
          <HowItWorks />

          {/* Interactive Clinician & Patient Medical Dashboard */}
          <MedicalDashboard />

          {/* Live AI Lab Decoder & Health Simulator */}
          <AIBiomarkerDecoder />

          {/* Mobile App Companion */}
          <AppDownloadSection />
        </main>

        {/* Bottom CTA & Comprehensive Footer */}
        <Footer 
          onScrollToDashboard={scrollToDashboard}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Interactive Booking & Consultation Modal */}
        <BookingModal 
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;
