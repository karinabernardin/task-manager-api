const jwt = require('jsonwebtoken');
const User = require('../models/user');

// middleware definition
const auth = async (req, res, next) => {
    try {
        const providedToken = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(providedToken, 'secret');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': providedToken });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth;