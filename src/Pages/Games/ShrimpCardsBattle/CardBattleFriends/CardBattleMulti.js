import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { drawCard, getCardDisplay } from '../gameUtilities';
import ShrimpCard from '../../../../components/ShrimpCard';
import {
  handleDrawCard,
  subscribeToDrawCardError,
  subscribeToDisconnect,
  subscribeToConnect,
  isSocketConnected,
} from '../../utilities/socketio';
import './CardBattleMulti.scss';

const INIT_GAME_TEXT = 'Draw a card to begin';

const CardBattleMulti = ({ deck, player1, player2, gameState }) => {
  // we have two players. In client state, "Player 2" is the opponent
  // we have to match up on gameState
  // if player 1, aka current client, is the creator, he matches with player 1 on server
  // if not, then he matches with player 2 on the server.
  const player1Cards = player1.isCreator
    ? gameState.gameData.player1Cards
    : gameState.gameData.player2Cards;
  const player2Cards = !player1.isCreator
    ? gameState.gameData.player2Cards
    : gameState.gameData.player1Cards;

  const gameStatus = gameState.gameData.gameStatus;
  console.log('gameState game data??', gameState);

  // Get drawn cards from gameState - these are updated by the server
  // If player1 is creator, they are player1 on server, otherwise player2
  const player1Drawn = player1.isCreator
    ? gameState.gameData.player1Drawn
    : gameState.gameData.player2Drawn;
  const player2Drawn = !player1.isCreator
    ? gameState.gameData.player1Drawn
    : gameState.gameData.player2Drawn;

  const player1Name = player1.displayName;
  const otherPlayerName = player2.displayName;

  const [errorMessage, setErrorMessage] = useState(null);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [gameExists, setGameExists] = useState(true);

  // Check if game exists in gameState
  useEffect(() => {
    if (!gameState || !gameState.gameId) {
      setGameExists(false);
      setErrorMessage('Game not found. You may have been disconnected.');
    } else {
      setGameExists(true);
      // Clear error if game is found again
      setErrorMessage((prev) => {
        if (prev && prev.includes('Game not found')) {
          return null;
        }
        return prev;
      });
    }
  }, [gameState]);

  // Handle disconnect/connect
  useEffect(() => {
    subscribeToDisconnect(() => {
      console.log('Socket disconnected');
      setIsDisconnected(true);
      setErrorMessage('Connection lost. Please refresh the page.');
    });

    subscribeToConnect(() => {
      console.log('Socket connected');
      setIsDisconnected(false);
      setErrorMessage((prev) => {
        if (prev === 'Connection lost. Please refresh the page.') {
          return null;
        }
        return prev;
      });
    });

    subscribeToDrawCardError((error) => {
      console.error('Draw card error:', error);
      setErrorMessage(error);
      setGameExists(false);
    });
  }, []);

  const isItYourTurn = gameState.gameData.turn === player1.id;

  const drawACard = () => {
    if (!isItYourTurn) {
      return; // Don't allow drawing if it's not your turn
    }

    // Check if socket is connected
    if (!isSocketConnected()) {
      setErrorMessage('Not connected to server. Please refresh the page.');
      return;
    }

    // Check if game exists
    if (!gameExists) {
      setErrorMessage('Game not found. The game may have ended.');
      return;
    }

    // Clear any previous errors
    setErrorMessage(null);

    // Draw a card from the local deck
    const cardDrawn1 = drawCard(player1Cards);

    // Send to server - server will update gameState and broadcast to all players
    const newCard = {
      gameId: gameState.gameId,
      playerId: player1.id,
      cardDrawn: cardDrawn1,
    };
    console.log('Drawing card:', newCard);
    const success = handleDrawCard('drawCard', newCard);

    if (!success) {
      setErrorMessage(
        'Failed to send card draw. Please check your connection.'
      );
      return;
    }

    ReactGA.event({
      category: 'shrimp-cards-battle',
      action: 'player-draw',
      value: 1,
    });
  };

  if (!deck || !deck.length) {
    return null;
  }

  // Show error message if game doesn't exist or disconnected
  if (!gameExists || isDisconnected) {
    return (
      <div className="card-battle">
        <div
          className="error-message"
          style={{ color: 'red', padding: '20px' }}
        >
          <h3>Connection Error</h3>
          <p>{errorMessage || 'Game not found or connection lost.'}</p>
          <p>Please refresh the page to reconnect.</p>
        </div>
      </div>
    );
  }

  console.log('game status', gameStatus);

  const gameHasBegun = gameStatus !== INIT_GAME_TEXT;
  const gameIsOver = !player1Cards.length || !player2Cards.length;
  if (gameIsOver) {
    const message = !player1Cards.length
      ? `${otherPlayerName} won. ${player1Name} has no more cards.`
      : `${player1Name} won. ${otherPlayerName} has no more cards.`;
    return (
      <div>
        <h3>{message}</h3>
      </div>
    );
  }

  return (
    <div className="card-battle">
      {errorMessage && (
        <div
          className="error-message"
          style={{ color: 'red', marginBottom: '10px' }}
        >
          {errorMessage}
        </div>
      )}
      {gameHasBegun && (
        <div className="card-battle__scoreboard">
          <div>
            {player1Name}: {player1Cards.length}
          </div>
          <div>
            {otherPlayerName}: {player2Cards.length}
          </div>
        </div>
      )}
      <h3>{gameStatus}</h3>
      {isItYourTurn && <p>It's your turn! Draw a card.</p>}
      {!isItYourTurn && <p>Waiting for {otherPlayerName} to draw...</p>}
      <div className="card-battle__displays">
        <div className="card-battle__player-two">
          {player2Drawn && (
            <>
              <span className="margin-bottom-s">
                {otherPlayerName} has {getCardDisplay(player2Drawn)}
              </span>
              <ShrimpCard shrimpCard={player2Drawn} />
            </>
          )}
        </div>
        <div className="card-battle__player-one">
          {player1Drawn && (
            <>
              <span className="margin-bottom-s">
                {player1Name} has {getCardDisplay(player1Drawn)}
              </span>
              <ShrimpCard shrimpCard={player1Drawn} />
            </>
          )}
        </div>
      </div>
      <div className="card-battle__go">
        <button
          className="card-battle__button button"
          onClick={() => drawACard()}
          disabled={!isItYourTurn || isDisconnected || !gameExists}
        >
          {isDisconnected || !gameExists
            ? 'Connection Lost'
            : isItYourTurn
            ? 'Draw'
            : 'Wait for your turn'}
        </button>
      </div>
    </div>
  );
};

export default CardBattleMulti;
