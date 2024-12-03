import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./styling/Treaties.css"; // Import CSS file

function Treaties() {
    const [user, setUser] = useState(null);
    const [treaties, setTreaties] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    // Fetch authenticated user details
    useEffect(() => {
        axios
            .get('/api/account', { withCredentials: true })
            .then((response) => setUser(response.data.user))
            .catch((error) => console.error(error));
    }, []);

    // Fetch authenticated user's treaties
    useEffect(() => {
        if (user && user.username) {
            axios
                .get(`/api/getAllTreaties?username=${user.username}`)
                .then(response => {
                    if (response.data && response.data.treaties) {
                        setTreaties(response.data.treaties);
                    } else {
                        console.warn("No treaties found in response:", response.data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching treaties:", error);
                });
        }
    }, [user]);

    const filteredTreaties = (type) => {
        if (type === "outgoing") {
            return treaties.filter(t => t.initiator_username === user.username);
        } else if (type === "incoming") {
            return treaties.filter(t => t.recipient_username === user.username);
        }
        return treaties; // All treaties
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <h1>Welcome, {user.username}</h1>
            <div className="tabs">
                <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
                    All
                </button>
                <button className={activeTab === "incoming" ? "active" : ""} onClick={() => setActiveTab("incoming")}>
                    Incoming
                </button>
                <button className={activeTab === "outgoing" ? "active" : ""} onClick={() => setActiveTab("outgoing")}>
                    Outgoing
                </button>
            </div>
            <div className="treaty-list">
                {filteredTreaties(activeTab).length > 0 ? (
                    filteredTreaties(activeTab).map((treaty) => (
                        <div className="treaty-card" key={treaty.id}>
                            <h3>Treaty ID: {treaty.id}</h3>
                            <p><strong>Initiator:</strong> {treaty.initiator_username}</p>
                            <p><strong>Recipient:</strong> {treaty.recipient_username}</p>
                            <p><strong>Status:</strong> {treaty.treaty_status}</p>
                            <p><strong>Terms:</strong> {treaty.terms}</p>
                            <p><strong>Created At:</strong> {treaty.created_at}</p>
                            <button>Accept</button> <button>Decline</button>
                        </div>
                    ))
                ) : (
                    <p>No treaties found for this category.</p>
                )}
            </div>
        </div>
    );
}

export default Treaties;