import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const INSTAGRAM_URL = 'https://www.instagram.com/hitam_datascience_club/';

const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Journey', to: '/journey' },
    { label: 'Events', to: '/events' },
    { label: 'Team', to: '/team' },
    { label: 'Contact', to: '/contact' },
    { label: 'Join', to: '/join' },
];

const Footer = () => {
    return (
        <footer className="relative z-10 bg-slate-900 grid-texture-dark border-t border-slate-800">

            {/* ── Main footer grid ── */}
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800">

                    {/* Brand Column */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-9 h-9 rounded-[10px] bg-white flex items-center justify-center font-black text-slate-900 text-base shadow-sm">M</div>
                            <span className="text-xl font-bold tracking-tight text-white">MINDS</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
                            Official student initiative of the Data Science Department, HITAM.<br />
                            Chapter 01 — open to every department.
                        </p>

                        {/* Social row */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={16} />
                            </a>
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/20 transition-all duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram size={16} />
                            </a>
                            <a
                                href="mailto:minds.datascience@hitam.org"
                                className="w-9 h-9 rounded-[8px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                                aria-label="Email"
                            >
                                <Mail size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Nav links column */}
                    <div className="md:col-span-2">
                        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-5">Pages</p>
                        <ul className="space-y-3">
                            {navLinks.map(l => (
                                <li key={l.label}>
                                    <Link
                                        to={l.to}
                                        className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacts column */}
                    <div className="md:col-span-3">
                        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-5 flex items-center gap-2">
                            <Phone size={11} /> Contacts
                        </p>
                        <ul className="space-y-5">
                            <li>
                                <span className="text-white text-sm font-semibold block">Ms. Richa Tiwari</span>
                                <span className="text-slate-500 text-xs block mb-1">Faculty Facilitator</span>
                                <a href="tel:+919131539794" className="text-slate-400 text-sm hover:text-white transition-colors">+91 91315 39794</a>
                            </li>
                            <li className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-white text-sm font-semibold block">Apurba Nandi</span>
                                    <a href="tel:+918179717349" className="text-slate-400 text-sm hover:text-white transition-colors">+91 81797 17349</a>
                                </div>
                                <div>
                                    <span className="text-white text-sm font-semibold block">Sai Prasanna</span>
                                    <a href="tel:+918106110146" className="text-slate-400 text-sm hover:text-white transition-colors">+91 81061 10146</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Location column */}
                    <div className="md:col-span-2">
                        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-5 flex items-center gap-2">
                            <MapPin size={11} /> Location
                        </p>
                        <address className="not-italic text-slate-400 text-sm leading-relaxed">
                            Room No: T19<br />
                            ET Staff Room<br />
                            Dept. of Data Science<br />
                            HITAM, Hyderabad
                        </address>
                    </div>
                </div>

                {/* ── Instagram follow strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="py-10 flex flex-col sm:flex-row items-center justify-between gap-8 border-b border-slate-800"
                >
                    {/* QR code */}
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group shrink-0">
                        <div className="w-28 h-28 rounded-[12px] overflow-hidden bg-white p-2 ring-1 ring-white/10 group-hover:-translate-y-0.5 transition-transform duration-200">
                            <img
                                src="/instagram-qr.png"
                                alt="Scan to follow MINDS on Instagram"
                                className="w-full h-full object-contain"
                                onError={e => { e.target.parentElement.innerHTML = '<p class="text-slate-400 text-[9px] text-center h-full flex items-center justify-center p-2">QR Coming Soon</p>'; }}
                            />
                        </div>
                        <p className="text-slate-600 text-[10px] mt-2 text-center">Scan to follow</p>
                    </a>

                    {/* Divider */}
                    <div className="hidden sm:flex flex-col items-center gap-1 shrink-0">
                        <div className="h-10 w-px bg-slate-800" />
                        <span className="text-slate-600 text-[10px] font-medium">or</span>
                        <div className="h-10 w-px bg-slate-800" />
                    </div>

                    {/* Copy + button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 flex-1">
                        <div>
                            <p className="text-white font-semibold text-base mb-1">Follow us on Instagram</p>
                            <p className="text-slate-500 text-sm">Updates, announcements, and behind-the-scenes.</p>
                        </div>
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 shrink-0"
                        >
                            <span className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center">
                                <Instagram size={14} className="text-white" />
                            </span>
                            <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">@minds_datascience</span>
                            <ArrowUpRight size={13} className="text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                    </div>
                </motion.div>

                {/* ── Bottom bar ── */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-600 text-xs">
                        © {new Date().getFullYear()} MINDS — Data Science Department, HITAM. All rights reserved.
                    </p>
                    <p className="text-slate-700 text-xs">Chapter 01 · Hyderabad</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
