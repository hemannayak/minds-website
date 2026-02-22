import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, UserPlus } from 'lucide-react';
import PageTransition from '../components/PageTransition';

// ── Swap this to your Google Apps Script URL once deployed ──
// const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
const USE_APPS_SCRIPT = true; // flip to true after deploying Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/a/macros/hitam.org/s/AKfycbx_MM60s1N5BhMCMW6G4zrdVfprZfYHU0zjld1F4W7xI0IxzrH6joThEaPVNFmVlgQSOg/exec';
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/minds.datascience@hitam.org';

const Join = () => {
    const [formStatus, setFormStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        const formData = new FormData(e.target);

        try {
            let response, data;

            if (USE_APPS_SCRIPT && APPS_SCRIPT_URL !== 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
                // ── Google Apps Script path (Sheets + email) ──
                // Apps script requires form-urlencoded data to avoid CORS preflight failures
                const formBody = new URLSearchParams(formData).toString();

                response = await fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formBody,
                });
                data = await response.json();
            } else {
                // ── FormSubmit fallback ──
                formData.append('_subject', 'New Club Membership Application - MINDS');
                formData.append('_captcha', 'false');
                response = await fetch(FORMSUBMIT_URL, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData,
                });
                data = await response.json();
            }

            if (data?.success) {
                navigate('/welcome');
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            setFormStatus('error');
        }
    };

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20"
                    >
                        <UserPlus size={32} className="text-white" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">
                        Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">MINDS</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                        Become a part of the official tech initiative of the Data Science Department. Elevate your skills and build the future with us.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-[#0F172A] border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                    {/* Background glows for premium dark feel */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>

                    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/80 transition-all shadow-inner"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/80 transition-all shadow-inner"
                                placeholder="Enter your official college email"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400">Year</label>
                                <select
                                    name="year"
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:bg-slate-900/80 transition-all appearance-none cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-slate-500">Select Year</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400">Branch</label>
                                <select
                                    name="branch"
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:bg-slate-900/80 transition-all appearance-none cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Branch</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="AI & ML">AI &amp; ML</option>
                                    <option value="CSE Core">CSE Core</option>
                                    <option value="CSE-ITP">CSE-ITP</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="Mech">Mech</option>
                                    <option value="MECH-ITP">MECH-ITP</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400">Section <span className="text-slate-600 font-normal">(optional)</span></label>
                                <input
                                    type="text"
                                    name="section"
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-slate-900/80 transition-all shadow-inner"
                                    placeholder="e.g. A (optional)"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === 'sending'}
                            className="w-full mt-4 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 disabled:opacity-70 disabled:hover:scale-100 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2"
                        >
                            {formStatus === 'sending' ? 'Processing Application...' : 'Join MINDS'}
                            {formStatus !== 'sending' && <Send size={18} />}
                        </button>

                        {formStatus === 'error' && (
                            <p className="text-rose-400 text-sm font-medium text-center mt-4">Failed to submit application. Please verify your connection or try again.</p>
                        )}
                    </form>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Join;
