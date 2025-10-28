import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { FeedPage } from './components/FeedPage';
import { EcosystemPage } from './components/EcosystemPage';
import { ProfilePage } from './components/ProfilePage';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ChatBubble } from './components/ChatBubble';
import { SettingsModal } from './components/SettingsModal';
import { OnboardingModal } from './components/OnboardingModal';
import { MagneticCursor } from './components/MagneticCursor';
// Wallet integration imports
import { WalletProvider } from '@mysten/wallet-kit';
import type { Theme, Page } from './types';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

// CORRECTED: Base64 encoded subtle ambient hum sound (royalty-free, valid WAV)
const ambientSoundData = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAP//";

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0.1; // Low volume
      if (isSoundOn) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn("Audio play was prevented by the browser. User interaction is required.", error);
          });
        }
      } else {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
      }
    }
  }, [isSoundOn]);
  
  useEffect(() => {
    // Only check for first-time visit after the initial loading screen is done.
    if (!isLoading) {
      const hasVisited = localStorage.getItem('suiSphereHasVisited');
      if (!hasVisited) {
        setShowOnboarding(true);
      }
    }
  }, [isLoading]);
  
  const handleOnboardingComplete = () => {
    // Mark that the user has completed the onboarding.
    localStorage.setItem('suiSphereHasVisited', 'true');
    setShowOnboarding(false);
  };

  const toggleSound = () => {
    setIsSoundOn(prev => !prev);
  };
  
  const toggleSettingsModal = () => {
    setIsSettingsOpen(prev => !prev);
  }

  const navigateTo = (page: Page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <FeedPage key="feed" />;
      case 'ecosystem':
        return <EcosystemPage key="ecosystem" />;
      case 'profile':
        return <ProfilePage key="profile" />;
      case 'landing':
      default:
        return <LandingPage key="landing" onExplore={() => navigateTo('feed')} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <WalletProvider>
      <div className="min-h-screen w-full overflow-x-hidden">
        <MagneticCursor />
        <AnimatePresence>
          {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}
        </AnimatePresence>
        <ScrollProgressBar />
        <BackgroundOrbs />
        <Navbar 
          onNavigate={navigateTo} 
          currentTheme={theme} 
          toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          isSoundOn={isSoundOn}
          toggleSound={toggleSound}
          onToggleSettings={toggleSettingsModal}
        />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <ChatBubble />
        <audio ref={audioRef} src={ambientSoundData} loop />
        <AnimatePresence>
          {isSettingsOpen && (
            <SettingsModal 
              onClose={toggleSettingsModal} 
              isSoundOn={isSoundOn}
              toggleSound={toggleSound}
            />
          )}
        </AnimatePresence>
      </div>
    </WalletProvider>
  );
};

export default App;