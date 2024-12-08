import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./styling/CreateAccount.css"; // Import the CSS file

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        axios
            .post(
                "/api/createaccount",
                { username, email, password },
                { headers: { "X-CSRF-TOKEN": csrfToken } }
            )
            .then((response) => {
                setSuccess("Account created successfully!");
                setError("");
                setUsername("");
                setEmail("");
                setPassword("");
            })
            .catch((err) => {
                setError(err.response.data.error || "Failed to create account");
            });
    };

    return (
        <div className="create-account-container">
            <Navbar />
            <div className="create-account-content">
                <h1>Create Account</h1>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
