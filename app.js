const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connect = require("mongoose");
const db = require('./config/db.js');
const { name } = require("ejs");
const { MongoClient } = require("mongodb");
const session = require("express-session");
const Swal = require('sweetalert');
const flash = require('connect-flash');


const {cartUser} = require("./model/cart")
const {Menu} = require("./model/food")
const adminAuth = require('./control/adminauth');
const at =require('./control/authen');
const {User} = require('./model/user');
const {Admin} = require('./model/admin');

const menus = require("./public/js/menus");
// Configure session middleware
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false
// }));

app.use(flash());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.connect();

app.use(session({
    secret: "jklfsodifjsktnwjasdp465dd", // Never ever share this secret in production, keep this in separate file on environmental variable
    variableresave: false,
    resave:true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, //oneS hour
    mongoUrl : ({mongoUrl: "mongodb+srv://thanap151255:strike151255!@theprojectdevops.rt6r3hr.mongodb.net/TiguSDB"}),
  }));

// let menuList = [];
// for (let i = 0; i < 17; i++) {
//   menuList.push(
//     new Menu({
//       _id: menus.product[i].id,
//       name: menus.product[i].name,
//       type: menus.product[i].type,
//       price: menus.product[i].price,
//       img: menus.product[i].img,
//       description: menus.product[i].descrpition,
//     })
//   );
// }

// Menu.collection
//   .insertMany(menuList)
//   .then(() => {
//     console.log("Menu has been successfully added to DB");
//   })
//   .catch(() => {
//   });

app.get("/" ,(req,res) =>{
    res.render('index')
})

app.get("/menu" ,async (req,res) =>{
    let cartItem = await cartUser.findOne({ userId: req.session.userId });
    let allMenu = await Menu.find().lean()
    // console.log(cartItem.items[0].itemId)
    // console.log(allMenu)

    res.render('menu', {
      cartItems: cartItem.items,
      menus: allMenu
    })
})

app.get("/picorder" ,async (req,res) =>{
  let cartItem = await cartUser.findOne({ userId: req.session.userId });
    let allMenu = await Menu.find().lean()
    res.render('picorder',{
    cartItems: cartItem.items,
    menus: allMenu
  })
})

app.get("/order" ,async (req,res) =>{
  let cartItem = await cartUser.findOne({ userId: req.session.userId });
    let allMenu = await Menu.find().lean()
    res.render('order', {
      cartItems: cartItem.items,
      menus: allMenu
    })
})

