import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './Home.css';

function HomePage() {
  return (
    <div>
      <Navbar />
      <main>
        <section className="new-items">
          <h2>New Items</h2>
          <Link to="/marketplace" className="button-link">
            <button>Browse Items</button>
          </Link>
        </section>
        
        <section className="my-saved">
          <h2>My Saved</h2>
          <Link to="/saved" className="button-link">
            <button>View Saved</button>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
