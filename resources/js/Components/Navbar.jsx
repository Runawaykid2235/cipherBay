import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styling/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [walletAmount, setWalletAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    axios
      .get('/api/account', { withCredentials: true })
      .then((response) => setUser(response.data.user))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  // Fetch wallet amount
  useEffect(() => {
    const fetchWalletAmount = async () => {
      setLoading(true);
      setError(null);
      try {
        const walletResponse = await axios.get('/api/walletamount', { withCredentials: true });
        setWalletAmount(walletResponse.data.walletAmount);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred while fetching wallet data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.username) {
      fetchWalletAmount();
    }
  }, [user]);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
        {user ? (
          <>
            <li className="navbar-item"><Link to="/treaties" className="navbar-link">Treaties</Link></li>
            <li className="navbar-item"><Link to="/createtreaty" className="navbar-link">Create Treaty</Link></li>
          </>
        ) : (
          <>
            <li className="navbar-item"><Link to="/createaccount" className="navbar-link">Create Account</Link></li>
            <li className="navbar-item"><Link to="/login" className="navbar-link">Login</Link></li>
          </>
        )}
      </ul>
      {user && walletAmount !== null ? (
        <div className="navbar-user-info">
          <Link to="/account" className="navbar-username">{user.username}</Link>
          <span className="navbar-wallet">Wallet: ${walletAmount.toFixed(2)}</span>
        </div>
      ) : (
        <div className="navbar-user-info">
          {loading ? <span>Loading...</span> : <span>Please Log In</span>}
          {error && <span className="error">{error}</span>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
