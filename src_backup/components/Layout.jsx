import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="relative min-h-screen bg-background text-white font-sans overflow-hidden">
            {/* Dynamic Ambient Background - Refined for elegance */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[140px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[130px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
            </div>

            <Navbar />
            <main className="min-h-[calc(100vh-140px)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
