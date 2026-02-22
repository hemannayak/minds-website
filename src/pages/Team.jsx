import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const leadership = [
    {
        name: 'Dr. Kolluru David Raju',
        role: 'Head of Department',
        department: 'Data Science',
        bio: 'Visionary leader driving the academic and practical excellence of the Data Science department.',
        initials: 'KDR',
        color: 'from-blue-500 to-indigo-600'
    },
    {
        name: 'Mr. Bhaskar Das',
        role: 'Program Head',
        department: 'MINDS Tech Initiative',
        bio: 'Bridging the gap between curriculum and industry requirements through structured programs.',
        initials: 'BD',
        color: 'from-indigo-500 to-purple-600'
    },
    {
        name: 'Ms Richa Tiwari',
        role: 'FPR of MINDS',
        department: 'Core Leadership',
        bio: 'Overseeing club operations, student engagement, and the execution of the MINDS roadmap.',
        initials: 'RT',
        color: 'from-emerald-500 to-teal-600'
    }
];

const studentLeads = [
    {
        name: 'Apurba',
        role: 'Core Team',
        department: 'Events & Coordination',
        bio: 'Managing event logistics, datathons, and ensuring maximum impact for student activities.',
        initials: 'AP',
        color: 'from-cyan-500 to-blue-600'
    },
    {
        name: 'Prasanna',
        role: 'Core Team',
        department: 'Public Relations & Social Media',
        bio: 'Taking care of PR, social media management, and ensuring maximum outreach for all student activities and events.',
        initials: 'PR',
        color: 'from-purple-500 to-pink-600'
    }
];

const TeamCard = ({ member, large = false }) => {
    return (
        <motion.div
            variants={fadeInUp}
            className={`group relative rounded-3xl overflow-hidden bg-white border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-100 ${large ? 'p-10' : 'p-8'
                }`}
        >
            {/* Background Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Circular Avatar Placeholder */}
                <div className={`relative rounded-full mb-6 p-1 border border-slate-200 group-hover:border-indigo-200 transition-colors ${large ? 'w-40 h-40' : 'w-32 h-32'
                    }`}>
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center shadow-inner overflow-hidden relative`}>
                        <span className={`font-black text-white/90 tracking-tighter ${large ? 'text-5xl' : 'text-4xl'}`}>
                            {member.initials}
                        </span>
                        {/* Subtle shine effect */}
                        <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                    </div>
                </div>

                <h3 className={`${large ? 'text-2xl' : 'text-xl'} font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors`}>
                    {member.name}
                </h3>
                <p className="text-sky-600 font-semibold text-sm mb-1 uppercase tracking-wider">{member.role}</p>
                <p className="text-slate-500 text-sm mb-6">{member.department}</p>

                <p className={`text-slate-500 leading-relaxed mb-8 ${large ? 'max-w-md' : ''}`}>
                    {member.bio}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                        <Linkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                        <Mail size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Team = () => {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Minds</span> Behind MINDS
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        A dedicated team of faculty and student leaders working tirelessly to connect academic theory with industry practice.
                    </p>
                </div>

                {/* Faculty Leadership */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <h2 className="text-xl font-bold tracking-widest text-slate-400 uppercase">Faculty Leadership</h2>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        initial="hidden"
                        animate="show"
                        variants={staggerContainer}
                    >
                        {leadership.map((member, i) => (
                            <TeamCard key={i} member={member} large={true} />
                        ))}
                    </motion.div>
                </div>

                {/* Student Core */}
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <h2 className="text-xl font-bold tracking-widest text-slate-400 uppercase">Student Core</h2>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {studentLeads.map((member, i) => (
                            <TeamCard key={i} member={member} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Team;
