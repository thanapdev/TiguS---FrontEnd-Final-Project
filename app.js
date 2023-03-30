const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connect = require("mongoose");
const db = require('./config/db.js');
const { name } = require("ejs");
const { MongoClient } = require("mongodb");
const session = require("express-session");
const Swal = require('sweetalert');

const at =require('./control/authen');
const {User} = require('./model/user');

// const foodSchema = require('./model/listItem.js').food;
// const cartSchema = require('./model/listItem.js').cart;
// const orderSchema = require('./model/listItem.js').order;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

db.connect();

app.use(session({
    secret: "jklfsodifjsktnwjasdp465dd", // Never ever share this secret in production, keep this in separate file on environmental variable
    variableresave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, //oneS hour
    mongoUrl : ({mongoUrl: "mongodb://127.0.0.1:27017/TiguSDB"}),
  }));




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

app.get("/admin" ,(req,res) =>{
    res.render('admin')
})

app.get("/logadmin" ,(req,res) =>{
    res.render('logadmin')
})


app.get("/login" ,(req,res) =>{
    res.render('login')
 })

 app.get('/home',at.authentication, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        const username = User.username;
        res.render('home', { Username: username });
      } else {
        res.redirect('/login'); 
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).send('Internal Server Error');
    }
});

// app.get('/logadmin',at.adminauth, async (req, res) => {
//     try {
//       const user = await Admin.findById(req.session.userId);
//       if (user) {
//         const username = Admin.username;
//         res.render('/admin', { Username: username });
//       } else {
//         res.redirect('/logadmin'); 
//       }
//     } catch (error) {
//       console.error('Error retrieving user:', error);
//       res.status(500).send('Internal Server Error');
//     }
// });


app.post('/login', async(req, res) => {
    const usersname = req.body.usersname;
    const password = req.body.password;
    const reguser = await User.findOne({username : usersname , password : password});
    if (reguser) {
        req.session.userId = reguser.id;
        console.log(req.session);
        
        res.redirect('/home');
    } else {
        res.redirect('/login');        
    }
});

app.get("/register" ,(req,res) =>{
    res.render('register')
 })

app.post('/register', async(req,res) => {
    const regemail = req.body.email;
    const regusername = req.body.usersname;
    const regname = req.body.name;
    const regpassword = req.body.password;

    const reguser = await User.findOne({username : regusername , password : regpassword});
        if (reguser) {
        res.redirect('/login');
        } else {
        const unreguser = new User({name: regname, email: regemail, username: regusername, password: regpassword});
        unreguser.save();
        }
        

})

app.post('/logout', (req, res) => {
    try {
      req.session.destroy(function (err) {
        if (err) {
          console.log(err); // log the error to the console
        }
        res.redirect('/');
      });
    } catch (err) {
      console.log(err); // log the error to the console
      res.redirect('/');
    }
  })

// app.post("/register" , async (req, res) =>{
//     const uri = 'mongodb://127.0.0.1:27017/TiguSDB';
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//    try {
//     await client.connect();

//     const collection = client.db('TiguSDB').collection('users');
//     const user = {
//         name: req.body.FirstName,
//         username: req.body.Username,
//         email: req.body.Email,
//         password: req.body.Password,
//         address: req.body.ddress
//     };

//     const result = await collection.insertOne(user);
//     console.log(`Inserted ${result.insertedCount} documents`);

//     res.redirect('/');
//    } catch (error) {
//     console.error(error);
//     res.status(500).send('Error submitting data');
//    } finally {
//     await client.close();
//    }
// })


app.listen(3000, function () {
    console.log("Server app listening on port 3000");
});