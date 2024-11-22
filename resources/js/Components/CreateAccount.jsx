import React, { useState } from "react";
import axios from "axios";

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
