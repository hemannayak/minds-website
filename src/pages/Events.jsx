import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const upcomingEvents = [
    {
        title: 'MINDS Club Inauguration',
        date: '27 February 2026',
        time: '2:00 PM IST',
        location: 'Main Auditorium, HITAM',
        type: 'Launch',
        description: 'The official launch event of the Modern Innovation for Next-Gen Data-Science Society. Join us as we unveil our vision and roadmap for the academic year.',
        featured: true
    }
];

const EventCard = ({ event, onRegisterClick }) => {
    return (
        <motion.div
            variants={fadeInUp}
            className={`group relative bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col h-full`}
        >
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>

            <div className="mb-6 inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                {event.type}
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
            <p className="text-slate-500 mb-8 leading-relaxed line-clamp-2">{event.description}</p>

            <div className="space-y-3 mt-auto">
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Calendar size={16} className="text-sky-500" />
                    {event.date} • {event.time}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium mb-6">
                    <MapPin size={16} className="text-sky-500" />
                    {event.location}
                </div>

                {event.type === 'Launch' && (
                    <button
                        onClick={() => onRegisterClick()}
                        className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
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

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
                        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Events</span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Join us for exclusive industry sessions, practical workshops, and competitive datathons designed to elevate your skills.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8"
                    initial="hidden"
                    animate="show"
                    variants={staggerContainer}
                >
                    {upcomingEvents.map((event, i) => (
                        <EventCard key={i} event={event} onRegisterClick={() => setIsModalOpen(true)} />
                    ))}
                </motion.div>
            </div>

            {/* Google Form Registration Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-slate-900 w-full max-w-3xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-700 relative"
                            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
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
                                {/* Instruction: Replace with your actual Google Form Embed URL */}
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
