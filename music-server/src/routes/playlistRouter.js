const express = require('express');
const playlistControler = require('../controllers/playlistController');

const playlistRouter = express.Router();

playlistRouter.post('/add', playlistControler.addToPlaylist);
playlistRouter.post('/remove', playlistControler.removeFromPlaylist);
playlistRouter.get('/', playlistControler.getPlaylist);

module.exports = playlistRouter;