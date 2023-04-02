const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      itemId: String,
    //   name: String,
    //   price: Number,
      quantity: Number,
    //   image: String,
    },
  ],
  orderDate: Date,
  status: String,
});

exports.Order = mongoose.model("order", orderSchema);