import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; // ✅ import first
import path from "path";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

dotenv.config(); // ✅ call after import

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// Middlewares
app.use(express.json()); //req.body
app.use(cookieParser());


// API Routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

// Serve frontend build in production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Send index.html for React routes
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
