const Post = require("../model/post.model");

const createPost = async (req, res) => {
  try {
    const { userId } = req;
    const { content, imageUrl } = req.body;

    const newPost = await Post({
      user: userId,
      content,
      imageUrl,
    });

    await newPost.save();

    res
      .status(201)
      .json({ success: true, message: "Posts Created Successfully", newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username");
    res.status(200).json({ success: true, posts, count: posts.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePosts = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, imageUrl } = req.body;
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { content, imageUrl },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Post Updated Successfully", post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete({ _id: postId });
    res.status(200).json({
      success: true,
      message: `Post with postId: ${postId} deletedSuccessfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return res.status(500).json({
        success: false,
        message: `Post with postId: ${postId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePosts,
  deletePost,
  getPostById,
};
