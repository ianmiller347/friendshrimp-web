import React from 'react';
import Shrimp from '../../components/Shrimp';

const Shrimps = ({ shrimps }) => shrimps.map(shrimpProps => <Shrimp {...shrimpProps} />);

export default Shrimps;