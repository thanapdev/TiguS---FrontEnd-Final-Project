const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connect = require("mongoose");
const db = require('./config/db.js');
const { name } = require("ejs");
const { MongoClient } = require("mongodb");

const usersSchema = require('./model/listItem.js').users;
const foodSchema = require('./model/listItem.js').food;
const cartSchema = require('./model/listItem.js').cart;
const orderSchema = require('./model/listItem.js').order;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


db.connect();

app.get("/" ,(req,res) =>{
    res.render('index')
})

app.get("/menu" ,(req,res) =>{
    res.render('menu')
})

app.get("/picorder" ,(req,res) =>{
    res.render('picorder')
})

app.get("/order" ,(req,res) =>{
    res.render('order')
})

app.get("/checkout" ,(req,res) =>{
    res.render('checkout')
})

app.get("/delivery" ,(req,res) =>{
    res.render('delivery')
})

app.get("/register" ,(req,res) =>{
   res.render('register')
})
app.post("/register" , async (req, res) =>{
    const uri = 'mongodb://127.0.0.1:27017/TiguSDB';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
   try {
    await client.connect();

    const collection = client.db('TiguSDB').collection('users');
    const user = {
        name: req.body.FirstName,
        username: req.body.Username,
        email: req.body.Email,
        password: req.body.Password,
        address: req.body.ddress
    };

    const result = await collection.insertOne(user);
    console.log(`Inserted ${result.insertedCount} documents`);

    res.redirect('/');
   } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting data');
   } finally {
    await client.close();
   }
})

app.get("/admin" ,(req,res) =>{
    res.render('admin')
})
app.listen(3000, function () {
    console.log("Server app listening on port 3000");
});