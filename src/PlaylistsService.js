const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
    this._playlists = {};
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const playlist = await this.getPlaylistById(playlistId);

    const query = {
      text: 'SELECT playlistsongs.song_id id, songs.title, songs.performer FROM playlistsongs JOIN songs on playlistsongs.song_id = songs.id WHERE playlist_id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    const songs = result.rows;

    playlist.songs = songs;
    return { playlist };
  }
}

module.exports = PlaylistsService;
