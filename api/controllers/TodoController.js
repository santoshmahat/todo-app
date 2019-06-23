const Todo = require('../models/Todo');

module.exports = {
  create: (req, res) => {
    const { title, description, date } = req.body;
    const newtodo = new Todo({ title, description, date });
    console.log("create body", req.body)
    newtodo.save()
      .then((todo) => {
        return res.status(200).json({ message: "success", todo })
      }).catch((error) => {
        res.status(400).json({ message: "failed", error })
      })

  },

  update: (req, res) => {
    const { id } = req.params;
    console.log("update id", id)
    const { title, description, date } = req.body;
    Todo.findById(id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ message: "Todo not found for the give Id" })
        }
        todo.title = title;
        todo.description = description;
        todo.date = date;
        todo.updateAt = Date.now();
        todo.save()
          .then((newtodo) => {
            res.status(200).json({ message: "success", todo: newtodo })
          })
      }).catch((error) => {
        return res.status(404).json({ message: "failed", error })
      })
  },

  delete: (req, res) => {
    const { id } = req.params;
    Todo.findByIdAndDelete(id)
      .then((todo) => {
        res.status(200).json({ message: "success", todo })
      }).catch((error) => {
        res.status(400).json({ message: "failed", error })
      })
  },

  getTodoList: (req, res) => {
    console.log("getTodoList", req.user)
    Todo.find({})
      .then((todos) => {
        res.status(200).json({ message: "success", todos })
      }).catch((error) => {
        res.status(400).json({ message: "failed", error })
      })
  },

  getTodoById: (req, res) => {
    const { id } = req.params;
    Todo.findById(id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ message: "Todo not found for given Id" })
        }
        return res.status(200).json({ message: "success", todo })
      }).catch((error) => {
        res.status(400).json({ message: "failed", error })
      })
  }
}