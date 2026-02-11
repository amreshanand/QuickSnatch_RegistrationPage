import React, { useEffect, useRef, useState } from 'react';
import styles from './SectionWrapper.module.css';

const SectionWrapper = ({ children, id, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.1 });

        const { current } = domRef;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    return (
        <section
            id={id}
            ref={domRef}
            className={`${styles.section} ${isVisible ? styles.visible : ''}`}
        >
            <div className={`${styles.contentContainer} ${className || ''}`}>
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;
