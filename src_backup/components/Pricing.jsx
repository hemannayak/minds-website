import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { staggerContainer, scaleIn } from '../lib/animations';

const plans = [
    {
        name: 'Starter',
        price: '$0',
        description: 'Perfect for side projects and small teams getting started.',
        features: ['Up to 3 projects', 'Basic analytics', 'Community support', '48-hour data retention', 'Standard edge network'],
        cta: 'Get Started',
        highlight: false
    },
    {
        name: 'Pro',
        price: '$49',
        period: '/mo',
        description: 'Everything you need to scale your application globally.',
        features: ['Unlimited projects', 'Advanced analytics', 'Priority email support', '30-day data retention', 'Premium edge network', 'Custom domains'],
        cta: 'Start Free Trial',
        highlight: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Dedicated support and infrastructure for large scaling needs.',
        features: ['Unlimited everything', 'Custom reporting', '24/7 phone support', 'Unlimited data retention', 'Dedicated edge nodes', 'SLA guarantees'],
        cta: 'Contact Sales',
        highlight: false
    }
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                        Simple, transparent <span className="gradient-text">pricing</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        No hidden fees. No surprise charges. Choose the plan that best fits your needs.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={scaleIn}
                            className={`rounded-3xl p-8 relative flex flex-col h-full bg-navy ${plan.highlight
                                    ? 'border border-purple-500 shadow-2xl shadow-purple-500/20'
                                    : 'border border-white/10'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm h-10">{plan.description}</p>
                                <div className="mt-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                                    {plan.period && <span className="text-gray-400 font-medium">{plan.period}</span>}
                                </div>
                            </div>

                            <div className="flex-1">
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <Check size={20} className="text-purple-400 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${plan.highlight
                                        ? 'gradient-bg text-white hover:opacity-90 shadow-lg shadow-purple-500/25'
                                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
