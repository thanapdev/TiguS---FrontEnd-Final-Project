const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    _id: Number, // Reference to the user who owns the cart
    img: String,
    name: String,
    price: Number,
    description: String,
    type: String,
});

exports.Menu = mongoose.model("food", foodSchema);