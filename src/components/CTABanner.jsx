import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '../lib/animations';

const CTABanner = () => {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden bg-white/5 border border-white/10"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-50 backdrop-blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight max-w-2xl mx-auto">
                            Ready to redefine your workflow?
                        </h2>
                        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
                            Join thousands of forward-thinking teams already building the future with Minds Club. Get started in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 rounded-full gradient-bg text-white font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 group">
                                Start building for free
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-6 mt-4">
                            No credit card required. 14-day free trial on Pro plans.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTABanner;
