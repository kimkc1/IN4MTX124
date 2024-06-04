
import iUpload from '../../images/upload.png'

class id {
    static count = 1;
    constructor(){
        id.count ++;
        
    }
}



class Product{

    // static item1 = new Product("7 Iron", 75.0, "Taylormade 7 iron in great condition", i1);
    // static item2 = new Product("Snowboard", 250.0, "like new burton snowboard", i2)

   

    
    constructor(name, price, desc, img=iUpload, old=null)
    {
        if(old != null)
        {
            this.id = old
        }
        else 
        {
            new id();
            this.id = id.count;
        }
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.img = img;
        
        
        

    }

    getID()
    {
        return this.id;
    }

    
    getName()
    {
        return this.name;
    }

    setName(name)
    {
        this.name = name;
    }

    getPrice()
    {
        return this.price;
    }

    setPrice(price)
    {
        this.price = price;

    }

    getDescription()
    {
        return this.desc;
    }

    setDescription(desc)
    {
        this.desc = desc;
    }

    getImage()
    {
        return this.img;
    }
    setImage(img)
    {
        this.img = img;
    }

    getProductList()
    {
        return this.productsList;
    }

    addProduct()
    {
        this.productsList[this.id] = this;
    }
   

}

export default Product
