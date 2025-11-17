const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uplodeMiddleware");
const { createProduct,  deleteProduct, updateProduct , getProducts, getProductById } = require("../controllers/productController");

router.post("/create", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id",getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
