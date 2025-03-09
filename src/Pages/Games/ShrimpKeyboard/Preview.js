import React from 'react';
import ShrimpKeys from './ShrimpKeys';
import './style.scss';

const Preview = () => {
  return (
    <div className="shrimp-keyboard-container shrimp-keyboard-container--preview">
      <div className="shrimp-keyboard">
        <ShrimpKeys />
      </div>
    </div>
  );
};

export default Preview;
