
const express = require('express');
const app = express();

app.use((req,res,next) => {
    console.log('First Middleware');
    next();
});


app.use("/api/products", (req,res,next) => {  
    const products = [
        { id: 'p01', name: 'name 1', price: 100, photo: 'thumb1.gif' },
        { id: 'p02', name: 'name 2', price: 200, photo: 'thumb2.gif' },
        { id: 'p03', name: 'name 3', price: 300, photo: 'thumb3.gif' },
        { id: 'p04', name: 'name 4', price: 400, photo: 'thumb4.gif' },
        { id: 'p05', name: 'name 5', price: 500, photo: 'thumb3.gif' }
    ];  
    res.status(200).json({
        message: 'products fected successfully',
        products: products
    });
});


module.exports = app;