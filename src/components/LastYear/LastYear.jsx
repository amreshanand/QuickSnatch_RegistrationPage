import React from 'react';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './LastYear.module.css';

const LastYear = () => {
    return (
        <SectionWrapper id="lastyear" className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.heading}>Legacy Archive</h2>
                <p className={styles.text}>
                    Quick Snatch 1.0 set the benchmark. Witness where it all began.
                </p>
                <a
                    href="https://quicksnatch.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                >
                    ACCESS ARCHIVES
                </a>
            </div>
        </SectionWrapper>
    );
};

export default LastYear;
