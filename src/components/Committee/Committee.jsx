import React from 'react';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Committee.module.css';

const Committee = () => {
    const members = [
        { name: 'Alex Vern', role: 'Event Lead' },
        { name: 'Sarah Jin', role: 'Tech Lead' },
        { name: 'Mike Ross', role: 'Design Head' },
        { name: 'Emily Chen', role: 'Operations' },
    ];

    return (
        <SectionWrapper id="committee">
            <h2 className={styles.heading}>Organizing Node</h2>
            <div className={styles.grid}>
                {members.map((member, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.avatarPlaceholder}>
                            {member.name.charAt(0)}
                        </div>
                        <h3 className={styles.name}>{member.name}</h3>
                        <p className={styles.role}>{member.role}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Committee;
