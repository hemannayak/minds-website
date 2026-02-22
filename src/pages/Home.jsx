import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Target, Users, ArrowRight } from 'lucide-react';
import LaunchReveal from '../components/LaunchReveal';
import Popup from '../components/Popup';
import { fadeInUp, staggerContainer } from '../lib/animations';

// Target Launch Date: 27 February 2026, 2:00 PM IST
const LAUNCH_DATE = new Date("2026-02-27T14:00:00+05:30").getTime();

// ─── Launch Config ───────────────────────────────────────────────
// Set showReveal to true ONLY on the day of official launch.
// This gates the logo pop-in and full-form expansion from appearing.
const LAUNCH_CONFIG = {
    showReveal: false, // ← flip to true on launch day
};

const CountdownUnit = ({ value, label }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-xl flex items-center justify-center border border-gray-100 relative shadow-sm group">
                <div className="absolute inset-0 bg-indigo-500/5 rounded-xl blur-md group-hover:bg-indigo-500/10 transition-all duration-300"></div>
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ y: 15, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -15, opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-cyan-400 relative z-10 font-mono tracking-tighter"
                    >
                        {value.toString().padStart(2, '0')}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-gray-400 text-xs sm:text-sm mt-3 uppercase tracking-widest font-semibold">{label}</span>
        </div>
    );
};

const LaunchCountdown = ({ onComplete }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = LAUNCH_DATE - new Date().getTime();

            if (difference <= 0) {
                onComplete();
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        };

        calculateTimeLeft(); // initial calc
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center mt-12"
        >
            <p className="text-slate-500 text-sm tracking-[0.2em] uppercase mb-6 font-semibold">Launching In</p>
            <div className="flex gap-4 sm:gap-6">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <span className="text-2xl sm:text-4xl text-slate-300 font-light mt-4 sm:mt-5">:</span>
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <span className="text-2xl sm:text-4xl text-slate-300 font-light mt-4 sm:mt-5">:</span>
                <CountdownUnit value={timeLeft.minutes} label="Mins" />
                <span className="text-2xl sm:text-4xl text-slate-300 font-light mt-4 sm:mt-5">:</span>
                <CountdownUnit value={timeLeft.seconds} label="Secs" />
            </div>
        </motion.div>
    );
};

const Home = () => {
    const [isLaunched, setIsLaunched] = useState(false);
    const [showRevealPanel, setShowRevealPanel] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (new Date().getTime() >= LAUNCH_DATE) {
            setIsLaunched(true);
            // Only fire reveal panel once (not on every refresh after launch)
            const hasRevealed = localStorage.getItem('minds_launched');
            if (!hasRevealed) {
                setShowRevealPanel(true);
                localStorage.setItem('minds_launched', '1');
            }
        }
    }, []);

    const handleCountdownComplete = useCallback(() => {
        setIsLaunched(true);
        setShowRevealPanel(true);
        localStorage.setItem('minds_launched', '1');
    }, []);

    const handleRevealComplete = useCallback(() => {
        setShowRevealPanel(false);
    }, []);

    if (!isMounted) return null;

    return (
        <main className="w-full">
            {/* Launch reveal panel — fires once when countdown hits zero */}
            <LaunchReveal show={showRevealPanel} onComplete={handleRevealComplete} />

            {/* Pre-launch popup teaser — shown only before launch */}
            {!isLaunched && <Popup />}

            <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden px-6 flex items-center justify-center bg-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50 via-background to-background z-0"></div>

                <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 w-full h-full justify-center">

                    {/* Pre-Launch Content: Always visible, but might move slightly */}
                    <motion.div layout className="flex flex-col items-center z-20">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 border border-gray-200 text-sm font-semibold text-indigo-600 mb-8 backdrop-blur-sm shadow-sm"
                        >
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            A New Chapter Begins Soon
                        </motion.div>

                        <motion.h1
                            layout
                            className={`font-black tracking-tighter text-slate-800 transition-all duration-1000
                    ${isLaunched ? 'text-6xl md:text-8xl lg:text-9xl mb-4' : 'text-7xl md:text-[8rem] lg:text-[10rem] mb-2'}`
                            }
                        >
                            MINDS
                        </motion.h1>

                        <motion.p
                            layout
                            className="text-lg md:text-xl text-slate-500 font-medium tracking-wide max-w-2xl"
                        >
                            Official Club of the Data Science Department, HITAM
                        </motion.p>
                    </motion.div>

                    {/* Dynamic Launch Area */}
                    <div className="mt-8 relative w-full flex justify-center min-h-[250px] items-center">
                        <AnimatePresence mode="wait">
                            {!isLaunched ? (
                                <LaunchCountdown key="countdown" onComplete={handleCountdownComplete} />
                            ) : LAUNCH_CONFIG.showReveal ? (
                                /* ── OFFICIAL LAUNCH REVEAL ── flip LAUNCH_CONFIG.showReveal to true to enable ── */
                                <motion.div
                                    key="reveal"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.2, delay: 0.2 }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Logo pop-in */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
                                        className="relative mb-10 w-32 h-32 md:w-40 md:h-40"
                                    >
                                        <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl animate-pulse duration-3000"></div>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-sky-400 rounded-2xl shadow-xl flex items-center justify-center p-[2px]">
                                            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
                                                <span className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-sky-500 relative z-10">
                                                    M
                                                </span>
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl mix-blend-multiply"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                    {/* Full form */}
                                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 max-w-3xl">
                                        {["Modern", "Innovation", "for", "Next-Gen", "Data-Science", "Society"].map((word, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                transition={{ duration: 0.8, delay: 1 + (i * 0.15), ease: "easeOut" }}
                                                className={`text-xl md:text-3xl lg:text-4xl font-bold tracking-tight ${["Modern", "Innovation", "Next-Gen", "Data-Science", "Society"].includes(word)
                                                    ? 'text-slate-800'
                                                    : 'text-slate-400'
                                                    }`}
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                /* ── PRE-REVEAL PLACEHOLDER (shown after countdown, before official launch) ── */
                                <motion.div
                                    key="pre-reveal"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-semibold">
                                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                        The official reveal is coming soon
                                    </div>
                                    <p className="text-slate-400 text-sm">Stay tuned for the big announcement.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Intro & Features Section */}
            <section className="py-24 px-6 bg-white relative z-10 border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-800 tracking-tight">
                            More Than Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Club</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
                            MINDS is the official initiative of the Data Science Department at HITAM.
                            Built after 1 year of planning and structuring. Aimed at providing industry exposure,
                            expert sessions, workshops, datathons and student growth opportunities.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeInUp} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Briefcase size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Industry Exposure</h3>
                            <p className="text-slate-500 leading-relaxed">Direct interaction with industry leaders, tech companies, and real-world case studies to bridge the academic gap.</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                <Target size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Real-World Learning</h3>
                            <p className="text-slate-500 leading-relaxed">Practical workshops, datathons, and hands-on projects designed to build skills that matter in the workplace.</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Users size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Innovation & Collaboration</h3>
                            <p className="text-slate-500 leading-relaxed">A thriving community of like-minded peers focused on building the next generation of data-driven solutions.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-slate-50 relative z-10 border-t border-slate-100">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-16 text-center shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-50 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>

                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-6 relative z-10">Ready to Join the Revolution?</h2>
                    <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto relative z-10">
                        Explore our roadmap or see what's happening next in our upcoming events.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link to="/journey" className="px-8 py-4 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            Explore Journey
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </Link>
                        <Link to="/events" className="px-8 py-4 rounded-full font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-all flex items-center justify-center gap-2">
                            View Events
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default Home;
