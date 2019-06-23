const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("multer", file)
    var dir = "./public"
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

module.exports = upload;