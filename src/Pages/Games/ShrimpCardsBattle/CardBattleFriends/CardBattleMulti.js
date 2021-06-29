import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { drawCard, getCardDisplay } from '../gameUtilities';
import ShrimpCard from '../../../../components/ShrimpCard';
import { handleDrawCard, subscribeToCardDrawn } from '../../utilities/socketio';

const INIT_GAME_TEXT = 'Draw a card to begin';

const CardBattleMulti = ({ deck, player1, player2, gameState }) => {
  // we have two players. In client state, "Player 2" is the opponent
  // we have to match up on gameState
  // if player 1, aka current client, is the creator, he matches with player 1 on server
  // if not, then he matches with player 2 on the server.
  const player1Cards = player1.isCreator ? 
    gameState.gameData.player1Cards : gameState.gameData.player2Cards;
  const player2Cards = !player1.isCreator ?
    gameState.gameData.player2Cards : gameState.gameData.player1Cards;
  
  // const [gameStatus, setGameStatus] = useState(gameState.gameData.gameStatus);
  const gameStatus = gameState.gameData.gameStatus;
  console.log('gameState game data??', gameState);
  const [displayPlayer1, setDisplay1] = useState(null);
  const [otherPlayersDisplay, setOtherPlayersDisplay] = useState(null);
  // const [isYourTurn, setIsYourTurn] = useState(false);
  const player1Name = player1.displayName;
  const otherPlayerName = player2.displayName;

  useEffect(() => {
    console.log('game state changed', gameState);
    subscribeToCardDrawn((drawCardData) => {
      console.log('card was drawn', drawCardData);
      // set the display of the other persons move!
      if (drawCardData.playerId !== player1.id) {
        setOtherPlayersDisplay(drawCardData.cardDrawn);
      }
    });
  }, [gameState]);

  // useEffect(() => {
  //   setGameStatus(gameState.gameData.gameStatus);
  // }, [gameState.gameData.gameStatus]);

  const isItYourTurn = !!gameState.turn;

  const drawACard = () => {
    setDisplay1(null);
    // first display the card that player 1 just drew
    const cardDrawn1 = drawCard(player1Cards);
    setTimeout(() => {
      const newCard = {
        gameId: gameState.gameId,
        playerId: player1.id,
        cardDrawn: cardDrawn1,
      };
      console.log('new card', newCard);
      console.log('gameState', gameState);
      handleDrawCard('drawCard', newCard);
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
      {gameHasBegun && (
        <div className="card-battle__scoreboard">
          <div>{player1Name}: {player1Cards.length}</div>
          <div>{otherPlayerName}: {player2Cards.length}</div>
        </div>
      )}
      <h3>{gameStatus}</h3>
      <p>{isItYourTurn && 'its yo turn lol go'}</p>
      <div className="card-battle__displays">
        <div className="card-battle__player-two">
          {otherPlayersDisplay && (
            <>
              <span className="margin-bottom-s">
                {otherPlayerName} has {getCardDisplay(otherPlayersDisplay)}
              </span>
              <ShrimpCard shrimpCard={otherPlayersDisplay} />
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
