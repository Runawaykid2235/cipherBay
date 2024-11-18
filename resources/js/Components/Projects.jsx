import React from 'react';
import { Link } from 'react-router-dom';

function Projects() {
    return (
        <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '40px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>All Projects</h1>
                
                {/* Content Area for Project Entries */}
                <div style={{ width: '100%' }}>
                    {/* Individual Project Entries */}
                    <div style={{
                        border: '1px solid #ddd',
                        padding: '20px',
                        margin: '15px 0',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f9f9f9',
                    }}>
                        <strong style={{ fontSize: '1.2rem' }}>Rust</strong>
                        <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
                            A project description about Rust.
                        </p>
                        <Link to="/projects/rust">
                            <button style={{
                                padding: '10px 20px',
                                backgroundColor: '#007f7f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}>
                                Go to Rust Projects
                            </button>
                        </Link>
                    </div>

                    <div style={{
                        border: '1px solid #ddd',
                        padding: '20px',
                        margin: '15px 0',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f9f9f9',
                    }}>
                        <strong style={{ fontSize: '1.2rem' }}>React</strong>
                        <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
                            A project description about React.
                        </p>
                        <Link to="/projects/react">
                            <button style={{
                                padding: '10px 20px',
                                backgroundColor: '#007f7f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}>
                                Go to React Projects
                            </button>
                        </Link>
                    </div>

                    <div style={{
                        border: '1px solid #ddd',
                        padding: '20px',
                        margin: '15px 0',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f9f9f9',
                    }}>
                        <strong style={{ fontSize: '1.2rem' }}>Python</strong>
                        <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
                            A project description about Python.
                        </p>
                        <Link to="/projects/python">
                            <button style={{
                                padding: '10px 20px',
                                backgroundColor: '#007f7f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}>
                                Go to Python Projects
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Back Button */}
                <Link to="/" style={{ marginTop: '30px' }}>
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

export default Projects;
