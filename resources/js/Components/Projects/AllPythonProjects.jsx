import React, { useState } from 'react';
import Navbar from '../Navbar';

function Project1Content() {
    return (
        <div>
            <div style={{
                width: '100%',
                height: '30px',
                border: '2px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background: 'linear-gradient(to right, gray, #a0a0a0)',
                marginBottom: '20px'
            }}>
                <h1 style={{ marginLeft: '10px' }}>Beerpong Odds Calculator</h1>
            </div>

            <div>
                <p>This project simulates beerpong games and calculates respective odds.</p>
                <p>
                    It consists of a single `main.py` file containing a `simulate_game` function
                    and other utility functions to calculate odds based on player accuracies
                    and desired overrun (margin for profit).
                </p>
                <p>You can check out the project on GitHub:</p>
                <a href="https://github.com/Runawaykid2235/BeerpongPredicting" target="_blank" rel="noopener noreferrer">
                    Beerpong Odds Calculator Repo
                </a>
            </div>
        </div>
    );
}

function Project2Content() {
    return (
        <div>
            <div style={{
                width: '100%',
                height: '30px',
                border: '2px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background: 'linear-gradient(to right, gray, #a0a0a0)',
                marginBottom: '20px'
            }}>
                <h1 style={{ marginLeft: '10px' }}>Sorting Network</h1>
            </div>

            <div>
                <p>
                    This project is a simple sorting network implemented in Python. It includes
                    two modules:
                </p>
                <ul>
                    <li><strong>comparator.py</strong>: Defines comparators for comparing and swapping values.</li>
                    <li><strong>network.py</strong>: Uses multiple comparators to sort a list and identify optimal sorting networks.</li>
                </ul>
                <p>You can find the repo here:</p>
                <a href="https://github.com/Runawaykid2235/SortingNetwork" target="_blank" rel="noopener noreferrer">
                    Sorting Network Repo
                </a>
            </div>
        </div>
    );
}

function AllPythonProjects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleDownloadClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <Navbar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#007f7f',
                minHeight: '100vh',
                padding: '20px',
                position: 'relative',
            }}>
                {/* Projects Panel (Left) */}
                <div style={{
                    width: '250px',
                    height: '180px',
                    backgroundColor: '#c0c0c0',
                    border: '2px solid black',
                    padding: '10px',
                    marginRight: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px',
                        background: 'linear-gradient(to right, gray, #a0a0a0)',
                        borderBottom: '2px solid black',
                    }}>
                        <img src="/Images/computer_98.png" alt="Project Icon" style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                        <span><u>P</u>ython Projects</span>
                    </div>
                    <button onClick={() => setSelectedProject('Project1')} style={buttonStyle}>Beerpong Odds Calculator</button>
                    <button onClick={() => setSelectedProject('Project2')} style={buttonStyle}>Sorting Network</button>
                </div>

                {/* Central Content Area */}
                {selectedProject && (
                    <div style={{
                        width: '700px',
                        backgroundColor: '#c0c0c0',
                        border: '2px solid black',
                        padding: '20px',
                        textAlign: 'left'
                    }}>
                        {selectedProject === 'Project1' && <Project1Content />}
                        {selectedProject === 'Project2' && <Project2Content />}
                        <button onClick={() => setSelectedProject(null)} style={buttonStyle}>Close</button>
                    </div>
                )}

                {/* Download Section (Right) */}
                {selectedProject && (
                    <div style={{
                        width: '220px',
                        height: '130px',
                        backgroundColor: '#c0c0c0',
                        border: '2px solid black',
                        padding: '10px',
                        marginLeft: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '5px',
                            background: 'linear-gradient(to right, gray, #a0a0a0)',
                            borderBottom: '2px solid black',
                        }}>
                            <img src="/Images/computer_98.png" alt="Download Icon" style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                            <span><u>D</u>ownload Project</span>
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '14px' }}>This will download a zip</p>
                        <button onClick={handleDownloadClick} style={buttonStyle}>
                            <u>D</u>ownload
                        </button>
                    </div>
                )}
            </div>

            {/* Popup Window */}
            {showPopup && (
                <div style={popupOverlayStyle}>
                    <div style={popupWindowStyle}>
                        <div style={popupHeaderStyle}>
                            <span>Download Error</span>
                            <button onClick={closePopup} style={popupCloseButtonStyle}>X</button>
                        </div>
                        <div style={{ padding: '20px', fontSize: '14px' }}>
                            <p>Download not available for this project.</p>
                        </div>
                        <button onClick={closePopup} style={buttonStyle}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Styles
const buttonStyle = {
    color: 'black',
    fontSize: '16px',
    padding: '8px',
    backgroundColor: '#c0c0c0',
    cursor: 'pointer',
    width: '100%',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    borderRightColor: '#000000',
    borderBottomColor: '#000000',
    marginTop: '10px',
};

const popupOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const popupWindowStyle = {
    width: '300px',
    backgroundColor: '#c0c0c0',
    border: '2px solid black',
    borderRadius: '8px',
};

const popupHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a0a0a0',
    padding: '10px',
    borderBottom: '2px solid black',
};

const popupCloseButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
};

export default AllPythonProjects;