const jwt = require('jsonwebtoken')


exports.authentication = (req, res, next) => {
  const bearHeader = req.headers['authorization']
  const token = bearHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: "invalid credential"
    })
  }

  const decodeToken = jwt.verify(token, 'keeplowkey')

  // req.user.id = decodeToken.id

  if (decodeToken.role !== 'Construction Worker') { //admin
    return res.status(403).json({
      message: "Unauthorized user"
    })
  }

  next()
}