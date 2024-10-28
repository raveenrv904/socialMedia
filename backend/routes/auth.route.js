const express = require("express");
const {
  register,
  login,
  logout,
  getUserProfile,
  getAllUsers,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/profile/:id", getUserProfile);
router.post("/logout", logout);

module.exports = router;
