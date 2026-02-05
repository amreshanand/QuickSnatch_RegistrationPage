import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import LastYear from '../components/LastYear/LastYear';
import Committee from '../components/Committee/Committee';
import RegisterCTA from '../components/RegisterCTA/RegisterCTA';
import Footer from '../components/Footer/Footer';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
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
