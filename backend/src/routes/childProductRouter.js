const express = require('express');
const { getChildProduct, createChildProduct } = require('../controllers/productChildController');
const upload = require('../middlewares/uplodeMiddleware');
const childProduct = require("../models/childProductModel");
const childProductrouter = express.Router();
childProductrouter.get("/:ProductId", async (req, res) => {
  try {
    const { ProductId } = req.params;
    const childs = await childProduct.find({ ProductId });

    return res.status(200).json({
      success: true,
      data: childs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

childProductrouter.post('/create',upload.single("image"),createChildProduct);

module.exports=childProductrouter;