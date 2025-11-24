const childProduct = require("../models/childProductModel");

const createChildProduct = async (req, res) => {
  try {
    const { name, price, brand, ProductId } = req.body;
    const image = req.file ? req.file.path : null;

    if (!ProductId) {
      return res.status(400).json({
        success: false,
        message: "ProductId is required",
      });
    }

    const existProduct = await childProduct.findOne({ name });
    if (existProduct) {
      return res.status(409).json({
        success: false,
        message: "This name already exists",
      });
    }

    const product = await childProduct.create({
      name,
      price,
      brand,
      image,
      ProductId
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};


const getChildProduct = async (req, res) => {
  try {
    const products = await childProduct.find();

    
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Product Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

module.exports = { createChildProduct, getChildProduct };
