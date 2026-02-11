import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [time, setTime] = useState('');
    const location = useLocation();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${id}`;
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.navLeft}>
                    <div className={styles.logo} onClick={() => scrollToSection('hero')}>
                        NST<span>SDC</span>
                    </div>
                    <div className={styles.timeDisplay}>
                        [{time}]
                    </div>
                </div>

                <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
                    <a onClick={() => scrollToSection('hero')} className={styles.link}>/home</a>
                    <a onClick={() => scrollToSection('about')} className={styles.link}>/man_pages</a>
                    <a onClick={() => scrollToSection('lastyear')} className={styles.link}>/logs</a>
                    <Link to="/register" className={styles.registerBtn}>
                        ./EXEC_REG.sh
                    </Link>
                </div>


                <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                    <div className={isOpen ? styles.barOpen : ''}></div>
                    <div className={isOpen ? styles.barOpen : ''}></div>
                    <div className={isOpen ? styles.barOpen : ''}></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
