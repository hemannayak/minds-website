import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Globe, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const philosophy = [
    {
        icon: Zap,
        label: '01',
        title: 'Born from Frustration.',
        body: 'Most college clubs talk. We decided to build. MINDS was created because students kept graduating with theory but zero real-world readiness — and that needed to change.',
    },
    {
        icon: Users,
        label: '02',
        title: 'Shaped by Students.',
        body: 'Not a top-down initiative. Not a faculty project. MINDS was designed by the students who needed it most — and it stays that way.',
    },
    {
        icon: Globe,
        label: '03',
        title: 'Open to Every Branch.',
        body: 'Data science isn\'t a CS-only career. If curiosity brought you here, you belong here. We welcome every department, every background.',
    },
    {
        icon: TrendingUp,
        label: '04',
        title: 'Obsessed with Outcomes.',
        body: 'Every session, every workshop, every datathon has one question attached: did it move you forward? If not, we don\'t do it.',
    },
];

const About = () => {
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
                            {/* Left: heading */}
                            <motion.div variants={fadeInUp} className="max-w-2xl">
                                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-5">About MINDS</p>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.05]">
                                    We exist so you<br />
                                    don't have to{' '}
                                    <span className="relative inline-block">
                                        figure it out
                                        <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-slate-900 rounded-full" />
                                    </span>
                                    {' '}alone.
                                </h1>
                            </motion.div>

                            {/* Right: 2-line context */}
                            <motion.div variants={fadeInUp} className="max-w-sm lg:pb-2">
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    MINDS is the official student initiative of the Data Science Department, HITAM — built for anyone who wants to make data science their career, regardless of what branch they're from.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-10 bg-slate-900 rounded-full shrink-0" />
                                    <p className="text-sm text-slate-500 font-medium leading-snug">
                                        Chapter 01 · Open to all departments · HITAM, Hyderabad
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Dark Manifesto Strip ── */}
                <section className="bg-slate-900 grid-texture-dark py-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-8"
                        >
                            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight max-w-2xl leading-snug">
                                "The gap between knowing data science and{' '}
                                <span className="text-slate-400">doing</span>{' '}
                                data science — that's what we close."
                            </p>
                            <div className="shrink-0 flex flex-col gap-2 text-right">
                                <span className="text-slate-400 text-sm font-medium">— The MINDS Founding Team</span>
                                <span className="text-slate-600 text-xs tracking-wide">Data Science Dept, HITAM</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Origin Story — asymmetric 2+1 grid ── */}
                <section className="py-28 px-6 bg-white grid-texture border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                        >
                            {/* Wide left card */}
                            <motion.div
                                variants={fadeInUp}
                                className="lg:col-span-2 bg-white rounded-[14px] ring-1 ring-slate-900/5 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                            >
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-slate-900 rounded-t-[14px]" />
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-4">The Origin</p>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-5">
                                        A year of planning.<br />One clear mission.
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed text-sm max-w-lg">
                                        MINDS didn't start with a logo or a committee. It started with a question nobody had a good answer to: <em>"How do students at HITAM actually get ready for a data science career?"</em> That question became our founding document.
                                    </p>
                                </div>
                                <div className="mt-8 flex gap-8">
                                    {[
                                        { v: 'Ch.01', l: 'Inaugural Chapter' },
                                        { v: 'All', l: 'Depts Welcome' },
                                        { v: '∞', l: 'Learning Paths' },
                                    ].map(s => (
                                        <div key={s.l}>
                                            <div className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{s.v}</div>
                                            <div className="text-xs text-slate-500 mt-1 font-medium">{s.l}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Narrow right dark card */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-slate-900 rounded-[14px] ring-1 ring-slate-900/5 p-8 md:p-10 flex flex-col justify-between min-h-[300px]"
                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                            >
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">Our Belief</p>
                                    <h3 className="text-xl font-bold text-white mb-5 leading-snug">
                                        Curiosity is the only prerequisite.
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        You don't need to be a coder. You don't need to be from CS. You need to want it badly enough to show up.
                                    </p>
                                </div>
                                <Link
                                    to="/join"
                                    className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] font-medium text-sm text-slate-900 bg-white hover:bg-slate-50 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] group self-start"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}
                                >
                                    Join Us
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Philosophy — horizontal cards with left accent ── */}
                <section className="py-28 px-6 bg-slate-50 grid-texture border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="mb-14">
                                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-4">Our Philosophy</p>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.02em]">
                                    Four things we refuse to compromise on.
                                </h2>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {philosophy.map((p) => {
                                    const Icon = p.icon;
                                    return (
                                        <motion.div
                                            key={p.title}
                                            variants={fadeInUp}
                                            className="bg-white rounded-[14px] ring-1 ring-slate-900/5 p-6 sm:p-8 flex gap-4 sm:gap-6 relative overflow-hidden transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] group"
                                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                                        >
                                            {/* Left accent bar */}
                                            <div className="absolute left-0 inset-y-0 w-[3px] bg-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Number label */}
                                            <div className="shrink-0 w-10 h-10 rounded-[10px] bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 tracking-tight group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
                                                {p.label}
                                            </div>

                                            <div>
                                                <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">{p.title}</h3>
                                                <p className="text-slate-600 text-sm leading-relaxed">{p.body}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── CTA — horizontal split bar ── */}
                <section className="py-24 px-6 bg-white grid-texture">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-slate-900 rounded-[14px] p-8 sm:p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-10 relative overflow-hidden"
                        >
                            {/* subtle top line */}
                            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

                            <div className="max-w-xl">
                                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">What's Next</p>
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em] mb-3">
                                    Your curiosity found the right room.
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Fill out the form, join the community. There's no better time than now.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 shrink-0">
                                <Link
                                    to="/join"
                                    className="px-6 py-3 rounded-[10px] font-medium text-sm text-slate-900 bg-white hover:bg-slate-50 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center gap-2 group"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}
                                >
                                    Join MINDS
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                                </Link>
                                <Link
                                    to="/events"
                                    className="px-6 py-3 rounded-[10px] font-medium text-sm text-slate-300 hover:text-white ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center"
                                >
                                    See our events
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default About;
