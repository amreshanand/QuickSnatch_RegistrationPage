import React, { useRef, useState } from 'react';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './About.module.css';

const Modal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div className={styles.modalBody}>
                    {content.split('\n').map((line, i) => (
                        <p key={i} className={styles.modalText}>{line}</p>
                    ))}
                </div>
                <div className={styles.modalFooter}>
                    <span className={styles.modalStatus}>SYSTEM_READY</span>
                </div>
            </div>
        </div>
    );
};

const TiltCard = ({ title, desc, icon, index, onReadMore }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <div
            ref={cardRef}
            className={styles.cardWrapper}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1.05)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                zIndex: isHovered ? 10 : 1
            }}
        >
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.iconContainer}>
                        {icon}
                    </div>
                    <span className={styles.index}>0{index + 1}</span>
                </div>

                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDesc}>{desc}</p>

                <button className={styles.readMoreBtn} onClick={(e) => {
                    e.stopPropagation();
                    onReadMore();
                }}>
                    // READ_MORE
                </button>
            </div>

            {/* Corner Accents */}
            <div className={`${styles.corner} ${styles.topLeft}`}></div>
            <div className={`${styles.corner} ${styles.topRight}`}></div>
            <div className={`${styles.corner} ${styles.bottomLeft}`}></div>
            <div className={`${styles.corner} ${styles.bottomRight}`}></div>
        </div>
    );
};

const About = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        {
            title: 'THE_MISSION',
            desc: 'Navigate through complex puzzles and digital mazes. Your objective is clear: retrieve the payload.',
            details: `> MISSION_BRIEFING_ALPHA\n> PRIORITY: CRITICAL\n\nOperatives must infiltrate usage logs to identify patterns.\nThe labyrinth changes every 24 cycles. Adaptation is survival.\n\nOBJECTIVE:\n- Bypass firewall sector 7G\n- Extract the encrypted payload\n- Return to extraction point before system purge.`,
            icon: <div className={styles.iconCircle}><div className={styles.iconInnerDot}></div></div>,
        },
        {
            title: 'CLI_WARFARE',
            desc: 'Prove your terminal mastery. Speed and precision are your only allies in this command-line battle.',
            details: `> TERMINAL_ACCESS_GRANTED\n> USER: GHOST_ROOT\n\nChallenge includes real-time scripting and debugging under pressure.\n\nWARNING:\nIncorrect syntax will trigger system lockdown.\nTime penalty for unauthorized commands: 30s.\n\nPrepare your scripts. The shell is your weapon.`,
            icon: <div className={styles.iconLightning}>⚡</div>,
        },
        {
            title: 'LEADERBOARD',
            desc: 'Climb the ranks. Global supremacy awaits the one who cracks the final encryption.',
            details: `> ACCESSING_GLOBAL_DATABASE...\n> FETCHING_TOP_OPERATIVES...\n\nRank is determined by speed and accuracy.\nBonus points awarded for discovering hidden flags.\n\nCurrent Sentinel Status: ACTIVE\n\nWill you reach the Apex?`,
            icon: <div className={styles.iconTriangle}>▲</div>,
        },
        {
            title: 'THE_SNATCH',
            desc: 'First to solve the final clue wins the grand prize. Winner takes all.',
            details: `> DECRYPTING_REWARD_FILE...\n> PASSWORD_REQUIRED: **********\n\nThe final challenge is a test of all skills acquired.\n\nREWARD_CACHE:\n- Classified tech assets\n- Digital currency tokens (simulation)\n- The title of "Master Breaker"\n\nOnly one can claim the prize.`,
            icon: <div className={styles.iconStar}>★</div>,
        },
    ];

    return (
        <SectionWrapper id="about" className={styles.aboutSection}>
            <h2 className={styles.heading}>SYSTEM_OVERVIEW</h2>

        <SectionWrapper id="about">
            <h2 className={styles.heading}>System Overview</h2>
            <div className={styles.grid}>
                {cards.map((card, index) => (
                    <TiltCard
                        key={index}
                        {...card}
                        index={index}
                        onReadMore={() => setSelectedCard(card)}
                    />
                ))}
            </div>

            <Modal
                isOpen={!!selectedCard}
                onClose={() => setSelectedCard(null)}
                title={selectedCard?.title}
                content={selectedCard?.details || ''}
            />
        </SectionWrapper>
    );
};

export default About;
