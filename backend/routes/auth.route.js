const express = require("express");
const {
  register,
  login,
  logout,
  getUserProfile,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", getUserProfile);
router.post("/logout", logout);

module.exports = router;
