const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', userController.updateUser);

module.exports = userRouter;