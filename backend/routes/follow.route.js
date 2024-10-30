const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { addFollow, removeFollow } = require("../controllers/follow.controller");

const router = express.Router();

router.post("/addFollow", verifyToken, addFollow);
router.delete("/removeFollow", verifyToken, removeFollow);

module.exports = router;
