import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { IdentityProvider, useIdentity } from './context/IdentityContext';
import { Header } from './components/layout/Header';
import { GateModal } from './components/layout/GateModal';
import { HeroSection } from './components/sections/HeroSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { MemoriesSection } from './components/sections/MemoriesSection';
import { SoundtrackSection } from './components/sections/SoundtrackSection';
import { LoveReasonsSection } from './components/sections/LoveReasonsSection';
import { LettersSection } from './components/sections/LettersSection';
import { OpenWhenSection } from './components/sections/OpenWhenSection';
import { Things21Section } from './components/sections/Things21Section';
import { FavoritesSection } from './components/sections/FavoritesSection';
import { FutureSection } from './components/sections/FutureSection';
import { ChatSection } from './components/sections/ChatSection';
import { PeaceRoomSection } from './components/sections/PeaceRoomSection';
import { FinalVideoSection } from './components/sections/FinalVideoSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { MoodWidget } from './components/ui/MoodWidget';

export const AppContent: React.FC = () => {
  const { isUnlocked } = useIdentity();
  const [celebrating, setCelebrating] = useState(false);
  const [syncDenied, setSyncDenied] = useState(false);
  useEffect(() => {
    const onDenied = () => setSyncDenied(true);
    window.addEventListener('sanctuary-sync-denied', onDenied);
    return () => window.removeEventListener('sanctuary-sync-denied', onDenied);
  }, []);
  useEffect(() => { if (!isUnlocked) setSyncDenied(false); }, [isUnlocked]);
  if (!isUnlocked || celebrating) return <GateModal onCelebrating={setCelebrating} />;
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark text-ink dark:text-ink-dark transition-colors duration-300 relative selection:bg-secondary-light selection:text-primary">
      <Header />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-12 overflow-hidden">
        {syncDenied && <p role="alert" className="relative top-24 rounded-xl bg-amber-100 p-4 text-sm text-amber-950">Your journal couldn’t sync. You’re viewing content saved on this device. Your shared photos and messages may still be in your private archive.</p>}
        <ScrollReveal><HeroSection /></ScrollReveal>
        <MoodWidget />
        <ScrollReveal><CountdownSection /></ScrollReveal>
        <ScrollReveal><TimelineSection /></ScrollReveal>
        <ScrollReveal><MemoriesSection /></ScrollReveal>
        <ScrollReveal><SoundtrackSection /></ScrollReveal>
        <ScrollReveal><LoveReasonsSection /></ScrollReveal>
        <ScrollReveal><LettersSection /></ScrollReveal>
        <ScrollReveal><OpenWhenSection /></ScrollReveal>
        <ScrollReveal><Things21Section /></ScrollReveal>
        <ScrollReveal><FavoritesSection /></ScrollReveal>
        <ScrollReveal><FutureSection /></ScrollReveal>
        <ScrollReveal><ChatSection /></ScrollReveal>
        <ScrollReveal><PeaceRoomSection /></ScrollReveal>
        <FinalVideoSection />
      </main>
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <IdentityProvider>
        <AppContent />
      </IdentityProvider>
    </ThemeProvider>
  );
}

export default App;
