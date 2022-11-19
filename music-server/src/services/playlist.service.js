const uuid = require('uuid');
const { playlistDB, musicDB } = require('../data/data')

const addToPlaylist = (userId, songId) => {
  let result = playlistDB.filter(p => p.userId === userId).sort((a, b) => (a.orderId > b.orderId) ? 1 : -1);
  const index = playlistDB.findIndex(p => p.songId === songId && p.userId === userId);
  // add only if not present
  let song = musicDB.find(m => m.id === songId);
  if (index === -1) {
    const newPlaylistData = {
      id: uuid.v4(),
      userId,
      songId,
      orderId: result.length + 1,
      title: song.title,
      urlPath: song.urlPath
    };
    playlistDB.push(newPlaylistData);
    result.push(newPlaylistData);
  }

  return result;

}

const removeFromPlaylist = (userId, songId) => {
  const index = playlistDB.findIndex(p => p.songId === songId && p.userId === userId);
  if (index > -1) {
    playlistDB.splice(index, 1);
  }
  const tempPlaylistForUser = playlistDB.filter(p => p.userId === userId).sort((a, b) => (a.orderId > b.orderId) ? 1 : -1);

  // re order the playlist
  for (let i = 1; i <= tempPlaylistForUser.length; i++) {
    playlistDB.find(p => p.id === tempPlaylistForUser[i - 1].id).orderId = i;
  }

  return tempPlaylistForUser;

}

const getPlaylist = (userId) => {
  return playlistDB.filter(p => p.userId === userId).sort((a, b) => (a.orderId > b.orderId) ? 1 : -1);
}



module.exports = { addToPlaylist, removeFromPlaylist, getPlaylist };