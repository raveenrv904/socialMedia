const User = require("../model/user.model");

const addFollow = async (req, res) => {
  const { userId } = req;
  const { followeeId } = req.body;
  try {
    const followee = await User.findById({ _id: followeeId });
    const follower = await User.findById({ _id: userId });

    if (!followee || !follower)
      return res.status(404).json({ message: "User not found" });

    if (followee.followers.includes(followerId))
      return res.status(400).json({ message: "Already following this user" });

    followee.followers.push(followerId);
    follower.following.push(followeeId);

    await followee.save();
    await follower.save();

    res.status(200).json({ message: "Successfully followed the user" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFollow = async (req, res) => {
  const { userId } = req;
  const { followeeId } = req.body;
  try {
    const followee = await User.findById({ _id: followeeId });
    const follower = await User.findById({ _id: userId });

    if (!followee || !follower)
      return res.status(404).json({ message: "User not found" });
    if (!followee.followers.includes(followerId))
      return res
        .status(400)
        .json({ message: "You are not following this user" });

    followee.followers = followee.followers.filter(
      (id) => id.toString() !== followerId
    );
    follower.following = follower.following.filter(
      (id) => id.toString() !== followeeId
    );

    await followee.save();
    await follower.save();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addFollow,
  removeFollow,
};
