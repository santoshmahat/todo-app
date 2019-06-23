const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./api/routes/TodoRoutes');
const userRoutes = require('./api/routes/UserRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use('/public',express.static('public'))

mongoose.connect("mongodb://localhost:27017/todoapp", { useNewUrlParser: true })
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

userRoutes(app);
todoRoutes(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`)
});