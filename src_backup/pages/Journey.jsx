import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, FileCheck, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const milestones = [
    {
        date: 'Early 2025',
        tag: 'The Spark',
        label: '01',
        title: 'The question nobody could answer.',
        description: 'A group of students and a few faculty members kept running into the same wall — HITAM had a Data Science department, but no real space for students to connect classroom knowledge to actual career skills. That friction became the foundation.',
        icon: Lightbulb,
        dark: false,
    },
    {
        date: 'Mid 2025',
        tag: 'Planning Phase',
        label: '02',
        title: 'Months of blueprinting.',
        description: 'No shortcuts. We mapped out what a genuinely useful student initiative would look like — industry expert sessions, competitive datathons, hands-on workshops, and a team structure built to last. Every decision was deliberate.',
        icon: Users,
        dark: true,
    },
    {
        date: '19 February 2026',
        tag: 'Official Confirmation',
        label: '03',
        title: 'Dean Engagement signs off.',
        description: 'On 19th February 2026, we received the official confirmation mail from the Dean of Student Engagement at HITAM. MINDS was no longer an idea — it was an official student initiative of the Data Science Department.',
        icon: FileCheck,
        dark: false,
        highlight: true,
    },
    {
        date: '27 February 2026',
        tag: 'Official Launch',
        label: '04',
        title: 'MINDS goes live.',
        description: 'The official inauguration. After a year of planning, structuring, and getting every detail right — MINDS opened its doors. Chapter 01 begins. The Data Science community at HITAM finally has a home.',
        icon: Rocket,
        dark: true,
        highlight: true,
    },
];

const Journey = () => {
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
                                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-5">Our Journey</p>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.05]">
                                    A year in<br />
                                    the making.
                                </h1>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="max-w-sm lg:pb-2">
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    MINDS didn't launch overnight. Every milestone below was earned — one decision, one conversation, one confirmation at a time.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-10 bg-slate-900 rounded-full shrink-0" />
                                    <p className="text-sm text-slate-500 font-medium leading-snug">
                                        Early 2025 → 27 Feb 2026 · Official Launch
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Dark stat strip ── */}
                <section className="bg-slate-900 grid-texture-dark py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap gap-12"
                        >
                            {[
                                { v: '~12', l: 'Months of planning' },
                                { v: '4', l: 'Key milestones' },
                                { v: '1', l: 'Official confirmation' },
                                { v: 'Ch.01', l: 'Club launched' },
                            ].map(s => (
                                <div key={s.l} className="flex flex-col">
                                    <span className="text-3xl font-black text-white tracking-tighter leading-none">{s.v}</span>
                                    <span className="text-xs text-slate-500 mt-1.5 font-medium">{s.l}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── Timeline ── */}
                <section className="py-28 px-6 bg-white grid-texture">
                    <div className="max-w-5xl mx-auto">

                        {/* Vertical spine */}
                        <div className="relative">
                            <div className="hidden md:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-slate-200" />

                            <div className="space-y-6">
                                {milestones.map((m, i) => {
                                    const Icon = m.icon;
                                    const isEven = i % 2 === 0;
                                    return (
                                        <motion.div
                                            key={m.label}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-80px' }}
                                            transition={{ duration: 0.55, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                                            className={`relative flex items-center gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}
                                        >
                                            {/* Card — takes 45% width on desktop */}
                                            <div className={`w-full md:w-[46%] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                                <div
                                                    className={`rounded-[14px] ring-1 ring-slate-900/5 p-8 transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] group relative overflow-hidden ${m.dark ? 'bg-slate-900' : 'bg-white'}`}
                                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                                                >
                                                    {/* Highlight accent bar for key milestone cards */}
                                                    {m.highlight && (
                                                        <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-[14px] bg-slate-900 ${m.dark ? 'bg-white/20' : 'bg-slate-900'}`} />
                                                    )}

                                                    <div className="flex items-start gap-4">
                                                        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${m.dark ? 'bg-white/10 text-white border border-white/15' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}>
                                                            <Icon size={18} strokeWidth={2} />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className={`text-[10px] font-black tracking-[0.15em] uppercase ${m.dark ? 'text-slate-500' : 'text-slate-400'}`}>{m.tag}</span>
                                                            </div>
                                                            <p className={`text-xs font-semibold tracking-[0.08em] uppercase mb-3 ${m.dark ? 'text-slate-300' : 'text-slate-900'}`}>{m.date}</p>
                                                            <h3 className={`text-lg font-bold mb-3 tracking-tight ${m.dark ? 'text-white' : 'text-slate-900'}`}>{m.title}</h3>
                                                            <p className={`text-sm leading-relaxed ${m.dark ? 'text-slate-400' : 'text-slate-600'}`}>{m.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Center dot — visible on md+ */}
                                            <div className="hidden md:flex w-[8%] justify-center items-center shrink-0">
                                                <div className={`w-4 h-4 rounded-full border-4 z-10 ${m.highlight ? 'bg-slate-900 border-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,0.12)]' : 'bg-white border-slate-300'}`} />
                                            </div>

                                            {/* Mobile top dot */}
                                            <div className="md:hidden flex justify-start w-full mb-3 pl-1">
                                                <div className={`w-3 h-3 rounded-full ${m.highlight ? 'bg-slate-900' : 'bg-slate-300'}`} />
                                            </div>

                                            {/* Spacer — empty right side */}
                                            <div className="hidden md:block w-[46%]" />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* What's next placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-16 bg-slate-50 rounded-[14px] ring-1 ring-slate-900/5 p-10 flex flex-col md:flex-row md:items-center justify-between gap-8"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                        >
                            <div>
                                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-3">What's Next</p>
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                                    The story is still being written.
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
                                    Chapter 01 has just begun. Events, workshops, datathons, and collaborations — everything on the roadmap is now live and building momentum.
                                </p>
                            </div>
                            <div className="flex gap-3 shrink-0">
                                <Link
                                    to="/events"
                                    className="px-5 py-2.5 rounded-[10px] font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center gap-2 group"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08),0 4px 12px rgba(15,23,42,0.15)' }}
                                >
                                    View Events
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                                </Link>
                                <Link
                                    to="/join"
                                    className="px-5 py-2.5 rounded-[10px] font-medium text-sm text-slate-700 bg-white ring-1 ring-slate-300 hover:bg-slate-50 transition-all duration-[250ms] flex items-center"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                                >
                                    Join MINDS
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default Journey;
