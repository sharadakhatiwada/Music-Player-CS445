const playlistService = require('../services/playlist.service');

const addToPlaylist = (req, res, next) => {
  try {
    return res.json(playlistService.addToPlaylist(req.user.id, req.body.songId));
  } catch (error) {
    next(error);
  }
}

const removeFromPlaylist = (req, res, next) => {
  try {
    return res.json(playlistService.removeFromPlaylist(req.user.id, req.body.songId));
  } catch (error) {
    next(error);
  }
}

const getPlaylist = (req, res, next) => {
  try {
    return res.json(playlistService.getPlaylist(req.user.id));
  } catch (error) {
    next(error);
  }
}


module.exports = { addToPlaylist, removeFromPlaylist, getPlaylist };