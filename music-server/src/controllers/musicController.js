const musicService = require('../services/music.service');

const getSongs = (req, res, next) => {
  try {
    return res.json(musicService.getSongs(req.query.search));
  } catch (error) {
    next(error);
  }
}

module.exports = { getSongs };