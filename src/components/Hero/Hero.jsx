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
                    &lt; The Quest Begins /&gt;
                </p>
                <p className={styles.description}>
                    A competitive clue-based hacking adventure. Decode the unknown,
                    race against time, and claim the ultimate bounty.
                </p>
                <Link to="/register" className={styles.ctaButton}>
                    INITIALIZE_PROTOCOL
                </Link>
            </div>
        </SectionWrapper>
    );
};

export default Hero;
