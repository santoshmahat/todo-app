const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  gender:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  role:{
    type:String
  },
  avatar:{
    type:String,
    require:true
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  updatedAt:{
    type:Date
  } 
});

const User = mongoose.model("users", userSchema);
module.exports = User;