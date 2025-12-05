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

  // Check if an outcome calculation is already in progress for this game
  if (currentGame.gameData.isCalculatingOutcome) {
    console.log('Outcome calculation already in progress, skipping duplicate');
    return;
  }

  const { gameData } = currentGame;
  const cardDrawn1 = gameData.player1Drawn;
  const cardDrawn2 = gameData.player2Drawn;

  // Defensive check: ensure both cards are drawn and valid
  if (!cardDrawn1 || !cardDrawn2) {
    console.error('Cannot calculate outcome: cards are null or undefined', {
      cardDrawn1,
      cardDrawn2,
    });
    return;
  }

  // Defensive check: ensure cards have count property
  if (
    typeof cardDrawn1.count === 'undefined' ||
    typeof cardDrawn2.count === 'undefined'
  ) {
    console.error('Cannot calculate outcome: cards missing count property', {
      cardDrawn1,
      cardDrawn2,
    });
    return;
  }

  // Mark that we're calculating outcome to prevent duplicate calculations
  currentGame.gameData.isCalculatingOutcome = true;

  const player1Cards = gameData.player1Cards;
  const player2Cards = gameData.player2Cards;

  // Validate that players have cards
  if (!Array.isArray(player1Cards) || !Array.isArray(player2Cards)) {
    console.error('Invalid card arrays', { player1Cards, player2Cards });
    currentGame.gameData.isCalculatingOutcome = false;
    return;
  }

  // Validate that we have at least 2 players
  if (currentGame.players.length < 2) {
    console.error('Cannot calculate outcome: game needs 2 players');
    // Notify the remaining player if one exists
    const remainingPlayer = currentGame.players[0];
    if (remainingPlayer) {
      const remainingPlayerSocket = gameState.socketMap[remainingPlayer.id];
      if (remainingPlayerSocket) {
        remainingPlayerSocket.emit(
          'drawCardError',
          'Your opponent disconnected. The game cannot continue.'
        );
      }
    }
    currentGame.gameData.isCalculatingOutcome = false;
    // TODO: Allow player to reconnect to the same game
    return;
  }

  // now calculate the outcome
  const isBattle = cardDrawn1.count === cardDrawn2.count;
  if (isBattle) {
    // for now just let the tie go to the creator
    // TODO: put a card down then flip the next
  }
  const player1Wins = cardDrawn1.count > cardDrawn2.count;
  // Find players with defensive checks
  const player1Obj = currentGame.players.find((player) => player.isCreator);
  const player2Obj = currentGame.players.find((player) => !player.isCreator);

  if (!player1Obj || !player2Obj) {
    console.error('Cannot find both players in game');
    // Notify the remaining player if one exists
    const remainingPlayer = player1Obj || player2Obj;
    if (remainingPlayer) {
      const remainingPlayerSocket = gameState.socketMap[remainingPlayer.id];
      if (remainingPlayerSocket) {
        remainingPlayerSocket.emit(
          'drawCardError',
          'Your opponent disconnected. The game cannot continue.'
        );
      }
    }
    currentGame.gameData.isCalculatingOutcome = false;
    // TODO: Allow player to reconnect to the same game
    return;
  }

  const player1Name = player1Obj.displayName;
  const player2Name = player2Obj.displayName;

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
  const winner = player1Wins ? player1Obj : player2Obj;

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
      isCalculatingOutcome: false, // Clear the flag after calculation
      outcomeTimeoutId: null, // Clear the timeout ID
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

  // Validate that the game has at least 2 players before allowing card draws
  if (thisGame.players.length < 2) {
    console.error('Cannot draw card: game needs 2 players');
    socket.emit(
      'drawCardError',
      'Waiting for another player to join the game before you can draw cards.'
    );
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

  // Additional safety check (should not be needed after the length check above, but defensive)
  if (!otherPlayer) {
    console.error('Cannot find other player in game');
    socket.emit(
      'drawCardError',
      'Unable to find the other player. Please try again.'
    );
    return false;
  }

  gameState.gameMap[
    joinGameId
  ].gameData.gameStatus = `Waiting for ${otherPlayer.displayName} to draw...`;
  gameState.gameMap[joinGameId].gameData.turn = otherPlayer.id;

  // Check if both players have drawn
  const hasPlayer1Drawn = !!thisGame.gameData.player1Drawn;
  const hasPlayer2Drawn = !!thisGame.gameData.player2Drawn;

  if (hasPlayer1Drawn && hasPlayer2Drawn) {
    // Check if an outcome calculation is already in progress (actually calculating, not just scheduled)
    if (thisGame.gameData.isCalculatingOutcome) {
      console.log(
        'Outcome calculation already in progress, skipping duplicate setTimeout'
      );
      // Still emit game state update, just don't schedule another timeout
    } else {
      // Cancel any existing timeout for this game to prevent multiple simultaneous calculations
      // This handles the case where both players draw again before the timeout fires
      if (thisGame.gameData.outcomeTimeoutId) {
        clearTimeout(thisGame.gameData.outcomeTimeoutId);
        console.log('Cancelled previous outcome timeout');
      }

      // Schedule the outcome calculation
      // Note: We don't set isCalculatingOutcome here - it will be set in handleGameOutcomeLogic
      const timeoutId = setTimeout(() => {
        // Get fresh game state in case it changed
        const currentGame = gameState.gameMap[drawCardData.gameId];
        if (!currentGame) {
          console.error('Game not found in setTimeout callback');
          return;
        }

        // Check if both players are still in the game (player may have disconnected)
        if (currentGame.players.length < 2) {
          console.log(
            'Player disconnected during timeout delay, cancelling outcome calculation'
          );
          const remainingPlayer = currentGame.players[0];
          if (remainingPlayer) {
            const remainingPlayerSocket =
              gameState.socketMap[remainingPlayer.id];
            if (remainingPlayerSocket) {
              remainingPlayerSocket.emit(
                'drawCardError',
                'Your opponent disconnected. The game cannot continue.'
              );
            }
          }
          // Clear the timeout ID and calculation flag
          currentGame.gameData.outcomeTimeoutId = null;
          currentGame.gameData.isCalculatingOutcome = false;
          // TODO: Allow player to reconnect to the same game
          return;
        }

        // Double-check that both cards are still drawn (defensive check)
        const card1 = currentGame.gameData.player1Drawn;
        const card2 = currentGame.gameData.player2Drawn;

        if (!card1 || !card2) {
          console.log(
            'Cards were cleared before timeout fired, cancelling outcome calculation',
            { card1, card2 }
          );
          // Clear the timeout ID since we're not calculating
          currentGame.gameData.outcomeTimeoutId = null;
          return;
        }

        // Update status before calculating outcome
        gameState.gameMap[drawCardData.gameId] = {
          ...currentGame,
          gameData: {
            ...currentGame.gameData,
            gameStatus: 'Both hands drawn. And the winner is...',
          },
        };

        // Calculate and process the outcome
        // handleGameOutcomeLogic will set isCalculatingOutcome = true
        handleGameOutcomeLogic(drawCardData, currentGame, socket, gameState);
      }, 4111); // 4.111 seconds total (was 1.111, added 3 more seconds)

      // Store the timeout ID so we can cancel it if needed
      thisGame.gameData.outcomeTimeoutId = timeoutId;
    }
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
