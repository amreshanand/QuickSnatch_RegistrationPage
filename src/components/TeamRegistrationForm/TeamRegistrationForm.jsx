import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Input from './Input';
import styles from './TeamRegistrationForm.module.css';

const TeamRegistrationForm = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState('');
    const [members, setMembers] = useState([
        { name: '', email: '' },
        { name: '', email: '' },
        { name: '', email: '' }
    ]);
    const [leaderPhone, setLeaderPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState('');

    const addMember = () => {
        if (members.length < 5) {
            setMembers([...members, { name: '', email: '' }]);
        }
    };

    const updateMember = (index, field, value) => {
        const newMembers = [...members];
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const removeMember = (index) => {
        if (members.length > 3) {
            const newMembers = members.filter((_, i) => i !== index);
            setMembers(newMembers);
            setErrors({}); // Clear errors to avoid mismatch
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!teamName.trim()) {
            newErrors.teamName = 'Team name is required';
        }

        if (members.length < 3) {
            newErrors.general = 'A team must have at least 3 members.';
        }

        if (!leaderPhone) {
            newErrors.leaderPhone = 'Leader phone number is required';
        } else if (!/^\d{10}$/.test(leaderPhone)) {
            newErrors.leaderPhone = 'Phone number must be exactly 10 digits';
        }

        const emailCounts = {};

        members.forEach((member, index) => {
            if (!member.name.trim()) {
                newErrors[`memberName${index}`] = `Member ${index + 1} name is required`;
            }
            if (!member.email.trim()) {
                newErrors[`memberEmail${index}`] = `Member ${index + 1} email is required`;
            } else if (!/\S+@\S+\.\S+/.test(member.email)) {
                newErrors[`memberEmail${index}`] = `Invalid email address`;
            } else {
                // Count email occurrences for duplicate check
                const email = member.email.trim().toLowerCase();
                if (emailCounts[email]) {
                    emailCounts[email].push(index);
                } else {
                    emailCounts[email] = [index];
                }
            }
        });

        // Check for duplicates
        Object.keys(emailCounts).forEach(email => {
            if (emailCounts[email].length > 1) {
                emailCounts[email].forEach(index => {
                    newErrors[`memberEmail${index}`] = `Duplicate email address found`;
                });
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (submitting) return; // prevents double submit

        if (!validate()) {
            return;
        }

        setSubmitting(true);

        // normalize data BEFORE sending to DB
        const cleanMembers = members.map(m => ({
            name: m.name.trim(),
            email: m.email.trim().toLowerCase()
        }));

        const cleanTeamName = teamName.trim();

        const { error } = await supabase
            .from("registrations")
            .insert([
                {
                    team_name: cleanTeamName,
                    leader_phone: leaderPhone,

                    member1_name: cleanMembers[0].name,
                    member1_email: cleanMembers[0].email,

                    member2_name: cleanMembers[1].name,
                    member2_email: cleanMembers[1].email,

                    member3_name: cleanMembers[2].name,
                    member3_email: cleanMembers[2].email,

                    member4_name: cleanMembers[3]?.name || null,
                    member4_email: cleanMembers[3]?.email || null,

                    member5_name: cleanMembers[4]?.name || null,
                    member5_email: cleanMembers[4]?.email || null,
                }
            ]);

    if (error) {
        console.error("INSERT ERROR:", error);

        if (error.message?.includes("Participant already registered")) {
            setServerError("1 or more participant(s) has already registered in another team.");
        }
        else if (error.message?.includes("unique_leader_phone")) {
            setServerError("This phone number has already registered a team.");
        }
        else if (error.message?.includes("unique_team_name")) {
            setServerError("This team name is already registered.");
        }
        else if (error.message?.toLowerCase().includes("duplicate")) {
            setServerError("Duplicate registration detected.");
        }
        else {
            setServerError("Server error while submitting registration.");
        }

        setSubmitting(false);
        return;
    }

        setSubmitted(true);
        setSubmitting(false);
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
                <button
                    className={styles.closeButton}
                    onClick={handleReturnHome}
                    title="Return to Home"
                >
                    ×
                </button>
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
                                <div className={styles.memberHeader}>
                                    {index > 2 && (
                                        <button
                                            type="button"
                                            className={styles.removeMemberButton}
                                            onClick={() => removeMember(index)}
                                            title="Remove Member"
                                        >
                                            ×
                                        </button>
                                    )}
                                    <h3 className={styles.memberLabel}>Member {index + 1} {index === 0 && '(Leader)'}</h3>
                                </div>
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
                                    {index === 0 && (
                                        <Input
                                            label="Leader Phone Number"
                                            placeholder="10-digit number"
                                            value={leaderPhone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                if (val.length <= 10) setLeaderPhone(val);
                                            }}
                                            error={errors.leaderPhone}
                                            required
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {members.length < 5 && (
                        <button
                            type="button"
                            className={styles.addButton}
                            onClick={addMember}
                        >
                            <span className={styles.addIcon}>+</span> ADD NEW SQUAD MEMBER
                        </button>
                    )}

                    {errors.general && (
                        <div className={styles.errorMessage} style={{ textAlign: 'center', marginTop: '1rem' }}>
                            {errors.general}
                        </div>
                    )}

                    {serverError && (
                        <div className={styles.errorMessage} style={{ textAlign: 'center', marginTop: '1rem' }}>
                            {serverError}
                        </div>
                    )}

                    <div className={styles.submitSection}>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={submitting}
                        >
                            {submitting ? " SUBMITTING..." : "CONFIRM REGISTRATION"}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default TeamRegistrationForm;
