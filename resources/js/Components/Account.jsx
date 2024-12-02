import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using axios
import Navbar from "./Navbar";

function Account() {
    const [user, setUser] = useState(null);
    const [walletAmount, setWalletAmount] = useState(null);
    const [treatyAmounts, setTreatyAmounts] = useState({
        incoming: 0,
        outgoing: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch authenticated user details
    useEffect(() => {
        axios
            .get('/api/account', { withCredentials: true })
            .then((response) => setUser(response.data.user))
            .catch((error) => console.error(error));
    }, []);

    // Fetch wallet amount and treaty data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch wallet amount
                const walletResponse = await axios.get('/api/walletamount', { withCredentials: true });
                setWalletAmount(walletResponse.data.walletAmount);

                // Fetch treaty amounts
                const treatyResponse = await axios.get('/api/treaty-amount', {
                    params: { username: user?.username }, // Pass username as query parameter
                    withCredentials: true,
                });
                setTreatyAmounts({
                    incoming: treatyResponse.data.incoming,
                    outgoing: treatyResponse.data.outgoing,
                    total: treatyResponse.data.total,
                });
            } catch (err) {
                setError(err.response?.data?.error || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        if (user?.username) {
            fetchData();
        }
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <h1>Welcome, {user.username}!</h1>
            <p>Your BTC Address: {user.public_key}</p>

            {loading ? (
                <p>Loading data...</p>
            ) : (
                <>
                    <p>Wallet balance: {walletAmount !== null ? walletAmount : 'N/A'}</p>
                    <p>Incoming Treaties: {treatyAmounts.incoming}</p>
                    <p>Outgoing Treaties: {treatyAmounts.outgoing}</p>
                    <p>Total Treaties: {treatyAmounts.total}</p>
                </>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Account;
