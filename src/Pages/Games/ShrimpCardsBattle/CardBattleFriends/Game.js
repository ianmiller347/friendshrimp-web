import React, { useEffect, useState } from 'react';
import CardBattleMulti from './CardBattleMulti';

const Game = ({ id, gameState, player1Name }) => {
  const [deck, setDeck] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [cardGameState, setCardGameState] = useState(null);

  useEffect(() => {
    // get the game data with this ID
    if (gameState?.gameMap[id]) {
      const thisGame = gameState.gameMap[id];
      setCardGameState(thisGame);
      setDeck(thisGame.gameData.deck);
      const matchingPlayer = thisGame.players.find(
        (player) => player.displayName === player1Name
      );
      const otherPlayer = thisGame.players.find(
        (player) => player.displayName !== player1Name
      );
      setPlayer1(matchingPlayer);
      setPlayer2(otherPlayer);
    }
  }, [gameState, player1Name, id]);

  const roomCode = (
    <h3>
      Room Code: <strong>{id}</strong>
    </h3>
  );

  if (!player1 || !player2) {
    return (
      <div>
        {roomCode}
        <p>Waiting for player to join...</p>
      </div>
    );
  }

  if (!deck) {
    return (
      <div>
        {roomCode}
        <p>Can&apos;t find existing game!</p>
      </div>
    );
  }

  return (
    <CardBattleMulti
      deck={deck}
      player1={player1}
      player2={player2}
      gameState={cardGameState}
    />
  );
};

export default Game;
