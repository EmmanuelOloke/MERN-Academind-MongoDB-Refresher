const MongoClient = require('mongodb').MongoClient; // MongoClient is class that allows us to make connection with MongoDB

const URI = process.env.DB_URI;

// Creating a Document on MongoDB
const createProduct = async(req, res, next) => { // When you're working with databases, the tasks can take a while, that's why it is appropriate to use async functions
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    const client = new MongoClient(URI); // This line just tells the mongodb/client which server we want to connnect to. Initiating the connection doesn't take place here.

    try { // Using a try/catch block because connecting to the server/database can fail. And in case of a failure, we want to catch any error that might have occured in the process
        await client.connect(); // This is the line that establishes the connection to the mongodb server. An asynchronous task because connecting to the server is a task that can take a few moment.
        const db = client.db(); // db() takes the connection string provided in const URL and gives access to the db. Accessing a specific database on the server.
        const result = await db.collection('products').insertOne(newProduct); // Here we want to access a collection in the db. Provide the name of the collection as an argument ("products"). If the collection doesn't exist in the db, a new collection is created and if it exists a new document is added to the collection.
    } catch (error) {
        return res.status(422).json({ message: 'Could not store data' });
    };

    client.close(); // We must manually close a connection, because once a connection is opened it will remain open until we manually close it.

    res.json(newProduct);
};

const getProducts = async(req, res, next) => {
    const client = new MongoClient(URI);

    let products;

    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray(); // The find() method in mongoDB returns a cursor. A cursor is a pointer to the result of the query and it can be iterated over to see all the results. toArray() allows us to get the document in an array.
    } catch (error) {
        return res.status(422).json({ message: 'Could not retrieve products' });
    };

    client.close(); // We must manually close a connection, because once a connection is opened it

    res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;