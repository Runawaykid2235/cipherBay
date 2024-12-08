import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using axios
import Navbar from "./Navbar";
import "./Styling/Account.css"; // Import a CSS file for the styles

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

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, { withCredentials: true });
            window.location.href = "/login"; // Redirect to the login page
        } catch (err) {
            setError("Failed to logout. Please try again.");
        }
    };

    if (!user) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="account-container">
            <Navbar />
            <div className="account-content">
                <h1 className="welcome-title">Welcome, {user.username}!</h1>
                <div className="btc-info">
                    <p>Your BTC Address: <span className="btc-key">{user.public_key}</span></p>
                </div>

                {loading ? (
                    <p className="loading">Loading data...</p>
                ) : (
                    <div className="wallet-info">
                        <p className="wallet-balance">Wallet Balance: {walletAmount !== null ? walletAmount : 'N/A'}.00$</p> {/* .00 should not be hardcoded but instead we should take the full float and limit to 2 trailing after comma */}
                        <div className="treaty-stats">
                            <div className="treaty-card">
                                <h3>Incoming Treaties</h3>
                                <p>{treatyAmounts.incoming}</p>
                            </div>
                            <div className="treaty-card">
                                <h3>Outgoing Treaties</h3>
                                <p>{treatyAmounts.outgoing}</p>
                            </div>
                            <div className="treaty-card">
                                <h3>Total Treaties</h3>
                                <p>{treatyAmounts.total}</p>
                            </div>
                        </div>
                    </div>
                )}

                {error && <p className="error">{error}</p>}

                {/* Logout Button */}
                <div className="logout-button-container">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Account;
