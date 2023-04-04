const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  res.send("All users");
});

userRouter.post("/register", async (req, res) => {
  let payload = req.body;
  console.log(payload);
  try {
    bcrypt.hash(payload.password, 5, async (err, hash) => {
      if (err) {
        res.send({ mssg: "Registration failed", err: err.message });
      } else {
        let user = new UserModel({ ...payload, password: hash });
        await user.save();
        res.send({ mssg: "Registration successfull" });
      }
    });

    res.send({ mssg: "Registration successfull" });
  } catch (err) {
    res.send({ mssg: "Registration failed", err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await UserModel.find({ email });
    // console.log(user);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ mssg: "Login successfull", token: token });
        } else {
          res.send({ mssg: "Wrong credentials" });
        }
      });
    } else {
      res.send({ mssg: "Wrong credentials" });
    }
  } catch (err) {
    res.send({ mssg: "Login failed", err: err.message });
  }
});

module.exports = {
  userRouter,
};
