const express = require('express');
const productRouter = express.Router();
const products = require('../db/products');
let hasError = false;
let notNumber = false;
let notInIndex = false;

productRouter.get('/', (req, res) => {
    res.render('products/index', {product: products.getProducts(), type: 'products'});
});

productRouter.get('/new', (req, res) => {
    res.render('products/new', {type: 'products', hasError: hasError, notNumber: notNumber});
    hasError = false;
    notNumber = false;
});

productRouter.get('/:id', (req, res) => {
    let filterArr = products.getProducts().filter((product) => product.id == req.params.id);
    if (filterArr.length === 0){
        res.render('404', {type: 'products'});
    } else {
        res.render('products/product', {product: products.getProducts()[products.getProducts().indexOf(filterArr[0])], type: 'products', id: req.params.id});
    }
    notInIndex = false;
});

productRouter.get('/:id/edit', (req, res) => {;
    res.render('products/edit', {type: 'products', id: req.params.id, notInIndex: notInIndex});
});

productRouter.post('/', (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.inventory){
        hasError = true;
        res.redirect('/products/new');
    } else if(isNaN(req.body.price) === true || isNaN(req.body.inventory) === true){
        notNumber = true;
        res.redirect('/products/new');
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
        notInIndex = true;
        res.redirect(`/products/:id/edit`);
    } else {
        products.updateProduct(req.body, req.params.id);
        res.redirect(`/products/${req.params.id}`);
    };
});

productRouter.delete('/:id', (req, res) => {
    if (products.getProducts().filter((product) => product.id == req.params.id).length === 0){
        notInIndex = true;
        res.redirect('/products/:id');
    } else {
        products.deleteProduct(req.params.id);
        res.redirect('/products');
    };
});
module.exports = productRouter;