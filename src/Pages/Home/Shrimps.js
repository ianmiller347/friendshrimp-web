import React from 'react';
import Shrimp from '../../components/Shrimp';

/**
 * Shrimps
 * @param {shrimps} shrimps
 * @returns shrimps
 */
const Shrimps = ({ shrimps }) =>
  shrimps.map((shrimpShrimps) => (
    <Shrimp key={shrimpShrimps.key} {...shrimpShrimps} />
  ));

export default Shrimps;
