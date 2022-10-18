const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refreshToken = new Schema({
  token: { type: String, unique: true },
});

module.exports = mongoose.model("refToken", refreshToken, "REFTOKEN");
