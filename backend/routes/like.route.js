const express = require("express");
const { addLike, removeLike } = require("../controllers/like.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/liked/:postId", verifyToken, addLike);
router.delete("/removeLike/:postId", verifyToken, removeLike);

module.exports = router;
