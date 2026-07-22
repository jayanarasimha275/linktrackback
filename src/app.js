import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import dashboardRoutes from "./routes/dashboard.routes.js";
import linksRoutes from "./routes/links.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

console.log("🚀 APP VERSION: CORS DEBUG V2");

app.set("trust proxy", true);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("Origin:", req.headers.origin);
  next();
});

app.use(
  cors({
    origin(origin, callback) {
      console.log("Incoming Origin:", origin);

      // Allow requests without Origin (browser URL, curl, Postman)
      if (!origin) {
        console.log("Allowed: No Origin");
        return callback(null, true);
      }

      // Allow localhost
      if (origin === "http://localhost:3000") {
        console.log("Allowed localhost");
        return callback(null, true);
      }

      // Allow ALL Vercel deployments
      if (origin.endsWith(".vercel.app")) {
        console.log("Allowed Vercel:", origin);
        return callback(null, true);
      }

      console.log("Blocked:", origin);
      return callback(new Error(`Origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
console.log("✅ Auth routes loaded");
app.use("/api/auth", authRoutes);
app.use("/api/links", linksRoutes);
app.use("/r", trackingRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
