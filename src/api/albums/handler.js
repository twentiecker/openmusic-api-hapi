const { config } = require('../../utils/config');

class AlbumsHandler {
  constructor(service, validator, songsService, uploadService, uploadValidator) {
    this._service = service;
    this._validator = validator;
    this._songsService = songsService;
    this._uploadService = uploadService;
    this._uploadValidator = uploadValidator;
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year, cover } = request.payload;

    const albumId = await this._service.addAlbum({
      name,
      year,
      cover,
    });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async postUploadPictureHandler(request, h) {
    const { cover } = request.payload;
    const { albumId } = request.params;

    this._uploadValidator.validatePictureHeaders(cover.hapi.headers);

    const filename = await this._uploadService.writeFile(cover, cover.hapi);

    await this._service.editCoverById(albumId, { filename });

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
      data: {
        coverUrl: `http://${config.server.host}:${config.server.port}/albums/${albumId}/${filename}`,
      },
    });
    response.code(201);
    return response;
  }

  async postLikeToAlbumByIdHandler(request, h) {
    const { albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyAlbumId(albumId);
    await this._service.verifyLikeToAlbum(albumId, credentialId);
    await this._service.addLikeToAlbumById(albumId, credentialId);

    const response = h.response({
      status: 'success',
      message: 'Like berhasil ditambahkan ke album',
    });
    response.code(201);
    return response;
  }

  async getLikeToAlbumByIdHandler(request, h) {
    const { albumId } = request.params;

    const likes = await this._service.getLikeToAlbumById(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes: likes.likes,
      },
    });
    response.header('X-Data-Source', likes.header);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { albumId } = request.params;

    const album = await this._service.getAlbumById(albumId);
    const songs = await this._songsService.getSongsById(albumId);
    album.songs = songs;

    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const { albumId } = request.params;

    await this._service.editAlbumById(albumId, {
      name,
      year,
    });

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { albumId } = request.params;

    await this._service.deleteAlbumById(albumId);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }

  async deleteLikeToAlbumByIdHandler(request) {
    const { albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.deleteLikeToAlbumById(albumId, credentialId);

    return {
      status: 'success',
      message: 'Like berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
