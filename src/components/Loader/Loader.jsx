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
        '> ACCESS GRANTED. START THE HUNT.'
    ];

    useEffect(() => {
        let currentLine = 0;
        let currentChar = 0;
        let interval;

        const typeLine = () => {
            if (currentLine >= lines.length) {
                setTimeout(() => {
                    setIsFading(true);
                    setTimeout(onFinished, 500);
                }, 200);
                return;
            }

            if (currentChar <= lines[currentLine].length) {
                setText(prev => (currentChar === 0 ? prev + '\n' : prev) + lines[currentLine].charAt(currentChar - 1));
                currentChar++;
                interval = setTimeout(typeLine, 10);
            } else {
                currentLine++;
                currentChar = 0;
                interval = setTimeout(typeLine, 100);
            }
        };

        typeLine();

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 50);

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
                    <pre className={styles.text}>{text}<span className={styles.cursor}>_</span></pre>
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
