import { handleSockets as handleCardGameSockets } from './card-battle-game';
import { addUser, updateUser, deleteUser } from '../active-shrimps';

// the game state object
// const gameStateProps = {
//   gameType: 'string',
//   gameId: 'number',
//   status: 'string',
//   player1: 'player',
//   player2: 'player',
// };

let gameState = {
  playerMap: {},
  gameMap: {},
};

const initGameState = () => {
  gameState = {
    playerMap: {},
    gameMap: {},
  };
};

// game state methods
export const setGameState = (gameId, newGameState) => {
  gameState.gameMap[gameId] = {
    ...gameState.gameMap[gameId],
    ...newGameState,
  };
  // socket.emit('gameState', gameState);
};

let interval;
export const handleGame = (socket) => {
  // general
  initGameState();

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    socket.emit('gameState', gameState);
  }, 1420);

  socket.on('gameState', (newGameStateData) => {
    console.log('game state got updated!', newGameStateData);
  });

  handleCreateGame(socket);
  handlePlayerJoining(socket);
  handlePlayerUpdateStatus(socket);
  handleJoinGameById(socket);
  handleDisconnect(socket);

  // specific games
  handleCardGameSockets(socket, gameState);

  // Emitting gameState to client
  // socket.emit('gameState', gameState);
};

export const handleCreateGame = (socket) => {
  socket.on('newGame', (newGameData) => {
    console.log('new game made,', newGameData);
    const newGameId = newGameData.gameId;
    // first check if the game exists and if it does tell them no
    if (!gameState.gameMap[newGameId]) {
      gameState.gameMap[newGameId] = {
        gameId: newGameId,
        players: [
          {
            id: socket.id,
            displayName: newGameData.playerName,
            isCreator: true,
          },
        ],
        gameName: newGameData.gameName,
        gameData: {
          ...newGameData.gameData,
          player1Id: socket.id,
        },
      };
      socket.emit('gameState', gameState);
    } else {
      socket.broadcast.emit('Game title already exists. Try again.');
    }
  });
};

const handlePlayerJoining = (socket) => {
  // handle new player joining
  socket.on('newPlayer', (newPlayerData) => {
    const newUserData = {
      id: newPlayerData.id,
      name: 'Not David',
      displayName: newPlayerData.name,
    };
    addUser(newUserData);
  });
};

const handlePlayerUpdateStatus = (socket) => {
  // handle new player joining
  socket.on('playerUpdateStatus', (newPlayerData) => {
    const newUserData = {
      id: newPlayerData.id,
      displayName: newPlayerData.name,
      statusDisplay: newPlayerData.statusDisplay,
    };
    updateUser(newUserData);
  });
};

const handleJoinGameById = (socket) => {
  // joining a room by id
  socket.on('joinGame', (joinGameData) => {
    const joinGameId = joinGameData.gameId.toUpperCase();
    if (gameState?.gameMap[joinGameId]?.players.length) {
      gameState.gameMap[joinGameId].players.push({
        id: socket.id,
        displayName: joinGameData.playerName,
        isCreator: false,
      });
      const creator = gameState.gameMap[joinGameId].players.find(
        (player) => player.isCreator
      );
      const creatorName = creator.displayName;
      const creatorId = creator.id;
      gameState.gameMap[
        joinGameId
      ].gameData.gameStatus = `It is your turn, ${creatorName}`;
      gameState.gameMap[joinGameId].gameData.turn = creatorId;
      socket.emit('gameState', gameState);
    } else {
      socket.broadcast.emit(
        'joinGameError',
        'Game ID does not exist. Try again.'
      );
    }
  });
};

const handleDisconnect = (socket) => {
  socket.on('disconnect', () => {
    const userInfo = {
      id: socket.id,
    };
    deleteUser(userInfo);
    // old game state deletes. remove all this when done db integration
    if (gameState?.playerMap?.[socket.id]) {
      delete gameState.playerMap[socket.id];
    }
    // TODO: delete games not being used, add checker if they got phantom boies
    Object.keys(gameState.gameMap).forEach((key) => {
      const matchinGame = gameState.gameMap[key];
      if (!matchinGame.players.length) {
        delete gameState.gameMap[key];
      }
    });
  });
};
