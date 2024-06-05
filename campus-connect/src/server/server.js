const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Product schema and model
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    description: String,
    img: String,
    // Add more fields as needed
});
const Product = mongoose.model('Product', productSchema);

// Chat schema and model
const chatSchema = new mongoose.Schema({
    sender: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', chatSchema);

// Get all products
app.get('/products', async (req, res) => {
    //console.log('get products');
    try {
        const products = await Product.find();
        const productsWithImages = await Promise.all(products.map(async (product) => {
            //get image
            const imagePath = path.join(__dirname, 'images', 'images.json');
            const existingData = JSON.parse(fs.readFileSync(imagePath));
            const imageData = existingData[product.id];

            //update json
            const productI = {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description, 
                img: imageData
            }
            //console.log("product: ", productI.name, "with image: ", productI.img);
            return productI;

        }));
        res.json(productsWithImages);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Get a single product
app.get('/products/byId', async (req, res) => {
    try {
        const productId = req.query.id;
        //console.log("search by id for:", productId);
        const product = await Product.findOne({ id: productId });
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        try{
            const imagePath = path.join(__dirname, 'images', 'images.json');
            const existingData = JSON.parse(fs.readFileSync(imagePath));
            const imageData = existingData[productId];
            const productI = {
                id: productId,
                name: product.name,
                price: product.price,
                description: product.description, 
                img: imageData
            }
            res.json(productI);
            
            
        }
        catch(error)
        {
            console.error('Error reading image data:', error);
        }




        // res.json(product);
        // console.log(product.name);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new product
app.post('/products', async (req, res) => {
    console.log("adding to db", req.body, );
    console.log('^^^^^^^^^^^^added');
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.desc, 
        //img: req.body.img
       
    });

    try {
        const newProduct = await product.save();
        console.log('bd confirmed: ', newProduct);
        const imagePath = path.join(__dirname, 'images', 'images.json');
        const id = newProduct.id;
        const image = req.body.img;
        let existingData = {};
        try {
            existingData = JSON.parse(fs.readFileSync(imagePath));
        } catch (error) {
            console.error('Error reading existing image data:', error);
        }
        console.log("writinf")
        existingData[id ]= image;
        fs.writeFileSync(imagePath, JSON.stringify(existingData));
        console.log(`Image data for product ${id} saved successfully`);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a product
app.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.body.name != null) {
            product.name = req.body.name;
        }
        if (req.body.price != null) {
            product.price = req.body.price;
        }
        if (req.body.description != null) {
            product.description = req.body.description;
        }
        // Update other fields as needed
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
