// Stagger parent container
export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

// Standard fade + rise
export const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

// Scale in from slightly smaller
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

// Fade left to right (for panels / cards)
export const fadeInLeft = {
    hidden: { opacity: 0, x: -24 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};
