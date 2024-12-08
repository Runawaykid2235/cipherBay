import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styling/CreateTreaty.css";

function CreateTreaty() {
    const [formData, setFormData] = useState({
        initiator_username: "", // Will be fetched from API
        recipient_username: "",
        decrypt_key: "",
        terms: [{ item_name: "", price: "", text: "" }],
    });

    const [user, setUser] = useState(null); // To store the currently logged-in user
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Fetch the currently logged-in user on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/account", { withCredentials: true });
                setUser(response.data.user);
                setFormData((prev) => ({
                    ...prev,
                    initiator_username: response.data.user.username, // Automatically set username
                }));
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTermChange = (index, field, value) => {
        const updatedTerms = [...formData.terms];
        updatedTerms[index][field] = value;
        setFormData({ ...formData, terms: updatedTerms });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/createtreaty", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to create treaty.");
        }
    };

    if (!user) {
        return <p>Loading...</p>; // Show loading until user data is fetched
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Create Treaty</h1>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Recipient Username</label>
                        <input
                            type="text"
                            name="recipient_username"
                            value={formData.recipient_username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Decrypt Key</label>
                        <input
                            type="text"
                            name="decrypt_key"
                            value={formData.decrypt_key}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <h3>Terms</h3>
                    {formData.terms.map((term, index) => (
                        <div key={index} className="term">
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={term.item_name}
                                onChange={(e) => handleTermChange(index, "item_name", e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={term.price}
                                onChange={(e) => handleTermChange(index, "price", e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Text for Receiver"
                                value={term.text}
                                onChange={(e) => handleTermChange(index, "text", e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit">Create Treaty</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTreaty;
