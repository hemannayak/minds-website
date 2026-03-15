import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSekycKn-NS94WEWZzakhkx2cv5uHI5ySLRZtkrNZWsThkA5qA/viewform?embedded=true';
const FORM_URL = 'https://forms.gle/R6w2dvaduqBZTMyV6';

/* ── Data ── */
const leadership = [
    {
        name: 'Dr. David Raju Kolluri',
        role: 'Head of Department',
        dept: 'Data Science, HITAM',
        initials: 'DK',
        tag: 'HOD',
    },
    {
        name: 'Mr. Bhaskar Das',
        role: 'Program Head',
        dept: 'MINDS Tech Initiative',
        initials: 'BD',
        tag: 'Program Head',
    },
    {
        name: 'Ms. Richa Tiwari',
        role: 'Faculty Facilitator',
        dept: 'MINDS Club',
        initials: 'RT',
        tag: 'Facilitator',
    },
];

const teams = [
    {
        label: 'Registration',
        lead: 'Hemanth Nayak',
        members: ['Deepnitha', 'Siddhartha Varma', 'Goutham'],
        dark: false,
    },
    {
        label: 'Logistics',
        lead: 'Apurba Nandi',
        members: ['Sohan', 'Charlson', 'Dhanudeep', 'Akanksha', 'Bhuvana'],
        dark: true,
    },
    {
        label: 'PR & Media',
        lead: 'Sai Prasanna',
        members: ['Sarika', 'Nootan', 'Vikas', 'Mourya', 'Keerthana', 'Harshitha', 'Sindhu', 'Karthik', 'Lakshmi'],
        dark: false,
    },
];

const initials = (name) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

