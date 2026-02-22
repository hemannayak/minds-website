import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Cpu, LineChart, Code } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../lib/animations';

const features = [
    {
        icon: <Zap size={24} className="text-blue-400" />,
        title: 'Lightning Fast',
        description: 'Built on edge infrastructure to deliver sub-50ms latency worldwide.'
    },
    {
        icon: <Shield size={24} className="text-purple-400" />,
        title: 'Enterprise Security',
        description: 'Bank-grade encryption and SOC2 Type II compliance out of the box.'
    },
    {
        icon: <Globe size={24} className="text-blue-400" />,
        title: 'Global Scale',
        description: 'Deploy to 35+ regions with a single click and scale effortlessly.'
    },
    {
        icon: <Cpu size={24} className="text-purple-400" />,
        title: 'AI Native',
        description: 'Deep learning models baked directly into the core architecture.'
    },
    {
        icon: <LineChart size={24} className="text-blue-400" />,
        title: 'Real-time Analytics',
        description: 'Actionable insights delivered milliseconds after events occur.'
    },
    {
        icon: <Code size={24} className="text-purple-400" />,
        title: 'Developer First',
        description: 'Intuitive APIs, beautiful SDKs, and comprehensive documentation.'
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                        Everything you need to <span className="gradient-text">build faster</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        A complete suite of tools designed to remove friction from your workflow, so you can focus on what matters most.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-purple-500/30 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
