import React from 'react';
import Shrimp from '../../components/Shrimp';

const Shrimps = ({ shrimps }) =>
  shrimps.map((shrimpProps) => (
    <Shrimp key={shrimpProps.key} {...shrimpProps} />
  ));

export default Shrimps;
