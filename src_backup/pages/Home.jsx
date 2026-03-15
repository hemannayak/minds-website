import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Target, Users, ArrowRight, Zap } from 'lucide-react';

import { fadeInUp, staggerContainer } from '../lib/animations';
import HeroMesh from '../components/HeroMesh';

const cards = [
  {
    icon: Briefcase,
    title: 'Industry Sessions',
    desc: 'Real conversations with professionals — not textbook theory. We bring the industry to your campus so you understand what the job actually looks like.',
    accent: 'rgba(110,231,247,0.12)',
    iconColor: '#6ee7f7',
    glow: '0 0 30px rgba(110,231,247,0.08)',
    span: 'lg:col-span-2',
  },
  {
    icon: Target,
    title: 'Datathons',
    desc: 'Compete. Fail fast. Learn faster. High-pressure, high-reward challenges built to push your limits.',
    accent: 'rgba(167,139,250,0.12)',
    iconColor: '#a78bfa',
    glow: '0 0 30px rgba(167,139,250,0.08)',
    span: '',
  },
  {
    icon: Users,
    title: 'Workshops',
    desc: 'Hands-on. Practical. Directly applicable. No filler — just skills you can use from day one.',
    accent: 'rgba(251,191,36,0.10)',
    iconColor: '#fbbf24',
    glow: '0 0 30px rgba(251,191,36,0.06)',
    span: '',
  },
];

const Home = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <main className="w-full">
            {/* ── HERO ── */}
            <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden px-6 flex items-center justify-center bg-[#080808]">
                {/* Animated grid */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute w-full h-[200%] -top-[50%] will-change-transform"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                            backgroundSize: '32px 32px',
                            animation: 'gridDrift 40s linear infinite'
                        }}
                    />
                    {/* Radial fade */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#080808_75%)] pointer-events-none" />
                    {/* Top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(110,231,247,0.04)_0%,transparent_70%)] pointer-events-none" />
                </div>

                <style>{`
                    @keyframes gridDrift {
                        0% { transform: translateY(0px); }
                        100% { transform: translateY(32px); }
                    }
                `}</style>

                <div className="max-w-7xl mx-auto flex flex-col relative z-10 w-full h-full justify-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center w-full mb-12 sm:mb-16 mt-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm font-medium text-white/70 mb-6 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6ee7f7] opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6ee7f7]"></span>
                            </span>
                            Official Club of Data Science
                        </motion.div>

                        {/* Giant MINDS heading with hover glow */}
                        <motion.h1
                            className="minds-glow text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.03em] mb-4 leading-none cursor-default select-none text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                        >
                            MINDS
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-lg md:text-xl text-white/40 font-medium tracking-wide max-w-2xl mx-auto"
                        >
                            Modern Innovation · Next-Gen Data-Science Society
                        </motion.p>
                    </motion.div>

                    {/* Split layout */}
                    <div className="flex flex-col-reverse md:flex-row items-center w-full min-h-[300px]">

                        {/* Left: CTAs */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-10 z-10 mt-8 md:mt-0"
                        >
                            <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-md font-normal">
                                Join a thriving community of builders creating the next generation of data-driven solutions. Participate in industry sessions, practical workshops, and datathons.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 items-center w-full justify-center md:justify-start">
                                <Link
                                    to="/join"
                                    className="px-6 py-3 rounded-[10px] font-medium text-sm text-black bg-white hover:bg-white/90 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center gap-2 group"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 4px 12px rgba(255,255,255,0.08)' }}>
                                    Join the Club
                                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                                </Link>
                                <Link
                                    to="/events"
                                    className="px-6 py-3 rounded-[10px] font-medium text-sm text-white/70 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center"
                                >
                                    Explore Events
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right: Mesh */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full md:w-1/2 flex justify-center items-center relative min-h-[250px] md:min-h-[400px] pointer-events-none mt-10 md:mt-16"
                        >
                            <HeroMesh />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Feature Cards ── */}
            <section className="py-28 px-6 bg-[#080808] relative z-10 border-t border-white/[0.05]">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={staggerContainer}
                        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20"
                    >
                        <motion.div variants={fadeInUp} className="max-w-xl">
                            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-white/30 mb-4">What we do</p>
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] leading-[1.1]">
                                Open to <span className="text-white/60">Everyone.</span>
                            </h2>
                            <p className="mt-5 text-lg text-white/40 leading-relaxed max-w-md">
                                No matter your department — if data science is where you want to go, MINDS is where you start. We welcome students from every discipline who want to learn, build, and grow.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 sm:gap-10 shrink-0">
                            {[
                                { value: 'Ch.01', label: 'Chapter 01 — Just Launched' },
                                { value: 'All', label: 'Departments Welcome' },
                                { value: '∞', label: 'Paths in Data Science' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span className="text-4xl font-black text-white tracking-tighter leading-none">{stat.value}</span>
                                    <span className="text-xs text-white/30 mt-1.5 font-medium max-w-[7rem] leading-snug">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                    >
                        {cards.map((card) => (
                            <motion.div
                                key={card.title}
                                variants={fadeInUp}
                                className={`${card.span} group flex flex-col gap-5 p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] cursor-default`}
                                style={{
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)',
                                }}
                                whileHover={{
                                    borderColor: 'rgba(255,255,255,0.12)',
                                    boxShadow: `0 2px 4px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.5), ${card.glow}`,
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300"
                                    style={{ background: card.accent }}
                                >
                                    <card.icon size={20} strokeWidth={1.8} style={{ color: card.iconColor }} />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{card.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-6 bg-[#080808] relative z-10 border-t border-white/[0.05]">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <div
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 sm:p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row md:items-center gap-10"
                        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)' }}
                    >
                        {/* Left cyan accent line */}
                        <div className="absolute left-0 inset-y-0 w-[2px] rounded-full" style={{ background: 'linear-gradient(to bottom, transparent, #6ee7f7, transparent)' }} />

                        <div className="flex-1 pl-6">
                            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-white/30 mb-3">Where Learning Meets Doing</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em] mb-3">
                                Your journey starts here.
                            </h2>
                            <p className="text-white/40 leading-relaxed text-sm max-w-sm">
                                See the roadmap that shaped MINDS — or jump straight into our upcoming events.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 shrink-0 md:items-end">
                            <Link
                                to="/journey"
                                className="px-6 py-3 rounded-[10px] font-medium text-sm text-black bg-white hover:bg-white/90 transition-all duration-[250ms] hover:-translate-y-[1px] flex items-center justify-center gap-2 group/btn w-full md:w-auto"
                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 4px 12px rgba(255,255,255,0.08)' }}>
                                Explore Journey
                                <ArrowRight size={15} strokeWidth={2} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                            </Link>
                            <Link
                                to="/events"
                                className="px-6 py-3 rounded-[10px] font-medium text-sm text-white/60 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all duration-[250ms] hover:-translate-y-[1px] flex items-center justify-center w-full md:w-auto"
                            >
                                View Events
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default Home;
