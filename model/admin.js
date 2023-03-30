const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  
});

exports.Admin = mongoose.model("admin", adminSchema);