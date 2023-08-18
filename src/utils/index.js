/* eslint-disable camelcase */

const mapDBToModel = ({
  cover,
  inserted_at,
  updated_at,
  ...args
}) => ({
  ...args,
  coverUrl: cover,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModel };
