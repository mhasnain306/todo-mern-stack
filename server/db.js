const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");

const connect = () => {
  mongoose
    .connect(process.env.todo_MONGO_URI)
    .then(() => console.log("Connected to mongodb todos"))
    .catch((err) => console.log(err));
};

module.exports.connect = connect;
