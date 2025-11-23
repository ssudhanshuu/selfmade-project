const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uplodeMiddleware");
const { createProduct,  deleteProduct, updateProduct , getProducts, getProductById } = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddlewere");

router.get("/", protect, getProducts);       // Get all products
router.get("/:id", protect, getProductById); // Get single product
router.post("/", upload.single("image"), createProduct); // Create product
router.put("/:id", upload.single("image"), updateProduct); // Update product
router.delete("/:id", deleteProduct);       // Delete product

module.exports = router;
