import React from 'react';
import Shrimp from '../../components/Shrimp';

interface ShrimpProps {
  key: string;
  shrimpNumber: number;
  leftOffset: number;
  topOffset: number;
  rotation: number;
  index: number;
}

interface ShrimpsProps {
  shrimps: ShrimpProps[];
}

/**
 * Shrimps
 * @param {shrimps} shrimps
 * @returns shrimps
 */
const Shrimps: React.FC<ShrimpsProps> = ({ shrimps }) =>
  shrimps.map((shrimpShrimps) => {
    const { key, ...shrimpProps } = shrimpShrimps;
    return <Shrimp key={key} {...shrimpProps} />;
  });

export default Shrimps;
