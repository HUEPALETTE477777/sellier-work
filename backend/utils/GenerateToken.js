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

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only HTTPS in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60, // 1 HR
    });

    return token;
};

module.exports = generateToken;
