import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Mic, Sparkles, ArrowRight, X, Linkedin, CheckCircle, MessageCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const upcomingEvents = [];

const pastEvents = [
    {
        title: 'Club Inauguration & Keynote Sessions',
        date: '27th February 2026',
        time: '1:30 PM – 3:30 PM',
        location: 'The Conclave @ HITAM (G4)',
        type: 'Inauguration',
        live: false,
        description: 'The official launch of MINDS — featuring back-to-back industry keynotes on career readiness and entrepreneurship from global leaders.',
        featured: true,
        subEvents: [
            {
                title: 'Inside The Hiring Room: Learn From A Microsoft & L&T MindTree Panel Member',
                date: '27th February 2026',
                time: '1:30 PM – 3:30 PM',
                location: 'The Conclave @ HITAM (G4)',
                speaker: 'Rahul Deo Burman',
                speakerRole: 'Senior Software Engineer, Microsoft',
                linkedin: 'https://www.linkedin.com/in/rahul-deo-burman',
                image: '/event1/Speaker1.jpeg',
                type: 'Career Session',
                live: false,
                description: 'An exclusive LIVE Career Readiness Session revealing what actually happens inside the hiring room. Get unfiltered insights from a Microsoft & L&T MindTree panel member — learn how top tech companies evaluate candidates and what it takes to stand out.',
            },
            {
                title: 'Igniting Innovation, Shaping Future Entrepreneurs',
                date: '27th February 2026',
                time: '1:30 PM – 3:30 PM',
                location: 'The Conclave @ HITAM (G4)',
                speaker: 'Shri Khalid Wani',
                speakerRole: 'Investment Director & Board Member, One Capital Limited · Founder & CEO, KWCG',
                linkedin: 'https://www.linkedin.com/in/khalidwani',
                image: '/event1/Speaker2.jpeg',
                type: 'Entrepreneurship Session',
                live: false,
                description: 'A power-packed session exploring innovation ecosystems, shaping future entrepreneurs, and driving strategic investments. Learn from a distinguished global leader with vast experience across the Middle East, India, and Africa.',
            },
        ],
    },
];

