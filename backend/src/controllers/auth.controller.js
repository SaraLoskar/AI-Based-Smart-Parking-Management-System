import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";


export const register = async (req, res) => {
  try {
    const { name, email, password, phone, profileImage, bio, location } = req.body;

<<<<<<< HEAD
    if (!name || !email || !password || !phone ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
=======
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone number and password are required.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone: phone.trim() }],
    });

    if (existingUser) {
      if (existingUser.email.toLowerCase() === email.toLowerCase().trim()) {
        return res.status(400).json({
          success: false,
          message: "An account with this email already exists.",
        });
      }
      if (existingUser.phone === phone.trim()) {
        return res.status(400).json({
          success: false,
          message: "An account with this phone number already exists.",
        });
      }
>>>>>>> 2afa04d5f12b44fd0ff6f4c5394b610f847f9ac0
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: uuidv4(),
<<<<<<< HEAD
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
=======
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone.trim(),
>>>>>>> 2afa04d5f12b44fd0ff6f4c5394b610f847f9ac0
      profileImage: profileImage || "",
      bio: bio || "",
      location: location || "",
    });

<<<<<<< HEAD
    const safeUser = await User.findById(user._id).select("-password");

    res.status(201).json({
      success: true,
      message: "Account created",
=======
    const safeUser = await User.findById(user._id).select("-password -otp -otpExpiry");

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
>>>>>>> 2afa04d5f12b44fd0ff6f4c5394b610f847f9ac0
      user: safeUser,
    });

  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({
=======
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return res.status(400).json({
        success: false,
        message: `An account with this ${field} already exists.`,
      });
    }

    return res.status(500).json({
>>>>>>> 2afa04d5f12b44fd0ff6f4c5394b610f847f9ac0
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const safeUser = await User.findById(user._id).select("-password");

    res.json({
      success: true,
      message: "Login successful",
      user: safeUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp, 
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user.otp !== otp ||
      !user.otpExpiry ||
      user.otpExpiry < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};