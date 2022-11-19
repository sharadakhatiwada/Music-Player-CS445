const { userDB } = require('../data/data')

const updateUser = (user, updatedUser) => {
  const index = userDB.findIndex(u => u.id === user.id);
  if (index > -1) {
    userDB[index] = { ...userDB[index], playType: updatedUser.playType };
  } else {
    throw new Error('Not Authorized');
  }
  return {
    id: userDB[index].id,
    username: userDB[index].username,
    playType: userDB[index].playType
  };

}

module.exports = { updateUser };