const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const objId = require("joi-objectid");

Joi.objectId = objId(Joi);

module.exports.validateTodoCreationInput = (todo) => {
  const schema = Joi.object({
    content: Joi.string().required().min(5).max(500),
  });

  return schema.validate(todo);
};

module.exports.validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports.validateTodoUpdateInput = (todo) => {
  const schema = Joi.object({
    content: Joi.string().required().min(5).max(500),
    completed: Joi.boolean().required(),
  });
  return schema.validate(todo);
};

module.exports.validateCreateUserInput = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(1024),
  });

  return schema.validate(user);
};

module.exports.validateAuthInput = (input) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(input);
};

module.exports.verifyPassword = async (
  password,
  hashedPassword
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

module.exports.jwtToken = (input) => {
  return jwt.sign(input, config.get("jwtPrivateKey"));
};

module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
