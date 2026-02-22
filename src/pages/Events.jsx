import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Mic, Sparkles, ArrowRight, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const upcomingEvents = [
    {
        title: 'From Campus to Corporate – Master the IT Interview Game',
        date: '27th February',
        time: '[Time TBD]',
        location: 'T19 ET Staff Room',
        speaker: 'Microsoft Tech Professional',
        type: 'Career Session',
        description:
            'Unlock real interview insights, industry expectations, and career strategies straight from an IT panel expert. Learn what top companies look for and how to stand out.',
        featured: true,
    },
];

const EventCard = ({ event, onRegisterClick }) => {
    return (
        <motion.div
            variants={fadeInUp}
            className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-sky-500/20 to-purple-500/30 shadow-xl shadow-indigo-900/30 w-full max-w-2xl mx-auto"
        >
            <div className="relative bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 md:p-10 flex flex-col h-full overflow-hidden">
                {/* Glowing orb background */}
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

                {/* Arrow icon */}
                <div className="absolute top-8 right-8 w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>

                {/* Event type badge */}
                <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest w-fit">
                    <Sparkles size={12} />
                    {event.type}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-purple-300 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base">
                    {event.description}
                </p>

                {/* Meta info */}
                <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
                            <Calendar size={15} />
                        </span>
                        {event.date}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                            <MapPin size={15} />
                        </span>
                        {event.location}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                            <Clock size={15} />
                        </span>
                        {event.time}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                            <Mic size={15} />
                        </span>
                        Session by {event.speaker}
                    </div>
                </div>

                {/* CTA */}
                {event.type === 'Career Session' && (
                    <button
                        onClick={() => onRegisterClick()}
                        className="mt-8 w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 transition-all duration-300 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-700/50 hover:-translate-y-0.5"
                    >
                        Register Now
                    </button>
                )}
            </div>
        </motion.div>
    );
};

const Events = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">

                {/* Page heading */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
                        Upcoming&nbsp;Events
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Join us for exclusive industry sessions, practical workshops, and career-defining opportunities.
                    </p>
                </motion.div>


                {/* Event card */}
                <motion.div
                    className="flex justify-center"
                    initial="hidden"
                    animate="show"
                    variants={staggerContainer}
                >
                    {upcomingEvents.map((event, i) => (
                        <EventCard key={i} event={event} onRegisterClick={() => setIsModalOpen(true)} />
                    ))}
                </motion.div>
            </div>

            {/* Registration Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-slate-900 w-full max-w-3xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-700 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 absolute top-0 w-full z-10">
                                <h3 className="text-white font-bold text-lg tracking-wide">Event Registration</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 w-full bg-slate-50 pt-16 overflow-y-auto">
                                {/* Replace src with your actual Google Form embed URL */}
                                <iframe
                                    src="https://docs.google.com/forms/d/e/1FAIpQLSe_Placeholder_Form_ID/viewform?embedded=true"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    marginHeight="0"
                                    marginWidth="0"
                                    className="w-full min-h-[800px]"
                                >
                                    Loading Google Form…
                                </iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default Events;
