import React, { useEffect, useState } from 'react';
import CardBattleMulti from './CardBattleMulti';

const Game = ({ id, gameState, player1Name }) => {
  const [deck, setDeck] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [cardGameState, setCardGameState] = useState(null);

  console.log('in game', gameState);
  console.log('player 1 name', player1Name);
  console.log('game id', id);

  useEffect(() => {
    // get the game data with this ID
    console.log('in da use effecter', gameState);
    if (gameState?.gameMap[id]) {
      const thisGame = gameState.gameMap[id];
      console.log('this game', thisGame);
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
      console.log('this player', matchingPlayer);
      console.log('that player', otherPlayer);
    }
  }, [gameState, player1Name, id]);

  const roomCode = (<h3>Room Code: <strong>{id}</strong></h3>);

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
        <p>Can't find existing game!</p>
      </div>
    )
  }

  console.log('cardGameState', cardGameState)

  return (
    <CardBattleMulti
      deck={deck}
      player1={player1}
      player2={player2}
      gameState={cardGameState}
    />
  );
}

export default Game;
