const jwt = require('jsonwebtoken');
const Sauce = require('../models/sauce');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;
        
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const compare = sauce.userId;
            if ( compare === userId) {
            next()
        } else {
            res.status(401).send({ message:'invalid user ID'});
          }
        })
        .catch(error => res.status(400).json({ error }));
};