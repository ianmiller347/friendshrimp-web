import React from 'react';
import Shrimp from '../../components/Shrimp';

export interface ShrimpProps {
  key: string;
  shrimpNumber: number;
  leftOffset: number;
  topOffset: number;
  rotation: number;
  index: number;
}

export interface ShrimpsProps {
  shrimps: ShrimpProps[];
}

/**
 * Shrimps
 * @param {shrimps} shrimps
 * @returns shrimps
 */
const Shrimps: React.FC<ShrimpsProps> = ({ shrimps }) =>
  shrimps.length ? (
    shrimps.map((shrimpShrimps) => {
      const { key, ...shrimpProps } = shrimpShrimps;
      return <Shrimp key={key} {...shrimpProps} />;
    })
  ) : (
    <>{' fff '}</>
  );

export default Shrimps;
