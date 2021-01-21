const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).send({ message:'invalid user ID'});
    } else {
      next();
    }
  } catch {
    res.status(401).send({
      error: 'Invalid request!'
    });
  }
};