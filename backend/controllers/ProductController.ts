import pool from "../configs/db";
import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};
