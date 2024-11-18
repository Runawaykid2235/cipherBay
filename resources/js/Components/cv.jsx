import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Cv() {
    return (
        <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
            <Navbar />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto',
                padding: '40px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Her er mit CV!!!</h1>

                {/* CV Content Placeholder */}
                <div style={{ width: '100%', marginBottom: '30px' }}>
                    <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '20px' }}>
                        Welcome to my CV page! Below are details about my qualifications, experiences, and skills.
                    </p>
                    {/* Add your CV content here */}
                    <p style={{ fontSize: '1rem', color: '#666' }}>
                        You can add more detailed sections, such as education, work experience, skills, and certifications.
                    </p>
                </div>

                {/* Back Button */}
                <Link to="/" style={{ marginTop: '20px' }}>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#f1f1f1',
                        color: '#007f7f',
                        border: '2px solid #007f7f',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}>
                        Go back
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Cv;
