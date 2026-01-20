const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    publishedAt: {
      type: Date,
      required: true,
    },

    synopsis: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
      trim: true,
    },

    trailerUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Film', filmSchema);
