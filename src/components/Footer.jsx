import React from 'react';
import { Instagram, Mail, MapPin, Phone, ArrowUpRight, Linkedin } from 'lucide-react';
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
        <footer className="relative z-10 bg-[#0a0a0a] border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* ── Main row ── */}
                <div className="flex flex-col md:flex-row md:items-start gap-8 pb-8 border-b border-white/[0.06]">

                    {/* Brand */}
                    <div className="md:w-64 shrink-0">
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-7 h-7 rounded-[8px] bg-white flex items-center justify-center font-black text-slate-900 text-xs">M</div>
                            <span className="text-base font-bold tracking-tight text-white">MINDS</span>
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed mb-4 max-w-[200px]">
                            Official student initiative of the Data Science Dept, HITAM.
                        </p>
                        <div className="flex items-center gap-2">
                            <a href="#" className="w-7 h-7 rounded-[7px] bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200" aria-label="LinkedIn">
                                <Linkedin size={13} />
                            </a>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-[7px] bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-200" aria-label="Instagram">
                                <Instagram size={13} />
                            </a>
                            <a href="mailto:minds.datascience@hitam.org" className="w-7 h-7 rounded-[7px] bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200" aria-label="Email">
                                <Mail size={13} />
                            </a>
                        </div>
                    </div>

                    {/* Nav */}
                    <div className="shrink-0">
                        <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/30 mb-3">Pages</p>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {navLinks.map(l => (
                                <li key={l.label}>
                                    <Link to={l.to} className="text-xs text-white/40 hover:text-white transition-colors duration-200 font-medium">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="shrink-0">
                        <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/30 mb-3 flex items-center gap-1.5">
                            <Phone size={9} /> Contact
                        </p>
                        <div>
                            <p className="text-white text-xs font-semibold">Ms. Richa Tiwari</p>
                            <p className="text-white/30 text-[10px] mb-0.5">Faculty Facilitator</p>
                            <a href="tel:+919131539794" className="text-white/40 text-xs hover:text-white transition-colors">+91 91315 39794</a>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="shrink-0">
                        <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/30 mb-3 flex items-center gap-1.5">
                            <MapPin size={9} /> Location
                        </p>
                        <address className="not-italic text-white/40 text-xs leading-relaxed">
                            Room No: T19, ET Staff Room<br />
                            Dept. of Data Science<br />
                            HITAM, Hyderabad
                        </address>
                    </div>

                    {/* Instagram CTA */}
                    <div className="md:ml-auto shrink-0 flex flex-col items-start md:items-end gap-2">
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                        >
                            <span className="w-5 h-5 rounded-[5px] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shrink-0">
                                <Instagram size={11} className="text-white" />
                            </span>
                            <span className="text-white/50 text-xs font-medium group-hover:text-white transition-colors">@minds_datascience</span>
                            <ArrowUpRight size={11} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                        <div className="w-16 h-16 rounded-[8px] overflow-hidden bg-white p-1 ring-1 ring-white/10">
                            <img
                                src="/instagram-qr.png"
                                alt="Scan to follow on Instagram"
                                className="w-full h-full object-contain"
                                onError={e => { e.target.parentElement.innerHTML = '<p class="text-white/20 text-[8px] text-center flex items-center justify-center h-full p-1">QR Soon</p>'; }}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-white/20 text-[10px]">
                        © {new Date().getFullYear()} MINDS — Data Science Department, HITAM. All rights reserved.
                    </p>
                    <p className="text-white/15 text-[10px]">Chapter 01 · Hyderabad</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
