const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      get: (image) => {
        return `localhost:3000/${image}`;
      },
    },
  },
  { toJSON: { getters: true }, id:false }
  
);

module.exports = mongoose.model("Product", productModel, "products");
