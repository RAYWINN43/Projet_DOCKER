require("dotenv").config(); // ⬅️ TOUJOURS en premier

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const filmRoutes = require("./src/back/routes/film");

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Serve static files from front directory
app.use(express.static(path.join(__dirname, "src/front")));

// Routes
app.use("/api/films", filmRoutes);

// Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connecté"))
  .catch((err) => console.error("Mongo error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API up on :${PORT}`));
