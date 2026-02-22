import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Users, BookOpen, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const pillars = [
    { title: 'Industry Experts', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Workshops', icon: BookOpen, color: 'bg-sky-50 text-sky-600' },
    { title: 'Datathons', icon: Target, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Real-world Projects', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
];

const values = [
    {
        icon: Lightbulb,
        title: 'Born from a Problem',
        body: 'We recognized that while academic foundations are crucial, mastery of Data Science requires hands-on exposure, networking, and real-world complexity.',
        accent: 'from-amber-400 to-orange-500',
        iconBg: 'bg-amber-50 text-amber-600',
    },
    {
        icon: Users,
        title: 'Built Collaboratively',
        body: 'MINDS was shaped by students and faculty working together — a club that represents the community it serves, not just a top-down initiative.',
        accent: 'from-indigo-400 to-blue-500',
        iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
        icon: TrendingUp,
        title: 'Focused on Growth',
        body: 'Every program, session, and event is designed with one goal: accelerating your journey from learner to practitioner.',
        accent: 'from-emerald-400 to-teal-500',
        iconBg: 'bg-emerald-50 text-emerald-600',
    },
];

const About = () => {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">

                {/* ── Hero heading ── */}
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-20"
                    initial="hidden"
                    animate="show"
                    variants={staggerContainer}
                >
                    <motion.div
                        variants={fadeInUp}
                        className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6 shadow-sm"
                    >
                        Our Journey
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight"
                    >
                        Bridging the gap between{' '}
                        <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                            Academia &amp; Industry
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-lg text-slate-500 leading-relaxed mb-12">
                        MINDS didn't happen overnight. Born nearly a year ago from a singular objective —
                        to provide students with unparalleled industry exposure, real-world skills, and a
                        community that pushes them to grow.
                    </motion.p>

                    {/* Pillars */}
                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {pillars.map((p) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={p.title}
                                    className="flex flex-col items-center p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${p.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={20} />
                                    </div>
                                    <span className="font-semibold text-sm text-slate-700 text-center">{p.title}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* ── Divider ── */}
                <div className="flex items-center gap-4 mb-20">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Our Philosophy</span>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                {/* ── Values grid ── */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={staggerContainer}
                >
                    {values.map((v) => {
                        const Icon = v.icon;
                        return (
                            <motion.div
                                key={v.title}
                                variants={fadeInUp}
                                className="group bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${v.accent} -mr-10 -mt-10 pointer-events-none`} />
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${v.iconBg}`}>
                                    <Icon size={22} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{v.body}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto text-center bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-100 rounded-3xl p-10"
                >
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-3 tracking-tight">
                        Ready to be part of it?
                    </h2>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        Join a community redefining what it means to be a Data Science student.
                    </p>
                    <Link
                        to="/join"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Join MINDS <ArrowRight size={18} />
                    </Link>
                </motion.div>

            </div>
        </PageTransition>
    );
};

export default About;
