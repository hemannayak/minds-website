import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

const FALLBACK_FORM_URL = 'https://forms.gle/R6w2dvaduqBZTMyV6';
const FALLBACK_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSekycKn-NS94WEWZzakhkx2cv5uHI5ySLRZtkrNZWsThkA5qA/viewform?embedded=true';

const RecruitmentPopup = () => {
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [recruitmentData, setRecruitmentData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        fetch('/website-data.json')
            .then(res => res.json())
            .then(data => {
                if (isMounted && data && data.recruitment) {
                    setRecruitmentData(data.recruitment);
                    if (data.recruitment.isOpen) {
                        setTimeout(() => setVisible(true), 2500);
                    }
                }
            })
            .catch(err => console.error("Could not fetch website data:", err));
        
        return () => { isMounted = false; };
    }, []);

    const dismiss = () => {
        setVisible(false);
        setShowForm(false);
    };

    const openForm = () => setShowForm(true);

    const formUrl = recruitmentData?.formUrl || FALLBACK_FORM_URL;
    const formEmbedUrl = recruitmentData?.formEmbedUrl || FALLBACK_FORM_EMBED_URL;

    return (
        <>
            {/* ── Announcement popup (centered) ── */}
            <AnimatePresence>
                {visible && !showForm && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="popup-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
                            onClick={dismiss}
                        />
                        {/* Card */}
                        <motion.div
                            key="recruit-popup"
                            initial={{ opacity: 0, scale: 0.93, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
                            className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div
                                className="relative bg-[#0f0f0f] rounded-[20px] overflow-hidden border border-white/10 w-full max-w-[420px] pointer-events-auto"
                                style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Top shimmer */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

                                {/* Close */}
                                <button
                                    onClick={dismiss}
                                    aria-label="Dismiss"
                                    className="absolute top-3 right-3 z-20 w-7 h-7 rounded-[7px] bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150"
                                >
                                    <X size={13} />
                                </button>

                                {/* Banner image — full width, no cropping */}
                                <div className="w-full overflow-hidden bg-[#0a0a0a]">
                                    <img
                                        src="/officialrecritementbanner.jpeg"
                                        alt="MINDS Core Committee Recruitment"
                                        className="w-full h-auto object-cover block"
                                        onError={e => {
                                            e.target.parentElement.innerHTML = `
                                                <div class="w-full h-48 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-white/[0.04] to-transparent">
                                                    <span class="text-3xl">🚀</span>
                                                    <p class="text-white/40 text-xs font-medium">MINDS Recruitment Banner</p>
                                                </div>`;
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="px-6 pt-4 pb-6">
                                    {/* Status pill */}
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 mb-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-emerald-400">Applications Open Now</span>
                                    </div>

                                    <h3 className="text-white font-bold text-base leading-snug mb-1.5">
                                        Core Committee — First Batch 🚀
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed mb-5">
                                        The official recruitment for MINDS first-ever Core Committee has started. Apply now and help shape what the club becomes.
                                    </p>

                                    {/* CTA row */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={openForm}
                                            className="group flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-all duration-200"
                                        >
                                            Apply Now
                                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                        <button
                                            onClick={dismiss}
                                            className="text-sm text-white/30 hover:text-white/60 transition-colors font-medium px-2"
                                        >
                                            Later
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Full-screen form modal ── */}
            <AnimatePresence>
                {showForm && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="form-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm"
                            onClick={dismiss}
                        />

                        {/* Modal */}
                        <motion.div
                            key="form-modal"
                            initial={{ opacity: 0, scale: 0.96, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, y: 12 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="fixed inset-4 sm:inset-8 md:inset-[5vh_10vw] z-[310] flex flex-col rounded-[20px] overflow-hidden border border-white/10 bg-[#0f0f0f]"
                            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}
                        >
                            {/* Top shimmer */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

                            {/* Modal header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-[8px] bg-white/10 border border-white/10 flex items-center justify-center">
                                        <Sparkles size={14} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold leading-none">Core Committee Application</p>
                                        <p className="text-white/30 text-[10px] mt-0.5">MINDS — First Batch Recruitment</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={formUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all duration-200 text-[11px] font-medium"
                                    >
                                        <ExternalLink size={11} />
                                        Open in new tab
                                    </a>
                                    <button
                                        onClick={dismiss}
                                        aria-label="Close"
                                        className="w-8 h-8 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-150"
                                    >
                                        <X size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Embedded form — fills remaining space */}
                            <div className="flex-1 overflow-hidden bg-white">
                                <iframe
                                    src={formEmbedUrl}
                                    title="MINDS Core Committee Application Form"
                                    className="w-full h-full border-0"
                                    style={{ minHeight: '100%' }}
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default RecruitmentPopup;
