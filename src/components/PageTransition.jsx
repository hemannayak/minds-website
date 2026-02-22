import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-[calc(100vh-140px)] w-full relative z-10" // accounting for navbar/footer roughly
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
