import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

/* ─── Data ───────────────────────────────────────────────── */

const leadership = [
    {
        name: 'Dr. Kolluru David Raju',
        role: 'Head of Department',
        department: 'Data Science',
        initials: 'KDR',
        color: 'from-blue-500 to-indigo-600',
    },
    {
        name: 'Mr. Bhaskar Das',
        role: 'Program Head',
        department: 'MINDS Tech Initiative',
        initials: 'BD',
        color: 'from-indigo-500 to-purple-600',
    },
    {
        name: 'Ms. Richa Tiwari',
        role: 'Faculty Program Representative',
        department: 'MINDS Club',
        initials: 'RT',
        color: 'from-emerald-500 to-teal-600',
    },
];

const organizingTeam = [
    {
        category: 'Registration Team',
        accent: 'from-indigo-500 to-sky-500',
        border: 'border-indigo-500/30',
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-300',
        lead: { name: 'Hemanth', initials: 'HE', color: 'from-indigo-500 to-sky-600' },
        members: ['Deepnitha', 'Siddarth', 'Gowtham'],
    },
    {
        category: 'Logistics Team',
        accent: 'from-amber-500 to-orange-500',
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        text: 'text-amber-300',
        lead: { name: 'Apurba', initials: 'AP', color: 'from-amber-500 to-orange-600' },
        members: ['Sohan', 'Charlson', 'Dhanudeep'],
    },
    {
        category: 'PR & Media',
        accent: 'from-pink-500 to-purple-500',
        border: 'border-pink-500/30',
        bg: 'bg-pink-500/10',
        text: 'text-pink-300',
        lead: { name: 'Prasanna', initials: 'PR', color: 'from-pink-500 to-purple-600' },
        members: ['Sarika', 'Keerthana', 'Harshitha', 'Sindhu', 'Karthik'],
    },
];

/* ─── Components ─────────────────────────────────────────── */

const getInitials = (name) =>
    name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

/** Faculty card — clean light card style */
const FacultyCard = ({ member }) => (
    <motion.div
        variants={fadeInUp}
        className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 p-8 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-lg hover:border-indigo-100 transition-all duration-300"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-5 shadow-md`}>
            <span className="text-2xl font-black text-white tracking-tight">{member.initials}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-1">{member.name}</h3>
        <p className="text-sky-600 font-semibold text-xs uppercase tracking-widest mb-1">{member.role}</p>
        <p className="text-slate-400 text-sm">{member.department}</p>
    </motion.div>
);

/** Single member pill */
const MemberPill = ({ name, color }) => (
    <motion.div
        variants={fadeInUp}
        className="group flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 hover:border-slate-600 hover:bg-slate-800 transition-all duration-200"
    >
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
            <span className="text-xs font-bold text-white">{getInitials(name)}</span>
        </div>
        <span className="text-slate-200 font-medium text-sm">{name}</span>
    </motion.div>
);

/** Category group card */
const CategoryGroup = ({ group }) => (
    <motion.div
        variants={fadeInUp}
        className={`rounded-2xl border ${group.border} bg-slate-900/80 backdrop-blur-sm p-6 md:p-8 flex flex-col`}
    >
        {/* Category header */}
        <div className="flex items-center gap-3 mb-6">
            <div className={`px-3 py-1 rounded-full ${group.bg} border ${group.border} text-xs font-bold uppercase tracking-widest ${group.text}`}>
                {group.category}
            </div>
        </div>

        {/* Lead */}
        <div className="mb-5">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Lead</p>
            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.lead.color} flex items-center justify-center shrink-0 shadow-md`}>
                    <span className="text-sm font-black text-white">{group.lead.initials}</span>
                </div>
                <div>
                    <p className="text-white font-bold text-sm">{group.lead.name}</p>
                    <p className={`text-xs font-semibold ${group.text}`}>{group.category} Lead</p>
                </div>
            </div>
        </div>

        {/* Members */}
        <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Members</p>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
            >
                {group.members.map((name) => (
                    <MemberPill key={name} name={name} color={group.lead.color} />
                ))}
            </motion.div>
        </div>
    </motion.div>
);

/* ─── Section divider ─────────────────────────────────────── */
const SectionLabel = ({ label, dark = false }) => (
    <div className="flex items-center gap-4 mb-10">
        <div className={`h-px flex-1 ${dark ? 'bg-slate-700' : 'bg-slate-200'}`} />
        <h2 className={`text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-slate-400' : 'text-slate-400'}`}>{label}</h2>
        <div className={`h-px flex-1 ${dark ? 'bg-slate-700' : 'bg-slate-200'}`} />
    </div>
);

/* ─── Page ────────────────────────────────────────────────── */

const Team = () => {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">

                {/* Page heading */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-tight pb-2">
                        <span className="text-slate-900">Meet the </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">Team</span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Faculty leadership and a dedicated student organizing team working together to deliver an impactful event experience.
                    </p>
                </motion.div>

                {/* ── Faculty Leadership ── */}
                <div className="mb-24">
                    <SectionLabel label="Faculty Leadership" />
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={staggerContainer}
                    >
                        {leadership.map((member) => (
                            <FacultyCard key={member.name} member={member} />
                        ))}
                    </motion.div>
                </div>

                {/* ── Event Organizing Team ── */}
                <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 md:p-12">
                    <SectionLabel label="Event Organizing Team" dark />

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={staggerContainer}
                    >
                        {organizingTeam.map((group) => (
                            <CategoryGroup key={group.category} group={group} />
                        ))}
                    </motion.div>
                </div>

            </div>
        </PageTransition>
    );
};

export default Team;
