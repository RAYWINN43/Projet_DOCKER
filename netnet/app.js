const express = require("express");
const mongoose = require("mongoose");
const filmRoutes = require("./routes/film");

const app = express();
app.use(express.json());

// Routes
app.use("/api/films", filmRoutes);

// Mongo (exemple)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connecté"))
  .catch((err) => console.error("Mongo error:", err));

app.listen(3000, () => console.log("API up on :3000"));
