import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import uploadImg from '../../images/upload.png';
import './UploadProduct.css';
import Product from './Product';
import ProductListInstance from './ProductList';





function checkInput(name,price,desc,img)
{
    if(name === ""||price === "" || desc === "" || img === uploadImg )
    {
        console.log("invalid input");
        return false;
    }
    return true;
}



function UploadProduct() {

    const [productList, setProductList] = useState(ProductListInstance.getProductList());

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    //const [img, setImg] = useState(uploadImg);

    const [selectedImage, setSelectedImage] = useState(uploadImg);

    function handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }







    const handlePostClick = (e) => {
        if (!checkInput(name,price,desc,selectedImage))
        {
            return;
        }

        console.log("before change: ", productList);
        e.preventDefault();
        console.log("Name:", name);
        console.log("Price:", price);
        console.log("Description:", desc);
        console.log("img: ", selectedImage);
        const add = new Product(name,price,desc,selectedImage);
        console.log(add);
        ProductListInstance.addProduct(add);
        setProductList(ProductListInstance.getProductList());
        //ProductListInstance.push(add);
        console.log("updated list: ", ProductListInstance.getProductList());
        
    };


    

    return (
        <div>
            <Navbar />
            <form className="productInfo">
                <div className="left">
                    <button className="uplaodImage">
                       
                        <img className="productImage" src={selectedImage} alt="upload"/>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageChange(event)}
                        />
                    </button>
                </div>

                <div className="right">

                <div className="row">
                    <div className="productTitle">
                        <input className="productName" 
                            type="text" 
                            placeholder="Name"
                            value={name}
                            onChange={e=> setName(e.target.value)}
                            />
                        <input className="productPrice" 
                            type="text" 
                            placeholder="$0.00"
                            value={price}
                            onChange={e=> setPrice(e.target.value)}
                            />
                    </div>
                </div>

                
                <div className="row">
                    <textarea className="productDescription" 
                        placeholder="Enter product description..." 
                        value={desc}
                        onChange={e=> setDesc(e.target.value)}
                    />
                </div>

                <div className="row"> 
                    <div className="product-buttons">
                        <button className="post-upload" onClick={handlePostClick}>Post</button>
                        <button className="remove">Remove</button>
                    </div>
                </div>

                
            </div>

            
        </form>
        </div>

    );
    }


  export default UploadProduct;
  