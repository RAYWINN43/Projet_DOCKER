const mongoose = require("mongoose");
const Film = require("./models/film");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/netflixlike";

const films = [
  {
    title: "Le Seigneur des anneaux : La Communauté de l'anneau",
    publishedAt: new Date("2001-12-19"),
    synopsis: "Un hobbit entreprend une quête pour détruire un anneau maléfique.",
    thumbnailUrl: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=V75dMMIW2B4",
  },
  {
    title: "Parasite",
    publishedAt: new Date("2019-05-30"),
    synopsis: "Une famille pauvre s'immisce dans la vie d'une famille riche.",
    thumbnailUrl: "https://fr.web.img6.acsta.net/pictures/20/02/12/13/58/3992754.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
  },
  {
    title: "The Matrix",
    publishedAt: new Date("1999-03-31"),
    synopsis: "Un pirate informatique découvre la véritable nature de la réalité.",
    thumbnailUrl: "https://jeunes-vocations.catholique.fr/wp-content/uploads/sites/16/2018/12/Matrix.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
  },
  {
    title: "Interstellar",
    publishedAt: new Date("2014-11-07"),
    synopsis: "Des explorateurs voyagent à travers un trou de ver pour sauver l'humanité.",
    thumbnailUrl: "https://www.theatre-vanves.fr/wp-content/uploads/2025/04/interstellar-internet-1440x810.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
  },
  {
    title: "Inception",
    publishedAt: new Date("2010-07-16"),
    synopsis: "Un voleur infiltre les rêves.",
    thumbnailUrl: "https://i0.wp.com/shunrize.com/blog/wp-content/uploads/2010/07/Inception.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
  },
];

async function run() {
  await mongoose.connect(MONGO_URI);

  for (const f of films) {
    await Film.updateOne({ title: f.title }, { $set: f }, { upsert: true });
  }

  console.log("✅ Seed terminé :", films.length, "films");
  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error("❌ Seed error:", e);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
