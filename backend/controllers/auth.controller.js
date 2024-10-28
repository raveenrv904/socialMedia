const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookies = require("../utils/generateTokenAndSetCookies");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("Required Username, Email, and Password");
    }

    const emailAlreadyExist = await User.findOne({ email });
    const userAlreadyExist = await User.findOne({ username });

    if (emailAlreadyExist) {
      return res
        .status(500)
        .json({ success: false, message: "Email Already Exist, Please login" });
    }
    if (userAlreadyExist) {
      return res
        .status(500)
        .json({ success: false, message: "Username Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    generateTokenAndSetCookies(res, newUser._id);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  res.send("Login User");
};

const getUserProfile = async (req, res) => {
  res.send("User Profile");
};

const logout = async (req, res) => {
  res.send("Logout user");
};

module.exports = {
  register,
  login,
  logout,
  getUserProfile,
};
