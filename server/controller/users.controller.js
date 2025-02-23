const User = require("../models/User");
const utils = require("../utils");

module.exports.createUser = async (input) => {
  const user = new User(input);
  user.password = await utils.hashPassword(input.password);
  return user.save();
};

module.exports.getUser = async (id) => {
  const user = User.findById(id);
  return user;
};

module.exports.searchUser = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};