/* ── Team page ── */
const Team = () => {
    const [showForm, setShowForm] = useState(false);

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
                            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40 mb-5">The Team</p>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] leading-[1.05]">
                                The people<br />
                                who made it{' '}
                                <span className="accent-word">
                                    happen.
                                </span>
                            </h1>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="max-w-sm lg:pb-2">
                            <p className="text-lg text-white/60 leading-relaxed mb-6">
                                Faculty who believed in the vision, and students who showed up every day to build it — this is the MINDS team.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-[3px] h-10 bg-white rounded-full shrink-0" />
                                <p className="text-sm text-white/50 font-medium leading-snug">
                                    3 Faculty · 3 Teams · {teams.reduce((acc, t) => acc + t.members.length + 1, 0)} Student Members
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Faculty Leadership ── */}
            <section className="py-24 px-6 bg-[#0a0a0a] grid-texture border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-14">
                            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">Faculty</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
                                Leadership that made MINDS official.
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {leadership.map((m, i) => (
                                <motion.div
                                    key={m.name}
                                    variants={fadeInUp}
                                    className="group relative rounded-[16px] overflow-hidden border border-white/[0.07] bg-white/[0.03] hover:-translate-y-[3px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4)' }}
                                    whileHover={{ borderColor: 'rgba(255,255,255,0.14)', boxShadow: '0 2px 4px rgba(0,0,0,0.6), 0 20px 48px rgba(0,0,0,0.5)' }}
                                >
                                    {/* Top shimmer line */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                    {/* Left accent on hover */}
                                    <div className="absolute left-0 inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="p-7">
                                        {/* Avatar + tag row */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="w-12 h-12 rounded-[12px] bg-white/[0.06] border border-white/10 flex items-center justify-center text-white text-sm font-black tracking-tight group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                                                {m.initials}
                                            </div>
                                            <span className="text-[9px] font-bold tracking-[0.16em] uppercase text-white/20 border border-white/[0.07] rounded-full px-2.5 py-1 bg-white/[0.02]">{m.tag}</span>
                                        </div>

                                        {/* Name + role */}
                                        <h3 className="text-base font-bold text-white leading-snug mb-0.5">{m.name}</h3>
                                        <p className="text-sm font-medium text-white/60 mb-3">{m.role}</p>
                                        <p className="text-xs text-white/30">{m.dept}</p>
                                    </div>

                                    {/* Bottom gradient fade */}
                                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Core Committee Recruitment Banner ── */}
            <section className="px-6 py-8 bg-[#080808] grid-texture border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="relative bg-[#0f0f0f] rounded-[16px] overflow-hidden border border-white/10"
                        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.4)' }}
                    >
                        {/* Subtle shimmer top line */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <div className="px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-5">
                                {/* Icon */}
                                <div className="w-11 h-11 rounded-[10px] bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Sparkles size={18} className="text-white" />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/30">Core Committee</span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-emerald-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            Applications Open
                                        </span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-1">
                                        First-ever Core Committee recruitment is live! 🚀
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed max-w-lg">
                                        We're building the team that runs MINDS. If you want to lead events, drive strategy, and actually build something — this is your moment.
                                    </p>
                                </div>
                            </div>

                            {/* Apply button */}
                            <div className="shrink-0">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-all duration-200 hover:-translate-y-[1px]"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 4px 12px rgba(255,255,255,0.08)' }}
                                >
                                    Apply Now
                                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Organizing Teams ── */}
            <section className="py-24 px-6 bg-[#080808] grid-texture border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-14">
                            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">Student Organizers</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
                                Inauguration Organizing Teams
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {teams.map((team, i) => (
                                <motion.div
                                    key={team.label}
                                    variants={fadeInUp}
                                    className="group relative rounded-[16px] overflow-hidden border border-white/[0.07] bg-white/[0.03] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px]"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4)' }}
                                    whileHover={{ borderColor: 'rgba(255,255,255,0.14)', boxShadow: '0 2px 4px rgba(0,0,0,0.6), 0 20px 48px rgba(0,0,0,0.5)' }}
                                >
                                    {/* Top shimmer */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                    {/* Card header */}
                                    <div className="px-7 pt-7 pb-5 border-b border-white/[0.06]">
                                        <span className="text-[9px] font-bold tracking-[0.18em] uppercase mb-3 block text-white/25">Team</span>
                                        <h3 className="text-xl font-bold tracking-tight mb-5 text-white">{team.label}</h3>

                                        {/* Lead badge */}
                                        <div className="inline-flex items-center gap-2.5 rounded-[10px] px-3.5 py-2.5 bg-white/[0.05] border border-white/10">
                                            <div className="w-7 h-7 rounded-[7px] bg-white flex items-center justify-center text-[10px] font-black shrink-0 text-slate-900">
                                                {initials(team.lead)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold leading-none mb-0.5 text-white">{team.lead}</p>
                                                <p className="text-[10px] text-white/30">Team Lead</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Members */}
                                    <div className="px-7 py-5 flex-1">
                                        <p className="text-[9px] font-bold tracking-[0.16em] uppercase mb-4 text-white/20">
                                            {team.members.length} Members
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {team.members.map((name) => (
                                                <div
                                                    key={name}
                                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.07] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                                                >
                                                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black shrink-0 bg-white/10 text-white">
                                                        {initials(name)}
                                                    </span>
                                                    {name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>

        {/* ── Embedded Form Modal ── */}
        <AnimatePresence>
            {showForm && (
                <>
                    <motion.div
                        key="team-form-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowForm(false)}
                    />
                    <motion.div
                        key="team-form-modal"
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 12 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                        className="fixed inset-4 sm:inset-8 md:inset-[5vh_10vw] z-[310] flex flex-col rounded-[20px] overflow-hidden border border-white/10 bg-[#0f0f0f]"
                        style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}
                    >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
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
                                    href={FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all text-[11px] font-medium"
                                >
                                    <ExternalLink size={11} />
                                    Open in new tab
                                </a>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="w-8 h-8 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden bg-white">
                            <iframe
                                src={FORM_EMBED_URL}
                                title="MINDS Core Committee Application Form"
                                className="w-full h-full border-0"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    </PageTransition>
    );
};

export default Team;


