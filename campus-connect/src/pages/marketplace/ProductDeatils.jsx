
// //import React from 'react';
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom'; 
// import ProductListInstance from './ProductList';
// import './product.css'
// import { useProducts} from './ProductContext';

// const ProductDetails = () => {
    
//     const { productId } = useParams(); 
//     const { productx, setProduct, fetchProductById } = useProducts();
//     const product = null;

//     useEffect(() => {
//         const getProductDetails = async () => {
//             try {
//                 const fetchedProduct = await fetchProductById(productId);
//                 console.log("fetched: ", fetchedProduct);
//                 setProduct(fetchedProduct);
//                 product = fetchedProduct;
//             } catch (error) {
//                 console.error('Error fetching product details:', error);
//             }
//         };

//         getProductDetails();
//     }, [productId, setProduct, fetchProductById]);




    
//     // const product = 
//     // useEffect(() => {
//     //     // Log the updated products whenever the products state changes
//     //     console.log("All products:", products);
//     // }, [products]); // Add products to the dependency array

    
//     //const product = ProductListInstance.findProduct(parseInt(productId));
//     //const product = findProduct(productId);
//     console.log("product details: ", product);
//     if (!product) 
//     {
//         return <div>Product not found.</div>;
//     }

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import ProductListInstance from './ProductList';
import './product.css'
import { useProducts } from './ProductContext';

const ProductDetails = () => {
    const { productId } = useParams(); 
    const { fetchProductById } = useProducts();

    const [product, setProduct] = useState(null); // State to store the product

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const fetchedProduct = await fetchProductById(productId);
                console.log("fetched: ", fetchedProduct);
                setProduct( fetchedProduct);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        getProductDetails();
    }, [productId, product]);
    console.log("!!!!!!!", product);
    if (!product) {
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
