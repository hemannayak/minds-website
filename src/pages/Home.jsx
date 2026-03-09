import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Target, Users, ArrowRight } from 'lucide-react';

import { fadeInUp, staggerContainer } from '../lib/animations';
import HeroMesh from '../components/HeroMesh';

const Home = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <main className="w-full">
            <section
                className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden px-6 flex items-center justify-center bg-white"
            >
                {/* ── PART 1: DATA GRID BACKGROUND ── */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none overflow-hidden origin-top"
                >
                    <div
                        className="absolute w-full h-[200%] -top-[50%] will-change-transform"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px',
                            animation: 'gridDrift 40s linear infinite'
                        }}
                    ></div>
                    {/* Fades to blend into background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white z-0 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] z-0 pointer-events-none"></div>
                </div>

                <style>{`
                    @keyframes gridDrift {
                        0% { transform: translateY(0px); }
                        100% { transform: translateY(40px); }
                    }
                `}</style>

                {/* ── PART 3: HERO STRUCTURE ── */}
                <div className="max-w-7xl mx-auto flex flex-col relative z-10 w-full h-full justify-center">

                    {/* Top: Centered Headline */}
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
                            className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 mb-6 shadow-sm ring-1 ring-slate-900/5"
                        >
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-600 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-800"></span>
                            </span>
                            Official Club of Data Science
                        </motion.div>

                        <motion.h1
                            className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.03em] mb-4 leading-none cursor-default select-none"
                            style={{ color: '#0f172a' }}
                            whileHover={{ color: '#94a3b8' }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            MINDS
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-slate-500 font-medium tracking-wide max-w-2xl mx-auto"
                        >
                            Modern Innovation · Next-Gen Data-Science Society
                        </motion.p>
                    </motion.div>

                    {/* Below: Split Layout */}
                    <div className="flex flex-col-reverse md:flex-row items-center w-full min-h-[300px]">

                        {/* Left: Subtext & CTAs */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-10 z-10 mt-8 md:mt-0"
                        >
                            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md font-normal">
                                Join a thriving community of builders creating the next generation of data-driven solutions. Participate in industry sessions, practical workshops, and datathons.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 items-center w-full justify-center md:justify-start">
                                <Link
                                    to="/join"
                                    className="px-6 py-3 rounded-[10px] font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center gap-2 group"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08),0 4px 12px rgba(15,23,42,0.15)' }}>
                                    Join the Club
                                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                                </Link>
                                <Link
                                    to="/events"
                                    className="px-6 py-3 rounded-[10px] font-medium text-sm text-slate-700 bg-white ring-1 ring-slate-300 hover:bg-slate-50 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center"
                                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                                    Explore Events
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right: Wireframe Mesh (PART 2) */}
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

            {/* ── Built for Builders ── */}
            <section className="py-28 px-6 bg-white relative z-10 border-t border-slate-100">
                <div className="max-w-7xl mx-auto">

                    {/* Asymmetric header: left-aligned text, right-aligned stat cluster */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={staggerContainer}
                        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20"
                    >
                        <motion.div variants={fadeInUp} className="max-w-xl">
                            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-900 mb-4">What we do</p>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.1]">
                                Open to <span className="text-slate-900">Everyone.</span>
                            </h2>
                            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-md">
                                No matter your department — if data science is where you want to go, MINDS is where you start. We welcome students from every discipline who want to learn, build, and grow in the world of data.
                            </p>
                        </motion.div>

                        {/* Stat row */}
                        <motion.div variants={fadeInUp} className="flex gap-10 shrink-0">
                            {[
                                { value: 'Ch.01', label: 'Chapter 01 — Just Launched' },
                                { value: 'All', label: 'Departments Welcome' },
                                { value: '∞', label: 'Paths in Data Science' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</span>
                                    <span className="text-xs text-slate-500 mt-1.5 font-medium max-w-[7rem] leading-snug">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Staggered 2+2 grid — intentionally asymmetric padding */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                    >
                        {/* Card 1 — taller on desktop */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:col-span-2 bg-white rounded-[14px] ring-1 ring-slate-900/5 p-8 transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] group flex flex-col gap-4"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                        >
                            <div className="w-10 h-10 bg-slate-50 text-slate-900 rounded-[10px] flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                <Briefcase size={19} strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2 tracking-tight">Industry Sessions</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Real conversations with professionals — not textbook theory. We bring the industry to your campus so you understand what the job actually looks like.</p>
                            </div>
                        </motion.div>

                        {/* Card 2 — narrow */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-slate-900 rounded-[14px] ring-1 ring-slate-900/5 p-8 transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] group flex flex-col gap-4"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                        >
                            <div className="w-10 h-10 bg-white/10 text-white rounded-[10px] flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                <Target size={19} strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Datathons</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">Compete. Fail fast. Learn faster. High-pressure, high-reward challenges built to push your limits.</p>
                            </div>
                        </motion.div>

                        {/* Card 3 — narrow */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-white rounded-[14px] ring-1 ring-slate-900/5 p-8 transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] group flex flex-col gap-4"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}
                        >
                            <div className="w-10 h-10 bg-slate-50 text-slate-900 rounded-[10px] flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                <Users size={19} strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2 tracking-tight">Workshops</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Hands-on. Practical. Directly applicable. No filler — just skills you can use from day one.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Where Learning Meets Doing — CTA ── */}
            <section className="py-24 px-6 bg-slate-50 relative z-10 border-t border-slate-100">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Two-column: left copy, right buttons */}
                    <div className="bg-white rounded-[14px] ring-1 ring-slate-900/5 p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row md:items-center gap-10"
                        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.04)' }}>

                        {/* Teal left accent bar */}
                        <div className="absolute left-0 inset-y-0 w-[3px] bg-slate-900 rounded-full" />

                        <div className="flex-1 pl-4">
                            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-900 mb-3">Where Learning Meets Doing</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-[-0.02em] mb-3">
                                Your journey starts here.
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-sm max-w-sm">
                                See the roadmap that shaped MINDS — or jump straight into our upcoming events.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 shrink-0 md:items-end">
                            <Link
                                to="/journey"
                                className="px-6 py-3 rounded-[10px] font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center gap-2 group/btn w-full md:w-auto"
                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08),0 4px 12px rgba(15,23,42,0.15)' }}>
                                Explore Journey
                                <ArrowRight size={15} strokeWidth={2} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                            </Link>
                            <Link
                                to="/events"
                                className="px-6 py-3 rounded-[10px] font-medium text-sm text-slate-700 bg-white ring-1 ring-slate-300 hover:bg-slate-50 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] flex items-center justify-center w-full md:w-auto"
                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
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
