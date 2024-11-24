import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using axios
import Navbar from "./Navbar";

function Account() {
    const [user, setUser] = useState(null);
    const [walletAmount, setWalletAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <h1>Welcome, {user.username}!</h1>
            <p>Your btc Adress: {user.public_key}</p>
            {loading ? <p>Loading wallet balance...</p> : <p>Wallet balance: {walletAmount !== null ? walletAmount : 'N/A'}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Account;
