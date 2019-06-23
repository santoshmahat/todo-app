const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: (req, res) => {
    const { firstName, lastName, gender, role, email, password, avatar } = req.body;
    console.log("file", req.file)
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          return res.status(409).json({ message: "failed", email: "Email already exists" })
        }
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(400).json({ message: "failed", error })
          }
          const user = new User({
            firstName,
            lastName,
            email,
            gender,
            role,
            password: hash,
            avatar: req.file.path
          })
          user.save()
            .then((user) => {
              res.status(200).json({ message: "success", user })
            })
        })
      }).catch((error) => {
        res.status(400).json({ message: "failed", error })
      })
  },

  login: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "failed", email: "Email doesn't exist" })
        }
        bcrypt.compare(password, user.password, (error, match) => {
          if (!match) {
            return res.status(400).json({ message: "failed", password:"Password doesn't match" })
          }
          jwt.sign(
            {
              id: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              avatar: user.avatar
            },
            'imsecretkey',
            (error, token) => {
              if (error) {
                return res.status(400).json({ message: "failed", error })
              }
              res.status(200).json({ message: "success", token })
            }
          )

        });
      })
  }
}