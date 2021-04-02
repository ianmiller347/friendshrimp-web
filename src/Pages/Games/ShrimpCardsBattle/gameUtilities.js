import { getRandomInt } from '../../../util/rng';

export const drawCard = (array) => array[getRandomInt(0, array.length)];
export const getCardDisplay = (card) => `${card.name} of ${card.suite.name}`;
export const cardMatches = (card1, card2) => card1.name === card2.name 
  && card1.suite.name === card2.suite.name;

// get new cards based on whether or not you won
export const getNewCards = (didWin, oldCards, cardDrawn, otherCardDrawn) => {
  // if u win u get other card drawn
  if (didWin) {
    return [
      ...oldCards,
      otherCardDrawn,
    ];
  }
  // if u lose u lose card drawn
  return oldCards.filter(card => !cardMatches(cardDrawn, card));
};