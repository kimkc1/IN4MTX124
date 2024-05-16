// src/pages/saved/Saved.jsx
import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Saved.css';

// Dummy saved items data
const saved_items = new Map([
    ["item 1", ["Lamp", 10.0, "Great Condition Lamp", "https://via.placeholder.com/150"]],
    ["item 2", ["Plushies", 20.0, "NWT Sanrio plushies", "https://via.placeholder.com/150"]]
]);

function Saved() {
  const createFigure = (itemData) => {
    return (
      <figure key={itemData[0]}>
        <a href={itemData[3]} target="_blank" rel="noopener noreferrer">
          <img src={itemData[3]} alt={itemData[0]} />
        </a>
        <div className="title">
          <p className="name">{itemData[0]}</p>
          <p className="price">{itemData[1].toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
        <div className="description">{itemData[2]}</div>
      </figure>
    );
  };

  const createGallery = () => {
    return (
      <div className="gallery">
        {[...saved_items.values()].map(itemData => (
          createFigure(itemData)
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />  
      {createGallery()}
    </div>
  );
}

export default Saved;
