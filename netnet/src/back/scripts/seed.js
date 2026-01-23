const mongoose = require("mongoose");
const Film = require("../models/film");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/netflixlike";

const films = [
  {
    title: "Le Seigneur des anneaux : La Communauté de l'anneau",
    publishedAt: new Date("2001-12-19"),
    synopsis: "Un hobbit entreprend une quête pour détruire un anneau maléfique.",
    thumbnailUrl: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL.jpg",
    trailerUrl: "https://www.youtube.com/embed/V75dMMIW2B4",
  },
  {
    title: "Parasite",
    publishedAt: new Date("2019-05-30"),
    synopsis: "Une famille pauvre s'immisce dans la vie d'une famille riche.",
    thumbnailUrl: "https://fr.web.img6.acsta.net/pictures/20/02/12/13/58/3992754.jpg",
    trailerUrl: "https://www.youtube.com/embed/5xH0HfJHsaY",
  },
  {
    title: "The Matrix",
    publishedAt: new Date("1999-03-31"),
    synopsis: "Un pirate informatique découvre la véritable nature de la réalité.",
    thumbnailUrl: "https://jeunes-vocations.catholique.fr/wp-content/uploads/sites/16/2018/12/Matrix.jpg",
    trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
  },
  {
    title: "Interstellar",
    publishedAt: new Date("2014-11-07"),
    synopsis: "Des explorateurs voyagent à travers un trou de ver pour sauver l'humanité.",
    thumbnailUrl: "https://www.theatre-vanves.fr/wp-content/uploads/2025/04/interstellar-internet-1440x810.jpg",
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    title: "Inception",
    publishedAt: new Date("2010-07-16"),
    synopsis: "Un voleur infiltre les rêves.",
    thumbnailUrl: "https://i0.wp.com/shunrize.com/blog/wp-content/uploads/2010/07/Inception.jpg",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    title: "Avatar 3",
    publishedAt: new Date("2010-07-16"),
    synopsis: "Quelques semaines après les événements relatés dans AVATAR : LA VOIE DE L’EAU… Jake Sully et sa famille vivent toujours parmi les Metkayina, à proximité d’un magnifique récif de corail de la planète Pandora. Ils doivent apprendre à surmonter la perte de Neteyam, tué au cours d’un violent affrontement avec le « Peuple du ciel » de la RDA (Resources Development Administration). Jake, Neytiri, Lo’ak, Tuk, Spider et Kiri sont confrontés, chacun à leur manière, à une forme de deuil. Même si Spider s’est parfaitement adapté au mode de vie des Metkayina, ses proches craignent pour sa sécurité et comprennent qu’il ne peut plus rester auprès d’eux. Aussi, lorsque les Sully font la connaissance des Tlalim - un peuple pacifique et nomade connu sous le nom de « Marchands du Vent », qui sillonne les airs pour se déplacer - ils le confient à leur chef Peylak afin qu’il le ramène au High Camp, le bastion des Omatikaya. Mais bientôt, toute la famille finit par accompagner Spider et les Marchands du Vent dans leur périple. Malheureusement, leur voyage est brutalement interrompu lorsqu’ils sont attaqués par des membres des Mangkwan, le peuple des Cendres, dirigés par Varang. La destruction de leur territoire par un volcan a profondément bouleversé le mode de vie et les traditions des Mangkwan qui tiennent Eywa - la Grande Mère de Pandora - responsable de la catastrophe. Pendant ce temps, la RDA, qui a subi une défaite cuisante après son affrontement avec Jake Sully et les Metkayina, tente de reconstituer ses forces avant de programmer sa prochaine offensive…",
    thumbnailUrl: "https://cdn.koddmagazine.com/media/mg/images/2025/12/avatar-critique-cinema-kodd-magazine.jpg",
    trailerUrl: "https://www.youtube.com/embed/nb_fFj_0rq8",
  },
  {
  title: "Fight Club",
  publishedAt: new Date("1999-10-15"),
  synopsis: "Un employé insomniaque et un vendeur de savon charismatique fondent un club de combat clandestin.",
  thumbnailUrl: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
  trailerUrl: "https://www.youtube.com/embed/qtRKdVHc-cE",
},
{
  title: "Gladiator",
  publishedAt: new Date("2000-05-05"),
  synopsis: "Un général romain trahi revient à Rome pour se venger dans l'arène.",
  thumbnailUrl: "https://www.studioremarkable.com/wp-content/uploads/2000/05/Gladiator-Still.jpg",
  trailerUrl: "https://www.youtube.com/embed/owK1qxDselE",
},
{
  title: "Joker",
  publishedAt: new Date("2019-10-04"),
  synopsis: "Un comédien raté sombre dans la folie et devient un criminel emblématique de Gotham.",
  thumbnailUrl: "https://fr.web.img6.acsta.net/pictures/19/09/03/12/02/4765874.jpg",
  trailerUrl: "https://www.youtube.com/embed/zAGVQLHvwOY",
},
{
  title: "Pulp Fiction",
  publishedAt: new Date("1994-10-14"),
  synopsis: "Des destins criminels s'entrecroisent dans le Los Angeles des années 90.",
  thumbnailUrl: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
  trailerUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY",
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
