require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.mongoURL);
const connection = mongoose.connect(process.env.mongoURL);

module.exports = {
  connection,
};
