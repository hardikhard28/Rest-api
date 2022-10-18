const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usermodel = new Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Customer",
  },
});

module.exports = mongoose.model("User", usermodel, "users");
