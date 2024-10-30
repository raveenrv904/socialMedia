const express = require("express");
const {
  createPost,
  getAllPosts,
  updatePosts,
  deletePost,
  getPostById,
} = require("../controllers/post.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/createPost", verifyToken, createPost);
router.get("/getAllPosts", getAllPosts);
router.put("/updatePost/:postId", verifyToken, updatePosts);
router.delete("/deletePost/:postId", verifyToken, deletePost);
router.get("/getPostById/:postId", getPostById);

module.exports = router;
