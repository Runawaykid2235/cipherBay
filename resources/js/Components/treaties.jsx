import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Treaties() {
    const [user, setUser] = useState(null);
    const [treatyData, setTreatyData] = useState(null);
    const [recipientUsername, setRecipientUsername] = useState("");
    const [decryptKey, setDecryptKey] = useState("");
    
    // State for new input fields
    const [price, setPrice] = useState("");
    const [itemName, setItemName] = useState("");
    const [initiatorText, setInitiatorText] = useState("");

    // Fetch authenticated user details
    useEffect(() => {
        axios
            .get('/api/account', { withCredentials: true })
            .then((response) => setUser(response.data.user))
            .catch((error) => console.error(error));
    }, []);

    // Fetch authenticated user's incoming, outgoing, and total treaties
    useEffect(() => {
        if (user && user.username) {
            axios
                .get(`/api/treaty-amount?username=${user.username}`)
                .then(response => {
                    setTreatyData(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [user]);

    const handleCreateTreaty = () => {
        if (!recipientUsername || !decryptKey || !price || !itemName || !initiatorText) {
            alert("Please fill in all the fields.");
            return;
        }

        // Create the terms JSON based on user input
        const terms = {
            price: parseFloat(price),
            item_name: itemName,
            initiator_text: initiatorText
        };

        const treatyPayload = {
            initiator_username: user.username,
            recipient_username: recipientUsername,
            decrypt_key: decryptKey,
            terms: terms, // Send the constructed terms JSON
        };

        axios
            .post('/api/createtreaty', treatyPayload, { withCredentials: true })
            .then(response => {
                alert("Treaty created successfully!");
                console.log(response.data);
                // You may want to refresh the treaty data or handle it accordingly
            })
            .catch(error => {
                console.error(error);
                alert("Failed to create treaty.");
            });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <h1>HELLO {user.username}</h1>
            <p>Your treaty data:</p>
            <p>{treatyData?.incoming} Incoming treaties</p>
            <p>{treatyData?.outgoing} Outgoing treaties</p>
            <button onClick={() => handleCreateTreaty()}>Start new treaty</button>

            <div>
                <h3>Create Treaty</h3>
                <label>
                    Recipient Username:
                    <input
                        type="text"
                        value={recipientUsername}
                        onChange={(e) => setRecipientUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Decrypt Key:
                    <input
                        type="text"
                        value={decryptKey}
                        onChange={(e) => setDecryptKey(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Item Name:
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Initiator Text:
                    <textarea
                        value={initiatorText}
                        onChange={(e) => setInitiatorText(e.target.value)}
                    />
                </label>
                <br />
                <button onClick={handleCreateTreaty}>Create Treaty</button>
            </div>
        </div>
    );
}

export default Treaties;
