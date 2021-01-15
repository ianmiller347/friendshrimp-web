import React from 'react';
import ShrimpSvg from '../../../components/ShrimpSvg';

const Shrimps = ({ shrimps, currentStatusColor }) => shrimps.map(shrimp => (
  <div className="shrimp" key={shrimp.name}>
    <ShrimpSvg size={50} fill={currentStatusColor} />
  </div>
));

export default Shrimps;