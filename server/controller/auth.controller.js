const User = require("../models/User");

module.exports.searchUser = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};
