const authService = require('../services/auth.service');

const login = (req, res, next) => {
  try {
    const user = authService.login(req.body.username, req.body.password);
    return res.json(user);
  } catch (error) {
    next(error);
  }

}

module.exports = { login };