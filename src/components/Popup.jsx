import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup immediately when component mounts
        setIsOpen(true);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-lg w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-md"
                        >
                            <X size={18} />
                        </button>

                        <div className="w-full aspect-square bg-slate-100 flex items-center justify-center">
                            {/* Image provided by user - assuming they will name it popup-image.png and put it in public */}
                            <img
                                src="/popup-image.png"
                                alt="Something BIG is coming 27th FEB"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                    e.currentTarget.parentElement.innerHTML += '<div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8"><p class="text-slate-800 font-bold text-xl mb-2">Popup Image Placeholder</p><p class="text-slate-500 text-sm">Please save your image as <code>public/popup-image.png</code></p></div>';
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;
