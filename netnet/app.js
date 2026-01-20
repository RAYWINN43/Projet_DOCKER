require("dotenv").config(); // ⬅️ TOUJOURS en premier

const express = require("express");
const mongoose = require("mongoose");
const filmRoutes = require("./src/routes/film");

const app = express();
app.use(express.json());

// Routes
app.use("/api/films", filmRoutes);

// Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connecté"))
  .catch((err) => console.error("Mongo error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API up on :${PORT}`));
