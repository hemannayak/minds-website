import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Detect if the user is on a mobile/touch device.
// iOS Safari blocks unmuted programmatic play — we stay muted on mobile.
const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

const IntroVideo = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mobile = isMobile();

    // Always start muted — this guarantees autoplay on all browsers/devices.
    video.muted = true;

    video.play().then(() => {
      // On desktop: immediately unmute so sound plays.
      // On mobile (iOS/Android): keep muted — browsers block unmuted autoplay.
      if (!mobile) {
        video.muted = false;
      }
    }).catch(err => {
      console.error('Autoplay blocked:', err);
      // If even muted play fails, skip the intro gracefully.
      skipIntro();
    });
  }, []);

  const handleVideoEnded = () => {
    setTimeout(() => setIsVisible(false), 400);
  };

  const skipIntro = () => {
    setIsVisible(false);
  };

  const handleExitComplete = () => {
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <video
            ref={videoRef}
            src="/MINDS_Logo_Intro.mp4"
            className="w-[85vw] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl object-contain"
            onEnded={handleVideoEnded}
            autoPlay
            playsInline
            muted
          />

          {/* Skip button */}
          <button
            onClick={skipIntro}
            className="absolute bottom-8 right-8 text-white/40 hover:text-white/80 transition-colors z-20 text-xs tracking-widest uppercase font-light cursor-pointer"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo;
