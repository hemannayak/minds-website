import React from 'react';
import { motion } from 'framer-motion';

const HeroMesh = () => {
    return (
        <motion.div
            className="w-full h-full flex items-center justify-center pointer-events-none opacity-20 sm:opacity-[0.35]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
            <svg viewBox="0 0 400 400" className="w-[140%] max-w-[500px] h-auto stroke-slate-400 fill-none" style={{ strokeWidth: 1.2 }}>
                {/* Geodesic sphere / Abstract Icosahedron Wireframe */}
                <circle cx="200" cy="200" r="180" />

                {/* Horizontal Ellipses */}
                <ellipse cx="200" cy="200" rx="180" ry="60" />
                <ellipse cx="200" cy="200" rx="180" ry="120" />

                {/* Vertical Ellipses */}
                <ellipse cx="200" cy="200" rx="60" ry="180" />
                <ellipse cx="200" cy="200" rx="120" ry="180" />

                {/* Diagonals */}
                <path d="M 72.7 72.7 L 327.3 327.3" />
                <path d="M 72.7 327.3 L 327.3 72.7" />

                {/* Outer frame lines */}
                <path d="M 20 200 L 200 20 L 380 200 L 200 380 Z" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="90" strokeDasharray="2 4" />
            </svg>
        </motion.div>
    );
};

export default HeroMesh;
