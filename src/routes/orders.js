const express = require('express');
const router = express.Router();
const { orders, products } = require('../data');

// Create an order
router.post('/', (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).send('Product not found.');

    const newOrder = {
        id: orders.length + 1,
        productId,
        status: 'Created'
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Cancel an order
router.put('/:id/cancel', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found.');
    if (order.status !== 'Created') return res.status(400).send('Order cannot be canceled.');

    order.status = 'Canceled';
    res.json(order);
});

module.exports = router;
