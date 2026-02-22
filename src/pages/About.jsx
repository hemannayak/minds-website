import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Users, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';



const pillars = [
    { title: 'Industry Experts', icon: <Users className="text-primary" /> },
    { title: 'Workshops', icon: <BookOpen className="text-secondary" /> },
    { title: 'Datathons', icon: <Target className="text-highlight" /> },
    { title: 'Real-world Projects', icon: <TrendingUp className="text-primary" /> }
];

const About = () => {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">

                {/* Storytelling Section */}
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-24"
                    initial="hidden"
                    animate="show"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6 shadow-sm">
                        Our Journey
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-slate-900 leading-tight">
                        Bridging the gap between <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Academia & Industry</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg text-slate-500 leading-relaxed mb-12">
                        The MINDS club didn't happen overnight. It was born nearly a year ago from a singular objective:
                        to provide students with unparalleled industry exposure. We recognized that while academic
                        foundations are crucial, the true mastery of Data Science requires hands-on experience,
                        networking, and exposure to real-world complexities.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {pillars.map((pillar, i) => (
                            <div key={i} className="flex flex-col items-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                                    {pillar.icon}
                                </div>
                                <span className="font-medium text-sm text-slate-700">{pillar.title}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>



            </div>
        </PageTransition>
    );
};

export default About;
