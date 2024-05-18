import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    return (
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/profile">Profile</Link></li>

          <li><Link to="/chat">Chat</Link></li>
          
        </ul>
        <div className="rightNav">
          <input type="text" name="search" id="search" placeholder="Search" />
          <button className="btn btn-sm">Search</button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  