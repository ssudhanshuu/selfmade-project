const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const image = req.file ? req.file.path : null;

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      image
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
        image: newUser.image,
      },
      token
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const loginUser = async (req, res) => {
  try {
   
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "This user not exist signup first" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "invalid password" });
    }

    const token = generateToken(existingUser._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        userName: existingUser.userName,
        image: existingUser.image,
      },
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createUser, loginUser };
