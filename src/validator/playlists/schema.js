const Joi = require('joi');

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().max(50).required(),
});

const SongToPlaylistByIdPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PlaylistPayloadSchema, SongToPlaylistByIdPayloadSchema };
