const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, Token not provided" });
  try {
    const decoded = jwt.verify(
      token,
      process.env.todo_jwtPrivateKey
    );
    req.user = decoded;

    next();
  } catch (ex) {
    res
      .status(400)
      .json({ message: "Access denied, Invalid Token" });
  }
}

module.exports = auth;
