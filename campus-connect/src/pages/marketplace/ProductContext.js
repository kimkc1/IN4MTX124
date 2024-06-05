import React, { createContext, useState, useEffect } from 'react';
import Product from "./Product";
import i1 from '../../images/clubs.jpeg'
import i2 from '../../images/snowboard.jpeg'
import axios from 'axios';

// Dummy data
const p1 = new Product("7 Iron", 75.0, "Taylormade 7 iron in great condition", i1);
const p2 = new Product("Snowboard", 250.0, "like new burton snowboard", i2);
const dummyProducts = [p1,p2]
  

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([p1,p2]);

    //useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            const productObjects = response.data.map((item) => {
                return new Product(item.name, item.price, item.description, item.img, item.id);
            });
            // Update context with product objects
            setProducts(productObjects);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

        //fetchProducts();
    //}, []);

    const fetchProductById = async (productId) => {
        try {
            const response = await axios.get('http://localhost:3000/products/byId', { params: { id: productId }});
            const { id, name, price, description, img } = response.data;
            return new Product(name,price,description,img,id);
        } catch (error) {
            throw new Error('Error fetching product by ID:', error);
        }
    };

    const addProduct = async (newProduct) => {
        try {
            console.log("adding ^^^^^^");
            console.log(newProduct);
            const response = await axios.post('http://localhost:3000/products', newProduct);
            console.log("^^^^^^^^^^", response.data);
            const { id, name, price, description, img } = response.data;
            const added = new Product(name,price,description,img,id)
            
            setProducts([...products, added]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const response = await axios.put(`/products/${id}`, updatedProduct);
            setProducts(products.map((product) => (product.id === id ? response.data : product)));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/products/${id}`);
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, fetchProductById, setProducts, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => React.useContext(ProductContext);
