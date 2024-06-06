const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
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
    try {
        const products = await Product.find();
        const productsWithImages = await Promise.all(products.map(async (product) => {
            const imagePath = path.join(__dirname, 'images', 'images.json');
            const existingData = JSON.parse(fs.readFileSync(imagePath));
            const imageData = existingData[product.id];

            const productI = {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                img: imageData
            };
            return productI;
        }));
        res.json(productsWithImages);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Get maxId
app.get('/products/maxId', async (req, res) => {
    try {
        const product = await Product.findOne({}).sort({ id: -1 }).exec();
        res.json(product);
    } catch (error) {
        console.error("problem getting highest id", error);
    }
});

// Get a single product
app.get('/products/byId', async (req, res) => {
    try {
        const productId = req.query.id;
        const product = await Product.findOne({ id: productId });
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        try {
            const imagePath = path.join(__dirname, 'images', 'images.json');
            const existingData = JSON.parse(fs.readFileSync(imagePath));
            const imageData = existingData[productId];
            const productI = {
                id: productId,
                name: product.name,
                price: product.price,
                description: product.description,
                img: imageData
            };
            res.json(productI);
        } catch (error) {
            console.error('Error reading image data:', error);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new product
app.post('/products', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.desc,
    });

    try {
        const newProduct = await product.save();
        const imagePath = path.join(__dirname, 'images', 'images.json');
        const id = newProduct.id;
        const image = req.body.img;
        let existingData = {};
        try {
            existingData = JSON.parse(fs.readFileSync(imagePath));
        } catch (error) {
            console.error('Error reading existing image data:', error);
        }
        existingData[id] = image;
        fs.writeFileSync(imagePath, JSON.stringify(existingData));
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

// Chat routes
app.get('/chats', async (req, res) => {
    try {
        const chats = await Chat.find().sort({ timestamp: 1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/chats', async (req, res) => {
    const chat = new Chat({
        sender: req.body.sender,
        message: req.body.message
    });

    try {
        const newChat = await chat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// User Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User registration
app.post('/register', async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registration successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
