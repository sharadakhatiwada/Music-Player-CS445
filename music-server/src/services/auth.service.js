const { compare, jwtSign, hash } = require('../utils/encryption');
const { userDB } = require('../data/data')

const login = (username, password) => {
  const currentUser = userDB.find(user => user.username === username);

  if (!currentUser) {
    throw new Error('Invalid username or password!');
  }

  if (!compare(password, currentUser.password)) {
    throw new Error('Invalid username or password!');
  }

  const accessToken = jwtSign(currentUser);

  return {
    id: currentUser.id,
    username: currentUser.username,
    playType: currentUser.playType,
    accessToken
  }
}

module.exports = { login };