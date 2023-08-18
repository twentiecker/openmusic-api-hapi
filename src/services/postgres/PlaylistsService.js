const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const ClientError = require('../../exceptions/ClientError');

class PlaylistsService {
  constructor(collaborationService, cacheService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
    this._cacheService = cacheService;
  }

  async addPlaylist({
    name, owner,
  }) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    await this._cacheService.delete(`playlists:${owner}`);

    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    try {
      // mendapatkan playlist dari cache
      const result = await this._cacheService.get(`playlists:${owner}`);
      return JSON.parse(result);
    } catch (error) {
      // bila gagal, diteruskan dengan mendapatkan playlist dari database
      const query = {
        text: 'SELECT playlists.id, playlists.name, users.username FROM playlists JOIN users on playlists.owner = users.id LEFT JOIN collaborations on playlists.id = collaborations.playlist_id WHERE owner = $1 OR collaborations.user_id = $1',
        values: [owner],
      };
      const result = await this._pool.query(query);
      const mappedResult = result.rows.map(mapDBToModel);

      // playlist akan disimpan pada cache sebelum fungsi getPlaylists dikembalikan
      await this._cacheService.set(`playlists:${owner}`, JSON.stringify(mappedResult));

      return mappedResult;
      // return result.rows.map(mapDBToModel);
    }
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlists JOIN users on playlists.owner = users.id LEFT JOIN collaborations on playlists.id = collaborations.playlist_id WHERE playlists.id = $1 OR collaborations.playlist_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows.map(mapDBToModel)[0];
  }

  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }

    const { owner } = result.rows[0];
    await this._cacheService.delete(`playlists:${owner}`);
  }

  async addSongToPlaylistById(playlistId, songId) {
    const id = `playlistsong-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist');
    }

    const { owner } = result.rows[0];
    await this._cacheService.delete(`playlists:${owner}`);

    await this._cacheService.delete(`playlists:${playlistId}`);

    return result.rows[0].id;
  }

  async addSongActivity(playlistId, songId, userId) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlistsongactivities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, 'add', time],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist');
    }

    return result.rows[0].id;
  }

  async getSongsFromPlaylistById(id) {
    try {
      // mendapatkan playlist dari cache
      const result = await this._cacheService.get(`playlists:${id}`);
      return JSON.parse(result);
    } catch (error) {
      // bila gagal, diteruskan dengan mendapatkan playlist dari database
      const playlist = await this.getPlaylistById(id);
      const query = {
        text: 'SELECT playlistsongs.song_id id, songs.title, songs.performer FROM playlistsongs JOIN songs on playlistsongs.song_id = songs.id WHERE playlist_id = $1',
        values: [id],
      };
      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Lagu tidak ditemukan');
      }

      const songs = result.rows.map(mapDBToModel);
      playlist.songs = songs;

      // playlist akan disimpan pada cache sebelum fungsi getPlaylists dikembalikan
      await this._cacheService.set(`playlists:${id}`, JSON.stringify(playlist));

      return playlist;
    }
  }

  async deleteSongsFromPlaylistById(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new ClientError('Lagu gagal dihapus. Id tidak ditemukan');
    }

    const { owner } = result.rows[0];
    await this._cacheService.delete(`playlists:${owner}`);

    await this._cacheService.delete(`playlists:${playlistId}`);
  }

  async deleteSongActivity(playlistId, songId, userId) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlistsongactivities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, 'delete', time],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal dihapus dari playlist');
    }

    return result.rows[0].id;
  }

  async getActivitiesFromPlaylistById(playlistId) {
    const query = {
      text: 'SELECT users.username, songs.title, playlistsongactivities.action, playlistsongactivities.time FROM playlistsongactivities JOIN playlists ON playlistsongactivities.playlist_id = playlists.id JOIN users ON playlists.owner = users.id JOIN songs ON playlistsongactivities.song_id = songs.id WHERE playlistsongactivities.playlist_id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    const playlist = { playlistId };
    const activities = result.rows.map(mapDBToModel);
    playlist.activities = activities;

    return playlist;
  }

  async verifyUserId(userId) {
    const query = {
      text: 'SELECT id FROM users WHERE id = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Pengguna tidak ditemukan');
    }
  }

  async verifySongId(songId) {
    const query = {
      text: 'SELECT id FROM songs WHERE id = $1',
      values: [songId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: 'SELECT owner FROM playlists WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      try {
        await this._collaborationService.verifyCollaborator(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = PlaylistsService;
