const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

// Database Name
const dbName = 'PassOP';

client.connect();


//get all the passwaords
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)

})

//save all the passwaords
app.post('/', async(req, res) => {
    const db = client.db(dbName);
    const password = req.body;
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    res.json({Success:true})

})

//delete  passwaords
app.delete('/', async(req, res) => {
    const db = client.db(dbName);
    const password = req.body;
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    res.json({Success:true})

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})