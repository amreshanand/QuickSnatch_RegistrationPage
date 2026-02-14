import React from 'react';
import { Link } from 'react-router-dom';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <SectionWrapper id="hero" className={styles.heroSection}>
            <div className={styles.backgroundGlow}></div>
            <div className={styles.content}>
                <h1 className={`${styles.title} glitch-text`} data-text="QUICK SNATCH 2.0">
                    QUICK SNATCH <span>2.0</span>
                </h1>
                <p className={styles.tagline}>
                    &lt; The CLI Treasure Hunt /&gt;
                </p>
                <p className={styles.description}>
                    A high-stakes digital scavenger hunt. Navigate the terminal,
                    decode cryptic logs, and track down the 0xROOT bounty before time runs out.
                </p>
                <Link to="/register" className={styles.ctaButton}>
                    Register Now
                </Link>

            </div>
        </SectionWrapper>
    );
};

export default Hero;
