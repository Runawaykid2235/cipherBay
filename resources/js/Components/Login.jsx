import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // Fetch user on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/account', { withCredentials: true });
                setUser(response.data.user); // Assuming the API returns the user object
                // navigate user to /account
                if (response.data.user) {
                    navigate('/account')
                }
                
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null); // Set to null if there's an error
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
                // Optionally refetch user data after login
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
        <div>
            <Navbar />
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            {user ? (
                <p>Current User is: {user.username || 'Unknown'}</p>
            ) : (
                <p>No user is currently logged in.</p>
            )}
        </div>
    );
};

export default Login;
