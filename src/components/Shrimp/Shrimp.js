import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShrimpObjects from './ShrimpObjects';
import './Shrimp.scss';

const propTypes = {
  shrimpNumber: PropTypes.number,
  leftOffset: PropTypes.number,
  topOffset: PropTypes.number,
  rotation: PropTypes.number,
  index: PropTypes.number,
};

const Shrimp = ({ shrimpNumber, leftOffset, topOffset, rotation, index }) => {
  const [scalingOrNah, setScaling] = useState('nah');

  const handleOnTouchMoveCapture = () => {
    setScaling('scaling');
  };

  const classNames = [
    'shrimp__image',
    `shrimp__image--rotation${rotation}`,
    `shrimp__image--scaling-${scalingOrNah}`,
  ].join(' ');

  // took away .default from the next line now that type: module is removed
  const shrimpSrc = ShrimpObjects[shrimpNumber];
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

Shrimp.propTypes = propTypes;

export default Shrimp;
