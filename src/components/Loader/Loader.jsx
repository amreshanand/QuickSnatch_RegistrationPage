import React, { useState, useEffect } from 'react';
import styles from './Loader.module.css';

const Loader = ({ onFinished }) => {
    const [text, setText] = useState('');
    const [progress, setProgress] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const lines = [
        '> INITIALIZING TERMINAL CONSOLE...',
        '> LOADING CLI MODULES...',
        '> SCANNING FOR HIDDEN REPOSITORIES...',
        '> DECRYPTING ANCIENT MAP_DATA...',
        '> SEARCHING FOR TARGET: "TREASURE_ROOT"',
        '> FOUND CLUE #1 - BYPASSING FIREWALL...',
        '\n> ACCESS GRANTED.\n> START THE HUNT.'
    ];

    useEffect(() => {
        let currentLine = 0;
        let currentChar = 0;
        let interval;

        const typeLine = () => {
            if (currentLine >= lines.length) {
                setTimeout(() => {
                    setIsFading(true);
                    setTimeout(onFinished, 250);
                }, 100);
                return;
            }

            if (currentChar <= lines[currentLine].length) {
                setText(prev => (currentChar === 0 ? prev + '\n' : prev) + lines[currentLine].charAt(currentChar - 1));
                currentChar++;
                interval = setTimeout(typeLine, 5);
            } else {
                currentLine++;
                currentChar = 0;
                // Add longer pause before the final "ACCESS GRANTED" line
                const isLastLine = currentLine === lines.length - 1;
                interval = setTimeout(typeLine, isLastLine ? 400 : 50);
            }
        };

        typeLine();

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Slower increment to match the typing speed (~3-4 seconds total)
                return prev + Math.random() * 2;
            });
        }, 25);

        return () => {
            clearTimeout(interval);
            clearInterval(progressInterval);
        };
    }, [onFinished]);


    return (
        <div className={`${styles.loaderContainer} ${isFading ? styles.fadeOut : ''}`}>
            <div className={styles.terminal}>
                <div className={styles.header}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.title}>SYSTEM_TERMINAL</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.textContainer}>
                        {text.split('\n').map((line, index) => (
                            <div key={index} className={line.includes('ACCESS GRANTED') ? styles.accessLine : styles.line}>
                                {line}
                            </div>
                        ))}
                        <span className={styles.cursor}>_</span>
                    </div>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                    </div>
                    <div className={styles.status}>
                        <span>STATUS: {progress >= 100 ? 'READY' : 'LOADING...'}</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>
                </div>
            </div>
            <div className={styles.scanline} />
        </div>
    );
};


export default Loader;
