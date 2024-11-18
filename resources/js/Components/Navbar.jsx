import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav style={styles.navbar}>
      {/* Centered Links */}
      <div style={styles.menu}>
        <Link to="/cv" style={styles.link}><span><u>C</u>v</span></Link>

        {/* Projects Link with Dropdown */}
        <span onClick={toggleDropdown} style={{...styles.link,...isDropdownOpen ? styles.linkPressed: {}}}>
          <span><u>P</u>rojects</span>
          {isDropdownOpen && (
            <div style={styles.dropdownMenu}>
              <Link to="/projects" style={styles.dropdownItem}>All Projects</Link>


              <div style={styles.dropdownItemContainer}>
                <img src="/Images/rustacean-flat-happy.png" className="logo" style={{ display: 'block', width: '25px', height: '25px'}}/>
                <Link to="/projects/rust" style={styles.dropdownItem}><span><u>R</u>ust</span></Link>
                <img src="/Images/ArrowWindows98.PNG" className="arrow" style={{ display: 'block', width: '20px', height: '20px', marginLeft: '77px'}}/>
              </div>


              <div style={styles.dropdownItemContainer}>
                <img src="/Images/react.png" className="logo" style={{ display: 'block', width: '25px', height: '25px'}}/>
                <Link to="/projects/react" style={styles.dropdownItem}><span><u>R</u>eact</span></Link>
                <img src="/Images/ArrowWindows98.PNG" className="arrow" style={{ display: 'block', width: '20px', height: '20px', marginLeft: '70px'}}/>
              </div>


              
              <div style={styles.dropdownItemContainer}>
                <img src="/Images/Python_logo.png" className="logo" style={{ display: 'block', width: '25px', height: '25px'}}/>
                <Link to="/projects/python" style={styles.dropdownItem}><span><u>P</u>ython</span></Link>
                <img src="/Images/ArrowWindows98.PNG" className="arrow" style={{ display: 'block', width: '20px', height: '20px', marginLeft: '60px'}}/>
              </div>
            </div>
          )}
        </span>

        <Link to="/about" style={styles.link}><span><u>A</u>bout me</span></Link>
        <Link to="/contact" style={styles.link}><span><u>C</u>ontact</span></Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#c0c0c0', // Classic Windows 98 background
    color: 'black',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    border: '2px solid #ffffff',
    borderBottomColor: '#808080', // For a 3D look
    borderRightColor: '#808080',
  },
  menu: {
    display: 'flex',
    gap: '30px',
    position: 'relative',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '4px 8px',
    border: '1px solid #ffffff', // 3D look
    borderBottomColor: '#404040',
    borderRightColor: '#404040',
    backgroundColor: '#c0c0c0',
    cursor: 'pointer',
    position: 'relative', // Add position relative to allow dropdown positioning
  },
  linkPressed: {
    border: '1px dashed black', // Title border
    borderBottomColor: '#FFFFFF',
    borderRightColor: '#FFFFFF'
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%', // Position directly below the "Projects" link
    left: 0,
    backgroundColor: '#c0c0c0',
    padding: '5px',
    border: '2px solid #ffffff',
    borderBottomColor: '#808080',
    borderRightColor: '#808080',
    boxShadow: '2px 2px 0px #000000',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    minWidth: '160px', // Ensure dropdown items align properly
  },
  dropdownItem: {
    color: 'black',
    textDecoration: 'none',
    padding: '10px 10px',
    fontSize: '14px',
    display: 'block',
    backgroundColor: '#c0c0c0',
    border: '5px #000000',
    borderBottomColor: '#404040',
    borderRightColor: '#404040',
  },
  dropdownItemContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  
};

export default Navbar;