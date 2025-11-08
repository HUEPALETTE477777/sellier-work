const express = require('express');
const router = express.Router();

const {
    getAllProducts
} = require("../controllers/ProductController")

router.get("/", getAllProducts)



module.exports = router;