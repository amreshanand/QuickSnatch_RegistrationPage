import React from 'react';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './About.module.css';

const About = () => {
    const cards = [
        { title: 'The Hunt', desc: 'Navigate through complex puzzles and digital mazes.' },
        { title: 'CLI Challenges', desc: 'Prove your terminal mastery in timed events.' },
        { title: 'Leaderboard', desc: 'Climb the ranks and claim your supremacy.' },
        { title: 'The Snatch', desc: 'First to solve the final clue wins the grand prize.' },
    ];

    return (
        <SectionWrapper id="about">
            <h2 className={styles.heading}>System Overview</h2>
            <div className={styles.grid}>
                {cards.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.icon}>0{index + 1}</span>
                        </div>
                        <h3 className={styles.cardTitle}>{card.title}</h3>
                        <p className={styles.cardDesc}>{card.desc}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default About;
