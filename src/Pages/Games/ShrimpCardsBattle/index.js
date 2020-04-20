import React, { useState } from 'react';
import { getShuffledDeck } from './deckOfCards';
import CardBattle from './CardBattle';
import './style.scss';

const ShrimpCardsBattle = () => {
  const [deck, createDeck] = useState([]);
  const showBattle = !!(deck && deck.length);

  return (
    <div className="shrimp-cards-container">
      <button 
        className="shrimp-cards__button button" 
        onClick={() => createDeck(getShuffledDeck)}
      >
        New game
      </button>
      {showBattle && <CardBattle deck={deck} />}
    </div>
  );
};

export default ShrimpCardsBattle;
