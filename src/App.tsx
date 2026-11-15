import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AIHealthcareHero } from './components/AIHealthcareHero';
import { CleanSections } from './components/CleanSections';
import { BookingModal } from './components/BookingModal';
import { AuthModal, ClinicianUser } from './components/AuthModal';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<ClinicianUser | null>(null);

  // Restore clinician session if previously signed in
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zeoraz_clinician_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const handleLoginSuccess = (user: ClinicianUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('zeoraz_clinician_user', JSON.stringify(user));
    } catch {
      // Storage error fallback
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('zeoraz_clinician_user');
    } catch {
      // Storage error fallback
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#fcfbfa] text-slate-900 flex flex-col relative selection:bg-[#ea8d53]/20 selection:text-slate-950 font-sans">
        
        {/* Main Website Content */}
        <main className="flex-1">
          {/* Hero Section with Sticky Navigation Bar & Pristine 4-Card Interactive Gallery */}
          <AIHealthcareHero 
            onOpenBooking={() => setIsBookingOpen(true)}
            user={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onSignOut={handleSignOut}
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

        {/* Clinician Authentication & Practice Onboarding Portal */}
        <AuthModal 
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;
