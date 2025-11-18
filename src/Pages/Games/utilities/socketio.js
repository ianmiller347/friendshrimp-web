import io from 'socket.io-client';
let socket;
const ENDPOINT =
  window.location.hostname !== 'localhost'
    ? 'https://friendshrimp.com'
    : 'http://localhost:8080';

export const initiateSocket = () => {
  // Only create a new socket if one doesn't exist or is disconnected
  if (!socket || !socket.connected) {
    if (socket) {
      socket.disconnect();
    }
    socket = io(ENDPOINT);
  }
};

export const getSocketId = () => socket?.id || null;

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const subscribeToGameState = (cb) => {
  socket.on('gameState', (data) => {
    return cb(data);
  });
};

export const subscribeToPlayersList = (cb) => {
  socket.on('playersList', (data) => cb(data));
};

export const newPlayerJoin = (data) => {
  socket.emit('newPlayer', {
    ...data,
    id: socket.id,
  });
};

export const handlePlayerSettingStatus = (data) => {
  socket.emit('playerUpdateStatus', {
    ...data,
    id: socket.id,
  });
};

export const createNewGame = (data) => {
  socket.emit('newGame', data);
};

export const subscribeToNewGameCreation = (cb) => {
  socket.on('newGame', (data) => cb(data));
};

export const joinExistingGameById = (data) => {
  socket.emit('joinGame', data);
};

export const subscribeToJoinGame = (cb) => {
  socket.on('joinGame', (data) => cb(data));
};

export const subscribeToJoinGameError = (cb) => {
  socket.on('joinGameError', (error) => cb(error));
};

export const subscribeToNewGameError = (cb) => {
  socket.on('newGameError', (error) => cb(error));
};

export const handleDrawCard = (eventName, data) => {
  if (!socket || !socket.connected) {
    console.error('Socket not connected, cannot draw card');
    return false;
  }
  socket.emit(eventName, data);
  return true;
};

export const subscribeToDrawCardError = (cb) => {
  socket.on('drawCardError', (error) => cb(error));
};

export const subscribeToDisconnect = (cb) => {
  socket.on('disconnect', () => cb());
};

export const subscribeToConnect = (cb) => {
  socket.on('connect', () => cb());
};

export const isSocketConnected = () => socket?.connected || false;

export const subscribeToCardDrawn = (cb) => {
  socket.on('drawCard', (data) => {
    return cb(data);
  });
};

// hi scores for shrimp juice
export const HIT_JUICE = 'hitJuice';
// export const subscribeToJuiceHiScores = (cb) => {
//   socket.on(HIT_JUICE, (data) => cb(data));
// };

export const emitHitJuice = (data) => {
  socket.emit(HIT_JUICE, data);
};
export const SET_JUICE_HI_SCORE = 'setJuiceHiScore';
export const subscribeToJuiceHiScores = (cb) => {
  socket.on(SET_JUICE_HI_SCORE, (data) => cb(data));
};

export const emitSetHiScore = (data) => {
  socket.emit(SET_JUICE_HI_SCORE, data);
};
