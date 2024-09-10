import React from 'react';
import ShrimpKey from './ShrimpKey';

const SHRIMP_KEY_DATA = [
  {
    note: 'C',
    keyType: 'white',
  },
  {
    note: 'Cs',
    keyType: 'black',
  },
  {
    note: 'D',
    keyType: 'white',
  },
  {
    note: 'Ds',
    keyType: 'black',
  },
  {
    note: 'E',
    keyType: 'white',
  },
  {
    note: 'F',
    keyType: 'white',
  },
  {
    note: 'Fs',
    keyType: 'black',
  },
  {
    note: 'G',
    keyType: 'white',
  },
  {
    note: 'Gs',
    keyType: 'black',
  },
  {
    note: 'A',
    keyType: 'white',
  },
  {
    note: 'As',
    keyType: 'black',
  },
  {
    note: 'B',
    keyType: 'white',
  },
];

const ShrimpKeys = ({ onClick }) => (
  <>
    {SHRIMP_KEY_DATA.map((shrimpKey) => (
      <ShrimpKey
        key={shrimpKey.note}
        onClick={onClick}
        note={shrimpKey.note}
        keyType={shrimpKey.keyType}
      />
    ))}
  </>
);

export default ShrimpKeys;
