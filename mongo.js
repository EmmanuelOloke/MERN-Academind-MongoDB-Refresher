const MongoClient = require('mongodb').MongoClient; // MongoClient is class that allows us to make connection with  MongoDB

const URI = process.env.DB_URI;

const createProduct = async(req, res, next) => { // When you're working with databases, the tasks can take a while, that's why it is appropriate to use async functions
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    const client = new MongoClient(URI); // This line just tells the mongodb/client which server we want to connnect to. Initiating the connection doesn't take place here.

    try { // Using a try/catch block because connecting to the server/database can fail. And in case of a failure, we want to catch any error that might have occured in the process
        await client.connect(); // This is the line that establishes the connection to the mongodb server. An asynchronous task because connecting to the server is a task that can take a few moment.
        const db = client.db(); // db() takes the connection string provided in const URL and gives access to the db.
        const result = await db.collection('products').insertOne(newProduct); // If the collection doesn't exist in the db, a new collection is created and if it exists a new document is added to the collection.
    } catch (error) {
        return res.status(422).json({ message: 'Could not store data' });
    };
    res.json(newProduct);

    client.close();

};

const getProducts = async(req, res, next) => {

};

exports.createProduct = createProduct;
exports.getProducts = getProducts;