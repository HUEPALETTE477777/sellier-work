import pool from "../configs/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import generateToken from "../utils/GenerateToken";

interface UserPayload {
    user_id: string;
    username: string;
    role: string;
    created_at: Date;
}

interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const results = await pool.query("SELECT * FROM users");

        const userPayload = results.rows.map((user: UserPayload) => ({
            user_id: user.user_id,
            username: user.username,
            role: user.role,
            created_at: user.created_at,
        }));

        res.status(200).json({ users: userPayload });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "UNAUTHORIZED" });
            return;
        }

        const { user_id } = req.user;
        const result = await pool.query(
            "SELECT user_id, username, role, created_at FROM users WHERE user_id = $1",
            [user_id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: "USER NOT FOUND" });
            return;
        }

        res.status(200).json({ user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        let { username, password } : { username: string; password: string } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: "MISSING USERNAME OR PASSWORD" });
            return;
        }

        const userExistence = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExistence.rows.length > 0) {
            res.status(409).json({ error: "USERNAME ALREADY EXISTS" });
            return;
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            `INSERT INTO users (username, password, role)
             VALUES ($1, $2, 'customer')
             RETURNING user_id, username, role, created_at`,
            [username, hashedPassword]
        );

        const newUser = result.rows[0];

        const userPayload: UserPayload = {
            user_id: newUser.user_id,
            username: newUser.username,
            role: newUser.role,
            created_at: newUser.created_at,
        };

        const token = generateToken(userPayload, res);

        res.status(201).json({
            message: "USER CREATED AND LOGGED IN!",
            token,
            user: userPayload
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        let { username, password }: { username: string; password: string } = req.body;

        if (!username) {
            res.status(400).json({ error: "MISSING USERNAME" });
            return;
        }

        if (!password) {
            res.status(400).json({ error: "MISSING PASSWORD" });
            return;
        }

        username = username.trim();

        const userExistence = await pool.query(
            "SELECT user_id, username, role, password, created_at FROM users WHERE username = $1",
            [username]
        );
        if (userExistence.rows.length === 0) {
            res.status(404).json({ error: "ACCOUNT NOT FOUND" });
            return;
        }

        const user = userExistence.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: "WRONG PASSWORD" });
            return;
        }

        const userPayload: UserPayload = {
            user_id: user.user_id,
            username: user.username,
            role: user.role,
            created_at: user.created_at,
        };

        const token = generateToken(userPayload, res);

        res.status(200).json({
            message: "LOGGED IN SUCCESSFULLY",
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                role: user.role,
                created_at: user.created_at,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.status(200).json({ message: "USER LOGGED OUT! TOKEN CLEARED!" });
    } catch (err) {
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};