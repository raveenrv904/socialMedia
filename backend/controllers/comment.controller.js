const Comment = require("../model/comment.model");

const createComment = async (req, res) => {
  try {
    const { userId } = req;
    const { postId } = req.params;
    const { content } = req.body;

    const newComment = await Comment({
      user: userId,
      post: postId,
      content,
    });
    await newComment.save();

    res.status(200).json({
      success: true,
      message: "Comment Created Successfully",
      newComment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const allComments = await Comment.find({ post: postId });

    res
      .status(200)
      .json({ success: true, allComments, count: allComments.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete({ _id: commentId });
    res.status(200).json({
      success: true,
      message: `Comment with commentId: ${commentId} Deleted Successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createComment,
  deleteComment,
  getAllComment,
};
