import React, { useState } from 'react';
import { getShuffledDeck } from './deckOfCards';
import CardBattle from './CardBattle';
import './style.scss';
import { Link } from 'react-router-dom';

const ShrimpCardsBattle = () => {
  const [deck, createDeck] = useState([]);
  const showBattle = !!(deck && deck.length);

  return (
    <div className="shrimp-cards-container">
      <button 
        className="shrimp-cards__button button" 
        onClick={() => createDeck(getShuffledDeck)}
      >
        New game against random number generator
      </button>
      <Link 
        className="shrimp-cards__button button" 
        to="/games/card-battle/friend"
      >
        New game against friend
      </Link>
      {showBattle && <CardBattle deck={deck} />}
    </div>
  );
};

export default ShrimpCardsBattle;
