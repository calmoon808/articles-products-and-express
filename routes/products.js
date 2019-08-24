const express = require('express');
const productRouter = express.Router();
const products = require('../db/products');

productRouter.get('/', (req, res) => {
    res.render('products/index', {product: products.getProducts(), type: 'products'});
});

productRouter.get('/new', (req, res) => {
    res.render('products/new', {type: 'products'});
});

productRouter.get('/:id', (req, res) => {
    let filterArr = products.getProducts().filter((product) => product.id == req.params.id);
    if (filterArr.length === 0){
        res.send('PAGE NOT FOUND');
    } else {
        res.render('products/product', {product: products.getProducts()[products.getProducts().indexOf(filterArr[0])], type: 'products', id: req.params.id});
    }
});

productRouter.get('/:id/edit', (req, res) => {;
    res.render('products/edit', {type: 'products', id: req.params.id});
});

productRouter.post('/', (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.inventory){
        res.redirect(`/products/new`);
        console.error('fill in all parameters');
    } else {
        if (products.getProducts().filter((product) => product.name === req.body.name).length === 0){
            products.addProduct(req.body);
        } else {
            res.send('Product already exists.');
        };
        res.redirect(`/products`);
    };
});

productRouter.put('/:id', (req, res) => {
    if (products.getProducts().filter((product) => product.id == req.params.id).length === 0){
        res.redirect(`/products/:id/edit`);
        console.error('id out of index');
    } else {
        products.updateProduct(req.body, req.params.id);
        res.redirect(`/products/${req.params.id}`);
    };
});

productRouter.delete('/:id', (req, res) => {
    if (products.getProducts().filter((product) => product.id == req.params.id).length === 0){
        res.redirect('/products/:id');
        console.error('id out of index');
    } else {
        products.deleteProduct(req.params.id);
        res.redirect('/products');
    };
});
module.exports = productRouter;