import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import styles from './TeamRegistrationForm.module.css';

const TeamRegistrationForm = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState('');
    const [members, setMembers] = useState([
        { name: '', email: '' },
        { name: '', email: '' }
    ]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const addMember = () => {
        setMembers([...members, { name: '', email: '' }]);
    };

    const updateMember = (index, field, value) => {
        const newMembers = [...members];
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const validate = () => {
        const newErrors = {};

        if (!teamName.trim()) {
            newErrors.teamName = 'Team name is required';
        }

        members.forEach((member, index) => {
            if (!member.name.trim()) {
                newErrors[`memberName${index}`] = `Member ${index + 1} name is required`;
            }
            if (!member.email.trim()) {
                newErrors[`memberEmail${index}`] = `Member ${index + 1} email is required`;
            } else if (!/\S+@\S+\.\S+/.test(member.email)) {
                newErrors[`memberEmail${index}`] = `Invalid email address`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setSubmitted(true);
        }
    };

    const handleReturnHome = () => {
        navigate('/');
    };

    if (submitted) {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>✓</div>
                    <h1 className={styles.successTitle}>Registration Submitted Successfully</h1>
                    <p className={styles.successMessage}>
                        Thank you for registering for Quick Snatch 2.0
                    </p>
                    <p className={styles.successSubMessage}>
                        Further instructions will be shared soon.
                    </p>
                    <div className={styles.successGlow}></div>
                    <button
                        className={styles.returnButton}
                        onClick={handleReturnHome}
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.backgroundGlow}></div>
            <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                    <h1 className={styles.formTitle}>Team Registration</h1>
                    <p className={styles.formSubtitle}>Quick Snatch 2.0 // MISSION_ENROLLMENT</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.sectionHeader}>TEAM_IDENTITY</div>
                    <Input
                        label="Team Name"
                        placeholder="Enter your team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        error={errors.teamName}
                        required
                    />

                    <div className={styles.sectionHeader}>SQUAD_MEMBERS</div>
                    <div className={styles.membersList}>
                        {members.map((member, index) => (
                            <div key={index} className={styles.memberRow}>
                                <h3 className={styles.memberLabel}>Member {index + 1}</h3>
                                <div className={styles.memberInputs}>
                                    <Input
                                        label="Name"
                                        placeholder="Full Name"
                                        value={member.name}
                                        onChange={(e) => updateMember(index, 'name', e.target.value)}
                                        error={errors[`memberName${index}`]}
                                        required
                                    />
                                    <Input
                                        label="Email"
                                        placeholder="email@example.com"
                                        value={member.email}
                                        onChange={(e) => updateMember(index, 'email', e.target.value)}
                                        error={errors[`memberEmail${index}`]}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className={styles.addButton}
                        onClick={addMember}
                    >
                        <span className={styles.addIcon}>+</span> ADD NEW SQUAD MEMBER
                    </button>

                    <div className={styles.submitSection}>
                        <button type="submit" className={styles.submitButton}>
                            CONFIRM REGISTRATION
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamRegistrationForm;
