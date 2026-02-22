import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LaunchReveal
 * Full-screen reveal panel that slides in from the left when show=true,
 * displays the MINDS logo with a glow animation, then fades out after 3s
 * and calls onComplete().
 *
 * Props:
 *   show       – boolean, true fires the animation
 *   onComplete – called after the reveal finishes
 */
const LaunchReveal = ({ show, onComplete }) => {
    const timerRef = useRef(null);

    useEffect(() => {
        if (show) {
            // auto-dismiss after 3.5 s (0.8s logo + comfortable read time)
            timerRef.current = setTimeout(() => {
                onComplete?.();
            }, 3500);
        }
        return () => clearTimeout(timerRef.current);
    }, [show, onComplete]);

    return (
        <AnimatePresence>
            {show && (
                /* ── Backdrop panel: slides in from left ── */
                <motion.div
                    key="launch-reveal"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{
                        enter: { type: 'spring', stiffness: 60, damping: 18 },
                        exit: { duration: 0.7, ease: 'easeInOut' },
                    }}
                    className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #06080f 0%, #0f1729 60%, #0a0e1c 100%)' }}
                >
                    {/* Ambient glow blobs */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25"
                            style={{ background: 'radial-gradient(circle, #6366f1 0%, #38bdf8 60%, transparent 100%)' }}
                        />
                        <div
                            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10"
                            style={{ background: '#818cf8' }}
                        />
                        <div
                            className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full blur-[90px] opacity-10"
                            style={{ background: '#38bdf8' }}
                        />
                    </div>

                    {/* ── Logo ── */}
                    <div className="relative z-10 flex flex-col items-center gap-6 select-none">
                        {/* Outer glow ring */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
                            className="absolute w-52 h-52 rounded-full blur-3xl opacity-30"
                            style={{ background: 'radial-gradient(circle, #6366f1, #38bdf8)' }}
                        />

                        {/* Logo box */}
                        <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                                boxShadow: '0 0 60px rgba(99,102,241,0.5), 0 0 120px rgba(56,189,248,0.2)',
                            }}
                        >
                            <div className="w-[calc(100%-3px)] h-[calc(100%-3px)] rounded-[calc(1.5rem-2px)] bg-[#080c18] flex items-center justify-center">
                                <span
                                    className="text-7xl md:text-8xl font-black tracking-tighter"
                                    style={{
                                        background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    M
                                </span>
                            </div>
                        </motion.div>

                        {/* Club name stagger */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
                            className="text-center"
                        >
                            <p className="text-3xl md:text-4xl font-black tracking-tight text-white mb-1">
                                MINDS
                            </p>
                            <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-indigo-300/70">
                                Modern Innovation for Next-Gen Data-Science Society
                            </p>
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            className="text-slate-500 text-sm tracking-widest uppercase"
                        >
                            Official Club · Data Science Dept · HITAM
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LaunchReveal;
