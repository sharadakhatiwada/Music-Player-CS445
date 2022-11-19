const express = require('express');
const authRouter = require('./authRouter');
const musicRouter = require('./musicRouter');
const userRouter = require('./userRouter');
const playlistRouter = require('./playlistRouter');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/music', validateToken, musicRouter);
router.use('/users', validateToken, userRouter);
router.use('/playlist', validateToken, playlistRouter);

module.exports = router;