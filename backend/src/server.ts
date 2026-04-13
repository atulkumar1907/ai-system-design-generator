import dotenv from "dotenv";
import path from "path";

// ✅ BULLETPROOF FIX
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import app from "./app";
import { connectDB } from "./config/db";

console.log("ENV CHECK:", process.env.MONGO_URI); // 👈 debug

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();