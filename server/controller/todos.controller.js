const Todo = require("../models/Todo");
module.exports.createTodo = (todoInput, user) => {
  const newTodo = {
    user: {
      _id: user._id,
      name: user.name,
    },
    ...todoInput,
  };
  const todo = new Todo(newTodo);

  return todo.save();
};

module.exports.getAll = (user) => {
  return Todo.find({ "user._id": user._id });
};

module.exports.getOne = (id, user) => {
  return Todo.findOne({ _id: id, "user._id": user._id });
};

module.exports.update = async (id, user, todo) => {
  const existingTodo = await module.exports.getOne(id, user);
  if (!existingTodo) return null;
  return Todo.findByIdAndUpdate(
    id,
    {
      content: todo.content,
      completed: todo.completed,
    },
    { new: true, runValidators: true }
  );
};

module.exports.delete = async (id, user) => {
  const existingTodo = await module.exports.getOne(id, user);
  if (!existingTodo) return null;
  return Todo.findByIdAndDelete(id);
};
