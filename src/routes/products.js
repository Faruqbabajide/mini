const express = require('express');
const router = express.Router();
const { products } = require('../data');

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');
    res.json(product);
});

// Add new product
router.post('/', (req, res) => {
    const { name, price, description, available } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        description,
        available
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');

    const { name, price, description, available } = req.body;
    product.name = name;
    product.price = price;
    product.description = description;
    product.available = available;
    res.json(product);
});

module.exports = router;
