const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(3000, function () {
    console.log("Server app listening on port 3000");
});