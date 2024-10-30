const express = require("express");
const {
  createComment,
  deleteComment,
  getAllComment,
} = require("../controllers/comment.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/getAllComments/:postId", getAllComment);
router.post("/createComment/:postId", verifyToken, createComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);

module.exports = router;
