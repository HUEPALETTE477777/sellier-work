const jwt = require("jsonwebtoken");
const pool = require("../configs/db");

const getUserFromToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
         if (!token) {
            return res.status(401).json({ message: "NO TOKEN PROVIDED" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ message: "UNAUTHORIZED AKBAR"})
        }

        const user = await pool.query(
            "SELECT user_id FROM users WHERE user_id = $1",
            [decodedToken.user_id]
        )

        if (!user) {
            return res.status(404).json({ message: "USER NOT FOUND" });
        }

        req.user = user.rows[0];  // ATTACH USER TO REQ OBJECT 'req.user'
        next();  // PASS CONTROL TO NEXT ROUTE/MIDDLEWARE, NO RESPONSES
    } catch (err) {
        console.error(err)
    }
};

module.exports = getUserFromToken;
