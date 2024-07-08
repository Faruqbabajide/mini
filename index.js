const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/product');
const ordersRouter = require('./routes/order');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mini-shop', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.listen(3000, () => console.log('Server Started'));
