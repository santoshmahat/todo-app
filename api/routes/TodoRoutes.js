const TodoController = require('../controllers/TodoController');
const checkAuthorization = require('../middlewares/checkAuthorization')

module.exports = (app) => {
  // Route to create a new Todo
  app.post('/api/todos', TodoController.create)

  // Route to update a Todo
  app.post('/api/todos/:id', TodoController.update)

  // Route to fetch a Todo list
  app.delete("/api/todos/:id", TodoController.delete);

  // Route to fetch a Todo by Id
  app.get("/api/todos/:id", TodoController.getTodoById);

  // Route to fetch a Todo list
  app.get("/api/todos", checkAuthorization, TodoController.getTodoList);


}