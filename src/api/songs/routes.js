const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: (request, h) => handler.postSongHandler(request, h),
  },
  {
    method: 'GET',
    path: '/songs',
    handler: (request, h) => handler.getSongsHandler(request, h),
  },
  {
    method: 'GET',
    path: '/songs/{songId}',
    handler: (request, h) => handler.getSongByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/songs/{songId}',
    handler: (request, h) => handler.putSongByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: (request, h) => handler.deleteSongByIdHandler(request, h),
  },
];

module.exports = routes;
