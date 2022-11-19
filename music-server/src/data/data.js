const uuid = require('uuid');


// playtype: ORDER, SHUFFLE, REPEAT
const userDB = [
    { id: 'd932c6d6-c729-49db-992a-2cfc83f9e098', playType: 'ORDER', username: 'pop', email: 'pop@mail.com', password: '$2b$10$gM0tyEimipy8QFc/zwV.7errBgoHdx.fE.w3lGpkNjHAhzSQ7YqMC' },
    { id: '57a63716-668b-45f3-9007-62ad102d8235', playType: 'ORDER', username: 'rock', email: 'rock@mail.com', password: '$2b$10$gM0tyEimipy8QFc/zwV.7errBgoHdx.fE.w3lGpkNjHAhzSQ7YqMC' },
    { id: '60315b02-4e59-4f18-bafd-28019e2f60e2', playType: 'ORDER', username: 'hiphop', email: 'hiphop@mail.com', password: '$2b$10$gM0tyEimipy8QFc/zwV.7errBgoHdx.fE.w3lGpkNjHAhzSQ7YqMC' },
    { id: 'd158dd4f-15ef-4a20-b93d-d0cce965f4f3', playType: 'ORDER', username: 'mix', email: 'mix@mail.com', password: '$2b$10$gM0tyEimipy8QFc/zwV.7errBgoHdx.fE.w3lGpkNjHAhzSQ7YqMC' }
];

const musicDB = [
    { id: 'b7120e4d-69b1-454d-8fc7-dc403c86f669', urlPath: 'music/mocking_bird.mp3', title: 'Mocking Bird', releaseDate: '1989-1-2' },
    { id: 'aa6d1f58-5dcd-4b71-8c6e-88b96882f338', urlPath: 'music/smooth_criminal.mp3', title: 'Smooth Criminal', releaseDate: '1999-12-12' },
    { id: '69738ac1-a1db-4bb7-957d-ab5f4364447d', urlPath: 'music/last_ride_with_me.mp3', title: 'Last Ride', releaseDate: '1989-11-3' },
    { id: 'b4b431b8-88ec-41f2-88d4-6a35eec97aa1', urlPath: 'music/comfortably_numb.mp3', title: 'Comfortably Numb', releaseDate: '2000-3-2' },
    { id: '298e11ff-9914-46ad-b2d4-b219fc433b3e', urlPath: 'music/gagnum_style.mp3', title: 'Gangnum Style', releaseDate: '2000-4-2' },
    { id: '3854de5d-aa34-431e-b3f5-d924e04a4f26', urlPath: 'music/in_the_end.mp3', title: 'In the End', releaseDate: '2000-5-2' },
    { id: '705d2fc6-3975-4ea9-bd37-99b23e544fe6', urlPath: 'music/bad_romance.mp3', title: 'Lady Gaga Bad Romance', releaseDate: '2001-6-2' },
    { id: '8d19f0f8-9579-4bf5-9009-3bf66841e363', urlPath: 'music/single_lady.mp3', title: 'Single Lady', releaseDate: '2002-7-2' },
    { id: '62e0cf3a-46e8-418e-a711-407d4bce97a8', urlPath: 'music/last_resort.mp3', title: 'Last Resort', releaseDate: '2004-7-2' },
    { id: '053edf01-29d8-4efb-97ec-680eb449ba2a', urlPath: 'music/mission_impossible.mp3', title: 'Mission Impossible', releaseDate: '2022-9-2' }
];

const playlistDB = [
    { id: uuid.v4(), userId: '60315b02-4e59-4f18-bafd-28019e2f60e2', songId: 'b7120e4d-69b1-454d-8fc7-dc403c86f669', orderId: 1, title: 'Mocking Bird', urlPath: 'music/mocking_bird.mp3' },
    { id: uuid.v4(), userId: '60315b02-4e59-4f18-bafd-28019e2f60e2', songId: 'aa6d1f58-5dcd-4b71-8c6e-88b96882f338', orderId: 2, title: 'Smooth Criminal', urlPath: 'music/smooth_criminal.mp3' },
    { id: uuid.v4(), userId: '57a63716-668b-45f3-9007-62ad102d8235', songId: 'b7120e4d-69b1-454d-8fc7-dc403c86f669', orderId: 1, title: 'Mocking Bird', urlPath: 'music/mocking_bird.mp3' },
    { id: uuid.v4(), userId: 'd932c6d6-c729-49db-992a-2cfc83f9e098', songId: '298e11ff-9914-46ad-b2d4-b219fc433b3e', orderId: 1, title: 'Gangnum Style', urlPath: 'music/gagnum_style.mp3' },
    { id: uuid.v4(), userId: 'd932c6d6-c729-49db-992a-2cfc83f9e098', songId: '053edf01-29d8-4efb-97ec-680eb449ba2a', orderId: 2, title: 'Mission Impossible', urlPath: 'music/mission_impossible.mp3' },
    { id: uuid.v4(), userId: 'd932c6d6-c729-49db-992a-2cfc83f9e098', songId: '8d19f0f8-9579-4bf5-9009-3bf66841e363', orderId: 3, title: 'Single Lady', urlPath: 'music/single_lady.mp3' }
]

module.exports = {
    userDB,
    musicDB,
    playlistDB
};