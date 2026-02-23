import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link, useLocation } from 'react-router-dom';

const LAUNCH_DATE = new Date('2026-02-27T16:15:00+05:30').getTime();

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLaunched, setIsLaunched] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Check launch state on mount
        const checkLaunch = () => {
            const pastDate = new Date().getTime() >= LAUNCH_DATE;
            const hasFlag = !!localStorage.getItem('minds_launched');
            setIsLaunched(pastDate || hasFlag);
        };
        checkLaunch();

        // Listen for the flag being set (reveal panel fires it)
        const onStorage = (e) => { if (e.key === 'minds_launched') checkLaunch(); };
        window.addEventListener('storage', onStorage);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', onStorage);
        };
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
                ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 h-[70px] shadow-sm'
                : 'bg-transparent h-[90px]'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex flex-col justify-center cursor-pointer group"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <span className="text-2xl font-black tracking-tighter text-slate-800 leading-none">MINDS</span>
                    {isLaunched ? (
                        <motion.span
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="text-[0.55rem] sm:text-[0.6rem] font-semibold tracking-wide text-indigo-500 mt-0.5 uppercase hidden sm:block"
                        >
                            Modern Innovation · Next-Gen Data-Science Society
                        </motion.span>
                    ) : (
                        <span className="text-[0.6rem] sm:text-xs font-semibold tracking-wide text-slate-500 mt-1 uppercase hidden sm:block">
                            Official Club of Data Science Department, HITAM
                        </span>
                    )}
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative text-sm font-bold tracking-wide transition-colors group py-2 ${isActive ? 'text-primary' : 'text-slate-600 hover:text-indigo-600'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    {/* Hover/Active Underline Animation */}
                                    <span
                                        className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    ></span>
                                </>
                            )}
                        </NavLink>
                    ))}

                    {/* Join Us CTA */}
                    <Link to="/join" className="relative px-6 py-2.5 rounded-full font-bold text-sm text-white transition-transform duration-300 hover:scale-105 active:scale-95 ml-2 bg-gradient-to-r from-indigo-600 to-blue-600 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]">
                        Join Us
                    </Link>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    className="lg:hidden relative z-50 p-2 text-slate-600 hover:text-slate-900 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Slide-in Drawer with Framer Motion */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-[70] lg:hidden flex flex-col justify-center px-8 border-l border-gray-100 overflow-y-auto"
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
                                            `text-4xl font-bold relative w-fit group py-1 block transition-colors ${isActive ? 'text-primary' : 'text-slate-600 hover:text-indigo-600'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {link.name}
                                                <span
                                                    className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
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
                                    className="px-8 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-[0_0_30px_rgba(79,70,229,0.4)] w-full max-w-xs transition-transform duration-300 active:scale-95 text-center flex items-center justify-center justify-self-start"
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
