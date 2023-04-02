const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
      userId: String, // Reference to the user who owns the cart
      items: [
        {
          itemId: String,
          quantity: Number,
        },
      ],
    });

exports.cartUser = mongoose.model("cart",cartSchema);