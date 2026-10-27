import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles, ChevronDown } from 'lucide-react';
import { useIdentity } from '../../context/IdentityContext';

export const HeroSection: React.FC = () => {
  const { identity, toggleIdentity } = useIdentity();
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Relationship start date: 04 September 2026
    const startDate = new Date('2026-09-04T00:00:00');

    const updateCounter = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTimeTogether({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full pt-32 pb-16 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-fixed/20 dark:bg-primary/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-32 right-10 w-72 h-72 bg-secondary-light/20 dark:bg-secondary/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Monogram Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-high dark:bg-white/10 text-ink dark:text-surface-bright mb-6 shadow-sm border border-primary/5 dark:border-white/10"
      >
        <Heart className="w-4 h-4 text-secondary fill-secondary" />
        <span className="text-xs font-bold tracking-widest text-primary dark:text-secondary-light uppercase">
          SACRED ARCHIVE
        </span>
        <span className="text-ink-subtle text-xs">•</span>
        <span className="text-xs font-semibold text-secondary dark:text-secondary-light">
          {identity === '3zab' ? 'Ahmed (3zab)' : 'Anfal (Nouna)'}
        </span>
        <button
          onClick={toggleIdentity}
          className="ml-1 px-2 py-0.5 rounded-full bg-surface-container dark:bg-white/10 text-[10px] uppercase font-bold text-ink-muted dark:text-white hover:text-primary transition-colors"
        >
          Switch
        </button>
      </motion.div>

      {/* Main Hero Headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="font-serif text-5xl sm:text-7xl font-semibold text-primary dark:text-surface-bright tracking-tight mb-4"
      >
        3zab <span className="italic text-secondary font-light">♡</span> Nouna
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-serif italic text-lg sm:text-2xl text-ink-muted dark:text-ink-dark-muted max-w-xl mx-auto mb-8"
      >
        "Our private digital world. Not a portfolio, not a template — just us."
      </motion.p>

      {/* Established Date Tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="inline-flex items-center gap-3 bg-surface-low dark:bg-white/5 px-6 py-2.5 rounded-full shadow-soft mb-10 border border-primary/10 dark:border-white/10"
      >
        <Calendar className="w-5 h-5 text-secondary" />
        <span className="text-sm font-semibold tracking-wider text-primary dark:text-surface-bright uppercase">
          ESTABLISHED 04.09.2026
        </span>
      </motion.div>

      {/* Live Counter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-2xl bg-surface-lowest/90 dark:bg-surface-dark-card/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-elevated border border-primary/10 dark:border-white/10 mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold tracking-widest text-ink-subtle dark:text-ink-dark-muted uppercase">
            TIME SPENT IN DEVOTION
          </span>
          <div className="flex items-center gap-2 text-secondary dark:text-secondary-light">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
            <span className="text-xs font-semibold">Live Realtime</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          <div className="flex flex-col items-center bg-surface-low dark:bg-white/5 p-3 sm:p-4 rounded-2xl border border-primary/5 dark:border-white/5">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-primary dark:text-surface-bright">
              {timeTogether.days}
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-ink-subtle dark:text-ink-dark-muted uppercase mt-1">
              DAYS
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-low dark:bg-white/5 p-3 sm:p-4 rounded-2xl border border-primary/5 dark:border-white/5">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-primary dark:text-surface-bright">
              {timeTogether.hours}
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-ink-subtle dark:text-ink-dark-muted uppercase mt-1">
              HOURS
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-low dark:bg-white/5 p-3 sm:p-4 rounded-2xl border border-primary/5 dark:border-white/5">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-primary dark:text-surface-bright">
              {timeTogether.minutes}
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-ink-subtle dark:text-ink-dark-muted uppercase mt-1">
              MINUTES
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-low dark:bg-white/5 p-3 sm:p-4 rounded-2xl border border-primary/5 dark:border-white/5">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-secondary dark:text-secondary-light">
              {timeTogether.seconds}
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-ink-subtle dark:text-ink-dark-muted uppercase mt-1">
              SECONDS
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-primary/10 dark:border-white/10 flex items-center justify-center gap-2 text-ink-muted dark:text-ink-dark-muted text-xs">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>To infinity and beyond</span>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-ink-subtle dark:text-ink-dark-muted flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">Explore Sanctuary</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};
