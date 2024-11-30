import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using axios
import Navbar from "./Navbar";

function Account() {
    const [user, setUser] = useState(null);
    const [walletAmount, setWalletAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [treatyDetails, setTreatyDetails] = useState({
        recipient_username: '',
        item_details: '',
        price: '',
        terms: {} // For storing terms as a JSON object
    });
    const [treatyResponse, setTreatyResponse] = useState(null);

    useEffect(() => {
        // Fetch the authenticated user's details
        axios.get('/api/account', { withCredentials: true })
            .then((response) => setUser(response.data.user))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const fetchWalletAmount = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('/api/walletamount', { withCredentials: true });
                setWalletAmount(response.data.walletAmount);
            } catch (err) {
                setError(err.response?.data?.error || "An error occurred while fetching wallet data.");
            } finally {
                setLoading(false);
            }
        };

        fetchWalletAmount();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTreatyDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { recipient_username, item_details, price, terms } = treatyDetails;
        const termsObject = {
            item_name: item_details,
            price,
            terms: terms // More specific fields could be added here depending on your form structure
        };

        try {
            const response = await axios.post('/api/createtreaty', {
                initiator_username: user.username,
                recipient_username,
                decrypt_key: 'some_decrypt_key', // You will likely need to fetch or generate this key
                terms: termsObject
            }, { withCredentials: true });

            setTreatyResponse(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while creating the treaty.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <h1>Welcome, {user.username}!</h1>
            <p>Your BTC Address: {user.public_key}</p>
            {loading ? <p>Loading wallet balance...</p> : <p>Wallet balance: {walletAmount !== null ? walletAmount : 'N/A'}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div>
                <p>Start a treaty with another user:</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Recipient Username:</label>
                        <input
                            type="text"
                            name="recipient_username"
                            value={treatyDetails.recipient_username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Item Details:</label>
                        <input
                            type="text"
                            name="item_details"
                            value={treatyDetails.item_details}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price (BTC):</label>
                        <input
                            type="number"
                            name="price"
                            value={treatyDetails.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Terms (JSON format):</label>
                        <textarea
                            name="terms"
                            value={JSON.stringify(treatyDetails.terms)}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Create Treaty</button>
                </form>

                {treatyResponse && <p>{treatyResponse.message}</p>}
            </div>
        </div>
    );
}

export default Account;
