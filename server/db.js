const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/todos")
    .then(() => console.log("Connected to mongodb todos"))
    .catch((err) => console.log(err));
};

module.exports.connect = connect;
