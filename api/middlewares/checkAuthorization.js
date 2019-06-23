const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log("headerrrrrrrrrrrr", req.headers)
  const { authorization:token } = req.headers
  jwt.verify(token, 'imsecretkey', (error, decodedToken )=> {
    if(error){
      return res.status(403).json({message:'Authorization failed', error})
    }
    req.user = decodedToken;
    next();
  })

}