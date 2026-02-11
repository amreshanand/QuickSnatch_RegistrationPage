import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import LastYear from '../components/LastYear/LastYear';

import RegisterCTA from '../components/RegisterCTA/RegisterCTA';
import Footer from '../components/Footer/Footer';
import CyberBackground from '../components/CyberBackground/CyberBackground';
import SystemStatus from '../components/SystemStatus/SystemStatus';

const Home = () => {
    return (
        <div className="home-container">
            <CyberBackground />
            <Navbar />
            <SystemStatus />
            <main>
                <Hero />
                <About />
                <LastYear />

                <RegisterCTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;



