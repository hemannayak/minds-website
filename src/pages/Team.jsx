import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

/* ─────────────────────────────── Data ─────────────────────────── */

const leadership = [
    {
        name: 'Dr. David Raju Kolluri',
        role: 'Head of Department',
        dept: 'Data Science',
        initials: 'KR',
        gradient: 'from-blue-500 to-indigo-600',
        iconBg: 'bg-blue-50',
        iconText: 'text-blue-600',
    },
    {
        name: 'Mr. Bhaskar Das',
        role: 'Program Head',
        dept: 'MINDS Tech Initiative',
        initials: 'BD',
        gradient: 'from-indigo-500 to-violet-600',
        iconBg: 'bg-indigo-50',
        iconText: 'text-indigo-600',
    },
    {
        name: 'Ms. Richa Tiwari',
        role: 'Faculty Facilitator',
        dept: 'MINDS Club',
        initials: 'RT',
        gradient: 'from-emerald-500 to-teal-600',
        iconBg: 'bg-emerald-50',
        iconText: 'text-emerald-600',
    },
];

const teams = [
    {
        label: 'Registration Team',
        accentBg: 'bg-indigo-50',
        accentText: 'text-indigo-600',
        accentBorder: 'border-indigo-100',
        gradient: 'from-indigo-500 to-sky-500',
        lead: { name: 'Hemanth', initials: 'HE' },
        members: ['Deepnitha', 'Siddarth', 'Gowtham'],
    },
    {
        label: 'Logistics Team',
        accentBg: 'bg-amber-50',
        accentText: 'text-amber-600',
        accentBorder: 'border-amber-100',
        gradient: 'from-amber-500 to-orange-500',
        lead: { name: 'Apurba Nandi', initials: 'AN' },
        members: ['Sohan', 'Charlson', 'Dhanudeep'],
    },
    {
        label: 'PR & Media',
        accentBg: 'bg-pink-50',
        accentText: 'text-pink-600',
        accentBorder: 'border-pink-100',
        gradient: 'from-pink-500 to-purple-500',
        lead: { name: 'Sai Prasanna', initials: 'SP' },
        members: ['Sarika', 'Keerthana', 'Harshitha', 'Sindhu', 'Karthik'],
    },
];

/* helpers */
const initials = (name) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

/* ──────────────────────────── Faculty Card ────────────────────── */

const FacultyCard = ({ member }) => (
    <motion.div
        variants={fadeInUp}
        className="group relative bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
    >
        {/* hover glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Avatar */}
        <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-6 shadow-lg`}>
            <span className="text-2xl font-black text-white tracking-tight">{member.initials}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-1.5 group-hover:text-indigo-600 transition-colors leading-snug">
            {member.name}
        </h3>
        <p className={`text-xs font-bold uppercase tracking-widest ${member.iconText} mb-1`}>{member.role}</p>
        <p className="text-slate-400 text-sm">{member.dept}</p>
    </motion.div>
);

/* ──────────────────────────── Organising Card ─────────────────── */

const OrganisingCard = ({ team }) => (
    <motion.div
        variants={fadeInUp}
        className="group bg-white border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col"
    >
        {/* Category badge */}
        <div className={`inline-flex items-center self-start px-3 py-1 rounded-full ${team.accentBg} ${team.accentBorder} border ${team.accentText} text-xs font-bold uppercase tracking-widest mb-7`}>
            {team.label}
        </div>

        {/* Lead */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">Lead</p>
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 mb-6">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${team.gradient} flex items-center justify-center shadow`}>
                <span className="text-xs font-black text-white">{team.lead.initials}</span>
            </div>
            <div>
                <p className="text-slate-800 font-bold text-sm leading-none mb-0.5">{team.lead.name}</p>
                <p className={`text-xs font-semibold ${team.accentText}`}>{team.label} Lead</p>
            </div>
        </div>

        {/* Members */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Members</p>
        <div className="grid grid-cols-2 gap-2 mt-auto">
            {team.members.map((name) => (
                <div
                    key={name}
                    className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-3 py-2.5 hover:bg-slate-100 transition-colors"
                >
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${team.gradient} flex items-center justify-center shrink-0`}>
                        <span className="text-[10px] font-bold text-white">{initials(name)}</span>
                    </div>
                    <span className="text-slate-600 text-sm font-medium truncate">{name}</span>
                </div>
            ))}
        </div>
    </motion.div>
);

/* ─────────────────────────────── Page ─────────────────────────── */

const Team = () => (
    <PageTransition>
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">

            {/* Page heading — matches About / Events style */}
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight pb-1">
                    Meet the{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                        Minds
                    </span>{' '}
                    Behind MINDS
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed">
                    Faculty leadership and a dedicated student organizing team working tirelessly
                    to deliver an impactful event experience.
                </p>
            </div>

            {/* ── Faculty Leadership ── */}
            <div className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-px bg-slate-200 flex-1" />
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Faculty Leadership</h2>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={staggerContainer}
                >
                    {leadership.map((m) => (
                        <FacultyCard key={m.name} member={m} />
                    ))}
                </motion.div>
            </div>

            {/* ── Event Organising Team ── */}
            <div>
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-px bg-slate-200 flex-1" />
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Event Organizing Team</h2>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={staggerContainer}
                >
                    {teams.map((team) => (
                        <OrganisingCard key={team.label} team={team} />
                    ))}
                </motion.div>
            </div>

            {/* ── Core Team Recruitment – Coming Soon ── */}
            <motion.div
                className="mt-20 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="relative rounded-3xl p-px bg-gradient-to-br from-indigo-400 via-sky-400 to-purple-400 shadow-lg shadow-indigo-100">
                    {/* Inner card */}
                    <div className="relative bg-white rounded-3xl px-10 py-12 text-center overflow-hidden">
                        {/* Subtle glow blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-50 rounded-full blur-3xl pointer-events-none" />

                        {/* Icon */}
                        <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6 shadow-sm">
                            <Sparkles size={26} strokeWidth={1.8} />
                        </div>

                        {/* Label */}
                        <p className="relative z-10 text-xs font-bold uppercase tracking-[0.22em] text-indigo-500 mb-3">
                            Core Team Recruitment
                        </p>

                        {/* Title */}
                        <h2 className="relative z-10 text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-4">
                            Something exciting is{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                                coming soon
                            </span>
                        </h2>

                        {/* Message */}
                        <p className="relative z-10 text-slate-500 leading-relaxed max-w-md mx-auto text-base">
                            We'll be opening doors for passionate students to be part of the MINDS leadership team.
                            Stay tuned — your opportunity to shape what's next is on the horizon.
                        </p>

                        {/* Decorative pill */}
                        <div className="relative z-10 inline-flex items-center gap-2 mt-8 px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-400 text-sm font-semibold">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                            Announcement Coming Soon
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    </PageTransition>
);

export default Team;
