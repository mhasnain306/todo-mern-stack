const express = require("express");
const utils = require("../utils");
const userController = require("../controller/users.controller");
const _ = require("lodash");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = utils.validateCreateUserInput(req.body);
  if (error)
    return res.status(400).json({ message: error.message });

  let user = await userController.searchUser(req.body.email);
  if (user)
    return res.status(400).json({
      message: "User with the email is already registered",
    });

  user = await userController.createUser(req.body);
  const u = _.pick(user, ["_id", "name"]);
  const token = utils.jwtToken(u);
  res
    .header("x-auth-token", token)
    .json(_.pick(user, ["_id", "name", "email"]));
});

router.get("/:id", async (req, res) => {
  const isIdValid = utils.validateObjectId(req.params.id);
  if (!isIdValid)
    return res.status(400).json({ message: "ID is not valid" });
  const user = await userController.getUser(req.params.id);
  if (!user)
    return res.status(404).json({ message: "User not found" });
  res.json(user);
});

module.exports = router;
