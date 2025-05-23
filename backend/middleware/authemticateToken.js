const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // decoded contains {email, role, etc}
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token!' });
    }
};

module.exports = verifyToken;
