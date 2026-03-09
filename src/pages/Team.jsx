import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

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
const Team = () => (
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
                            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-5">The Team</p>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.05]">
                                The people<br />
                                who made it{' '}
                                <span className="relative inline-block">
                                    happen.
                                    <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-slate-900 rounded-full" />
                                </span>
                            </h1>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="max-w-sm lg:pb-2">
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Faculty who believed in the vision, and students who showed up every day to build it — this is the MINDS team.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-[3px] h-10 bg-slate-900 rounded-full shrink-0" />
                                <p className="text-sm text-slate-500 font-medium leading-snug">
                                    3 Faculty · 3 Teams · {teams.reduce((acc, t) => acc + t.members.length + 1, 0)} Student Members
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Faculty Leadership ── */}
            <section className="py-24 px-6 bg-slate-50 grid-texture border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-14">
                            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-4">Faculty</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.02em]">
                                Leadership that made MINDS official.
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {leadership.map((m, i) => (
                                <motion.div
                                    key={m.name}
                                    variants={fadeInUp}
                                    className="bg-white rounded-[14px] ring-1 ring-slate-900/5 p-8 flex gap-5 items-start transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] group relative overflow-hidden"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                                >
                                    <div className="absolute left-0 inset-y-0 w-[3px] bg-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-[10px] bg-slate-900 flex items-center justify-center shrink-0 text-white text-sm font-black tracking-tight">
                                        {m.initials}
                                    </div>

                                    <div className="min-w-0">
                                        <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-slate-400 block mb-1">{m.tag}</span>
                                        <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">{m.name}</h3>
                                        <p className="text-sm font-medium text-slate-700">{m.role}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{m.dept}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Core Committee Recruitment Banner ── */}
            <section className="px-6 py-8 bg-white grid-texture border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="relative bg-slate-900 grid-texture-dark rounded-[14px] overflow-hidden"
                        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 16px 48px rgba(0,0,0,0.12)' }}
                    >
                        {/* Subtle shimmer top line */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <div className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-5">
                                {/* Icon */}
                                <div className="w-11 h-11 rounded-[10px] bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Sparkles size={18} className="text-white" />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500">Next Batch</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-emerald-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            We're Recruiting
                                        </span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-1">
                                        Core Committee spots are opening up. 🚀
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                                        Want to run events, lead teams, and actually build something? Applications for the MINDS Core Committee open soon — be first in line.
                                    </p>
                                </div>
                            </div>

                            {/* Right side status */}
                            <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
                                <div className="px-4 py-2 rounded-[8px] bg-white/5 border border-white/10 text-center">
                                    <p className="text-white font-black text-2xl leading-none">B02</p>
                                    <p className="text-slate-500 text-[10px] font-semibold tracking-wide uppercase mt-0.5">Batch</p>
                                </div>
                                <p className="text-slate-500 text-xs">Announcement dropping soon</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Organizing Teams ── */}
            <section className="py-24 px-6 bg-white grid-texture border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-14">
                            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-4">Student Organizers</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-[-0.02em]">
                                Inauguration Organizing Teams
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {teams.map((team, i) => (
                                <motion.div
                                    key={team.label}
                                    variants={fadeInUp}
                                    className={`rounded-[14px] ring-1 ring-slate-900/5 overflow-hidden flex flex-col transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] ${team.dark ? 'bg-slate-900' : 'bg-white'}`}
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                                >
                                    {/* Card header */}
                                    <div className={`px-7 pt-7 pb-5 border-b ${team.dark ? 'border-white/8' : 'border-slate-100'}`}>
                                        <span className={`text-[10px] font-bold tracking-[0.16em] uppercase mb-3 block ${team.dark ? 'text-slate-500' : 'text-slate-400'}`}>
                                            Team
                                        </span>
                                        <h3 className={`text-xl font-bold tracking-tight mb-4 ${team.dark ? 'text-white' : 'text-slate-900'}`}>
                                            {team.label}
                                        </h3>

                                        {/* Lead */}
                                        <div className={`flex items-center gap-3 rounded-[10px] px-4 py-3 ${team.dark ? 'bg-white/8 border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
                                            <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center text-[11px] font-black shrink-0 ${team.dark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                                                {initials(team.lead)}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold leading-none mb-0.5 ${team.dark ? 'text-white' : 'text-slate-900'}`}>{team.lead}</p>
                                                <p className={`text-[11px] ${team.dark ? 'text-slate-500' : 'text-slate-400'}`}>Team Lead</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Members grid */}
                                    <div className="px-7 py-5 flex-1">
                                        <p className={`text-[10px] font-bold tracking-[0.14em] uppercase mb-4 ${team.dark ? 'text-slate-600' : 'text-slate-400'}`}>
                                            {team.members.length} Members
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {team.members.map((name) => (
                                                <div
                                                    key={name}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${team.dark ? 'bg-white/5 border border-white/10 text-slate-300' : 'bg-slate-50 border border-slate-100 text-slate-700'}`}
                                                >
                                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${team.dark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}`}>
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
    </PageTransition>
);

export default Team;
