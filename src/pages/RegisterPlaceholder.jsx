import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPlaceholder = () => {
    const style = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'var(--color-neon-green)',
        fontFamily: 'var(--font-heading)',
        background: 'var(--color-bg-dark)',
    };

    const linkStyle = {
        marginTop: '2rem',
        color: 'var(--color-text-secondary)',
        textDecoration: 'underline',
        fontFamily: 'var(--font-body)',
    };

    return (
        <div style={style}>
            <h1 className="glitch-text">REGISTRATION_MODULE_LOADING...</h1>
            <p style={{ marginTop: '1rem', color: '#fff' }}>
                The portal will open soon. Prepare your credentials.
            </p>
            <Link to="/" style={linkStyle}>
                Return to Base
            </Link>
        </div>
    );
};

export default RegisterPlaceholder;
