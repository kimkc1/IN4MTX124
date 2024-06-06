import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import uploadImg from '../../images/upload.png';
import './product.css';
import Product from './Product';
//import ProductListInstance from './ProductList';
import { useProducts } from './ProductContext';






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

    //const [productList, setProductList] = useState(ProductListInstance.getProductList());
    const { products } = useProducts();
    const { addProduct, fetchMaxId } = useProducts();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");


    const [selectedImage, setSelectedImage] = useState(uploadImg);
    const [imgLoc, setImageLoc] = useState("");

    useEffect(() => {
        console.log("Products updated:", products); // Log the updated products after the state has been updated
    }, [products]);

 

    function handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
          setImageLoc(`../../images/${file.name}`)
        };
        reader.readAsDataURL(file);
      }
    }







    const handlePostClick = (e) => {
        if (!checkInput(name,price,desc,selectedImage))
        {
            alert("please fill in all inputs");
            return;
        }

        console.log("before change: ", products);
        e.preventDefault();
        console.log("Name:", name);
        console.log("Price:", price);
        console.log("Description:", desc);
        console.log("img: ", selectedImage);
        fetchMaxId().then(maxId => {
            const id = maxId +1;
            const add = new Product(name,price,desc,selectedImage,id);
            console.log(add);

            addProduct(add);
            alert(`${add.name} has been posted`);
          
        })
        // const add = new Product(name,price,desc,selectedImage,id);
        // console.log(add);
        // //ProductListInstance.addProduct(add);
        // //setProductList(ProductListInstance.getProductList());
        // addProduct(add);
        //setForceUpdate(true);
        //ProductListInstance.push(add);
        // alert(`${add.name} has been posted`);
        console.log("updated list: ", products);
        
    };


    

    return (
        <div>
            <Navbar />
            <form className="productInfo">
                <div className="left">
                    <div className="uplaodImage">
                       
                        <img className="productImage" src={selectedImage} alt="upload"/>
                        <input
                        type="file"
                        accept="image/jpeg"
                        onChange={(event) => handleImageChange(event)}
                        />
                    </div>
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
                    <div className="product-buttons-group">
                        <button className="product-buttons" onClick={handlePostClick}>Post</button>
                        <button className="product-buttons">Remove</button>
                    </div>
                </div>

                
            </div>

            
        </form>
        </div>

    );
    }


  export default UploadProduct;
  