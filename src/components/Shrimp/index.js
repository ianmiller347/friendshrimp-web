import React from 'react';
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
  // took away .default from the next line now that type: module is removed
  const shrimpSrc = ShrimpObjects[shrimpNumber];
  return (
    <img
      src={shrimpSrc}
      alt={`shrimp number ${index} on the page`}
      className="shrimp__image"
      style={{
        left: `${leftOffset}px`,
        top: `${topOffset}px`,
        transform: rotation ? `rotate(${rotation}deg)` : 'none',
      }}
    />
  );
};

Shrimp.propTypes = propTypes;

export default Shrimp;
