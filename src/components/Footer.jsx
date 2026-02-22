import React from 'react';
import { Linkedin, Instagram, MessageCircle, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="pt-20 pb-10 px-6 border-t border-slate-200 relative z-10 bg-slate-50">
            <div className="max-w-7xl mx-auto">
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
