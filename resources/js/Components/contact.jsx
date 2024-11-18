import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


function Contact() {
    return (
        // Outermost container with background color and fixed height
        <div style={{ backgroundColor: '#007f7f', height: '1069px'}}>
            <Navbar />
            
            {/* Centering container for the main content, borders are for visualization */}
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh', // Center vertically on full viewport height
                    }}
                >
                    {/* Main square container with padding and inner background color */}
                    <div
                        style={{
                            width: '1000px',
                            marginTop: '200px',
                            height: '750px',
                            border: '2px solid black', // Main square container border
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '20px',
                            boxSizing: 'border-box',
                            backgroundColor: '#c0c0c0'
                        }}
                    >
                        {/* Header bar inside the main square container with gradient background */}
                        <div
                            style={{ 
                                width: '977px',
                                height: '40px',
                                border: '2px solid black',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                marginTop: '-20px',
                                background: 'linear-gradient(to right, gray, #a0a0a0)',
                                paddingLeft: '20px'
                            }}
                        >
                            {/* Logo and header text container */}
                            <div style={{ 
                                marginLeft: '-15px',
                                display: 'flex',
                                flexDirection: 'row'
                            }}>        
                                <img src="\Images\computer_98.png" className="logo" style={{ display: 'block', width: '35px', height: '25px'}}/>
                                <a>Computer, Contact me at </a>
                            </div>
                        </div>

                        {/* Main content container inside the main square container */}
                        <div style={{
                            width: '950px',
                            height: '680px',
                            marginTop: '20px',
                            marginLeft: '0px',
                            border: '3px solid #FFFFFF',
                            borderBottom: '3px solid #000000', // Define bottom border with color, width, and style
                            borderRight: '3px solid #000000',
                            display: 'flex',                   // Use flexbox to align the inner boxes
                            justifyContent: 'space-between',    // Space the inner boxes evenly
                            padding: '10px',                    // Optional padding inside the main box
                            boxSizing: 'border-box'             // Include padding in the width and height
                        }}>

                            {/* Left box inside the main content container for image */}
                            <div style={{
                                width: '450px',
                                height: '570px',
                                border: '3px solid #FFFFFF',
                                borderBottom: '3px solid #000000', // Define bottom border with color, width, and style
                                borderRight: '3px solid #000000',
                                boxSizing: 'border-box',
                                marginTop: '20px',
                                marginLeft: '0px'
                            }}>
                                {/* Content for first small box */}
                                <img src='\Images\Windows_98_pcto_crop.png' className='big_image' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px', marginLeft: '120px', width: '150px', height: '150px' }}></img>
                            </div>

                            {/* Right box inside the main content container for contact details */}
                            <div style={{
                                width: '450px',
                                height: '570px',
                                border: '3px solid #FFFFFF',
                                borderBottom: '3px solid #000000', // Define bottom border with color, width, and style
                                borderRight: '3px solid #000000',
                                boxSizing: 'border-box',
                                display: 'flex',                   // Flexbox for layout of content within the box
                                flexDirection: 'column',            // Column layout for text
                                justifyContent: 'center',           // Center content vertically
                                alignItems: 'center',               // Center content horizontally
                                marginTop: '20px',
                                marginRight: '00px'
                            }}>

                                {/* Contact information section with labels and details */}
                                <div style={{
                                    paddingRight: '200px'
                                }}>
                                    <span><u>C</u>ontact, status: </span>
                                </div>
                                
                                <div style={{ 
                                    paddingLeft: '20px',
                                    marginTop: '0px',
                                    marginBottom: '25px',
                                }}>    
                                    <div><u>U</u>nemployed</div>
                                    <div><u>S</u>tudent</div>
                                </div>

                                {/* Phone number section */}
                                <div style={{
                                    paddingRight: '200px'
                                }}>
                                    <span><u>P</u>honenumber:</span>
                                </div>

                                <div style={{ marginLeft: '0px'}}>
                                    <span>29890190</span>
                                </div>                    
                                
                                {/* Email section */}
                                <div style={{
                                    paddingRight: '200px',
                                    marginRight: '65px',
                                    marginTop: '25px'
                                }}>
                                    <span><u>E</u>mail:</span>
                                </div>

                                <div style={{ marginLeft: '100px'}}>
                                    <span>olskj24@student.sdu.dk</span>
                                </div>

                                {/* Studying section */}
                                <div style={{
                                    paddingRight: '180px',
                                    marginRight: '65px',
                                    marginTop: '25px'
                                }}>
                                    <span><u>S</u>tudying:</span>
                                </div>

                                <div style={{ marginLeft: '100px'}}>
                                    <span>Computer Science, SDU</span>
                                </div>
                                
                            </div>
                            

                        </div>
                            {/* Apply, Okay buttons container at the bottom */}
                            <div style={{
                            width: '300px',
                            height: '50px', // Slightly taller for better visual balance
                            display: 'flex',
                            justifyContent: 'space-evenly', // Even spacing between buttons
                            alignItems: 'center', // Center buttons vertically
                            marginTop: '20px',
                            backgroundColor: '#c0c0c0',
                            boxSizing: 'border-box',
                            marginLeft: '590px'
                        }}>
                            {/* Apply Button */}
                            <button style={{
                                color: 'black',
                                fontSize: '18px', // Slightly larger text for readability
                                padding: '8px 16px', // Moderate padding for clean appearance
                                backgroundColor: '#c0c0c0', // Consistent background color
                                cursor: 'pointer',
                                width: '120px', // Fixed width for consistency
                                borderLeftColor: '#FFFFFF',
                                borderTopColor: '#FFFFFF',
                                borderRightColor: '#000000',
                                borderBottomColor: '#000000',
                            }}>
                                <u>C</u>ontact?
                            </button>

                            {/* Okay Button */}
                            <button style={{
                                color: 'black',
                                fontSize: '18px', 
                                padding: '8px 16px', 
                                backgroundColor: '#c0c0c0',
                                cursor: 'pointer',
                                width: '120px', 
                                borderLeftColor: '#FFFFFF',
                                borderTopColor: '#FFFFFF',
                                borderRightColor: '#000000',
                                borderBottomColor: '#000000',
                            }}>
                                <u>C</u>ancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
