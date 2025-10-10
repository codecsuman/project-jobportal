import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
const __dirname = path.resolve();

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://project-jobportal-4.onrender.com", // change to process.env.FRONTEND_URL in production
  credentials: true,
};
app.use(cors(corsOptions));

// ---------- ROUTES ----------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ---------- FRONTEND BUILD ----------
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// ---------- SERVER START ----------
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at port ${PORT}`);
});

