import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecruitmentPopup = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show popup 3 seconds after mount — re-appears every homepage visit
        const t = setTimeout(() => setVisible(true), 3000);
        return () => clearTimeout(t);
    }, []);

    const dismiss = () => setVisible(false);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="recruit-popup"
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.97 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                    className="fixed bottom-6 right-6 z-[200] w-full max-w-sm"
                    style={{ filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.18))' }}
                >
                    <div className="relative bg-slate-900 grid-texture-dark rounded-[16px] overflow-hidden ring-1 ring-white/10">
                        {/* shimmer top line */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                        {/* Close */}
                        <button
                            onClick={dismiss}
                            aria-label="Dismiss"
                            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-[7px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-150"
                        >
                            <X size={13} />
                        </button>

                        <div className="p-5 pr-10">
                            {/* Status pill */}
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-emerald-400">Now Recruiting</span>
                            </div>

                            {/* Icon + heading */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-9 h-9 rounded-[9px] bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm leading-snug">
                                        Core Committee — New Batch 🚀
                                    </p>
                                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                                        We're building the next team. Applications open soon — get ready to be part of what MINDS becomes next.
                                    </p>
                                </div>
                            </div>

                            {/* CTA row */}
                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/8">
                                <Link
                                    to="/team"
                                    onClick={dismiss}
                                    className="group flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-[8px] bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-all duration-200"
                                >
                                    Learn More
                                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <button
                                    onClick={dismiss}
                                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-medium"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RecruitmentPopup;