/* ── Session card (drawer) ── */
const SessionCard = ({ event, index }) => {
    const [imgHovered, setImgHovered] = React.useState(false);

    return (
        <>
            {/* Full-screen image lightbox on hover */}
            <AnimatePresence>
                {imgHovered && event.image && (
                    <motion.div
                        key="img-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm pointer-events-none"
                    >
                        <motion.img
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            src={event.image}
                            alt={event.speaker || event.title}
                            className="max-w-[80vw] max-h-[80vh] object-contain rounded-[14px]"
                            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-[14px] ring-1 ring-slate-900/5 overflow-hidden"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
            >
                {/* Speaker image hero — full width, hover to enlarge */}
                {event.image && (
                    <div
                        className="w-full bg-slate-100 flex items-center justify-center overflow-hidden relative cursor-zoom-in"
                        style={{ height: '220px' }}
                        onMouseEnter={() => setImgHovered(true)}
                        onMouseLeave={() => setImgHovered(false)}
                    >
                        <img
                            src={event.image}
                            alt={event.speaker || event.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                            onError={e => { e.target.parentElement.style.display = 'none'; }}
                        />
                        {/* Hover hint */}
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-slate-900/60 backdrop-blur-sm text-white text-[10px] font-medium opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Hover to expand
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {/* Type + index */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border bg-slate-50 text-slate-800 border-slate-100 tracking-wide">
                            <Sparkles size={10} />{event.type}
                        </span>
                        <span className="text-[11px] font-black text-slate-300 tracking-widest">0{index + 1}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug mb-3">{event.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{event.description}</p>

                    {/* Speaker strip */}
                    {event.speaker && (
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-[10px] border border-slate-100">
                            <div className="w-8 h-8 rounded-[8px] bg-slate-900 flex items-center justify-center shrink-0">
                                <Mic size={14} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-900 text-sm">{event.speaker}</p>
                                {event.speakerRole && (
                                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{event.speakerRole}</p>
                                )}
                            </div>
                            {event.linkedin && (
                                <a
                                    href={event.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="shrink-0 w-8 h-8 rounded-[8px] bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors duration-200"
                                >
                                    <Linkedin size={13} />
                                </a>
                            )}
                        </div>
                    )}

                    {/* Meta chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[
                            { icon: Clock, label: event.time },
                            { icon: MapPin, label: event.location },
                        ].map(({ icon: Icon, label }) => (
                            <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 border border-slate-100 px-3 py-1.5 rounded-full bg-slate-50">
                                <Icon size={10} />{label}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};


/* ── Past event card ── */
const PastEventCard = ({ event, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={onClick}
        className="group relative bg-white rounded-[14px] ring-1 ring-slate-900/5 p-6 sm:p-8 cursor-pointer transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] overflow-hidden flex flex-col md:flex-row md:items-center gap-6"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
    >
        {/* Left hover accent bar */}
        <div className="absolute left-0 inset-y-0 w-[3px] bg-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Date chip */}
        <div className="shrink-0 w-20 h-20 rounded-[12px] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300">
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 group-hover:text-slate-500 transition-colors">Feb</span>
            <span className="text-3xl font-black text-slate-900 group-hover:text-white leading-none transition-colors">27</span>
            <span className="text-[10px] font-bold tracking-[0.08em] text-slate-400 group-hover:text-slate-500 transition-colors">2026</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-slate-50 text-slate-900 border-slate-100 tracking-wide">
                    <Sparkles size={11} />{event.type}
                </span>
                {event.subEvents && (
                    <span className="text-xs text-slate-400 font-medium">{event.subEvents.length} sessions</span>
                )}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug mb-2 pr-12 md:pr-0">{event.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{event.description}</p>
            <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock size={11} className="text-slate-500" />{event.time}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <MapPin size={11} className="text-slate-500" />{event.location}
                </span>
            </div>
        </div>

        {/* Arrow chip */}
        <div className="shrink-0 w-10 h-10 rounded-[10px] bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300 self-start md:self-center">
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
    </motion.div>
);

/* ── Main Page ── */
const Events = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [activeEvent, setActiveEvent] = useState(null);

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isDrawerOpen]);

    const handleOpenDrawer = (event) => {
        setActiveEvent(event);
        setFormSubmitted(false);
        setIsDrawerOpen(true);
    };

    const handleDone = () => setFormSubmitted(true);
    const handleCloseDrawer = () => { setIsDrawerOpen(false); setFormSubmitted(false); };
    const handleJoinWhatsApp = (link) => window.open(link, '_blank', 'noopener,noreferrer');

    return (
        <PageTransition>
            <div className="w-full">

                {/* ── Page Hero ── */}
                <section className="pt-36 pb-24 px-6 bg-white grid-texture border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={staggerContainer}
                            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12"
                        >
                            <motion.div variants={fadeInUp} className="max-w-2xl">
                                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-5">Events</p>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.05]">
                                    Where ideas<br />
                                    come{' '}
                                    <span className="relative inline-block">
                                        alive.
                                        <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-slate-900 rounded-full" />
                                    </span>
                                </h1>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="max-w-sm lg:pb-2">
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    Industry sessions, datathons, workshops — every MINDS event is built around one goal: moving you forward.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-10 bg-slate-900 rounded-full shrink-0" />
                                    <p className="text-sm text-slate-500 font-medium leading-snug">
                                        Chapter 01 · {pastEvents.length} event{pastEvents.length !== 1 ? 's' : ''} hosted · More coming
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Content ── */}
                <section className="py-20 px-6 bg-white grid-texture">
                    <div className="max-w-7xl mx-auto space-y-20">

                        {/* Upcoming */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-[3px] h-6 bg-slate-900 rounded-full" />
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Upcoming Events</h2>
                            </div>
                            {upcomingEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingEvents.map((ev, i) => (
                                        <PastEventCard key={i} event={ev} onClick={() => handleOpenDrawer(ev)} />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45 }}
                                    className="bg-slate-900 grid-texture-dark rounded-[14px] ring-1 ring-slate-900/5 p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                                >
                                    <div className="w-14 h-14 rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Sparkles size={24} className="text-slate-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Something's brewing.</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                            Our next event is being finalized. Follow us on Instagram or check back soon for the announcement.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Past */}
                        {pastEvents.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-[3px] h-6 bg-slate-300 rounded-full" />
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Past Events</h2>
                                </div>
                                <div className="space-y-4">
                                    {pastEvents.map((ev, i) => (
                                        <PastEventCard key={i} event={ev} onClick={() => handleOpenDrawer(ev)} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* ── Right-side Drawer ── */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm"
                            onClick={handleCloseDrawer}
                        />

                        {/* Drawer panel */}
                        <motion.div
                            key="drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-xl bg-white flex flex-col"
                            style={{ boxShadow: '-4px 0 40px rgba(0,0,0,0.15)', maxHeight: '100dvh' }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* ── Dark event header ── */}
                            <div className="bg-slate-900 grid-texture-dark px-6 pt-8 pb-6 shrink-0">
                                <div className="flex items-start justify-between gap-4 mb-5">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border bg-white/10 text-slate-300 border-white/10 tracking-wide">
                                        <Sparkles size={10} />{activeEvent?.type}
                                    </span>
                                    <button
                                        onClick={handleCloseDrawer}
                                        className="w-8 h-8 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 shrink-0"
                                        aria-label="Close"
                                    >
                                        <X size={15} />
                                    </button>
                                </div>

                                <h2 className="text-white font-bold text-xl leading-snug mb-4">{activeEvent?.title}</h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5">{activeEvent?.description}</p>

                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { icon: Calendar, label: activeEvent?.date },
                                        { icon: Clock, label: activeEvent?.time },
                                        { icon: MapPin, label: activeEvent?.location },
                                    ].map(({ icon: Icon, label }) => label && (
                                        <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 border border-white/10 px-3 py-1.5 rounded-full bg-white/5">
                                            <Icon size={10} />{label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ── Scrollable body ── */}
                            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                                <AnimatePresence mode="wait">
                                    {activeEvent?.subEvents ? (
                                        /* Sub-event sessions */
                                        <motion.div
                                            key="sessions"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="p-6 bg-slate-50 grid-texture space-y-5 min-h-full"
                                        >
                                            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-2">
                                                {activeEvent.subEvents.length} Sessions
                                            </p>
                                            {activeEvent.subEvents.map((sub, idx) => (
                                                <SessionCard key={idx} event={sub} index={idx} />
                                            ))}
                                        </motion.div>
                                    ) : !formSubmitted ? (
                                        /* Google Form */
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col bg-slate-50 relative"
                                        >
                                            <iframe
                                                src="https://docs.google.com/forms/d/e/1FAIpQLScJza2go3FKlI2OcFPOMvHp0TqQP0yTupx27T-nc5E4kQSYCQ/viewform?embedded=true"
                                                width="100%"
                                                frameBorder="0"
                                                marginHeight="0"
                                                marginWidth="0"
                                                className="w-full h-[2200px]"
                                                title="Event Registration Form"
                                            >Loading…</iframe>
                                            <div className="sticky bottom-0 left-0 w-full px-6 py-5 bg-white border-t border-slate-100 shadow-[0_-20px_40px_rgba(0,0,0,0.06)]">
                                                <p className="text-slate-400 text-xs text-center mb-3">Submitted the form above? Tap below to get WhatsApp details.</p>
                                                <button
                                                    onClick={handleDone}
                                                    className="w-full py-3 rounded-[10px] font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center gap-2"
                                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08),0 4px 12px rgba(16,185,129,0.2)' }}
                                                >
                                                    <CheckCircle size={15} /> Done — Get WhatsApp Group Link
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        /* WhatsApp success */
                                        <motion.div
                                            key="whatsapp"
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35 }}
                                            className="flex flex-col items-center justify-center px-6 py-20 gap-7 bg-white min-h-[400px]"
                                        >
                                            <div className="w-14 h-14 rounded-[14px] bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                                <CheckCircle size={24} className="text-emerald-500" />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-slate-900 font-bold text-xl mb-2">Registration Successful!</h4>
                                                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                                                    Join the WhatsApp group for event updates and reminders.
                                                </p>
                                            </div>
                                            {activeEvent?.whatsappLink && (
                                                <div className="flex flex-col items-center gap-5 w-full">
                                                    <button
                                                        onClick={() => handleJoinWhatsApp(activeEvent.whatsappLink)}
                                                        className="flex items-center justify-center gap-2 w-full max-w-xs py-3.5 rounded-[10px] font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-[250ms] hover:-translate-y-[1px]"
                                                        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08),0 4px 12px rgba(16,185,129,0.2)' }}
                                                    >
                                                        <MessageCircle size={15} /> Join WhatsApp Group
                                                    </button>
                                                    <div className="flex flex-col items-center gap-2">
                                                        <p className="text-slate-400 text-xs">Or scan QR</p>
                                                        <div className="w-36 h-36 rounded-[14px] bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-2" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}>
                                                            <img
                                                                src="/whatsapp-qr.png"
                                                                alt="WhatsApp QR"
                                                                className="w-full h-full object-contain"
                                                                onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<p class="text-slate-400 text-xs text-center">QR soon</p>'; }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default Events;

