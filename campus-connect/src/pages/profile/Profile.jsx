import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './Profile.css';

function Profile() {
    return (
        <div>
        <Navbar />
        <main>
          <section className="profile-container">
            <section className="profile-card">
                <h2>Jane Doe</h2>
                <p>@janedoe</p>
            </section>
          </section>

          <section className="listings-container">
            <section className="separate-text">
                <h2>Your Active Listings</h2>
                <section className="listings-card">
                <h2>Lamp</h2>
                <p>$10</p>
            </section>
            <Link to="/saved" className="button-link">
                <button>View All Active Listings</button>
            </Link>
            </section>

            

          </section>

          <section className="listings-container">
            <section className="separate-text">
                <h2>Your Saved Listings</h2>

                <section className="listings-card">
                    <h2>Plushies</h2>
                    <p>$20</p>
                </section>

                <Link to="/saved" className="button-link">
                    <button>View All Saved Listings</button>
                </Link>
                
            </section>

            
          </section>
        </main>
      </div>
);
}

export default Profile;