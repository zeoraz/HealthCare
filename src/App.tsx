import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AIHealthcareHero } from './components/AIHealthcareHero';
import { MedicalDashboard } from './components/MedicalDashboard';
import { FeaturesBento } from './components/FeaturesBento';
import { HowItWorks } from './components/HowItWorks';
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
      <div className="min-h-screen bg-[#fcfbfa] text-slate-900 flex flex-col relative selection:bg-orange-500/20 selection:text-orange-950">
        
        {/* Main Landing Page Content */}
        <main className="flex-1">
          {/* Flagship Hero Component (Exactly matching aihealthcare.com from your reference video) */}
          <AIHealthcareHero 
            onOpenBooking={() => setIsBookingOpen(true)}
            onExploreDashboard={scrollToDashboard}
          />

          {/* Clinician Medical Dashboard Section (With real 3D video telemetry, radial gauges, and live ECG) */}
          <div className="bg-slate-950 text-white rounded-t-[40px] mt-6 shadow-2xl">
            <MedicalDashboard />

            {/* AI Biomarker Decoder & Health Risk Simulator */}
            <AIBiomarkerDecoder />

            {/* Bento Features Grid & Clinical Pipeline */}
            <FeaturesBento />
            <HowItWorks />

            {/* Mobile Companion App Download */}
            <AppDownloadSection />

            {/* Bottom CTA & Footer */}
            <Footer 
              onScrollToDashboard={scrollToDashboard}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </div>
        </main>

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
