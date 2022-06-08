const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ // Schema is a constructor function therefore we can pass a JS object to it that defines the structure of a newly created product.
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema); // To use the Schema which is the blueprint for the document we wanna create in this case Products, we need to add a model based on the Schema already declared. The first argument is the name of the collection and the second argument is name of the Schema that we created.