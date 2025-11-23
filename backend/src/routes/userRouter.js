const express = require('express');
const router = express.Router();
const upload = require("../middlewares/uplodeMiddleware"); // fixed typo
const { createUser, loginUser } = require('../controllers/userController');

// Signup route with image upload
router.post('/create', upload.single("image"), createUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
