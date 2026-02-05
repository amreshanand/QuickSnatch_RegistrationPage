import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.brand}>
                    <h3>QUICK SNATCH 2.0</h3>
                    <p>Newton School of Technology, Pune</p>
                </div>
                <div className={styles.socials}>
                    <span>[INSTAGRAM]</span>
                    <span>[X_TWITTER]</span>
                    <span>[LINKEDIN]</span>
                </div>
            </div>
            <div className={styles.copyright}>
                © 2024 QUICK SNATCH. SYSTEM_ALL_RIGHTS_RESERVED.
            </div>
        </footer>
    );
};

export default Footer;
