import React, { useState, useEffect } from 'react';
import { getRandomInt } from '../../../util/rng';

const drawCard = (array) => array[getRandomInt(0, array.length)];
const getCardDisplay = (card) => `${card.name} of ${card.suite.name}`;
const cardMatches = (card1, card2) => card1.name === card2.name 
  && card1.suite.name === card2.suite.name;

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
  setDisplay1('');
  setDisplay2('');
  // first display a card that player 2 just drew
  const cardDrawn2 = drawCard(player2Cards);
  setDisplay2(getCardDisplay(cardDrawn2));
  // now after a timeout, display a card that player 1 just drew
  const cardDrawn1 = drawCard(player1Cards);
  setTimeout(() => setDisplay1(getCardDisplay(cardDrawn1)), 400);
  // now calculate the outcome
  const isBattle = cardDrawn1.count === cardDrawn2.count;
  if (isBattle) {
    // for now just let the tie go to the user
    // TODO: put a card down then flip the next
  }
  const player1Wins = cardDrawn1.count > cardDrawn2.count;
  // now set their decks with the result
  const winnerText = player1Wins ? 'Computer wins.' : 'You win!';
  setTimeout(() => setGameStatus(winnerText), 1500);
  // todo fix 
  const player1NewCards = [
    ...player1Cards.filter(card => player1Wins || (!player1Wins && !cardMatches(cardDrawn1, card))),
    player1Wins && cardDrawn2,
  ];
  const player2NewCards = [
    ...player2Cards.filter(card => !player1Wins || (player1Wins && !cardMatches(cardDrawn2, card))),
    !player1Wins && cardDrawn1,
  ];
  setPlayer1Cards(player1NewCards);
  setPlayer2Cards(player2NewCards);
}

const CardBattle = ({ deck }) => {
  // we have two players. right now it is computer vs user
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [displayPlayer1, setDisplay1] = useState('');
  const [displayPlayer2, setDisplay2] = useState('');
  const [gameStatus, setGameStatus] = useState('');
  useEffect(() => {
    const deckFirstHalf = deck && deck.length ? deck.splice(0, 25) : [];
    const deckSecondHalf = deck && deck.length ? deck.splice(26, deck.length) : [];
    setPlayer1Cards(deckFirstHalf);
    setPlayer2Cards(deckSecondHalf);
  }, [deck]);

  if (!deck || !deck.length) {
    return null;
  }

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
      {gameStatus && <h3>{gameStatus}</h3>}
      <div className="card-battle__player-one">
        {displayPlayer1 && displayPlayer1}
      </div>
      <div className="card-battle__player-two">
        {displayPlayer2}
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
