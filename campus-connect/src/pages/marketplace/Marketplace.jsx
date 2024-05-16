import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Marketplace.css'
import { Link } from 'react-router-dom';
//import Product from './Product';
import ProductsListInstance from './ProductList';


// import i1 from '../../images/clubs.jpeg'
// import i2 from '../../images/snowboard.jpeg'

const cuurent_items = ProductsListInstance.getProductList();
console.log("**current items: ", cuurent_items);


// new Product("7 Iron", 75.0, "Taylormade 7 iron in great condition", i1);
// new Product("Snowboard", 250.0, "like new burton snowboard", i2)

// const cItmes = new Map([
//   [1, ["7 Iron", 75.0, "Taylormade 7 iron in great condition", i1]],
//   [2, ["Snowboard", 250.0, "like new burton snowboard", i2]]
// ]);


//const cuurent_items = ProductsList.getProductList();
//console.log("current items: ", cuurent_items);
//console.log("c items: ", cItmes );

function Marketplace() {
  
  


  const createFigure = (itemData) => {
    console.log("creating element:", itemData);
    const name = itemData.getName();
    const price = parseFloat(itemData.getPrice());
    const desc = itemData.getDescription();
    const img = itemData.getImage();
    return (
      <figure key={name}>
        <a href={img} target="_blank" rel="noopener noreferrer">
          <img src={img} alt={name} />
        </a>
        <div className="title">
          <p className="name">{name}</p>
          <p className="price">{price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
        <div className="description">{desc}</div>
      </figure>
    );
  };

  const createGallery = () => {
    // console("list of products: ", ...cur)
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
      <Link to="/marketplace/uploadProduct">
        <button className="post">+</button>
      </Link>
    </div>
  );
}

export default Marketplace;
