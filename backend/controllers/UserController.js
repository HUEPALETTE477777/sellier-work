const pool = require("../configs/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const generateToken = require("../utils/GenerateToken");

const getAllUsers = async (req, res) => {
    try {
        const results = await pool.query(
            "SELECT * FROM users"
        )

        const userPayload = results.rows.map(user => ({
            user_id: user.user_id,
            username: user.username,
            created_at: user.created_at,
        }));

        res.status(200).json({ users: userPayload });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'INTERAL SERVER ERROR' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "UNAUTHORIZED IMMIGRANT" });
        }

        const { user_id } = req.user;
        const result = await pool.query(
            "SELECT user_id, username, email, created_at FROM users WHERE user_id = $1",
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "USER NOT FOUND" });
        }

        res.status(200).json({ user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'INTERAL SERVER ERROR' });
    }
}

const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "MISSING USERNAME, EMAIL OR PASSWORD" });
        }

        username = username.trim();
        email = email.trim();

        if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
            return res.status(400).json({ error: "INVALID EMAIL FORMAT" });
        }

        if (username.length === 0 || username.length > 20) {
            return res.status(400).json({ error: "USERNAME MUST BE BETWEEN 1 AND 20 CHARACTERS" });
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return res.status(400).json({ error: "USERNAME CAN ONLY CONTAIN LETTERS, NUMBERS, AND UNDERSCORES" });
        }

        if (password.length < 8 || !/\d/.test(password)) {
            return res.status(400).json({ error: "PASSWORD MUST BE AT LEAST 8 CHARACTERS AND CONTAIN A NUMBER" });
        }

        const userExistence = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
        if (userExistence.rows.length > 0) {
            return res.status(409).json({ error: "USERNAME OR EMAIL ALREADY EXISTS" });
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const emailToken = uuidv4();

        const result = await pool.query(
            `INSERT INTO users (username, email, password, email_verification_token)
             VALUES ($1, $2, $3, $4)
             RETURNING user_id, username, email`,
            [username, email, hashedPassword, emailToken]
        );

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const verificationLink = `${process.env.FRONTEND_DOMAIN_PROD}/verify-email/${emailToken}`;

        await transporter.sendMail({
            from: `"THE CYBOT TERRORISTS" <${process.env.EMAIL_USERNAME}>`,
            to: email,
            subject: "VERIFY THAT EMAIL",
            html: `<p>CLICK <a href="${verificationLink}">here</a> TO VERIFY DAT EMAIL</p>`
        });
        console.log("EMAIL SENT SUCCESSFULLY");

        res.status(200).json({ message: "USER CREATED!", user: result.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
    }
}

const login = async (req, res) => {
    try {
        let { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ error: "MISSING USERNAME" });
        }

        if (!password) {
            return res.status(400).json({ error: "MISSING PASSWORD" });
        }

        username = username.trim();
        const isEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(username);
        const userQuery = isEmail
            ? "SELECT * FROM users WHERE email = $1"
            : "SELECT * FROM users WHERE username = $1";

        // CANNOT USE KEYWORD 'RETURNING' WITH 'SELECT' STATEMENT
        const userExistence = await pool.query(userQuery, [username]);
        if (userExistence.rows.length === 0) {
            return res.status(404).json({ error: "ACCOUNT NOT FOUND" });
        }


        const user = userExistence.rows[0];
        if (!user.is_verified) {
            return res.status(403).json({ error: "VERIFY YOUR EMAIL BEFORE LOGGING IN" });
        }

        const passwordMatch = await bcrypt.compare(password, userExistence.rows[0].password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "WRONG PASSWORD NEGRO" });
        }

        const userPayload = {
            user_id: user.user_id,
            username: user.username,
            createdAt: user.created_at,
        }

        const token = generateToken(userPayload, res);

        return res.status(200).json({
            message: "LOGGED IN SUCCESSFULLY",
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                is_verified: user.is_verified,
                created_at: user.created_at,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.status(200).json({ message: "USER LOGGED OUT! TOKEN CLEARED!" })
    } catch (err) {
        res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
    }
}

const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE email_verification_token = $1",
            [token]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ error: "INVALID OR EXPIRED TOKEN" });
        }

        const updateResult = await pool.query(
            "UPDATE users SET is_verified = TRUE, email_verification_token = NULL WHERE email_verification_token = $1",
            [token]
        );

        res.status(200).json({ message: "EMAIL VERIFIED SUCCESSFULLY!", updateResult });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

module.exports = { getAllUsers, signup, login, getCurrentUser, verifyEmail, logout };
