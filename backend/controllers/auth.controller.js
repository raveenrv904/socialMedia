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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Required Email, and Password");
    }

    const user = await User.findOne({ email });

    const comparePassword = bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Credentials" });
    }

    generateTokenAndSetCookies(res, user._id);

    res.status(201).json({
      success: true,
      message: "LoggedIn Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const profileUser = await User.findOne({ _id: userId });
    if (!profileUser) {
      return res.status(500).json({
        success: false,
        message: "Profile with provided userId does not exists",
      });
    }

    res.status(200).json({
      success: true,
      message: "User",
      user: { ...profileUser._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(201).json({
      success: true,
      users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out Successfully" });
};

module.exports = {
  register,
  login,
  logout,
  getUserProfile,
  getAllUsers,
};
