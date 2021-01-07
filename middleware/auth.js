const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check For Token
    if(!token)
        res.status(401).json({ msg: 'Authorization Denied'});

    try {
        // Verify Token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
    
        // Add The user From Payload
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Token Invalid' })
    }
}

module.exports = auth;