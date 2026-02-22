import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import confetti from 'canvas-confetti';

const Welcome = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger celebration confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);

        // Smooth reveal of content
        setTimeout(() => setIsVisible(true), 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white z-0 pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-xl w-full bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 text-center shadow-xl relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                        className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
                    >
                        <CheckCircle2 size={48} strokeWidth={2.5} />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                        Application Successful!
                    </h1>

                    <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                        You have successfully joined MINDS. We're thrilled to have you on board to analyze datasets and build the future together.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="p-8 bg-indigo-50/50 border border-indigo-100 rounded-3xl relative overflow-hidden mb-8 group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-2xl -mr-16 -mt-16 transition-colors group-hover:bg-indigo-200/50"></div>

                        <div className="relative z-10">
                            <h3 className="text-slate-800 font-bold mb-2">Next Step: Join the Community</h3>
                            <p className="text-sm text-slate-500 mb-6">Gain access to our exclusive announcements and developer resources.</p>

                            <a
                                href="https://chat.whatsapp.com/your-actual-whatsapp-invite-link-here"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-3"
                            >
                                <MessageCircle size={20} />
                                Join Official WhatsApp Group
                            </a>
                        </div>
                    </motion.div>

                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                        Return to Homepage
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Welcome;
