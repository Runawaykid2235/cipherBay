import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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
                console.log("Account created:", response.data);
                setSuccess("Account created successfully!");
                setError("");
                setUsername("");
                setEmail("");
                setPassword("");
            })
            .catch((err) => {
                console.error("Error:", err.response.data);
                setError(err.response.data.error || "Failed to create account");
            });
    };

    return (
        <div>
            <Navbar />
            <h1>Create Account</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
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
                <div>
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
                <div>
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
                <div>
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;
