const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    signup,
    login,
    getCurrentUser,
    verifyEmail,
    logout,
} = require("../controllers/UserController")

const getUserFromToken = require('../middleware/AuthMiddleware.js'); 

router.get("/", getUserFromToken, getAllUsers)

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", getUserFromToken, logout)

router.get("/current", getUserFromToken, getCurrentUser)
router.get('/verify-email/:token', verifyEmail);


module.exports = router;