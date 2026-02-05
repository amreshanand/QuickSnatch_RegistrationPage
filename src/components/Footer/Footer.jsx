import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.systemBar}>
                <span>STATUS: <span className={styles.online}>ONLINE</span></span>
                <span>UPTIME: 48:22:15</span>
                <span>ENCRYPTION: AES-256</span>
                <span>DATA_STREAM: SECURE</span>
            </div>

            <div className={styles.grid}>
                {/* Column 1: Brand/Identity */}
                <div className={styles.col}>
                    <h4 className={styles.termHeader}> // IDENTITY_CORE</h4>
                    <div className={styles.logo}>
                        QUICK_SNATCH_<span className={styles.version}>v2.0</span>
                    </div>
                    <p className={styles.desc}>
                        A competitive treasure hunting protocol initialized by Newton School of Technology.
                        Decode. Breach. Win.
                    </p>
                    <div className={styles.cliInput}>
                        <span className={styles.prompt}>user@root:~$</span> _
                    </div>
                </div>

                {/* Column 2: Navigation Maps */}
                <div className={styles.col}>
                    <h4 className={styles.termHeader}> // SITE_MAP</h4>
                    <ul className={styles.linkList}>
                        <li><a href="#hero">&gt; cd /home</a></li>
                        <li><a href="#about">&gt; cat info.txt</a></li>
                        <li><a href="#committee">&gt; ls /admins</a></li>
                        <li><a href="#lastyear">&gt; history | grep legacy</a></li>
                        <li><Link to="/register" className={styles.highlight}>&gt; ./execute_reg.sh</Link></li>
                    </ul>
                </div>

                {/* Column 3: Communication Channels */}
                <div className={styles.col}>
                    <h4 className={styles.termHeader}> // COMM_CHANNELS</h4>
                    <ul className={styles.linkList}>
                        <li><a href="#">[0] INSTAGRAM_LINK_ESTABLISHED</a></li>
                        <li><a href="#">[1] DISCORD_SERVER_NOT_FOUND</a></li>
                        <li><a href="#">[2] LINKEDIN_HANDSHAKE</a></li>
                        <li><a href="#">[3] MAIL_PROTOCOL_SMTP</a></li>
                    </ul>
                </div>

                {/* Column 4: System Logs / Location */}
                <div className={styles.col}>
                    <h4 className={styles.termHeader}> // GEO_LOCATION</h4>
                    <div className={styles.terminalBlock}>
                        <p>TARGET: NST Pune</p>
                        <p>COORDS: 18.5204° N, 73.8567° E</p>
                        <p>SECTOR: 7-G</p>
                        <p className={styles.warning}>WARNING: UNAUTHORIZED SECTORS AHEAD</p>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div className={styles.bottomLeft}>
                    © 2026 QUICK_SNATCH_SYSTEMS. ALL_RIGHTS_RESERVED.
                </div>
                <div className={styles.bottomRight}>
                    <span className={styles.processing}>SYSTEM_PROCESSING...</span>
                    <span className={styles.blink}>_</span> END_OF_FILE
                </div>
            </div>
        </footer>
    );
};

export default Footer;
