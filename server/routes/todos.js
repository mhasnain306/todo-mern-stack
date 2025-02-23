const express = require("express");
const utils = require("../utils");
const auth = require("../middleware/auth");
const todoController = require("../controller/todos.controller");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = utils.validateTodoCreationInput(req.body);
  if (error)
    return res.status(400).json({ message: error.message });
  res.json(await todoController.createTodo(req.body, req.user));
});

router.get("/", auth, async (req, res) => {
  res.json(await todoController.getAll(req.user));
});

router.get("/:id", auth, async (req, res) => {
  const isIdValid = utils.validateObjectId(req.params.id);
  if (!isIdValid)
    return res.status(400).json({ message: "Invalid ID" });
  const todo = await todoController.getOne(
    req.params.id,
    req.user
  );
  if (!todo)
    return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

router.put("/:id", auth, async (req, res) => {
  const isIdValid = utils.validateObjectId(req.params.id);
  if (!isIdValid)
    return res.status(400).json({ message: "Invalid ID" });
  const { error } = utils.validateTodoUpdateInput(req.body);
  if (error)
    return res.status(400).json({ message: error.message });

  const updatedtodo = await todoController.update(
    req.params.id,
    req.user,
    req.body
  );
  if (!updatedtodo)
    return res.status(404).json({ message: "Todo not found" });

  res.json(updatedtodo);
});

router.delete("/:id", auth, async (req, res) => {
  const isIdValid = utils.validateObjectId(req.params.id);
  if (!isIdValid)
    return res.status(400).json({ message: "Invalid ID" });
  const deletedTodo = await todoController.delete(
    req.params.id,
    req.user
  );
  if (!deletedTodo)
    return res.status(404).json({ message: "Todo not found" });
  res.json(deletedTodo);
});

module.exports = router;
