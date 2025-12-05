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
  socketMap: {}, // Map socket IDs to socket objects
};

const initGameState = () => {
  gameState = {
    playerMap: {},
    gameMap: {},
    socketMap: {},
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
let ioInstance = null;

// Initialize interval once to broadcast to all sockets
const initializeGameStateBroadcast = (io) => {
  if (!ioInstance) {
    ioInstance = io;
  }
  if (interval) {
    return; // Already initialized
  }
  interval = setInterval(() => {
    // Create a clean game state without socket references to avoid circular references
    const cleanGameState = {
      playerMap: gameState.playerMap,
      gameMap: gameState.gameMap,
    };
    // Broadcast to all connected sockets
    if (ioInstance) {
      ioInstance.emit('gameState', cleanGameState);
    }
  }, 1420);
};

export const handleGame = (socket, io) => {
  // Store socket reference
  gameState.socketMap[socket.id] = socket;

  // Initialize broadcast interval if not already done
  if (io) {
    initializeGameStateBroadcast(io);
  }

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
          turn: socket.id, // Set initial turn to creator
        },
      };
      // Create a clean game state without socket references
      const cleanGameState = {
        playerMap: gameState.playerMap,
        gameMap: gameState.gameMap,
      };
      socket.emit('gameState', cleanGameState);
    } else {
      socket.emit('newGameError', 'Game title already exists. Try again.');
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
    const game = gameState?.gameMap[joinGameId];

    if (!game) {
      socket.emit('joinGameError', 'Game ID does not exist. Try again.');
      return;
    }

    // Check if game is full
    if (game.players.length >= 2) {
      socket.emit('joinGameError', 'Game is full. Try another game.');
      return;
    }

    // Check if player is already in the game
    const alreadyInGame = game.players.some(
      (player) => player.id === socket.id
    );
    if (alreadyInGame) {
      // Player already in game, just send current state
      const cleanGameState = {
        playerMap: gameState.playerMap,
        gameMap: gameState.gameMap,
      };
      socket.emit('gameState', cleanGameState);
      return;
    }

    // Add player to game
    game.players.push({
      id: socket.id,
      displayName: joinGameData.playerName,
      isCreator: false,
    });

    const creator = game.players.find((player) => player.isCreator);
    const creatorName = creator.displayName;
    const creatorId = creator.id;
    game.gameData.gameStatus = `It is your turn, ${creatorName}`;
    game.gameData.turn = creatorId;

    // Emit to all players in the game
    const cleanGameState = {
      playerMap: gameState.playerMap,
      gameMap: gameState.gameMap,
    };
    game.players.forEach((player) => {
      const playerSocket = gameState.socketMap[player.id];
      if (playerSocket) {
        playerSocket.emit('gameState', cleanGameState);
      }
    });
  });
};

const handleDisconnect = (socket) => {
  socket.on('disconnect', async () => {
    console.log('Player disconnecting:', socket.id);
    const userInfo = {
      id: socket.id,
    };

    // Try to delete user from DynamoDB, but don't crash if it fails
    try {
      await deleteUser(userInfo);
    } catch (error) {
      console.error('Failed to delete user from DynamoDB:', error.message);
      // Continue execution even if DynamoDB deletion fails
    }

    // Remove from playerMap
    if (gameState?.playerMap?.[socket.id]) {
      delete gameState.playerMap[socket.id];
    }

    // Remove player from any games they're in
    Object.keys(gameState.gameMap).forEach((gameId) => {
      const game = gameState.gameMap[gameId];
      const playerIndex = game.players.findIndex(
        (player) => player.id === socket.id
      );

      if (playerIndex !== -1) {
        const removedPlayer = game.players[playerIndex];
        console.log(
          `Removing player ${removedPlayer.displayName} (${socket.id}) from game ${gameId}`
        );

        // Remove player from game
        game.players.splice(playerIndex, 1);

        // Notify remaining players in the game
        const cleanGameState = {
          playerMap: gameState.playerMap,
          gameMap: gameState.gameMap,
        };

        game.players.forEach((remainingPlayer) => {
          const playerSocket = gameState.socketMap[remainingPlayer.id];
          if (playerSocket) {
            playerSocket.emit('gameState', cleanGameState);
          }
        });

        // Delete game if no players left
        if (game.players.length === 0) {
          console.log(`Deleting empty game ${gameId}`);
          delete gameState.gameMap[gameId];
        }
      }
    });

    // Remove from socketMap
    if (gameState?.socketMap?.[socket.id]) {
      delete gameState.socketMap[socket.id];
    }
  });
};
