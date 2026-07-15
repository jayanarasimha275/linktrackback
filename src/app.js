import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import linksRoutes from "./routes/links.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";

const app = express();

app.set("trust proxy", true);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-project.vercel.app"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Link Tracker API is running",
  });
});

app.use("/api/links", linksRoutes);
app.use("/r", trackingRoutes);

export default app;
