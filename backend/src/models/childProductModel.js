const mongoose = require("mongoose");
const Product = require('./producatModel')
const childProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    image: {  
      type: String,
      default: null
    },
    ProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("childProduct", childProductSchema);
