import React from 'react';
import PropTypes from 'prop-types';
import { numberArrayFromNumber } from '../../util/arrayHelpers';
import CardSuite from './CardSuite';
import './style.scss';

const royalNames = [
  'jack',
  'queen',
  'king',
  'ace'
];

const RoyalDisplay = ({ card }) => {
  // TODO: add switch statement to show jack queen king drawings
  return <CardSuite suite={card.suite} size={50} />
}

const ShrimpCard = ({ shrimpCard }) => {
  if (!shrimpCard) {
    return null;
  }
  const isRoyal = royalNames.includes(shrimpCard.name);
  const numberDisplay = isRoyal 
    ? shrimpCard.display.substr(0, 1)
    : shrimpCard.count;
  return (
    <div className={`shrimp-card ${isRoyal && 'shrimp-card--royal'}`}>
      <div className="shrimp-card__number">
        {numberDisplay}
      </div>
      <div className="shrimp-card__suites">
        {!isRoyal && numberArrayFromNumber(shrimpCard.count).map(cardNum => 
          <div key={cardNum} className="suite">
            <CardSuite suite={shrimpCard.suite} />
          </div>
        )}
        {isRoyal && (
          <RoyalDisplay card={shrimpCard} />
        )}
      </div>
    </div>
  )
};

ShrimpCard.propTypes = {
  shrimpCard: PropTypes.shape({
    name: PropTypes.string,
    display: PropTypes.string,
    count: PropTypes.number,
    suite: PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    })
  })
}

export default ShrimpCard;
