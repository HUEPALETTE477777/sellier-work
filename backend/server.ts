import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/ProductRoutes";
import userRoutes from "./routes/UserRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5111;

const allowed = [
  process.env.FRONTEND_DOMAIN_LOCAL,
  process.env.FRONTEND_DOMAIN_PROD,
].filter(Boolean) as string[];

app.use(express.json());
app.use(cors({
    origin: allowed,
    credentials: true,
}));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});

export default app;
