import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("API is running");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

export default app;