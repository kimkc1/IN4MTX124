import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Marketplace.css'
import { Link } from 'react-router-dom';
//import Product from './Product';
import ProductsListInstance from './ProductList';
import { useProducts } from './ProductContext';


//const cuurent_items = ProductsListInstance.getProductList();
//const {products} = useProducts;
//const cuurent_items = products;
//console.log("**current items: ", products);

function Marketplace() {
  const { products, fetchProducts } = useProducts(); // Destructure products and fetchProducts from useProducts

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [fetchProducts]); // Ensure useEffect runs only once
  const cuurent_items = products;
  console.log("›$**current items: ", products);

  const createFigure = (itemData) => {
    console.log("creating element:", itemData);
    const id = itemData.getID();
    const name = itemData.getName();
    const price = parseFloat(itemData.getPrice());
    const desc = itemData.getDescription();
    const img = itemData.getImage();
    return (
      <figure key={name}>
        <Link to={`/marketplace/product/${id}`} target="_blank" rel="noopener noreferrer">
          <img src={img} alt={name} />
        </Link>
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
    console.log(cuurent_items);
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
