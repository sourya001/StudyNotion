// Polyfill fetch for Node < 18 (required by @google/generative-ai on Render)
if (typeof globalThis.fetch === "undefined") {
  globalThis.fetch = require("node-fetch");
}

// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const chatRoute = require("./routes/Chat");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;



// Connecting to database
database.connect();
 
// CORS: allow frontend (Vercel URL from env) and localhost for dev
const allowedOrigins = process.env.FRONTEND_URL
	? process.env.FRONTEND_URL.split(",").map((o) => o.trim().replace(/\/$/, "")).filter(Boolean)
	: [];
if (!allowedOrigins.includes("http://localhost:3000")) {
	allowedOrigins.push("http://localhost:3000");
}
app.use(
	cors({
		origin: (origin, cb) => {
			if (!origin) return cb(null, true);
			const normalized = origin.replace(/\/$/, "");
			if (allowedOrigins.some((o) => o === normalized || o === origin)) {
				return cb(null, true);
			}
			cb(null, false);
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "Accept"],
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/chat", chatRoute);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Start server (Render runs Node directly; no serverless)
app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
