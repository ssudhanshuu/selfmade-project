const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");


    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(user.email, `Password Reset Link: ${resetUrl}`);

    return res.json({ msg: "Reset email sent" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Token invalid or expired" });

  
    user.password = await bcrypt.hash(req.body.password, 10);

  
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.json({ msg: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
