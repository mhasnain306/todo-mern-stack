const express = require("express");
const authController = require("../controller/auth.controller");
const utils = require("../utils");
const _ = require("lodash");
const config = require("config");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = utils.validateAuthInput(req.body);
  if (error)
    return res.status(400).json({ message: error.message });

  const user = await authController.searchUser(req.body.email);
  if (!user)
    return res
      .status(400)
      .json({ message: "Email or Password is wrong" });

  const isMatch = await utils.verifyPassword(
    req.body.password,
    user.password
  );
  if (!isMatch)
    return res
      .status(400)
      .json({ message: "Email or Password is wrong" });

  const u = _.pick(user, ["_id", "name"]);
  const token = utils.jwtToken(u);
  res
    .header("x-auth-token", token)
    .json({ message: "You are logged in" });
});
module.exports = router;
