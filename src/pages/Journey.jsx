import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const timeline = [
    {
        date: '1 Year Ago',
        title: 'Idea Formation',
        description: 'The initial spark. A group of passionate students and faculty recognized the need for a dedicated space to bridge the gap between academic theory and industry reality.',
        icon: <Lightbulb size={20} className="text-secondary" />
    },
    {
        date: 'Planning Phase',
        title: 'Blueprint & Strategy',
        description: 'Countless discussions mapping out the core objectives: industry expert sessions, hands-on workshops, datathons, and real-world project development.',
        icon: <Target size={20} className="text-primary" />
    },
    {
        date: 'Building the Foundation',
        title: 'Structuring the Team',
        description: 'Assembling a core leadership team driven by a shared vision for long-term student development programs and powerful networking opportunities.',
        icon: <Users size={20} className="text-highlight" />
    },
    {
        date: '27 February 2026',
        title: 'The Final Launch',
        description: 'The official inauguration of MINDS. A new chapter begins for the Data Science Department at HITAM.',
        icon: <TrendingUp size={20} className="text-secondary" />
    }
];

const Journey = () => {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="max-w-3xl mx-auto relative mt-16 text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
                        The Road to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Launch</span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed mb-12">
                        A chronological look at how the MINDS initiative was formed, structured, and brought to life.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[24px] md:left-1/2 top-[0px] bottom-10 w-px bg-gradient-to-b from-indigo-500 via-sky-400 to-transparent md:-translate-x-1/2"></div>

                    <div className="space-y-12">
                        {timeline.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 w-12 h-12 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 shadow-md">
                                        {item.icon}
                                    </div>

                                    {/* Content Container */}
                                    <div className={`ml-16 md:ml-0 md:w-[45%] ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 hover:shadow-md transition-all group">
                                            <span className="text-xs font-bold tracking-wider text-sky-500 uppercase mb-2 block">
                                                {item.date}
                                            </span>
                                            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-sky-500 transition-all">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Journey;
