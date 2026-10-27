import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';
import { FINALE } from '../../config/finale';

type ElapsedTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getElapsedTime = (): ElapsedTime => {
  const milliseconds = Math.max(0, Date.now() - FINALE.relationshipStartedAt.getTime());
  const secondsTotal = Math.floor(milliseconds / 1000);

  return {
    days: Math.floor(secondsTotal / 86_400),
    hours: Math.floor((secondsTotal % 86_400) / 3_600),
    minutes: Math.floor((secondsTotal % 3_600) / 60),
    seconds: secondsTotal % 60,
  };
};

const formatUnit = (value: number) => String(value).padStart(2, '0');

export const RelationshipCounter: React.FC = () => {
  const [elapsed, setElapsed] = useState<ElapsedTime>(getElapsedTime);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(getElapsedTime()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="text-center" aria-label="Time together since September 4, 2026">
      <p className="text-[10px] sm:text-xs font-bold tracking-[0.26em] uppercase text-secondary dark:text-secondary-light">
        Since 04.09.2026
      </p>
      <p className="mt-3 font-serif text-lg sm:text-xl text-primary dark:text-surface-bright tabular-nums tracking-wide">
        {formatUnit(elapsed.days)} days <span className="text-secondary/60">·</span> {formatUnit(elapsed.hours)} hours <span className="text-secondary/60">·</span> {formatUnit(elapsed.minutes)} minutes <span className="text-secondary/60">·</span> {formatUnit(elapsed.seconds)} seconds
      </p>
      <p className="mt-3 text-xs italic text-ink-muted dark:text-ink-dark-muted">Still counting… ♡</p>
    </div>
  );
};

export const FinalVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const reveal = useMemo(() => ({
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: 'blur(7px)' },
    visible: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' },
  }), [reduceMotion]);

  const startVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      setVideoError(false);
      await video.play();
      setHasStarted(true);
    } catch {
      // The native controls remain available if a browser blocks the first play request.
      setHasStarted(false);
    }
  }, []);

  const replayVideo = useCallback(async () => {
    const video = videoRef.current;
    sectionRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (!video) return;

    video.currentTime = 0;
    setHasEnded(false);
    await startVideo();
  }, [reduceMotion, startVideo]);

  return (
    <section ref={sectionRef} id="final-scene" className="scroll-mt-6 pt-14 sm:pt-24 pb-20 sm:pb-28" aria-label="Our final scene">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        variants={reveal}
        transition={{ duration: reduceMotion ? 0.01 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-8 sm:mb-12 text-center"
      >
        <p className="font-serif text-2xl sm:text-4xl text-primary dark:text-surface-bright leading-snug">
          And now…<br />
          <span className="italic">my favorite 30 seconds. ♡</span>
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] bg-[#190f13] p-1 sm:p-2 shadow-[0_28px_80px_-28px_rgba(76,13,29,0.5)] ring-1 ring-primary/10 dark:ring-white/10">
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[1.5rem] sm:rounded-[2.1rem] bg-black">
          <video
            ref={videoRef}
            className="block max-h-[82vh] w-full bg-black object-contain"
            controls
            preload="metadata"
            playsInline
            onPlay={() => setHasStarted(true)}
            onEnded={() => setHasEnded(true)}
            onError={() => setVideoError(true)}
          >
            <source src={FINALE.videoSource} type="video/mp4" />
            Your browser does not support this video.
          </video>

          {!hasStarted && (
            <button
              type="button"
              onClick={startVideo}
              className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/35 via-transparent to-black/10 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              aria-label="Play our favorite 30 seconds"
            >
              <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-2xl backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:bg-white/25">
                <Play className="ml-1 h-6 w-6 sm:h-7 sm:w-7 fill-current" />
              </span>
            </button>
          )}
        </div>
        {videoError && <p className="px-4 py-3 text-center text-sm text-white/80">The video could not load. Please refresh and try again.</p>}
      </div>

      {hasEnded && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: reduceMotion ? 0.01 : 0.9, delay: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 sm:mt-24 max-w-2xl text-center"
        >
          <p className="font-serif text-xl sm:text-2xl italic text-ink-muted dark:text-ink-dark-muted">
            I hope we make a million more memories like this.
          </p>
          <h2 className="mt-7 font-serif text-3xl sm:text-5xl font-medium leading-tight text-primary dark:text-surface-bright">
            I love you forever, Nanetyyyyy. ❤️
          </h2>
          <p className="mt-5 font-serif text-base italic text-secondary dark:text-secondary-light">— 3zab</p>

          <div className="mx-auto mt-11 border-y border-primary/10 py-7 dark:border-white/10">
            <RelationshipCounter />
          </div>

          <button
            type="button"
            onClick={replayVideo}
            className="group mt-9 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface-lowest px-5 py-3 text-sm font-semibold text-primary shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-white/20 dark:bg-white/10 dark:text-surface-bright dark:hover:bg-white/15 dark:focus-visible:ring-surface-bright dark:focus-visible:ring-offset-surface-dark"
          >
            <RotateCcw className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
            One more time? ♡
          </button>
        </motion.div>
      )}
    </section>
  );
};
