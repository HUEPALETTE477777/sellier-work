const jwt = require("jsonwebtoken");

const generateToken = (user, res) => {
    const payload = {
        user_id: user.user_id,
        username: user.username,
        createdAt: user.createdAt,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // TRUE IN PROD
        maxAge: 1000 * 60 * 60 // 1 HOUR
    });

    return token;
};

module.exports = generateToken;
