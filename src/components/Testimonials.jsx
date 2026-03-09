import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../lib/animations';

const testimonials = [
    {
        quote: "Minds Club completely revolutionized how our engineering team ships code. We've reduced our delivery time by 40% and eliminated infrastructure headaches entirely.",
        author: "Sarah Chen",
        role: "VP of Engineering, Paradigm",
        initials: "SC",
        color: "from-blue-400 to-blue-600"
    },
    {
        quote: "The interface is gorgeous, the performance is unmatched, and the real-time analytics have given us insights we never thought possible. A massive upgrade.",
        author: "Marcus Johnson",
        role: "Founder, ScaleAI",
        initials: "MJ",
        color: "from-purple-400 to-purple-600"
    },
    {
        quote: "We evaluated 5 different platforms before choosing Minds Club. Nothing else comes close to the developer experience and elegant architecture provided here.",
        author: "Elena Rodriguez",
        role: "CTO, FinTech Global",
        initials: "ER",
        color: "from-slate-600 to-blue-500"
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                        Loved by <span className="gradient-text">visionaries</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Don't just take our word for it. Here's what some of the world's most innovative teams have to say about Minds Club.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative flex flex-col justify-between"
                        >
                            {/* Decorative quotation mark */}
                            <div className="text-6xl text-white/10 font-serif leading-none absolute top-4 left-6">"</div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10 pt-4 font-medium">
                                {testimonial.quote}
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center font-bold text-white text-lg`}>
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{testimonial.author}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
