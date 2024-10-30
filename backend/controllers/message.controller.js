const getMessage = async (req, res) => {
  try {
    const { userId, receiverId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve messages" });
  }
};

module.exports = getMessage;
