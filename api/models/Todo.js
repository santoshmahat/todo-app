const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },

  date: {
    type: Date
  },

  createdAt: {
    type: Date,
    default:Date.now()
  },
  updateAt:{
    type:Date
  }
})

const Todo = mongoose.model("todos",todoSchema);

module.exports = Todo;