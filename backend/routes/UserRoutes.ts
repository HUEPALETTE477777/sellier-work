import express, { Router } from "express";
import { getAllUsers, signup, login, getCurrentUser, logout } from "../controllers/UserController";
import getUserFromToken from "../middleware/AuthMiddleware";
 
const router: Router = express.Router();
 
router.get("/", getUserFromToken, getAllUsers);
router.get("/current", getUserFromToken, getCurrentUser);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", getUserFromToken, logout);
 
export default router;
 