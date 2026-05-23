import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, TrendingUp } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Premium speed curve: fast initially, then smooth, resolving in 2.5 seconds
    const duration = 2400; // total duration
    const intervalTime = 30; // ms
    const increments = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      // Calculate a progressive, realistic loading curve
      const progressPercent = Math.min(
        Math.round((1 - Math.pow(1 - currentStep / increments, 2.5)) * 100),
        100
      );

      setProgress(progressPercent);

      if (currentStep >= increments || progressPercent >= 100) {
        clearInterval(timer);
        // Add a slight delay at 100% for a luxurious transition feel
        setTimeout(() => {
          setShow(false);
          // Wait for the exit animation to complete before unmounting
          setTimeout(() => {
            onLoadingComplete();
          }, 600);
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="system-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#030914] flex flex-col items-center justify-center p-6 overflow-hidden select-none"
        >
          {/* PREMIUM FLOWING LINES OVERLAY */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12]">
            <svg 
              className="w-full h-full stroke-blue-500/40 fill-none" 
              viewBox="0 0 1440 800"
              preserveAspectRatio="none"
            >
              <g className="opacity-80">
                {/* Flowing Line 1 */}
                <motion.path
                  d="M -100 200 C 300 100, 500 500, 900 300 C 1200 150, 1300 650, 1600 400"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0, strokeDasharray: "15 15" }}
                  animate={{ 
                    pathLength: [0, 1],
                    strokeDashoffset: [0, -400]
                  }}
                  transition={{ 
                    pathLength: { duration: 4, ease: "easeOut" },
                    strokeDashoffset: { duration: 15, ease: "linear", repeat: Infinity }
                  }}
                />

                {/* Flowing Line 2 - Counter flow */}
                <motion.path
                  d="M -100 550 C 250 300, 600 650, 850 350 C 1100 100, 1250 500, 1600 250"
                  strokeWidth="1.5"
                  stroke="url(#accentGradient)"
                  initial={{ pathLength: 0, strokeDasharray: "10 10" }}
                  animate={{ 
                    pathLength: [0, 1],
                    strokeDashoffset: [0, 300]
                  }}
                  transition={{ 
                    pathLength: { duration: 3.5, ease: "easeInOut" },
                    strokeDashoffset: { duration: 12, ease: "linear", repeat: Infinity }
                  }}
                />

                {/* Flowing Line 3 - Background subtle glow track */}
                <motion.path
                  d="M -100 400 Q 400 150, 800 480 T 1600 350"
                  strokeWidth="3.5"
                  stroke="rgba(47, 110, 115, 0.3)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 5, ease: "easeOut" }}
                />
              </g>

              {/* Define Gradients */}
              <defs>
                <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2F6E73" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#0d3979" />
                </linearGradient>
                <radialGradient id="ambience" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(13, 57, 121, 0.25)" />
                  <stop offset="100%" stopColor="rgba(3, 9, 20, 0)" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* LARGE SOFT RADIAL GLOW AT CENTER */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#0d3979]/30 to-transparent blur-3xl rounded-full z-0 pointer-events-none opacity-80" />

          {/* MAIN CONTAINER CONTENT */}
          <div className="relative z-10 text-center max-w-md w-full flex flex-col items-center">
            
            {/* Elegant Floating Brand Logo (Replaces Shield Icon) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ boxShadow: '0 8px 30px rgba(13,57,121,0.4)' }}
              className="mb-8 relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0d3979] border border-white/10 text-white"
            >
              <div className="w-9 h-[3.5px] bg-white -rotate-45 translate-x-[3px] rounded-full" />
              <div className="w-9 h-[3.5px] bg-white rotate-45 -translate-x-[3px] rounded-full" />
            </motion.div>

            {/* Business name in bold uppercase text matching footer style */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-widest text-white leading-none text-center select-none"
            >
              NIHIRA FINSERV
            </motion.h1>

            {/* Luxury Subtitle descriptor tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-2 text-[10px] font-mono tracking-[0.25em] text-[#93c5fd] font-bold uppercase"
            >
              Standard Guidance & Support
            </motion.div>

            {/* LOADING INTERFACE */}
            <div className="w-full mt-16 max-w-[280px] space-y-3">
              
              {/* Progress counter */}
              <div className="flex justify-between items-end">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: progress > 10 ? 0.9 : 0 }}
                  className="font-mono text-[9px] text-[#93c5fd]/80 font-bold uppercase tracking-widest"
                >
                  ESTABLISHING SECURE TUNNEL
                </motion.span>
                <span className="font-mono text-xs font-black text-white">{progress}%</span>
              </div>

              {/* Sleek premium loading bar */}
              <div className="h-1.5 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden p-[2px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-[#3b82f6] to-[#93c5fd] rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                  style={{ width: `${progress}%` }}
                  layoutId="loadingProgressBar"
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                />
              </div>

              {/* Exact user requested journey text line */}
              <div className="text-center pt-1.5 min-h-[16px]">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.6 }}
                  className="font-sans text-[11px] text-[#94a3b8] tracking-wide font-medium"
                >
                  Your financial journey is loading...
                </motion.p>
              </div>

            </div>

          </div>

          {/* COMPACT SECURE SYSTEM METADATA FOOTER */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <p className="font-mono text-[8px] text-white/30 tracking-[0.3em] uppercase">
              SECURE CONSULTATION HUB • 10Y TRUST
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