app.post("/cart/update", async (req, res) => {
  const userId = req.session.userId;
  const itemId = req.body.itemId;
  const quantityChange = req.body.quantityChange;

  try {
    // Find the user's cart
    const cart = await cartUser.findOne({ userId: userId });

    if (!cart) {
      return res.status(400).send("No cart found for the user");
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

    if (itemIndex == -1) {
      return res.status(400).send("Item not found in the cart");
    }

    // Update the item quantity
    cart.items[itemIndex].quantity += quantityChange;

    // If the quantity is 0 or less, remove the item from the cart
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    // Save the updated cart
    await cart.save();

    res.status(200).send("Item quantity updated successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

// app.post("/order", (req, res) => {
//   res.redirect('/order')
// })

app.get("/checkout" ,(req,res) =>{
    res.render('checkout')
})

app.get("/delivery" ,(req,res) =>{
    res.render('delivery')
})

app.get("/logadmin" ,(req,res) =>{
    res.render('logadmin')
})

app.get("/logadmin" ,(req,res) =>{
  res.render('logadmin')
})


app.get("/login" ,(req,res) =>{
    res.render('login')
 })

 app.post('/login', async (req, res) => {
  let username = req.body.usersname;
  let password = req.body.password;
  
  // Use 'username' instead of 'usersname' in the following line
  let oldUser = await User.findOne({ username: username, password: password });
  
  
  if (oldUser) {
      req.session.userId = oldUser.id;

      console.log(req.session);
      console.log(`Username: ${oldUser.username}`); // Log the username
      res.redirect('/home');
  } else {
      res.redirect('/login');
  }
}); 

app.post('/logadmin', async (req,res)=>{
  // Get user input using bodyParser
  const  username  = req.body.adminusersname;
  const  password  = req.body.adminpassword;
  // check if user already exist
  // Validate if user exist in our database
  const oldAdmin = await Admin.findOne({ username: username, password: password });
  console.log(oldAdmin)

  if (oldAdmin) {
      // User already exist >> update session information
      req.session.userId = oldAdmin.id;
      console.log(req.session);
      // console.log(`Username: ${oldAdmin.username}`); // Log the username
      res.redirect('/admin');
     } else {
    
      req.flash('message','Check your email and password.');
      res.redirect('/logadmin')
 
  }
  
})

//  app.post('/login', async (req, res) => {
//   const usersname = req.body.usersname;
//   const password = req.body.password;
//   const reguser = await User.findOne({ username: usersname, password: password });

//   if (reguser) {
//     // Create a new log entry in userLog
//     const userLogEntry = {
//       userId: reguser._id,
//       date: new Date(),
//     };

//     try {
//       await db.collection('userLog').insertOne(userLogEntry);
//       console.log('User logged in successfully:', userLogEntry);

//       req.session.userId = reguser.id;
//       console.log(req.session);
//       res.redirect('/home');
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.redirect('/login');
//     }
//   } else {
//     res.redirect('/login');
//   }
// });

let superHero, batManID, spiderMan;

app.get('/home', at.authentication, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    superHero = user;
    if (user) {
      // let mamamia = await cartUser.find();
      // console.log(mamamia);

      // const existingCart = await cartUser.findOne({ userId: superHero._id });

      // if (!existingCart) {
      //   cart = new cartUser({
      //     userId: superHero._id,
      //     items: [],
      //   }); 
      //   await cart.save();
      // //   batManID = newCart._id;
      // // } else {
      // //   batManID = existingCart._id;
      // // }
      // }
      let cartItem = await cartUser.findOne({ userId: req.session.userId });
      let allMenu = await Menu.find().lean()
      res.render('home', { 
        username: user.username, 
        cartItems: cartItem.items,
        menus: allMenu 
      });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/cart/add", async (req, res) => {
  const userId = req.session.userId;
  const itemId = req.body.itemId;
  const quantity = req.body.quantity;

  try {
    // Find the cart of the user
    let cart = await cartUser.findOne({ userId: userId });

    // If the cart does not exist, create a new cart for the user
    if (!cart) {
      cart = new cartUser({
        userId: userId,
        items: [],
      });
    }

    // Check if the item is already in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.itemId == itemId
    );

      console.log(existingItemIndex)
    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update its quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the item is not in the cart, add it with the specified quantity
      cart.items.push({ itemId: itemId, quantity: quantity });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).send("Item added to cart successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});



app.get('/admin', adminAuth.authenticationadmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.session.userId);
    if (admin) {
      res.render('admin');
    } else {
      res.redirect('/logadmin'); 
    }
  } catch (error) {
    console.error('Error retrieving admin:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.get("/register" ,(req,res) =>{
   return res.render('register')
 })

app.post('/register', async(req,res) => {
  // user
      const regemail = req.body.email;
      const regusername = req.body.usersname;
      const regname = req.body.name;
      const regpassword = req.body.password;

    // admin
    // const adminregemail = req.body.email;
    // const adminregusername = req.body.usersname;
    // const adminregname = req.body.name;
    // const adminregpassword = req.body.password;

    const reguser = await User.findOne({username : regusername , password : regpassword});
        if (reguser) {
        return res.redirect('login');
        } else {
        const unreguser = new User({name: regname, email: regemail, username: regusername, password: regpassword});
        unreguser.save();
        res.redirect('/login')
        }
        
      // const regadmin = await Admin.findOne({username : adminregusername , password : adminregpassword});
      //   if (regadmin) {
      //     return res.redirect('/');
      //   } else {
      //   const unregadmin = new Admin({name: adminregname, email: adminregemail, username: adminregusername, password: adminregpassword});
      //   unregadmin.save();
      //   }

})

app.post('/logout',(req,res)=>{
  req.session.destroy(function (err) {
      res.redirect('/'); 
  });
})



app.listen(3000, function () {
    console.log("Server app listening on port 3000");
});