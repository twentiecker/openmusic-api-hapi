/* eslint-disable camelcase */

const mapAlbumDBToModel = ({
  id,
  name,
  year,
  inserted_at,
  updated_at,
}) => ({
  id,
  name,
  year,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

const mapSongDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

module.exports = { mapAlbumDBToModel, mapSongDBToModel };
