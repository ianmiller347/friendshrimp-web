import React, { useState } from 'react';
import ShrimpObjects from './ShrimpObjects';
import './Shrimp.scss';

interface ShrimpProps {
  shrimpNumber: number;
  leftOffset: number;
  topOffset: number;
  rotation: number;
  index: number;
}

const Shrimp: React.FC<ShrimpProps> = ({
  shrimpNumber,
  leftOffset,
  topOffset,
  rotation,
  index,
}) => {
  const [scalingOrNah, setScaling] = useState<'nah' | 'scaling'>('nah');

  const handleOnTouchMoveCapture = () => {
    setScaling('scaling');
  };

  const classNames = [
    'shrimp__image',
    `shrimp__image--rotation${rotation}`,
    `shrimp__image--scaling-${scalingOrNah}`,
  ].join(' ');

  const shrimpSrc = ShrimpObjects[shrimpNumber] as string;
  return (
    <img
      src={shrimpSrc}
      alt={`shrimp number ${index} on the page`}
      className={classNames}
      onTouchMoveCapture={handleOnTouchMoveCapture}
      aria-roledescription="shrimp"
      style={{
        left: `${leftOffset}px`,
        top: `${topOffset}px`,
      }}
    />
  );
};

export default Shrimp;
