const express = require("express");
const todos = require("./routes/todos");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();
const cors = require("cors");
const db = require("./db");
const config = require("config");

app.use(
  cors({
    exposedHeaders: ["x-auth-token"],
  })
);
app.use(express.json());
app.use("/api/todos", todos);
app.use("/api/users", users);
app.use("/api/auth", auth);

db.connect();
app.listen("3000", () => console.log("listening on port 3000"));
