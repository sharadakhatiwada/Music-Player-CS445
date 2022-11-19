const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const compare = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
}

const hash = (password) => bcrypt.hashSync(password, 10);  // HASH_SALT = 10

const jwtSign = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name
    },
    'secret',
    { expiresIn: 60 * 60 }  // 1 hour
  );
};

const decode = (token) => jwt.verify(token, 'secret');

module.exports = { compare, jwtSign, hash, decode }