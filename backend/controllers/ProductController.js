const pool = require("../configs/db");

const getAllProducts = async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'INTERAL SERVER ERROR' });
    }
};

const createProduct = async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'INTERAL SERVER ERROR' });
    }
};

module.exports = { getAllProducts, createProduct };
