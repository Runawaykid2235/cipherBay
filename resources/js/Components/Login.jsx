import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './styling/Login.css'; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/account', { withCredentials: true });
                setUser(response.data.user);
                if (response.data.user) {
                    navigate('/account');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            if (response.data.success) {
                setMessage('Login successful!');
                const userResponse = await axios.get('/api/account', { withCredentials: true });
                setUser(userResponse.data.user);
            } else {
                setMessage('Login failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <Navbar />
            <div className="login-content">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
                {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
                {user ? (
                    <p className="user-info">Current User is: {user.username || 'Unknown'}</p>
                ) : (
                    <p className="user-info">No user is currently logged in.</p>
                )}
            </div>
        </div>
    );
};

export default Login;
