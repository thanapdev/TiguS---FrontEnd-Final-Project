const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String
});

const foodSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  description: String,
  price: Number,
  image_url: String,
  type: String
});

const cartSchema = new mongoose.Schema({
  _id: Number,
  user_id: Number,
  items: [
      {
          food_item_id: Number,
          quantity: Number
      }
  ]
});

const orderSchema = new mongoose.Schema({
  _id: Number,
  user_id: Number,
  items: [
      {
          food_item_id: Number,
          quantity: Number
      }
  ],
  total_amount: Number,
  delivery_address: String,
  created_at: Date,
  status: String
});

exports.users = mongoose.model("users", usersSchema);

exports.food = mongoose.model("food", foodSchema);

exports.cart = mongoose.model("cart", cartSchema);

exports.order = mongoose.model("order", orderSchema); 
