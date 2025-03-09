import React, { useState } from 'react';
import { getShuffledDeck } from './deckOfCards';
import CardBattle from './CardBattle';
import { Link } from 'react-router-dom';
import './style.scss';
import ShrimpCard from '../../../components/ShrimpCard';

const ShrimpCardsBattle = () => {
  const [deck, createDeck] = useState([]);
  const showBattle = !!(deck && deck.length);

  return (
    <div className="shrimp-cards-container">
      <button
        className="shrimp-cards__button button"
        onClick={() => createDeck(getShuffledDeck)}
      >
        New game vs. RNG bot
      </button>
      <Link
        className="shrimp-cards__button button"
        to="/games/card-battle/friend"
      >
        New game vs. friend
      </Link>
      {showBattle && <CardBattle deck={deck} />}
    </div>
  );
};

const shrimpCard = {
  name: 'ace',
  display: 'Ace',
  count: 1,
};

export const ShrimpCardsBattlePreview = () => (
  <div className="display-flex justify-content-center">
    <ShrimpCard shrimpCard={shrimpCard} />
  </div>
);

export default ShrimpCardsBattle;
