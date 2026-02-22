import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, MessageCircle, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/hitam_datascience_club/'; // ← update handle if needed

const Footer = () => {
    return (
        <footer className="relative z-10 bg-slate-50 border-t border-slate-200">

            {/* ── Stay Connected ──────────────────────────────── */}
            <div className="py-16 px-6 border-b border-slate-200">
                <div className="max-w-xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-500 mb-3">Follow Us</p>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-3">
                            Stay{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                                Connected
                            </span>
                        </h2>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                            Follow us on Instagram for the latest updates, event announcements, and behind-the-scenes moments from MINDS Club.
                        </p>

                        {/* QR + Link row */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            {/* QR code */}
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block"
                            >
                                <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                                    <img
                                        src="/instagram-qr.png"
                                        alt="Scan to follow MINDS Club on Instagram"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2 text-center">Scan to follow</p>
                            </a>

                            {/* Divider */}
                            <div className="hidden sm:flex flex-col items-center gap-1">
                                <div className="h-12 w-px bg-slate-200" />
                                <span className="text-xs text-slate-400 font-medium">or</span>
                                <div className="h-12 w-px bg-slate-200" />
                            </div>
                            <span className="sm:hidden text-xs text-slate-400 font-medium">or</span>

                            {/* Instagram button */}
                            <div className="flex flex-col items-center gap-3">
                                <a
                                    href={INSTAGRAM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-pink-200 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300">
                                        <Instagram size={18} className="text-white" />
                                    </span>
                                    <span className="font-semibold text-slate-700 text-sm group-hover:text-pink-600 transition-colors">
                                        @minds_datascience
                                    </span>
                                    <ArrowUpRight size={15} className="text-slate-400 group-hover:text-pink-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </a>
                                <p className="text-xs text-slate-400">Click to open profile</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-16 pb-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
                    <div className="col-span-1 md:col-span-1 lg:col-span-4">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center font-bold text-white shadow-sm">M</div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">MINDS</span>
                        </div>
                        <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                            Official initiative of the Data Science Department, HITAM. Bridging the gap between academic theory and industry practice.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-1 lg:col-span-5 lg:pl-10">
                        <h4 className="text-slate-900 font-semibold mb-6 flex items-center gap-2">
                            <Phone size={18} className="text-indigo-500" />
                            Direct Contacts
                        </h4>
                        <ul className="space-y-5">
                            <li className="flex flex-col">
                                <span className="text-slate-800 font-bold mb-0.5">MS Richa Tiwari</span>
                                <span className="text-sky-600 font-semibold text-xs uppercase tracking-wider">Faculty Facilitator</span>
                                <span className="text-slate-500 text-sm mt-1">+91 XXXXX XXXXX</span>
                            </li>
                            <li className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-slate-800 font-bold mb-0.5">Apurba</span>
                                    <span className="text-sky-600 font-semibold text-xs uppercase tracking-wider">Logistics Team Lead</span>
                                    <span className="text-slate-500 text-sm mt-1">+91 XXXXX XXXXX</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-800 font-bold mb-0.5">Prasanna</span>
                                    <span className="text-sky-600 font-semibold text-xs uppercase tracking-wider">PR & Media Lead</span>
                                    <span className="text-slate-500 text-sm mt-1">+91 XXXXX XXXXX</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        <h4 className="text-slate-900 font-semibold mb-6 flex items-center gap-2">
                            <MapPin size={18} className="text-indigo-500" />
                            Locate Us
                        </h4>
                        <address className="text-slate-500 not-italic leading-loose font-medium">
                            Room No: T19 <br />
                            ET Staff Room <br />
                            Department of Data Science <br />
                            HITAM
                        </address>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 mt-12 flex flex-col items-center justify-center gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} MINDS Club. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
