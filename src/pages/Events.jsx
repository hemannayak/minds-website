import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Mic, Sparkles, ArrowRight, X, Linkedin, CheckCircle, MessageCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const upcomingEvents = [
    {
        title: 'Inside The Hiring Room: Learn From A Microsoft & L&T MindTree Panel Member',
        date: '27th February 2026',
        time: '1:30 PM',
        location: 'HITAM',
        speaker: 'Rahul Deo Burman',
        speakerRole: 'Senior Software Engineer, Microsoft',
        type: 'Career Session',
        live: true,
        description:
            'An exclusive LIVE Career Readiness Session revealing what actually happens inside the hiring room. Get unfiltered insights from a Microsoft & L&T MindTree panel member — learn how top tech companies evaluate candidates and what it takes to stand out.',
        featured: true,
        whatsappLink: 'https://chat.whatsapp.com/Es3FANT2PTe6ywtaMYW3rX',
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

                {/* LIVE badge */}
                {event.live && (
                    <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        Live Session
                    </div>
                )}

                {/* Event type badge */}
                <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest w-fit">
                    <Sparkles size={12} />
                    Exclusive Career Readiness Session
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
                    <div className="relative flex items-start gap-3 text-sm text-slate-300 font-medium">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                            <Mic size={15} />
                        </span>
                        <span className="flex-1">
                            <span className="text-white font-semibold">{event.speaker}</span>
                            {event.speakerRole && (
                                <span className="block text-xs text-slate-400 mt-0.5">{event.speakerRole}</span>
                            )}
                        </span>
                        {/* LinkedIn icon — top-right of the speaker row */}
                        <a
                            href="https://www.linkedin.com/in/rahul-deo-burman"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="self-start mt-0.5 p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 hover:text-sky-300 transition-all duration-200"
                            onClick={e => e.stopPropagation()}
                        >
                            <Linkedin size={13} />
                        </a>
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
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [activeEvent, setActiveEvent] = useState(null);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    const handleOpenModal = (event) => {
        setActiveEvent(event);
        setFormSubmitted(false); // reset each time
        setIsModalOpen(true);
    };

    const handleDone = () => {
        setFormSubmitted(true); // switch modal to WhatsApp screen
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormSubmitted(false);
    };

    const handleJoinWhatsApp = (link) => {
        window.open(link, '_blank', 'noopener,noreferrer');
    };

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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-tight pb-2">
                        <span className="text-slate-900">Upcoming </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">Events</span>
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
                        <EventCard key={i} event={event} onRegisterClick={() => handleOpenModal(event)} />
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
                        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-slate-950/70 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 40 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-slate-900 w-full max-w-3xl h-[95svh] sm:h-[92vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col border border-slate-700 relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal header — sticky */}
                            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 shrink-0 z-10">
                                <h3 className="text-white font-bold text-base sm:text-lg tracking-wide">
                                    {formSubmitted ? 'Join the WhatsApp Group' : 'Event Registration'}
                                </h3>
                                <button onClick={handleCloseModal} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {!formSubmitted ? (
                                    /* ── Google Form view ── */
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col flex-1 overflow-hidden"
                                    >
                                        {/* Scrollable iframe */}
                                        <div className="flex-1 w-full bg-slate-50 overflow-y-auto">
                                            <iframe
                                                src="https://docs.google.com/forms/d/e/1FAIpQLScJza2go3FKlI2OcFPOMvHp0TqQP0yTupx27T-nc5E4kQSYCQ/viewform?embedded=true"
                                                width="100%"
                                                height="100%"
                                                frameBorder="0"
                                                marginHeight="0"
                                                marginWidth="0"
                                                className="w-full min-h-[2200px]"
                                                title="Event Registration Form"
                                            >
                                                Loading…
                                            </iframe>
                                        </div>
                                        {/* Sticky done bar */}
                                        <div className="shrink-0 px-4 py-3 bg-slate-900 border-t border-slate-700">
                                            <p className="text-slate-500 text-xs text-center mb-2">Submitted the form above? Tap below to get WhatsApp details.</p>
                                            <button
                                                onClick={handleDone}
                                                className="w-full py-3 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                                            >
                                                <CheckCircle size={18} />
                                                Done — Get WhatsApp Group Link
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* ── WhatsApp join screen ── */
                                    <motion.div
                                        key="whatsapp"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 overflow-y-auto"
                                    >
                                        {/* Success tick */}
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                                            <CheckCircle size={32} className="text-emerald-400" />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-white font-bold text-xl mb-2">Registration Successful! 🎉</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                                Thank you for registering. Join the WhatsApp group for event updates and reminders.
                                            </p>
                                        </div>

                                        {/* WhatsApp button */}
                                        {activeEvent?.whatsappLink && (
                                            <>
                                                <button
                                                    onClick={() => handleJoinWhatsApp(activeEvent.whatsappLink)}
                                                    className="flex items-center justify-center gap-3 w-full max-w-sm py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-green-900/30 active:scale-95"
                                                >
                                                    <MessageCircle size={22} />
                                                    Join WhatsApp Group
                                                </button>

                                                {/* QR code */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <p className="text-slate-500 text-xs">Or scan QR with your phone camera</p>
                                                    <div className="w-44 h-44 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-slate-700 shadow-lg p-2">
                                                        <img
                                                            src="/whatsapp-qr.png"
                                                            alt="WhatsApp QR Code"
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.parentElement.innerHTML = '<p class="text-slate-400 text-xs text-center px-3">Scan code<br/>coming soon</p>';
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default Events;
