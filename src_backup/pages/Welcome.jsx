import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MessageCircle, ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import confetti from 'canvas-confetti';

// ── Update this to your real WhatsApp group invite link ──
const WHATSAPP_LINK = 'https://chat.whatsapp.com/YOUR_INVITE_LINK_HERE';

const Welcome = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Celebration confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        setTimeout(() => setIsVisible(true), 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white z-0 pointer-events-none" />

                <div className="relative z-10 w-full max-w-xl flex flex-col gap-6">

                    {/* ── Success card ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-xl"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                            className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
                        >
                            <CheckCircle2 size={44} strokeWidth={2.5} />
                        </motion.div>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                            Application Successful!
                        </h1>
                        <p className="text-slate-500 leading-relaxed">
                            Welcome to <strong>MINDS Club</strong>. You've officially joined the Data Science community at HITAM.
                            Check your email for a confirmation and club details.
                        </p>
                    </motion.div>

                    {/* ── WhatsApp access ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden"
                    >
                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                                    <MessageCircle size={20} className="text-white" />
                                </div>
                                <h2 className="text-xl font-black text-slate-800">Join the WhatsApp Group</h2>
                            </div>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                Get instant updates, event announcements, and connect with fellow members.
                            </p>

                            {/* QR + button row */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {/* QR */}
                                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="group shrink-0">
                                    <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                                        <img
                                            src="/whatsapp-qr.png"
                                            alt="Scan to join MINDS WhatsApp group"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 text-center">Scan to join</p>
                                </a>

                                {/* Divider */}
                                <div className="hidden sm:flex flex-col items-center gap-1">
                                    <div className="h-12 w-px bg-slate-200" />
                                    <span className="text-xs text-slate-400 font-medium">or</span>
                                    <div className="h-12 w-px bg-slate-200" />
                                </div>
                                <span className="sm:hidden text-xs text-slate-400 font-medium">or</span>

                                {/* Link button */}
                                <div className="flex flex-col gap-2 w-full sm:w-auto">
                                    <a
                                        href={WHATSAPP_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        <MessageCircle size={18} />
                                        Join WhatsApp Group
                                        <ArrowUpRight size={16} />
                                    </a>
                                    <p className="text-xs text-slate-400 text-center">Tap to open invite link</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Back to home */}
                    <div className="text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-slate-800 transition-colors duration-300"
                        >
                            Return to Homepage <ArrowRight size={16} />
                        </Link>
                    </div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Welcome;
