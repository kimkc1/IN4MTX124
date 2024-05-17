
import React from 'react';
import { Link, useParams } from 'react-router-dom'; 
import ProductListInstance from './ProductList';
import './product.css'

const ProductDetails = () => {
    
    const { productId } = useParams(); 

    const product = ProductListInstance.findProduct(parseInt(productId));

    console.log("product details: ", product);
    if (!product) 
    {
        return <div>Product not found.</div>;
    }

    

    return (
    <div className="product-details">
        <form className="productInfo">
                <div className="left">
                    <button className="uplaodImage">
                        
                        <img className="productImage" src={product.getImage()} alt="upload"/>
                        {/* <input
                        type="file"
                        accept="image/*"
                        // onChange={(event) => handleImageChange(event)}
                        /> */}
                    </button>
                </div>

                <div className="right">

                <div className="row">
                    <div className="productTitle">
                        <input className="productName" 
                            disabled='true'
                            type="text" 
                            placeholder={product.getName()}
                            value={product.getName()}
                            // onChange={e=> setName(e.target.value)}
                            />
                        <input className="productPrice" 
                            type="text" 
                            disabled='true'
                            placeholder={product.getPrice()}
                            value={product.getPrice}
                            // onChange={e=> setPrice(e.target.value)}
                            />
                    </div>
                </div>

                
                <div className="row">
                    <textarea className="productDescription" 
                        disabled = 'true'
                        placeholder={product.getDescription()} 
                        value={product.getDescription()}
                        // onChange={e=> setDesc(e.target.value)}
                    />
                </div>

                <div className="row"> 
                    <div className="product-buttons-group">
                        {/* <button className="post-upload" onClick={handlePostClick}>Post</button> */}
                        <Link className='product-buttons' to='/chat'>
                            <button className="product-buttons">Message</button>
                        </Link>
                        <button className="product-buttons">Save</button>
                    </div>
                </div>

                
            </div>

            
        </form>
    </div>
    );
};

export default ProductDetails;
