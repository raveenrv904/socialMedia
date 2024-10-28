require("dotenv").config();
const express = require("express");

const connectDB = require("./db/connectDB");

const authUser = require("./routes/auth.route");

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/api/v1/auth", authUser);

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
