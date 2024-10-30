const Post = require("../model/post.model");

const addLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const post = await Post.findById({ _id: postId });
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Liked Successfully", post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await Post.findById({ _id: postId });

    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res
      .status(200)
      .json({ success: true, message: "Like Removed Successfully", post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addLike,
  removeLike,
};
