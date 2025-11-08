const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");

dotenv.config()

const app = express();
const port = process.env.PORT || 6666

const allowed = [
    process.env.FRONTEND_DOMAIN_LOCAL,
    process.env.FRONTEND_DOMAIN_PROD,
];

app.use(express.json())
app.use(cors({
    origin: allowed,
    credentials: true,
}));

app.use(cookieParser());

app.use("/api/products", require("./routes/ProductRoutes"))
app.use("/api/users", require("./routes/UserRoutes"))

app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`)
})

module.exports = app;

