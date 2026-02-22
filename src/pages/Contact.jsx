import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { fadeInUp, staggerContainer } from '../lib/animations';

const ContactCard = ({ icon, title, value, subValue }) => (
    <motion.div
        variants={fadeInUp}
        className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all flex items-start gap-6 group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:bg-indigo-100/50 transition-colors"></div>
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-sky-500 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all duration-500">
            {icon}
        </div>
        <div className="flex-1 min-w-0 z-10">
            <h3 className="text-slate-500 text-sm font-bold tracking-wider uppercase mb-2">{title}</h3>
            <p className="text-lg md:text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors break-words">{value}</p>
            {subValue && <p className="text-sm text-slate-500 line-clamp-1">{subValue}</p>}
        </div>
    </motion.div>
);

const Contact = () => {
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        const formData = new FormData(e.target);
        // FormSubmit required fields
        formData.append('_subject', 'New Contact Message from MINDS Website');
        formData.append('_captcha', 'false');

        try {
            const response = await fetch('https://formsubmit.co/ajax/minds.datascience@hitam.org', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setFormStatus('success');
                e.target.reset();
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            setFormStatus('error');
        }
    };

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Touch</span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Have questions about the club, upcoming events, or potential collaborations? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

                    {/* Contact Information */}
                    <motion.div
                        className="flex flex-col justify-center space-y-6"
                        initial="hidden"
                        animate="show"
                        variants={staggerContainer}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">Contact Details</h2>

                        <ContactCard
                            icon={<Mail size={24} />}
                            title="Official Email"
                            value="minds.datascience@hitam.org"
                            subValue="For general inquiries and partnerships"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                            <ContactCard
                                icon={<Phone size={24} />}
                                title="Ms. Richa Tiwari"
                                value="Faculty Facilitator"
                                subValue="+91 91315 39794"
                            />
                            <ContactCard
                                icon={<Phone size={24} />}
                                title="Apurba Nandi"
                                value="+91 81797 17349"
                            />
                            <ContactCard
                                icon={<Phone size={24} />}
                                title="Sai Prasanna"
                                value="+91 81061 10146"
                            />
                        </div>
                    </motion.div>

                    {/* Contact Form Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent pointer-events-none"></div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>

                        {formStatus === 'success' ? (
                            <div className="relative z-10 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send size={20} />
                                </div>
                                <h4 className="text-lg font-bold text-emerald-800 mb-2">Message Sent!</h4>
                                <p className="text-emerald-600 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
                                <button onClick={() => setFormStatus('')} className="mt-6 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-500">Name</label>
                                        <input type="text" name="name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-500">Email Address</label>
                                        <input type="email" name="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-500">Message</label>
                                    <textarea name="message" required rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === 'sending'}
                                    className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:hover:translate-y-0 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                    {formStatus !== 'sending' && <Send size={18} />}
                                </button>

                                {formStatus === 'error' && (
                                    <p className="text-rose-500 text-sm italic text-center mt-2">Failed to send message. Please try again.</p>
                                )}
                            </form>
                        )}
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
