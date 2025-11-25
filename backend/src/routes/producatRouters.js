const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uplodeMiddleware");
const { createProduct,  deleteProduct, updateProduct , getProducts, getProductById } = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddlewere");

router.get("/", protect, getProducts);     
router.get("/:id", protect, getProductById); 
router.post("/", upload.single("image"), createProduct); 
router.put("/:id", upload.single("image"), updateProduct); 
router.delete("/:id", deleteProduct);      

module.exports = router;
