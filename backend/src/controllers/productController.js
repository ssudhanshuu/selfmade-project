const Product = require("../models/producatModel");
const apiResponse = require("../utils/apiResponse");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !price) {
      return res.status(400).json(apiResponse(false, "Name & Price required"));
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
    });

    return res
      .status(201)
      .json(apiResponse(true, "Product created successfully", product));
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message));
  }
};





exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const totalPages = Math.ceil(total / limit);

   
    if (page > totalPages && totalPages !== 0) {
      return res.status(404).json({
        success: false,
        message: "Page not found"
      });
    }

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      total,
      page,
      limit,
      products,
      totalPages,
      isLastPage: page >= totalPages
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};






exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};










exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updatedData = { name, price, description };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.json({ msg: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.image) {
      fs.unlink(`uploads/${product.image}`, (err) => console.log(err));
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
