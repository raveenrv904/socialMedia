require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connectDB");

const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const commentRouter = require("./routes/comment.route");

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8080;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening to port: ${port}`);
    });
  } catch (error) {
    console.log("Error Occured: ", error);
  }
};

start();
