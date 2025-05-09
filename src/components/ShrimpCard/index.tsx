import React from 'react';
import { numberArrayFromNumber } from '../../util/arrayHelpers';
import CardSuite from './CardSuite';
import './style.scss';

const royalNames = ['jack', 'queen', 'king', 'ace'] as const;
type RoyalName = (typeof royalNames)[number];

interface Suite {
  name: string;
  color: string;
}

interface ShrimpCardProps {
  shrimpCard?: {
    name: string;
    display: string;
    count: number;
    suite: Suite;
  };
}

interface RoyalDisplayProps {
  card: ShrimpCardProps['shrimpCard'];
}

const RoyalDisplay: React.FC<RoyalDisplayProps> = ({ card }) => {
  // TODO: add switch statement to show jack queen king drawings
  return <CardSuite suite={card?.suite} size={50} />;
};

const ShrimpCard: React.FC<ShrimpCardProps> = ({ shrimpCard }) => {
  if (!shrimpCard) {
    return null;
  }
  const isRoyal = royalNames.includes(shrimpCard.name as RoyalName);
  const numberDisplay = isRoyal
    ? shrimpCard.display.substr(0, 1)
    : shrimpCard.count;
  return (
    <div className={`shrimp-card ${isRoyal && 'shrimp-card--royal'}`}>
      <div className="shrimp-card__number">{numberDisplay}</div>
      <div className="shrimp-card__suites">
        {!isRoyal &&
          numberArrayFromNumber(shrimpCard.count).map((cardNum) => (
            <div key={cardNum} className="suite">
              <CardSuite suite={shrimpCard.suite} />
            </div>
          ))}
        {isRoyal && <RoyalDisplay card={shrimpCard} />}
      </div>
    </div>
  );
};

export default ShrimpCard;
