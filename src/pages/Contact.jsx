import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const INSTAGRAM_URL = 'https://www.instagram.com/hitam_datascience_club/';

/* ── Contact data ── */
const contactPoints = [
    {
        icon: Mail,
        label: 'Email',
        value: 'minds.datascience@hitam.org',
        sub: 'Inquiries, partnerships & collaborations',
        href: 'mailto:minds.datascience@hitam.org',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Room T19, ET Staff Room',
        sub: 'Dept. of Data Science, HITAM, Hyderabad',
        href: null,
    },
];

const contacts = [
    { name: 'Ms. Richa Tiwari', role: 'Faculty Facilitator', phone: '+91 91315 39794', initials: 'RT' },
    { name: 'Apurba Nandi', role: 'Student Lead', phone: '+91 81797 17349', initials: 'AN' },
    { name: 'Sai Prasanna', role: 'Student Lead', phone: '+91 81061 10146', initials: 'SP' },
];

/* ── Input field ── */
const Field = ({ label, id, ...props }) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500 block">
            {label}
        </label>
        {props.as === 'textarea' ? (
            <textarea
                id={id}
                {...props}
                className="w-full bg-slate-50 border border-slate-200 rounded-[10px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all duration-200 resize-none"
            />
        ) : (
            <input
                id={id}
                {...props}
                className="w-full bg-slate-50 border border-slate-200 rounded-[10px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all duration-200"
            />
        )}
    </div>
);

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        const formData = new FormData(e.target);
        formData.append('_subject', 'New Contact Message from MINDS Website');
        formData.append('_captcha', 'false');
        try {
            const res = await fetch('https://formsubmit.co/ajax/minds.datascience@hitam.org', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            });
            const data = await res.json();
            if (data.success) { setFormStatus('success'); e.target.reset(); }
            else setFormStatus('error');
        } catch { setFormStatus('error'); }
    };

    return (
        <PageTransition>
            <div className="w-full">

                {/* ── Page Hero ── */}
                <section className="pt-36 pb-24 px-6 bg-white grid-texture border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={staggerContainer}
                            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12"
                        >
                            <motion.div variants={fadeInUp} className="max-w-2xl">
                                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-5">Contact</p>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.05]">
                                    Let's start a<br />
                                    <span className="relative inline-block">
                                        conversation.
                                        <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-slate-900 rounded-full" />
                                    </span>
                                </h1>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="max-w-sm lg:pb-2">
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    Questions, collaborations, or just want to know more about MINDS? We want to hear from you.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-10 bg-slate-900 rounded-full shrink-0" />
                                    <p className="text-sm text-slate-500 font-medium leading-snug">
                                        3 ways to reach us · Usually respond within 24 hrs
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Main content ── */}
                <section className="py-20 px-6 bg-white grid-texture">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                            {/* ── LEFT — Contact details (dark panel) ── */}
                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-60px' }}
                                variants={staggerContainer}
                                className="lg:col-span-2 flex flex-col gap-5"
                            >
                                {/* Contact info cards */}
                                {contactPoints.map((c) => {
                                    const Icon = c.icon;
                                    const inner = (
                                        <div className="flex items-start gap-4">
                                            <div className="w-9 h-9 rounded-[8px] bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                                <Icon size={16} className="text-slate-700" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-slate-400 mb-1">{c.label}</p>
                                                <p className="text-sm font-bold text-slate-900 leading-snug break-words">{c.value}</p>
                                                {c.sub && <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{c.sub}</p>}
                                            </div>
                                        </div>
                                    );
                                    return (
                                        <motion.div key={c.label} variants={fadeInUp}>
                                            {c.href ? (
                                                <a href={c.href} className="block bg-white ring-1 ring-slate-900/5 rounded-[14px] p-6 hover:-translate-y-[2px] transition-all duration-200 group" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}>
                                                    {inner}
                                                </a>
                                            ) : (
                                                <div className="bg-white ring-1 ring-slate-900/5 rounded-[14px] p-6" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}>
                                                    {inner}
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}

                                {/* People to reach */}
                                <motion.div
                                    variants={fadeInUp}
                                    className="bg-slate-900 grid-texture-dark rounded-[14px] ring-1 ring-white/5 overflow-hidden"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 16px 48px rgba(0,0,0,0.12)' }}
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                                    <div className="px-6 pt-6 pb-2">
                                        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500 mb-4">Reach People Directly</p>
                                        <div className="space-y-3">
                                            {contacts.map((p) => (
                                                <a
                                                    key={p.name}
                                                    href={`tel:${p.phone.replace(/\s/g, '')}`}
                                                    className="flex items-center gap-3 p-3 rounded-[10px] bg-white/5 border border-white/8 hover:bg-white/10 transition-all duration-200 group"
                                                >
                                                    <div className="w-8 h-8 rounded-[8px] bg-white/10 flex items-center justify-center text-[11px] font-black text-white shrink-0">
                                                        {p.initials}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-sm font-semibold leading-none truncate">{p.name}</p>
                                                        <p className="text-slate-500 text-xs mt-0.5">{p.role}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <Phone size={11} className="text-slate-600" />
                                                        <span className="text-slate-400 text-xs font-medium hidden sm:block">{p.phone}</span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Instagram row */}
                                    <div className="px-6 py-5 mt-3 border-t border-white/8">
                                        <a
                                            href={INSTAGRAM_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shrink-0">
                                                <Instagram size={14} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-semibold">@minds_datascience</p>
                                                <p className="text-slate-500 text-xs">Follow us on Instagram</p>
                                            </div>
                                            <ExternalLink size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                                        </a>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* ── RIGHT — Message form ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="lg:col-span-3 bg-white rounded-[14px] ring-1 ring-slate-900/5 overflow-hidden"
                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                            >
                                {/* Form header */}
                                <div className="px-8 py-6 border-b border-slate-100 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-[8px] bg-slate-900 flex items-center justify-center">
                                        <Send size={14} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-bold text-sm">Send a Message</p>
                                        <p className="text-slate-400 text-xs">We'll reply within 24 hours</p>
                                    </div>
                                </div>

                                {/* Form body */}
                                <div className="p-8">
                                    {formStatus === 'success' ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center text-center py-12 px-4 gap-5"
                                        >
                                            <div className="w-14 h-14 rounded-[14px] bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                                <CheckCircle size={24} className="text-emerald-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-slate-900 font-bold text-xl mb-2">Message sent!</h3>
                                                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                                                    Thanks for reaching out. We'll get back to you at your email within 24 hours.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setFormStatus('idle')}
                                                className="text-sm font-semibold text-slate-900 hover:text-slate-600 underline-offset-4 hover:underline transition-all"
                                            >
                                                Send another message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <Field id="name" label="Your Name" type="text" name="name" required placeholder="e.g. Rahul Sharma" />
                                                <Field id="email" label="Email Address" type="email" name="email" required placeholder="email@example.com" />
                                            </div>
                                            <Field id="subject" label="Subject" type="text" name="subject" placeholder="What's this about?" />
                                            <Field id="message" label="Message" as="textarea" name="message" required rows="5" placeholder="Tell us what's on your mind..." />

                                            {formStatus === 'error' && (
                                                <div className="flex items-center gap-2.5 px-4 py-3 bg-rose-50 border border-rose-100 rounded-[10px]">
                                                    <AlertCircle size={14} className="text-rose-500 shrink-0" />
                                                    <p className="text-rose-600 text-sm">Failed to send. Please try again or email us directly.</p>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={formStatus === 'sending'}
                                                className="w-full py-3.5 rounded-[10px] font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center gap-2"
                                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08),0 4px 12px rgba(15,23,42,0.2)' }}
                                            >
                                                {formStatus === 'sending' ? (
                                                    <>
                                                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                        Sending…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={15} />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>

                                            <p className="text-center text-xs text-slate-400">
                                                Or email us directly at{' '}
                                                <a href="mailto:minds.datascience@hitam.org" className="text-slate-700 font-semibold hover:underline">
                                                    minds.datascience@hitam.org
                                                </a>
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

export default Contact;
