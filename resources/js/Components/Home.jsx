import React from "react";
import Navbar from "./Navbar";

function Home() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', margin: 0 }}>
            <Navbar />
            <div style={{
                margin: '2rem auto',
                padding: '2rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                maxWidth: '800px'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: '1rem'
                }}>Welcome to CipherBay</h1>
                <p style={{
                    textAlign: 'center',
                    color: '#555',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                }}>
                    At CipherBay, we value anonymity. Our platform allows you to 
                    buy and sell encrypted files, documents, images, papers, or 
                    anything digital. As long as it can be encrypted and decrypted 
                    with a key, we’ve got you covered.
                </p>

                <h2 style={{ color: '#007bff', marginBottom: '1rem' }}>How It Works:</h2>
                <ol style={{
                    color: '#555',
                    lineHeight: '1.8',
                    marginLeft: '20px',
                    marginBottom: '2rem'
                }}>
                    <li>Negotiate the purchase of a digital good with someone on a third-party platform.</li>
                    <li>Trust can be a challenge—but that’s where CipherBay comes in. Our escrow system securely handles transactions.</li>
                    <li>The seller submits the decryption key to our escrow service. Once payment is confirmed, the key is securely released to the buyer.</li>
                </ol>

                <h2 style={{ color: '#007bff', marginBottom: '1rem' }}>Why Choose CipherBay?</h2>
                <ul style={{
                    color: '#555',
                    lineHeight: '1.8',
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '2rem'
                }}>
                    <li style={{ marginBottom: '0.5rem' }}>✔️ 100% anonymity and security throughout transactions.</li>
                    <li style={{ marginBottom: '0.5rem' }}>✔️ A rating system to assess the trustworthiness of users.</li>
                    <li style={{ marginBottom: '0.5rem' }}>✔️ Seller profiles with detailed reviews from other users.</li>
                </ul>

                <p style={{
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    color: '#007bff',
                    marginBottom: '0'
                }}>
                    Join CipherBay today and trade digital goods with confidence.
                </p>
            </div>
        </div>
    );
}

export default Home;
