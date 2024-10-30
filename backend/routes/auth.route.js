const express = require("express");
const {
  register,
  login,
  logout,
  getUserProfile,
  getAllUsers,
} = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/profile", verifyToken, getUserProfile);
router.get("/logout", logout);

module.exports = router;
