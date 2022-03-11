import React from 'react';
import ShrimpObjects from './ShrimpObjects';

const propTypes = {
  shrimpNumber: PropTypes.number,
  leftOffset: PropTypes.number,
  topOffset: PropTypes.number,
  rotation: PropTypes.number,
  index: PropTypes.number,
};

const Shrimp = ({ shrimpNumber, leftOffset, topOffset, rotation, index }) => {
  const shrimpSrc = ShrimpObjects[shrimpNumber].default;
  return (
    <img
      src={shrimpSrc}
      alt={`shrimp number ${index} on the page`}
      style={{
        position: `absolute`,
        left: `${leftOffset}px`,
        top: `${topOffset}px`,
        transform: rotation ? `rotate(${rotation}deg)` : 'none',
      }}
    />
  );
};

Shrimp.propTypes = propTypes;

export default Shrimp;
