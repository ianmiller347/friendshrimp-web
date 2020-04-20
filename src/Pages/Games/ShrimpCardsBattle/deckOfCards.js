import { numberArrayFromNumber } from '../../../util/arrayHelpers';

const suites = [
  {
    name: 'crab',
    color: 'blue',
  },
  {
    name: 'oyster',
    color: 'blue',
  },
  {
    name: 'shrimp',
    color: 'red',
  },
  {
    name: 'lobster',
    color: 'red',
  },
];

export const cardTypes = [
  {
    name: 'ace',
    display: 'Ace',
    count: 1,
  },
  ...numberArrayFromNumber(10).filter(item => item !== 1).map(item => ({
    name: `${item}`,
    display: `${item}`,
    count: item,
  })),
  {
    name: 'jack',
    display: 'Jack',
    count: 11,
  },
  {
    name: 'queen',
    display: 'Queen',
    count: 12,
  },
  {
    name: 'king',
    display: 'King',
    count: 13,
  },
];

// returns array of cards with format
// { name, display, count, suite }
export const getShuffledDeck = () => {
  const orderedDeck = cardTypes.map(cardType => 
    suites.map(suite => ({ ...cardType, suite })))
    .flat();
  // now just return the shuffled deck
  return orderedDeck.sort(() => Math.random() - .5);
};
