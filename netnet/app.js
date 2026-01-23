require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const filmRoutes = require("./src/back/routes/film");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use(express.static(path.join(__dirname, "src/front")));

app.use("/api/films", filmRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connecté"))
  .catch((err) => console.error("Mongo error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API up on :${PORT}`));

app.get("/health", (req, res) => res.json({ ok: true }));

