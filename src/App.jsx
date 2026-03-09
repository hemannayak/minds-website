import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Journey from './pages/Journey';
import Events from './pages/Events';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Join from './pages/Join';
import Welcome from './pages/Welcome';
import PageTransition from './components/PageTransition';
import RecruitmentPopup from './components/RecruitmentPopup';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Light Ambient Background Pattern */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="journey" element={<Journey />} />
            <Route path="events" element={<Events />} />
            <Route path="team" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="join" element={<Join />} />
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <RecruitmentPopup />
    </>
  );
}

export default App;
