import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, Zap, BarChart2, Users, Globe, MessageCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const USE_APPS_SCRIPT = true;
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxHTbapRCtdZxgpbllFP_kOX-EIKMOFDy9-OGap0rncWRheH-4Bw3LD6fxQVNiUzDk/exec';
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/minds.datascience@hitam.org';
const WHATSAPP_LINK = 'https://chat.whatsapp.com/Hir2hpXuLqAAmW1CoV5qaq?mode=hq1tswa';

const perks = [
    { icon: Zap, text: 'Exclusive industry sessions & keynotes' },
    { icon: BarChart2, text: 'Hands-on datathons & real-world projects' },
    { icon: Users, text: 'A community across every department' },
    { icon: Globe, text: 'Network with professionals from top companies' },
];

/* ── Reusable field ── */
const Field = ({ label, id, optional, children, ...props }) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="text-xs font-bold tracking-[0.1em] uppercase text-slate-500 flex items-center gap-1.5">
            {label}
            {optional && <span className="text-slate-600 font-normal normal-case tracking-normal">(optional)</span>}
        </label>
        {children ?? (
            <input
                id={id}
                {...props}
                className="w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all duration-200"
            />
        )}
    </div>
);

const selectClass = "w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all duration-200 appearance-none cursor-pointer";

const Join = () => {
    const [formStatus, setFormStatus] = useState('idle');
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const navigate = useNavigate();

    // Check if WhatsApp was already shown in this session
    React.useEffect(() => {
        const whatsappShown = sessionStorage.getItem('whatsappShown');
        if (whatsappShown === 'true') {
            setShowWhatsApp(false);
            setFormStatus('idle');
            setSubmittedData(null);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        const formData = new FormData(e.target);
        
        // Store form data for WhatsApp link display
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            year: formData.get('year'),
            branch: formData.get('branch'),
            section: formData.get('section'),
            why: formData.get('why')
        };
        
        try {
            if (USE_APPS_SCRIPT && APPS_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                // Try Google Apps Script first
                try {
                    const response = await fetch(APPS_SCRIPT_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        setSubmittedData(data);
                        setShowWhatsApp(true);
                        setFormStatus('success');
                        e.target.reset();
                        sessionStorage.setItem('whatsappShown', 'true');
                    } else {
                        throw new Error(result.error || 'Google Apps Script failed');
                    }
                } catch (corsError) {
                    console.warn('CORS error, falling back to FormSubmit:', corsError);
                    
                    // Fallback to FormSubmit
                    const fallbackFormData = new FormData(e.target);
                    fallbackFormData.append('_subject', 'New Club Membership Application - MINDS');
                    fallbackFormData.append('_captcha', 'false');
                    
                    const res = await fetch(FORMSUBMIT_URL, {
                        method: 'POST',
                        headers: { Accept: 'application/json' },
                        body: fallbackFormData,
                    });
                    
                    const result = await res.json();
                    if (result?.success) { 
                        setSubmittedData(data);
                        setShowWhatsApp(true);
                        setFormStatus('success'); 
                        e.target.reset();
                        sessionStorage.setItem('whatsappShown', 'true');
                    } else {
                        throw new Error('FormSubmit failed');
                    }
                }
            } else {
                // Fallback to FormSubmit
                formData.append('_subject', 'New Club Membership Application - MINDS');
                formData.append('_captcha', 'false');
                const res = await fetch(FORMSUBMIT_URL, {
                    method: 'POST',
                    headers: { Accept: 'application/json' },
                    body: formData,
                });
                const result = await res.json();
                if (result?.success) { 
                    setSubmittedData(data);
                    setShowWhatsApp(true);
                    setFormStatus('success'); 
                    e.target.reset();
                    // Store that WhatsApp was shown in this session
                    sessionStorage.setItem('whatsappShown', 'true');
                } else {
                    setFormStatus('error');
                }
            }
        } catch (error) { 
            setFormStatus('error');
            console.error('Form submission error:', error);
        }
    };

    return (
        <PageTransition>
            <div className="w-full">

                {/* ── Page Hero ── */}
                <section className="pt-36 pb-24 px-6 bg-[#080808] grid-texture border-b border-white/[0.06]">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={staggerContainer}
                            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12"
                        >
                            <motion.div variants={fadeInUp} className="max-w-2xl">
                                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40 mb-5">Join MINDS</p>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] leading-[1.05]">
                                    Your data journey<br />
                                    starts{' '}
                                    <span className="accent-word">here.</span>
                                </h1>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="max-w-sm lg:pb-2">
                                <p className="text-lg text-white/60 leading-relaxed mb-6">
                                    Open to every department. Zero cost. Just curiosity and a drive to grow in data science.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-10 bg-white rounded-full shrink-0" />
                                    <p className="text-sm text-white/50 font-medium leading-snug">
                                        Chapter 01 is live · Takes 60 seconds to apply
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Main split layout ── */}
                <section className="py-20 px-6 bg-[#080808] grid-texture">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                            {/* ── LEFT — Why Join pitch ── */}
                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-60px' }}
                                variants={staggerContainer}
                                className="lg:col-span-2 flex flex-col gap-6"
                            >
                                <motion.div variants={fadeInUp}>
                                    <p className="text-xs font-bold tracking-[0.12em] uppercase text-white/40 mb-4">Why MINDS?</p>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em] leading-snug mb-5">
                                        Not just another college club.
                                    </h2>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        MINDS is the only place in HITAM where you get access to industry professionals, live data science projects, and a community that's serious about building careers — not just attending events.
                                    </p>
                                </motion.div>

                                {/* Perks list */}
                                <motion.div variants={fadeInUp} className="space-y-3">
                                    {perks.map(({ icon: Icon, text }) => (
                                        <div key={text} className="flex items-start gap-4 p-4 bg-white rounded-[12px] ring-1 ring-slate-900/5" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 4px 16px rgba(0,0,0,0.04)' }}>
                                            <div className="w-8 h-8 rounded-[8px] bg-slate-900 flex items-center justify-center shrink-0">
                                                <Icon size={14} className="text-white" />
                                            </div>
                                            <p className="text-sm font-medium text-slate-700 leading-relaxed pt-0.5">{text}</p>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Open door statement */}
                                <motion.div
                                    variants={fadeInUp}
                                    className="bg-slate-900 grid-texture-dark rounded-[14px] p-6 ring-1 ring-white/5"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 16px 48px rgba(0,0,0,0.12)' }}
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none rounded-t-[14px]" />
                                    <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500 mb-2">Open to All</p>
                                    <p className="text-white font-bold text-base leading-snug">
                                        Any department. Any year.<br />One condition — you're curious.
                                    </p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-xs text-emerald-400 font-semibold">Applications — Now Open</span>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* ── RIGHT — Dark application form ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="lg:col-span-3 bg-slate-900 grid-texture-dark rounded-[14px] ring-1 ring-white/5 overflow-hidden"
                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 24px 60px rgba(0,0,0,0.16)' }}
                            >
                                {/* shimmer line */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                                {/* Form header */}
                                <div className="px-6 sm:px-8 py-6 border-b border-white/8 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-[8px] bg-white/10 border border-white/10 flex items-center justify-center">
                                        <Send size={14} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Membership Application</p>
                                        <p className="text-slate-500 text-xs">Inaugural batch · Free to apply</p>
                                    </div>
                                </div>

                                {/* Form body */}
                                <div className="p-6 sm:p-8">
                                    {formStatus === 'success' && showWhatsApp ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8 px-4"
                                        >
                                            <div className="w-16 h-16 rounded-[16px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle size={28} className="text-emerald-400" />
                                            </div>
                                            
                                            <h3 className="text-white font-bold text-2xl mb-3">
                                                Welcome to MINDS, {submittedData?.name}!
                                            </h3>
                                            
                                            <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-8">
                                                Your application has been successfully submitted. Check your email for a welcome message and further instructions.
                                            </p>

                                            {/* WhatsApp Community Card */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-emerald-500/10 border border-emerald-500/20 rounded-[14px] p-6 mb-6"
                                            >
                                                <div className="flex items-center justify-center gap-3 mb-4">
                                                    <MessageCircle size={20} className="text-emerald-400" />
                                                    <h4 className="text-white font-bold text-lg">Join Our Community</h4>
                                                </div>
                                                <p className="text-white/70 text-sm mb-4">
                                                    Connect with fellow members and stay updated with our latest events and activities.
                                                </p>
                                                <a
                                                    href={WHATSAPP_LINK}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-[10px] transition-all duration-200 hover:-translate-y-[1px]"
                                                >
                                                    <MessageCircle size={16} />
                                                    Join WhatsApp Community
                                                </a>
                                            </motion.div>

                                            <button
                                                onClick={() => {
                                                    setFormStatus('idle');
                                                    setShowWhatsApp(false);
                                                    setSubmittedData(null);
                                                    // Clear sessionStorage to allow WhatsApp link to show again
                                                    sessionStorage.removeItem('whatsappShown');
                                                }}
                                                className="text-sm font-semibold text-white/60 hover:text-white underline-offset-4 hover:underline transition-all"
                                            >
                                                Submit another application
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form className="space-y-5" onSubmit={handleSubmit}>
                                            {/* Name + Email */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <Field id="name" label="Full Name" type="text" name="name" required placeholder="Your full name" />
                                                <Field id="email" label="College Email" type="email" name="email" required placeholder="roll@hitam.org" />
                                            </div>

                                            {/* Academic info */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <Field id="year" label="Year">
                                                    <select id="year" name="year" required defaultValue="" className={selectClass}>
                                                        <option value="" disabled>Select year</option>
                                                        {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(y => (
                                                            <option key={y} value={y}>{y}</option>
                                                        ))}
                                                    </select>
                                                </Field>
                                                <Field id="branch" label="Branch" className="sm:col-span-1">
                                                    <select id="branch" name="branch" required defaultValue="" className={selectClass}>
                                                        <option value="" disabled>Select branch</option>
                                                        {['Data Science', 'AI & ML', 'CSE Core', 'CSE-ITP', 'Cyber Security', 'ECE', 'EEE', 'Mech', 'MECH-ITP', 'Other'].map(b => (
                                                            <option key={b} value={b}>{b}</option>
                                                        ))}
                                                    </select>
                                                </Field>
                                                <Field id="section" label="Section" optional type="text" name="section" placeholder="e.g. A" />
                                            </div>

                                            {/* Why MINDS — bonus field */}
                                            <Field id="why" label="Why do you want to join?" optional>
                                                <textarea
                                                    id="why"
                                                    name="why"
                                                    rows="3"
                                                    placeholder="Tell us what excites you about MINDS (optional)"
                                                    className="w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all duration-200 resize-none"
                                                />
                                            </Field>

                                            {/* Error banner */}
                                            {formStatus === 'error' && (
                                                <div className="flex items-center gap-3 px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-[10px]">
                                                    <AlertCircle size={14} className="text-rose-400 shrink-0" />
                                                    <p className="text-rose-400 text-sm">Submission failed. Please check your connection and try again.</p>
                                                </div>
                                            )}

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={formStatus === 'sending'}
                                                className="w-full py-4 rounded-[10px] font-bold text-sm text-slate-900 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center gap-2"
                                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08),0 4px 16px rgba(255,255,255,0.08)' }}
                                            >
                                                {formStatus === 'sending' ? (
                                                    <>
                                                        <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-slate-900 animate-spin" />
                                                        Processing Application…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={15} />
                                                        Apply to MINDS — It's Free
                                                    </>
                                                )}
                                            </button>

                                            <p className="text-center text-xs text-slate-600">
                                                By applying you agree to be contacted via email about MINDS events.
                                            </p>
                                        </form>
                                    )}
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default Join;
