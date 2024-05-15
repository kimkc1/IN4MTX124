import React from 'react';

function Navbar() {
    return (
      <nav className="navbar">
        <ul className="nav-list">
          <li><a href="../home/home.html">Home</a></li>
          <li><a href="../marketplace/marketplace.html">Marketplace</a></li>
          <li><a href="../settings/settings.html">Settings</a></li>
          <li><a href="../profile/profile.html">Profile</a></li>
          <li><a href="../chat/chat.html">Chat</a></li>
        </ul>
        <div className="rightNav">
          <input type="text" name="search" id="search" placeholder="Search" />
          <button className="btn btn-sm">Search</button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  