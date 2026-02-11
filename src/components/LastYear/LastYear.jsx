import React from 'react';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './LastYear.module.css';

const LastYear = () => {
    return (
        <SectionWrapper id="lastyear" className={styles.container}>
            <div className={styles.archiveCard}>
                <div className={styles.cardHeader}>
                    <span className={styles.headerTag}>[ARCHIVED]</span>
                    <span className={styles.headerYear}>2024_LOGS</span>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.heading}>LEGACY_SYSTEM_V1</h2>
                    <p className={styles.highlightText}>
                        Quick Snatch 1.0 set the benchmark. <br />
                        <span className={styles.subHighlight}>Witness where it all began.</span>
                    </p>

                    <a
                        href="https://quicksnatch.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                    >
                        ACCESS_ARCHIVE_DATABASE
                    </a>
                </div>

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
