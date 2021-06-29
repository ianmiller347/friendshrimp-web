import { setGameState } from '../';

export const handleSockets = (socket, gameState) => {
  // handle draw card
  socket.on('drawCard', (drawCardData) => {
    console.log('drawing card, game state', gameState)
    handleDrawCardLogic(drawCardData, gameState);
    socket.emit('gameState', gameState);
  });
}

// get new cards based on whether or not you won
const getNewCards = (didWin, oldCards, cardDrawn, otherCardDrawn) => {
  // if u win u get other card drawn
  if (didWin) {
    return [
      ...oldCards,
      otherCardDrawn,
    ];
  }
  // if u lose u lose card drawn
  return oldCards.filter(card => !cardMatches(cardDrawn, card));
};

const handleGameOutcomeLogic = (drawCardData, game, player1IsPlayer1) => {
  const { gameData } = game;
  const cardDrawn1 = player1IsPlayer1
    ? gameData.player1Drawn
    : gameData.player2Drawn;
  const cardDrawn2 = player1IsPlayer1
    ? gameData.player2Drawn
    : gameData.player1Drawn;
  const player1Cards = player1IsPlayer1
    ? gameData.player1Cards
    : gameData.player2Cards;
  const player2Cards = player1IsPlayer1
    ? gameData.player2Cards
    : gameData.player1Cards;

  // now calculate the outcome
  const isBattle = cardDrawn1.count === cardDrawn2.count;
  if (isBattle) {
    // for now just let the tie go to the user
    // TODO: put a card down then flip the next
  }
  const player1Wins = cardDrawn1.count > cardDrawn2.count;
  const player1Name = game.players.find((player) => player.isCreator)
    .displayName;
  const player2Name = game.players.find((player) => !player.isCreator)
    .displayName;
  // now set their decks with the result
  const winnerText = player1Wins
    ? `${player1Name} wins.`
    : `${player2Name} wins.`;
  // todo fix
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

  setGameState(drawCardData.gameId, {
    ...game,
    gameData: {
      ...game.gameData,
      player1Drawn: null,
      player2Drawn: null,
      player1Cards: player1NewCards,
      player2Cards: player2NewCards,
      gameStatus: winnerText,
    },
  });
};

// when a card is drawn
const handleDrawCardLogic = (drawCardData, gameState) => {
  console.log('hanlding card draw logic lol== draw card data: ', drawCardData);
  console.log('gameState ', gameState);
  console.log('player that moved', drawCardData.playerId);

  const thisGame = gameState.gameMap[drawCardData.gameId];
  console.log('thisgame,', thisGame);
  if (!thisGame) {
    console.error('Cant find the game! Bye.');
    return false;
  }

  const creator = gameState.gameMap[drawCardData.gameId].players.find(
    (player) => player.isCreator
  );
  const creatorName = creator.displayName;
  const creatorId = creator.id;
  gameState.gameMap[joinGameId].gameData.gameStatus = `Your turn, ${creatorName}`;
  gameState.gameMap[joinGameId].gameData.turn = creatorId;

  // const player1IsPlayer1 = !!thisGame?.players.find(
  //   (player) => player.id === drawCardData.playerId
  // ).isCreator;
  // const hasPlayer1Drawn =
  //   (player1IsPlayer1 && thisGame.gameData.player1Drawn) ||
  //   (!player1IsPlayer1 && thisGame.gameData.player2Drawn);
  // const hasPlayer2Drawn =
  //   (player1IsPlayer1 && thisGame.gameData.player2Drawn) ||
  //   (!player1IsPlayer1 && thisGame.gameData.player1Drawn);

  // let gameStatus = '';
  // if (hasPlayer1Drawn) {
  //   gameStatus += `${player1Name} has drawn. `;
  // }
  // if (hasPlayer2Drawn) {
  //   gameStatus += `${player2Name} has drawn. `;
  // }
  // setGameState(drawCardData.gameId, {
  //   ...thisGame,
  //   gameData: {
  //     ...thisGame.gameData,
  //     player1Drawn: hasPlayer1Drawn,
  //     player2Drawn: hasPlayer2Drawn,
  //     gameStatus: gameStatus,
  //   },
  // });

  socket.emit('gameState', gameState);

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
      handleGameOutcomeLogic(drawCardData, thisGame, player1IsPlayer1);
    }, 1111);
  }
};

