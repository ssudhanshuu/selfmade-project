const express = require('express');
const router = express.Router();
const upload = require("../middlewares/uplodeMiddleware"); // fixed typo
const { createUser, loginUser } = require('../controllers/userController');

router.post('/create', upload.single("image"), createUser);

router.post('/login', loginUser);

module.exports = router;
