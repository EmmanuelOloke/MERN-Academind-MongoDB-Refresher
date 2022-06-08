const mongoose = require('mongoose');

const Product = require('./models/products');

// This manages the connection between our backend and the mongoDB database, so we don't have to opene and close new connections each time we create a new product.
// .connect() also returns a promise so we can add .then()
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connection to the database Successfully established');
    }).catch(err => {
        console.log('Connection Failed!', err);
    });

const createProduct = async(req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });

    const result = await createdProduct.save(); //Await because interacting with the db can take sometime. To create a product and store it in the database, we have to save the product. save() is a mongoose method that does all the heavy lifting of saving a document behind the scenes

    res.json(result);
};

const getProducts = async(req, res, next) => {
    const products = await Product.find().exec(); // We use find() on our contructor function Product and it returns and Array by default. .exec() turns it into a promise.
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;