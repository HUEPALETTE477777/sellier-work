import jwt from "jsonwebtoken";
import pool from "../configs/db";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
    user_id: string;
}

interface AuthenticatedRequest extends Request {
    user?: {
        user_id: string;
        role: string;
    };
}

const getUserFromToken = async ( req: AuthenticatedRequest, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const token: string | undefined = req.cookies.jwt;

        if (!token) {
            res.status(401).json({ message: "NO TOKEN PROVIDED" });
            return;
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        if (!decodedToken) {
            res.status(401).json({ message: "UNAUTHORIZED" });
            return;
        }

        const user = await pool.query(
            "SELECT user_id FROM users WHERE user_id = $1",
            [decodedToken.user_id]
        );

        if (!user || user.rows.length === 0) {
            res.status(404).json({ message: "USER NOT FOUND" });
            return;
        }

        req.user = user.rows[0]; // ATTACH USER TO REQ OBJECT 'req.user'
        next(); // PASS CONTROL TO NEXT ROUTE/MIDDLEWARE, NO RESPONSES
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next(); // PASS CONTROL TO NEXT ROUTE/MIDDLEWARE, NO RESPONSES
    } else {
        res.status(403).json({ error: "FORBIDDEN: ADMIN ACCESS REQUIRED" });
    }
};

export default getUserFromToken;