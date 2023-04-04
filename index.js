require("dotenv").config();
const express = require("express");
const { connection } = require("mongoose");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routers/Users.routes");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.use("/users", userRouter);

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Can't connect to DB");
  }

  console.log("Server runnig at port", process.env.PORT);
});
