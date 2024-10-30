require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connectDB");

const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const commentRouter = require("./routes/comment.route");
const likeRouter = require("./routes/like.route");
const followRouter = require("./routes/follow.route");
const messageRouter = require("./routes/message.route");

// Message Model
const Message = require("./model/message.model");

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 8080;
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/follow", followRouter);
app.use("/api/v1/messages", messageRouter);

// Socket
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

// Initialise the Socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket Connection
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Join Room
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Listen for messages and broadcast to the room
  socket.on("send_message", async (data) => {
    const { senderId, receiverId, content } = data;

    // Save message to MongoDB
    try {
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content,
      });
      await newMessage.save();

      // Emit the saved message to the receiver's room
      io.to(receiverId).emit("receive_message", {
        _id: newMessage._id,
        sender: newMessage.sender,
        receiver: newMessage.receiver,
        content: newMessage.content,
        timestamp: newMessage.createdAt,
        read: newMessage.read,
      });

      console.log("Message sent and saved:", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`Server is listening to port: ${port}`);
    });
  } catch (error) {
    console.log("Error Occured: ", error);
  }
};

start();
