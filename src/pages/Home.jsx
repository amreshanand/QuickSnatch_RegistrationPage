import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import LastYear from '../components/LastYear/LastYear';
import Committee from '../components/Committee/Committee';
import RegisterCTA from '../components/RegisterCTA/RegisterCTA';
import Footer from '../components/Footer/Footer';
import CyberBackground from '../components/CyberBackground/CyberBackground';
import Loader from '../components/Loader/Loader';
import SystemStatus from '../components/SystemStatus/SystemStatus';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="home-container">
            {isLoading && <Loader onFinished={() => setIsLoading(false)} />}
            <CyberBackground />
            <Navbar />
            <SystemStatus />
            <main>
                <Hero />
                <About />
                <LastYear />
                <Committee />
                <RegisterCTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;



