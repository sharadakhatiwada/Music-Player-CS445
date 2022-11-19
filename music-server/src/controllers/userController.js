const userService = require('../services/user.service');

const updateUser = (req, res, next) => {
  try {
    return res.json(userService.updateUser(req.user, req.body));
  } catch (error) {
    next(error);
  }
}

module.exports = { updateUser };