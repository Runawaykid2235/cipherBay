import React from 'react';
import Navbar from './Navbar';

function About() {
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
                backgroundColor: '#c0c0c0',
                padding: '40px',
                borderRadius: '8px',
                border: '2px solid black',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>About Me</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>
                    Hello! I'm a passionate developer with a love for creating intuitive and engaging web applications. I have experience working with a range of technologies such as React, Node.js, and Python. My focus is on building projects that solve real-world problems while ensuring a seamless user experience.
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>
                    In addition to development, I am always looking to learn new skills and keep up with the latest trends in technology. Whether it's exploring new frameworks or experimenting with hardware, I am constantly challenging myself to grow both personally and professionally.
                </p>
                <p style={{ fontSize: '1.2rem', color: '#333' }}>
                    Feel free to explore my projects and reach out if you’d like to collaborate!
                </p>
            </div>
        </div>
    );
}

export default About;
