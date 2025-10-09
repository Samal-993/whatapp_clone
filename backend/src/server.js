import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

// Serve frontend build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Send index.html for any unknown route (React handles routing)
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
