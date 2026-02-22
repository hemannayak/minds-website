import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../lib/animations';

const steps = [
    {
        number: '01',
        title: 'Connect your tools',
        description: 'Integrate seamlessly with your existing workflow. One click integration with Github, Slack, and Jira.'
    },
    {
        number: '02',
        title: 'Define your logic',
        description: 'Use our powerful visual editor to create custom automations without writing a single line of code.'
    },
    {
        number: '03',
        title: 'Deploy to the edge',
        description: 'Push your changes globally in milliseconds. We handle the infrastructure, scaling, and security automatically.'
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 px-6 relative z-10">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 items-center">
                <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                        Complex workflows, <br className="hidden md:block" />
                        <span className="text-gray-500">simplified.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-md">
                        Stop jumping between completely different platforms context switching. Get everything done in a unified workspace.
                    </p>
                    <div className="w-48 h-48 relative rounded-full blur-3xl bg-blue-600/20 -z-10" />
                </div>

                <motion.div
                    className="flex-1 w-full relative"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Vertical connecting line */}
                    <div className="absolute left-8 top-10 bottom-10 w-px bg-white/10 md:left-10" />

                    <div className="flex flex-col gap-12">
                        {steps.map((step, index) => (
                            <motion.div key={index} variants={fadeInUp} className="relative flex gap-6 md:gap-8">
                                <div className="w-16 h-16 shrink-0 rounded-2xl gradient-bg flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/20 z-10 border border-white/20">
                                    {step.number}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-base">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
