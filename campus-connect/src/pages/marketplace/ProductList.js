import Product from "./Product";
import i1 from '../../images/clubs.jpeg'
import i2 from '../../images/snowboard.jpeg'
class ProductList
{
   
    constructor()
    {
        
        this.productsList = [];
           

    }

    getProductList()
    {
        return this.productsList
    }

    addProduct(product)
    {
        this.productsList.push(product);

    }

//     removeProduct(product)
//     {
//         this.productsList.(product);
//     }
}

const productListInstance = new ProductList();
const p1 = new Product("7 Iron", 75.0, "Taylormade 7 iron in great condition", i1);
const p2 = new Product("Snowboard", 250.0, "like new burton snowboard", i2);
productListInstance.addProduct(p1);
productListInstance.addProduct(p2);

export default productListInstance;
