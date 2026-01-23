require("dotenv").config();

const mongoose = require("mongoose");
const Film = require("../models/film");

const MONGO_URI = process.env.MONGO_URI;

async function run() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI manquant (mets-le dans netnet/.env ou exporte-le)");
  }

  await mongoose.connect(MONGO_URI);
  const res = await Film.deleteMany({});
  console.log(`${res.deletedCount} films supprimés`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
