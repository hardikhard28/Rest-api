const multer = require("multer");
const Product = require("../Model/product");
const lol = {
  async store(req, res, next) {
    // Multipart form data
    res.send("lolololol")
  },
};
module.exports = { lol };
