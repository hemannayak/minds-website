import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

/* ───────────────────────────── Data ───────────────────────────── */

const leadership = [
    {
        name: 'Dr. Kolluru David Raju',
        role: 'Head of Department',
        dept: 'Data Science',
        initials: 'KR',
        hue: 'from-blue-600 to-indigo-700',
    },
    {
        name: 'Mr. Bhaskar Das',
        role: 'Program Head',
        dept: 'MINDS Tech Initiative',
        initials: 'BD',
        hue: 'from-violet-600 to-purple-700',
    },
    {
        name: 'Ms. Richa Tiwari',
        role: 'Faculty Program Representative',
        dept: 'MINDS Club',
        initials: 'RT',
        hue: 'from-teal-600 to-emerald-700',
    },
];

const teams = [
    {
        label: 'Registration',
        dotColor: 'bg-sky-400',
        lineColor: 'bg-sky-500/20',
        textAccent: 'text-sky-400',
        lead: 'Hemanth',
        members: ['Deepnitha', 'Siddarth', 'Gowtham'],
    },
    {
        label: 'Logistics',
        dotColor: 'bg-amber-400',
        lineColor: 'bg-amber-500/20',
        textAccent: 'text-amber-400',
        lead: 'Apurba',
        members: ['Sohan', 'Charlson', 'Dhanudeep'],
    },
    {
        label: 'PR & Media',
        dotColor: 'bg-pink-400',
        lineColor: 'bg-pink-500/20',
        textAccent: 'text-pink-400',
        lead: 'Prasanna',
        members: ['Sarika', 'Keerthana', 'Harshitha', 'Sindhu', 'Karthik'],
    },
];

/* ──────────────────────────── Sub-components ──────────────────── */

const Avatar = ({ initials, hue, size = 'sm' }) => {
    const dim = size === 'lg' ? 'w-14 h-14 text-base' : 'w-9 h-9 text-xs';
    return (
        <div className={`${dim} rounded-xl bg-gradient-to-br ${hue} flex items-center justify-center font-bold text-white shrink-0 shadow-lg`}>
            {initials}
        </div>
    );
};

/** Thin horizontal rule with center label */
const Divider = ({ label }) => (
    <div className="flex items-center gap-5 mb-12">
        <div className="h-px bg-slate-800 flex-1" />
        <span className="text-[10px] font-semibold tracking-[0.22em] text-slate-500 uppercase">{label}</span>
        <div className="h-px bg-slate-800 flex-1" />
    </div>
);

/** Faculty row — horizontal minimal design */
const FacultyRow = ({ member, index }) => (
    <motion.div
        variants={fadeInUp}
        className="group flex items-center gap-5 py-5 px-6 rounded-2xl border border-transparent hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-300 cursor-default"
    >
        <Avatar initials={member.initials} hue={member.hue} size="lg" />
        <div className="flex-1 min-w-0">
            <p className="text-slate-100 font-semibold text-base leading-snug truncate">{member.name}</p>
            <p className="text-slate-500 text-sm mt-0.5">{member.dept}</p>
        </div>
        <span className="text-xs font-semibold text-slate-400 tracking-wide hidden sm:block">{member.role}</span>
    </motion.div>
);

/** Organising team column */
const TeamColumn = ({ team }) => (
    <motion.div variants={fadeInUp} className="flex flex-col">
        {/* Category header */}
        <div className="flex items-center gap-2.5 mb-6">
            <span className={`w-2 h-2 rounded-full ${team.dotColor}`} />
            <h3 className={`text-xs font-bold tracking-[0.18em] uppercase ${team.textAccent}`}>{team.label} Team</h3>
        </div>

        {/* Lead */}
        <div className="mb-4">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold mb-2 pl-1">Lead</p>
            <div className="flex items-center gap-3 bg-slate-800/70 rounded-xl px-4 py-3.5 border border-slate-700/60">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${team.dotColor === 'bg-sky-400' ? 'from-sky-500 to-blue-600'
                        : team.dotColor === 'bg-amber-400' ? 'from-amber-500 to-orange-600'
                            : 'from-pink-500 to-rose-600'
                    } flex items-center justify-center shrink-0`}>
                    <span className="text-xs font-bold text-white">{team.lead.slice(0, 2).toUpperCase()}</span>
                </div>
                <span className="text-slate-100 font-semibold text-sm">{team.lead}</span>
            </div>
        </div>

        {/* Members */}
        <div>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold mb-2 pl-1">Members</p>
            <div className="flex flex-col gap-1.5">
                {team.members.map((name) => (
                    <div
                        key={name}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800/50 transition-colors duration-150 group/m"
                    >
                        <span className={`w-1 h-1 rounded-full ${team.dotColor} opacity-70 group-hover/m:opacity-100 transition-opacity`} />
                        <span className="text-slate-400 text-sm font-medium group-hover/m:text-slate-200 transition-colors">{name}</span>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
);

/* ─────────────────────────────── Page ─────────────────────────── */

const Team = () => (
    <PageTransition>
        <div className="min-h-screen bg-[#080c14] text-white">
            <div className="pt-32 pb-28 px-6 max-w-6xl mx-auto">

                {/* ── Heading ── */}
                <motion.div
                    className="mb-20 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                    <p className="text-xs font-bold tracking-[0.22em] text-indigo-400 uppercase mb-4">MINDS Club</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] pb-1">
                        The People Behind<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-violet-300">
                            Every Great Session
                        </span>
                    </h1>
                    <p className="mt-5 text-slate-400 text-base leading-relaxed max-w-lg">
                        Faculty leadership and a dedicated student organizing team committed to delivering a world-class career event.
                    </p>
                </motion.div>

                {/* ── Faculty Leadership ── */}
                <section className="mb-20">
                    <Divider label="Faculty Leadership" />
                    <motion.div
                        className="flex flex-col divide-y divide-slate-800/60"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={staggerContainer}
                    >
                        {leadership.map((m) => (
                            <FacultyRow key={m.name} member={m} />
                        ))}
                    </motion.div>
                </section>

                {/* ── Event Organizing Team ── */}
                <section>
                    <Divider label="Event Organizing Team" />

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-800"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={staggerContainer}
                    >
                        {teams.map((team, i) => (
                            <div
                                key={team.label}
                                className={`bg-[#080c14] p-8 ${i !== teams.length - 1 ? 'md:border-r border-b md:border-b-0 border-slate-800/60' : ''}`}
                            >
                                <TeamColumn team={team} />
                            </div>
                        ))}
                    </motion.div>
                </section>

            </div>
        </div>
    </PageTransition>
);

export default Team;
