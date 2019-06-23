const UserController = require('../controllers/UserController');
const upload = require('../middlewares/Multer');


module.exports = (app) => {
  app.post("/api/users", upload.single('avatar'), UserController.create);
  app.post("/api/users/login", UserController.login);
}