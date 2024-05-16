import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Marketplace.css'

// Indexes of product data 
const itemName = 0;
const itemPrice = 1;
const itemDescription = 2; 
const itemImageLoc = 3;

// Dummy marketplace data 
const cuurent_items = new Map([
    ["item 1", ["7 Iron", 75.0, "Taylormade 7 iron in great condition", "./images/clubs.jpeg"]], 
    ["item 2", ["Snowboard", 250.0, "like new burton snowboard", "./images/snowboard.jpeg"]]
]);

function Marketplace() {
  const createFigure = (itemData) => {
    return (
      <figure key={itemData[itemName]}>
        <a href={itemData[itemImageLoc]} target="_blank" rel="noopener noreferrer">
          <img src={itemData[itemImageLoc]} alt={itemData[itemName]} />
        </a>
        <div className="title">
          <p className="name">{itemData[itemName]}</p>
          <p className="price">{itemData[itemPrice].toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
        <div className="description">{itemData[itemDescription]}</div>
      </figure>
    );
  };

  const createGallery = () => {
    return (
      <div className="gallery">
        {[...cuurent_items.values()].map(itemData => (
          createFigure(itemData)
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />  
      {createGallery()}
      <a href="./productUpload.html">
        <button className="post">+</button>
      </a>
    </div>
  );
}

export default Marketplace;
