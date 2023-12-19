const { StatusCodes } = require('http-status-codes');
const { decodeToken } = require('../utils/jwt');

module.exports = function authorize(req, res, next) {
    const accessToken = req.headers['Authorization'];
    if (!accessToken) {
        return res.status(StatusCodes.FORBIDDEN).json({message: 'No credentials sent!'})
    }

    if (!accessToken.startsWith('Bearer ')) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid authorization!' })
    }

    const token = accessToken.split(' ')[1];

    // this below maybe changed in the future
    try {
        const { id } = decodeToken(token);
        req.auth = {
            user: { id },
            accessToken
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }

}