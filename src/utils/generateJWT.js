const jwt = require('jsonwebtoken');
const secretKey = require('../utils/secretKey');

const generateJWT = (id) => {
    return jwt.sign({ id }, secretKey, { expiresIn: '30m' });
};

module.exports = generateJWT;