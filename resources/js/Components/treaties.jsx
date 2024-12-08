import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./styling/Treaties.css";

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

    // Fetch treaties
    useEffect(() => {
        if (user && user.username) {
            axios
                .get(`/api/getAllTreaties?username=${user.username}`)
                .then((response) => {
                    if (response.data && response.data.treaties) {
                        setTreaties(response.data.treaties);
                    }
                })
                .catch((error) => console.error("Error fetching treaties:", error));
        }
    }, [user]);

    const handleAcceptTreaty = (treatyId) => {
        axios.post('/api/acceptTreaty', { treaty_id: treatyId, username: user.username })
            .then((response) => {
                alert("Treaty accepted successfully!");
                // Update the treaties list after successful acceptance
                setTreaties(treaties.map(t => t.id === treatyId ? { ...t, treaty_status: "accepted" } : t));
            })
            .catch((error) => {
                console.error("Error accepting treaty:", error);
                alert("Failed to accept the treaty.");
            });
    };

    const handleDenyTreaty = (treatyId) => {
        axios.post('/api/denyTreaty', { treaty_id: treatyId, username: user.username })
            .then((response) => {
                alert("Treaty denied successfully!");
                // Update the treaties list after successful denial
                setTreaties(treaties.map(t => t.id === treatyId ? { ...t, treaty_status: "denied" } : t));
            })
            .catch((error) => {
                console.error("Error denying treaty:", error);
                alert("Failed to deny the treaty.");
            });
    };

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
                        <div
                            className={`treaty-card 
                                ${treaty.treaty_status === "accepted" ? "accepted" : ""}
                                ${treaty.treaty_status === "denied" ? "denied" : ""}`}
                            key={treaty.id}
                        >
                            <h3>Treaty ID: {treaty.id}</h3>
                            <p><strong>Initiator:</strong> {treaty.initiator_username}</p>
                            <p><strong>Recipient:</strong> {treaty.recipient_username}</p>
                            <p><strong>Status:</strong> {treaty.treaty_status}</p>
                            <p><strong>Terms:</strong> {treaty.terms}</p>
                            <p><strong>Created At:</strong> {treaty.created_at}</p>
                            {treaty.treaty_status === "pending" && (
                                <>
                                    <button onClick={() => handleAcceptTreaty(treaty.id)}>Accept</button>
                                    <button onClick={() => handleDenyTreaty(treaty.id)}>Decline</button>
                                </>
                            )}
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
