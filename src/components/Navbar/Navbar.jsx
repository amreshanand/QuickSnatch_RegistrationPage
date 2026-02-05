import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            // If not on home, we just navigate to home (logic handled in page or simple link)
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
                <div className={styles.logo} onClick={() => scrollToSection('hero')}>
                    CORE_<span>QS2.0</span>
                </div>

                <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
                    <a onClick={() => scrollToSection('hero')} className={styles.link}>Home</a>
                    <a onClick={() => scrollToSection('about')} className={styles.link}>Quest Info</a>
                    <a onClick={() => scrollToSection('committee')} className={styles.link}>Committee</a>
                    <a onClick={() => scrollToSection('lastyear')} className={styles.link}>Legacy</a>
                    <Link to="/register" className={styles.registerBtn}>
                        INIT_REGISTRATION
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
