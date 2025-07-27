import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./MongoDB/connect.js";
import aiImageRoutes from "./routes/aiImageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/AiIMAGE", aiImageRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", async (req, res) => {
  res.send("Hello From Tanisha");
});

const StartServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("server is running on Localhost:8080");
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer();
