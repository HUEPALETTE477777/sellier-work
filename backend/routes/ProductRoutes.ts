import express, { Router } from "express";
import { getAllProducts } from "../controllers/ProductController";
 
const router: Router = express.Router();
 
router.get("/", getAllProducts);
 
export default router;