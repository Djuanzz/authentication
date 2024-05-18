import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/router.js";
import { userRouter, psikologRouter } from "./routes/api.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use("/api", router);
app.use("/api", userRouter);
app.use("/api", psikologRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} | http://localhost:${process.env.PORT}/`
  );
});
