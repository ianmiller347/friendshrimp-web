import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { drawCard, getCardDisplay, getNewCards } from './gameUtilities';
import ShrimpCard from '../../../components/ShrimpCard';

const player2Draw = (
  player1Cards, 
  setPlayer1Cards, 
  player2Cards, 
  setPlayer2Cards, 
  setDisplay1, 
  setDisplay2,
  setGameStatus
) => {
  setGameStatus('drawing...');
  setDisplay1(null);
  setDisplay2(null);
  // first display a card that player 2 just drew
  const cardDrawn2 = drawCard(player2Cards);
  setTimeout(() => setDisplay2(cardDrawn2), 200);
  // now after a timeout, display a card that player 1 just drew
  const cardDrawn1 = drawCard(player1Cards);
  setTimeout(() => setDisplay1(cardDrawn1), 600);

  // now calculate the outcome
  const isBattle = cardDrawn1.count === cardDrawn2.count;
  if (isBattle) {
    // for now just let the tie go to the user
    // TODO: put a card down then flip the next
  }
  const player1Wins = cardDrawn1.count > cardDrawn2.count;
  // now set their decks with the result
  const winnerText = player1Wins ? 'Computer wins.' : 'You win!';
  setTimeout(() => setGameStatus(winnerText), 650);
  // todo fix 
  const player1NewCards = getNewCards(player1Wins, player1Cards, cardDrawn1, cardDrawn2);
  const player2NewCards = getNewCards(!player1Wins, player2Cards, cardDrawn2, cardDrawn1);
  setPlayer1Cards(player1NewCards);
  setPlayer2Cards(player2NewCards);
  ReactGA.event({
    category: 'shrimp-cards-battle',
    action: 'player-2-draw',
    value: 1,
  });
}

const INIT_GAME_TEXT = 'Draw a card to begin';

const CardBattle = ({ deck }) => {
  // we have two players. right now it is computer vs user
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [displayPlayer1, setDisplay1] = useState(null);
  const [displayPlayer2, setDisplay2] = useState(null);
  const [gameStatus, setGameStatus] = useState(INIT_GAME_TEXT);
  useEffect(() => {
    const deckFirstHalf = deck && deck.length ? deck.slice(0, 26) : [];
    const deckSecondHalf = deck && deck.length ? deck.slice(26, deck.length) : [];
    setPlayer1Cards(deckFirstHalf);
    setPlayer2Cards(deckSecondHalf);
    setDisplay1(null);
    setDisplay2(null);
    setGameStatus(INIT_GAME_TEXT);
  }, [deck]);

  if (!deck || !deck.length) {
    return null;
  }

  const gameHasBegun = gameStatus !== INIT_GAME_TEXT;
  const gameIsOver = !player1Cards.length || !player2Cards.length;
  if (gameIsOver) {
    const message = !player1Cards.length 
      ? 'You won. Computer has no cards.'
      : 'Computer won. You have no more cards.';
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
          <div>Computer: {player1Cards.length}</div>
          <div>You: {player2Cards.length}</div>
        </div>
      )}
      <h3>{gameStatus}</h3>
      <div className="card-battle__displays">
        <div className="card-battle__player-one">
          {displayPlayer1 && (
            <>
              <span className="margin-bottom-s">
                Computer has {getCardDisplay(displayPlayer1)}
              </span>
              <ShrimpCard shrimpCard={displayPlayer1} />
            </>
          )}
        </div>
        <div className="card-battle__player-two">
          {displayPlayer2 && (
            <>
              <span className="margin-bottom-s">
                You have {getCardDisplay(displayPlayer2)}
              </span>
              <ShrimpCard shrimpCard={displayPlayer2} />
            </>
          )}
        </div>
      </div>
      <div className="card-battle__go">
        <button 
          className="card-battle__button button" 
          onClick={() => player2Draw(player1Cards, setPlayer1Cards, player2Cards, setPlayer2Cards, setDisplay1, setDisplay2, setGameStatus)}
        >
          Draw
        </button>
      </div>
    </div>
  );
};

export default CardBattle;
