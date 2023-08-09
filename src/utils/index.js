/* eslint-disable camelcase */

const mapDBToModel = ({ inserted_at, updated_at, ...args }) => ({
  ...args,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

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

module.exports = { mapDBToModel, mapAlbumDBToModel, mapSongDBToModel };
