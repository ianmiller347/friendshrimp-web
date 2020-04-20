import React from 'react';
import ShrimpSvg from '../ShrimpSvg';
import Oyster from './Oyster';
import Crab from './Crab';
import Lobster from './Lobster';

const CardSuite = ({ suite, size }) => {
  const svgAttributes = {
    size: size || 25,
    className: suite.color,
  };
  switch (suite.name) {
    case 'lobster':
      return <Lobster {...svgAttributes} />;
    case 'crab':
      return <Crab {...svgAttributes} />;
    case 'oyster':
      return <Oyster {...svgAttributes} />;
    default:
      return <ShrimpSvg {...svgAttributes} />;
  }
};

export default CardSuite;
