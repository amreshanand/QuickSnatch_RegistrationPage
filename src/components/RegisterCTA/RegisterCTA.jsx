import React from 'react';
import { Link } from 'react-router-dom';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './RegisterCTA.module.css';

const RegisterCTA = () => {
    return (
        <SectionWrapper id="register" className={styles.container}>
            <div className={styles.box}>
                <h2 className={styles.title}>Are you ready to breach?</h2>
                <p className={styles.subtitle}>Spots are limited. Secure your terminal access now.</p>
                <Link to="/register" className={styles.button}>
                    ENTER COMPETITION
                </Link>
            </div>
        </SectionWrapper>
    );
};

export default RegisterCTA;
