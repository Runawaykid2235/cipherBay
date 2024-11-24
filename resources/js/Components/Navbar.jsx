// src/components/Navbar.jsx
import { Link } from 'react-router-dom'; // Using React Router for navigation

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/createaccount">createaccount</Link></li>
        <li><Link to="/Login">login</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
