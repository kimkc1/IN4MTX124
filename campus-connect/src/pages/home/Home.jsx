import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Home.css'

function HomePage() {
    return (
      <div>
        <Navbar />
        <main>
          <section className="new-items">
            <h2>New Items</h2>
            <a href="../marketplace/marketplace.html" className="button-link">
              <button>Browse Items</button>
            </a>
          </section>
          
          <section className="my-saved">
            <h2>My Saved</h2>
            <button>View Saved</button>
          </section>
        </main>
      </div>
    );
  }
  
  export default HomePage;
  