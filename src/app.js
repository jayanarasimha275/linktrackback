import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import linksRoutes from "./routes/links.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";

const app = express();

app.set("trust proxy", true);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin (e.g. browser URL bar, curl)
      if (!origin) return callback(null, true);

      // Allow localhost and any Vercel deployment
      if (
        origin === "http://localhost:3000" ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);

      callback(new Error(`Origin ${origin} not allowed`));
    },
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
