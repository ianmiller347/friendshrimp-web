import React from 'react';
import ShrimpSvg from '../../../components/ShrimpSvg';

const ShrimpKey = ({ note, keyType, onClick }) => (
  <button 
    className={`shrimp-key shrimp-key--${keyType}`} 
    onClick={e => onClick(e, note)}
    title={note.replace('s','#')}>
    <ShrimpSvg size={75} />
  </button>
);

export default ShrimpKey;
