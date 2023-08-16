class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const {
      title, year, performer, genre, duration, albumId,
    } = request.payload;

    const songId = await this._service.addSong({
      title, year, performer, genre, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request) {
    let { title, performer } = request.query;
    if (title === undefined && performer === undefined) {
      title = '';
      performer = '';
    }
    const songs = await this._service.getSongs(title, performer);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { songId } = request.params;

    const song = await this._service.getSongById(songId);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);
    const {
      title, year, performer, genre, duration, albumId,
    } = request.payload;
    const { songId } = request.params;

    await this._service.editSongById(songId, {
      title, year, performer, genre, duration, albumId,
    });

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request) {
    const { songId } = request.params;

    await this._service.deleteSongById(songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = SongsHandler;
