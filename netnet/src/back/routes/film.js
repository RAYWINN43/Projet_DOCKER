const express = require("express");
const router = express.Router();
const Film = require("../models/film");


function isValidHttpUrl(str) {
  if (typeof str !== "string") return false;
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isLikelyYouTubeUrl(str) {
  if (!isValidHttpUrl(str)) return false;
  try {
    const u = new URL(str);
    const host = u.hostname.replace("www.", "");
    return (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be" ||
      host === "youtube-nocookie.com"
    );
  } catch {
    return false;
  }
}

function validateFilmPayload(payload, { partial = false } = {}) {
  const errors = [];

  const fields = ["title", "publishedAt", "synopsis", "thumbnailUrl", "trailerUrl"];

  if (!partial) {
    for (const f of fields) {
      if (payload[f] === undefined || payload[f] === null || payload[f] === "") {
        errors.push(`Champ manquant: ${f}`);
      }
    }
  }

  if (payload.title !== undefined && typeof payload.title !== "string") {
    errors.push("title doit être une string");
  }

  if (payload.synopsis !== undefined && typeof payload.synopsis !== "string") {
    errors.push("synopsis doit être une string");
  }

  if (payload.publishedAt !== undefined) {
    const d = new Date(payload.publishedAt);
    if (Number.isNaN(d.getTime())) errors.push("publishedAt doit être une date valide");
  }

  if (payload.thumbnailUrl !== undefined && !isValidHttpUrl(payload.thumbnailUrl)) {
    errors.push("thumbnailUrl doit être une URL http(s) valide");
  }

  if (payload.trailerUrl !== undefined && !isLikelyYouTubeUrl(payload.trailerUrl)) {
    errors.push("trailerUrl doit être une URL YouTube valide");
  }

  return errors;
}

/**
 * ✅ GET /api/films
 * Afficher les trailers + description (liste)
 */
router.get("/", async (req, res) => {
  try {
    const films = await Film.find().sort({ createdAt: -1 });
    res.json({ count: films.length, films });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

/**
 * ✅ GET /api/films/:id
 * Afficher un film (détails)
 */
router.get("/:id", async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: "Film introuvable" });
    res.json(film);
  } catch (err) {
    res.status(400).json({ message: "ID invalide", error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const errors = validateFilmPayload(req.body, { partial: false });
    if (errors.length) return res.status(400).json({ message: "Payload invalide", errors });

    const film = await Film.create({
      title: req.body.title.trim(),
      publishedAt: new Date(req.body.publishedAt),
      synopsis: req.body.synopsis.trim(),
      thumbnailUrl: req.body.thumbnailUrl.trim(),
      trailerUrl: req.body.trailerUrl.trim(),
    });

    res.status(201).json(film);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const errors = validateFilmPayload(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ message: "Payload invalide", errors });

    const update = {};
    if (req.body.title !== undefined) update.title = req.body.title.trim();
    if (req.body.publishedAt !== undefined) update.publishedAt = new Date(req.body.publishedAt);
    if (req.body.synopsis !== undefined) update.synopsis = req.body.synopsis.trim();
    if (req.body.thumbnailUrl !== undefined) update.thumbnailUrl = req.body.thumbnailUrl.trim();
    if (req.body.trailerUrl !== undefined) update.trailerUrl = req.body.trailerUrl.trim();

    const film = await Film.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!film) return res.status(404).json({ message: "Film introuvable" });
    res.json(film);
  } catch (err) {
    res.status(400).json({ message: "Requête invalide", error: err.message });
  }
});

/**
 * ✅ PATCH /api/films/:id
 * (Optionnel) Modifier partiellement — utile côté front
 */
router.patch("/:id", async (req, res) => {
  try {
    const errors = validateFilmPayload(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ message: "Payload invalide", errors });

    const update = {};
    if (req.body.title !== undefined) update.title = req.body.title.trim();
    if (req.body.publishedAt !== undefined) update.publishedAt = new Date(req.body.publishedAt);
    if (req.body.synopsis !== undefined) update.synopsis = req.body.synopsis.trim();
    if (req.body.thumbnailUrl !== undefined) update.thumbnailUrl = req.body.thumbnailUrl.trim();
    if (req.body.trailerUrl !== undefined) update.trailerUrl = req.body.trailerUrl.trim();

    const film = await Film.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!film) return res.status(404).json({ message: "Film introuvable" });
    res.json(film);
  } catch (err) {
    res.status(400).json({ message: "Requête invalide", error: err.message });
  }
});

/**
 * ✅ DELETE /api/films/:id
 * Suppression d’un trailer/film
 */
router.delete("/:id", async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    if (!film) return res.status(404).json({ message: "Film introuvable" });
    res.json({ message: "Film supprimé", deletedId: film._id });
  } catch (err) {
    res.status(400).json({ message: "ID invalide", error: err.message });
  }
});

module.exports = router;
