import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AIHealthcareHero } from './components/AIHealthcareHero';
import { CleanSections } from './components/CleanSections';
import { BookingModal } from './components/BookingModal';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#fcfbfa] text-slate-900 flex flex-col relative selection:bg-[#ea8d53]/20 selection:text-slate-950 font-sans">
        
        {/* Main Website Content */}
        <main className="flex-1">
          {/* Hero Section with Sticky Navigation Bar & Pristine 4-Card Interactive Gallery */}
          <AIHealthcareHero 
            onOpenBooking={() => setIsBookingOpen(true)}
          />

          {/* Clean, Matching Content Sections for Navigation Anchor Links & Minimal Footer */}
          <CleanSections 
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </main>

        {/* Interactive Consultation & Demo Booking Modal */}
        <BookingModal 
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;
