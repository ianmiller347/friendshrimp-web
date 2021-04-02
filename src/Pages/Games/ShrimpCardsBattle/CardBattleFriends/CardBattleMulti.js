import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { drawCard, getCardDisplay } from '../gameUtilities';
import ShrimpCard from '../../../../components/ShrimpCard';

const CardBattleMulti = ({ deck, player1, player2, gameState, socket }) => {
  // we have two players. In client state, "Player 2" is the opponent
  // we have to match up on gameState
  // if player 1, aka current client, is the creator, he matches with player 1 on server
  // if not, then he matches with player 2 on the server.
  const player1Cards = player1.isCreator ? 
    gameState.gameData.player1Cards : gameState.gameData.player2Cards;
  const player2Cards = !player1.isCreator ?
    gameState.gameData.player2Cards : gameState.gameData.player1Cards;
  
  const { gameId, gameStatus } = gameState.gameData;
  const [displayPlayer1, setDisplay1] = useState(null);
  const [displayPlayer2, setDisplay2] = useState(null);
  const player1Name = player1.displayName;
  const player2Name = player2.displayName;

  useEffect(() => {
    socket.on('drawCard', (drawCardData) => {
      if (drawCardData.playerId !== player1.id) {
        setDisplay2(drawCardData.cardDrawn);
      }
    });
  }, []);

  const drawACard = () => {
    setDisplay1(null);
    setDisplay2(null);
    // first display the card that player 1 just drew
    const cardDrawn1 = drawCard(player1Cards);
    setTimeout(() => {
      socket.emit('drawCard', {
        gameId,
        playerId: player1.id,
        cardDrawn: cardDrawn1,
      });
      setDisplay1(cardDrawn1);
    }, 200);
    
    ReactGA.event({
      category: 'shrimp-cards-battle',
      action: 'player-draw',
      value: 1,
    });
  };

  if (!deck || !deck.length) {
    return null;
  }

  const gameHasBegun = gameStatus !== INIT_GAME_TEXT;
  const gameIsOver = !player1Cards.length || !player2Cards.length;
  if (gameIsOver) {
    const message = !player1Cards.length 
      ? `${player2Name} won. ${player1Name} has no more cards.`
      : `${player1Name} won. ${player2Name} has no more cards.`;
    return (
      <div>
        <h3>{message}</h3>
      </div>
    );
  }

  return (
    <div className="card-battle">
      {gameHasBegun && (
        <div className="card-battle__scoreboard">
          <div>{player1Name}: {player1Cards.length}</div>
          <div>{player2Name}: {player2Cards.length}</div>
        </div>
      )}
      <h3>{gameStatus}</h3>
      <div className="card-battle__displays">
        <div className="card-battle__player-two">
          {displayPlayer2 && (
            <>
              <span className="margin-bottom-s">
                {player2Name} has {getCardDisplay(displayPlayer2)}
              </span>
              <ShrimpCard shrimpCard={displayPlayer2} />
            </>
          )}
        </div>
        <div className="card-battle__player-one">
          {displayPlayer1 && (
            <>
              <span className="margin-bottom-s">
                {player1Name} has {getCardDisplay(displayPlayer1)}
              </span>
              <ShrimpCard shrimpCard={displayPlayer1} />
            </>
          )}
        </div>
      </div>
      <div className="card-battle__go">
        <button 
          className="card-battle__button button" 
          onClick={() => drawACard()}
        >
          Draw
        </button>
      </div>
    </div>
  );
};

export default CardBattleMulti;
