import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Journey', path: '/journey' },
        { name: 'Events', path: '/events' },
        { name: 'Team', path: '/team' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-black/80 backdrop-blur-md border-b border-white/[0.06] h-[70px]'
                : 'bg-transparent h-[90px]'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div className="w-10 h-10 md:w-11 md:h-11 overflow-hidden rounded-xl border border-white/10 flex items-center justify-center shrink-0 bg-white/5 transition-colors duration-300 group-hover:border-white/20">
                        <img src="/Club_Logo-bg.png" alt="MINDS Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-2xl font-black tracking-tighter leading-none text-white transition-colors duration-300">
                            MINDS
                        </span>
                        <span className="text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-wide mt-1 uppercase hidden sm:block text-white/30 transition-colors duration-300">
                            Official Club of Data Science, HITAM
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative text-sm font-medium tracking-wide transition-colors group py-2 ${isActive
                                    ? 'text-white'
                                    : 'text-white/40 hover:text-white'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    <span
                                        className={`absolute left-0 bottom-0 h-[1.5px] bg-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    ></span>
                                </>
                            )}
                        </NavLink>
                    ))}

                    {/* Join Us CTA */}
                    <Link
                        to="/join"
                        className="relative px-5 py-2 rounded-[10px] font-medium text-sm text-black bg-white hover:bg-white/90 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] ml-2"
                        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 4px 12px rgba(255,255,255,0.06)' }}
                    >
                        Join Us
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="lg:hidden relative z-50 p-2 transition-colors text-white/50 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black z-[70] lg:hidden flex flex-col justify-center px-8 border-l border-white/[0.06] overflow-y-auto"
                    >
                        <div className="flex flex-col gap-8 mt-12">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i + 0.1 }}
                                >
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `text-4xl font-bold relative w-fit group py-1 block transition-colors ${isActive ? 'text-white' : 'text-white/30 hover:text-white'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {link.name}
                                                <span
                                                    className={`absolute -bottom-2 left-0 h-[1.5px] bg-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                                        }`}
                                                ></span>
                                            </>
                                        )}
                                    </NavLink>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8"
                            >
                                <Link
                                    to="/join"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-8 py-4 rounded-[10px] font-medium text-lg text-black bg-white hover:bg-white/90 w-full max-w-xs transition-all duration-[250ms] hover:-translate-y-[1px] text-center flex items-center justify-center"
                                >
                                    Join Us
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
