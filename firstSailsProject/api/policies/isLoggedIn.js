/* eslint-disable indent */
// const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        // console.log(token);
        const secret = 'hello';
        const decodedToken = await sails.helpers.verifyToken.with({
            // eslint-disable-next-line indent
            token: token,
            secret: secret
        });
        console.log(decodedToken);
        return next();

    } catch (error) {
        // console.log(error);
        if (error.code === 'expired') {
            // console.log(error);
            return next();
        } else {
            return res.status(401).json({ error: 'Authentication failed he' });
        }
    }

};
