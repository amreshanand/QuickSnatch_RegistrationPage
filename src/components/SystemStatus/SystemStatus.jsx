import React from 'react';
import styles from './SystemStatus.module.css';

const SystemStatus = () => {
    return (
        <div className={styles.statusContainer}>
            <div className={styles.indicator}>
                <span className={styles.dot}></span>
                <span className={styles.text}>SYSTEM_PROCESSING...</span>
            </div>
            <div className={styles.coords}>
                18.52°N, 73.85°E
            </div>
        </div>
    );
};

export default SystemStatus;
