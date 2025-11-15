import { setGameState } from '../';

export const handleSockets = (socket, gameState) => {
  // handle draw card
  socket.on('drawCard', (drawCardData) => {
    handleDrawCardLogic(drawCardData, gameState, socket);
  });
};

// get new cards based on whether or not you won
const getNewCards = (didWin, oldCards, cardDrawn, otherCardDrawn) => {
  // if u win u get other card drawn
  if (didWin) {
    return [...oldCards, otherCardDrawn];
  }
  // if u lose u lose card drawn
  // return oldCards.filter((card) => !cardMatches(cardDrawn, card));
  return oldCards.filter((card) => cardDrawn !== card);
};

const handleGameOutcomeLogic = (drawCardData, game, socket, gameState) => {
  // Get the current game state (in case it changed during the setTimeout)
  const currentGame = gameState.gameMap[drawCardData.gameId];
  if (!currentGame) {
    console.error('Game not found in handleGameOutcomeLogic');
    return;
  }

  const { gameData } = currentGame;
  const cardDrawn1 = gameData.player1Drawn;
  const cardDrawn2 = gameData.player2Drawn;
  const player1Cards = gameData.player1Cards;
  const player2Cards = gameData.player2Cards;

  // now calculate the outcome
  const isBattle = cardDrawn1.count === cardDrawn2.count;
  if (isBattle) {
    // for now just let the tie go to the creator
    // TODO: put a card down then flip the next
  }
  const player1Wins = cardDrawn1.count > cardDrawn2.count;
  const player1Name = currentGame.players.find(
    (player) => player.isCreator
  ).displayName;
  const player2Name = currentGame.players.find(
    (player) => !player.isCreator
  ).displayName;
  // now set their decks with the result
  const winnerText = player1Wins
    ? `${player1Name} wins.`
    : `${player2Name} wins.`;

  const player1NewCards = getNewCards(
    player1Wins,
    player1Cards,
    cardDrawn1,
    cardDrawn2
  );
  const player2NewCards = getNewCards(
    !player1Wins,
    player2Cards,
    cardDrawn2,
    cardDrawn1
  );

  // Find the winner to set as the next turn
  const winner = player1Wins
    ? currentGame.players.find((player) => player.isCreator)
    : currentGame.players.find((player) => !player.isCreator);

  // Set status to show winner and prepare for next round
  const nextRoundStatus = `${winnerText} ${winner.displayName} draws first.`;

  const updatedGame = {
    ...currentGame,
    gameData: {
      ...currentGame.gameData,
      player1Drawn: null,
      player2Drawn: null,
      player1Cards: player1NewCards,
      player2Cards: player2NewCards,
      gameStatus: nextRoundStatus,
      turn: winner.id, // Set turn to winner for next round
    },
  };

  // Update the game state
  setGameState(drawCardData.gameId, updatedGame);

  // Update the gameState object with the new game data
  gameState.gameMap[drawCardData.gameId] = updatedGame;

  // Emit updated game state to all players in the game
  const cleanGameState = {
    playerMap: gameState.playerMap,
    gameMap: gameState.gameMap,
  };
  currentGame.players.forEach((player) => {
    const playerSocket = gameState.socketMap[player.id];
    if (playerSocket) {
      playerSocket.emit('gameState', cleanGameState);
    }
  });
};

// when a card is drawn
const handleDrawCardLogic = (drawCardData, gameState, socket) => {
  const joinGameId = drawCardData.gameId;
  const thisGame = gameState.gameMap[drawCardData.gameId];
  if (!thisGame) {
    console.error('Cant find the game! Bye.');
    // Notify the client that the game doesn't exist
    socket.emit(
      'drawCardError',
      'Game not found. The game may have ended or you may have disconnected.'
    );
    return false;
  }

  // Find the player who drew the card
  const drawingPlayer = thisGame.players.find(
    (player) => player.id === drawCardData.playerId
  );

  if (!drawingPlayer) {
    console.error('Player not found in game!');
    socket.emit('drawCardError', 'You are not in this game.');
    return false;
  }

  // Determine if this is player 1 (creator) or player 2
  const isCreator = drawingPlayer.isCreator;

  // Set the drawn card for the appropriate player
  if (isCreator) {
    gameState.gameMap[joinGameId].gameData.player1Drawn =
      drawCardData.cardDrawn;
  } else {
    gameState.gameMap[joinGameId].gameData.player2Drawn =
      drawCardData.cardDrawn;
  }

  // Update game status
  const otherPlayer = thisGame.players.find(
    (player) => player.id !== drawCardData.playerId
  );
  gameState.gameMap[
    joinGameId
  ].gameData.gameStatus = `Waiting for ${otherPlayer.displayName} to draw...`;
  gameState.gameMap[joinGameId].gameData.turn = otherPlayer.id;

  // Check if both players have drawn
  const hasPlayer1Drawn = !!thisGame.gameData.player1Drawn;
  const hasPlayer2Drawn = !!thisGame.gameData.player2Drawn;

  if (hasPlayer1Drawn && hasPlayer2Drawn) {
    setTimeout(() => {
      // both hands drawn..
      gameState.gameMap[drawCardData.gameId] = {
        ...thisGame,
        gameData: {
          ...thisGame.gameData,
          gameStatus: 'Both hands drawn. And the winner is...',
        },
      };
      handleGameOutcomeLogic(drawCardData, thisGame, socket, gameState);
    }, 4111); // 4.111 seconds total (was 1.111, added 3 more seconds)
  }

  // Emit updated game state to all players in the game
  const cleanGameState = {
    playerMap: gameState.playerMap,
    gameMap: gameState.gameMap,
  };
  thisGame.players.forEach((player) => {
    const playerSocket = gameState.socketMap[player.id];
    if (playerSocket) {
      playerSocket.emit('gameState', cleanGameState);
    }
  });
};
