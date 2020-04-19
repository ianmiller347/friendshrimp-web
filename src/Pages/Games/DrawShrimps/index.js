import React, { useState } from 'react';
import { getRandomInt } from '../../../util/rng';
import ShrimpDrawing from './ShrimpDrawing';
import './style.scss';

const ENTER_KEY = 'Enter';

const produceShrimp = (currentShrimps, nameInput) => {
    const newShrimp = {
      text: nameInput,
      size: getRandomInt(100,400),
    };
    if (currentShrimps.length > 0) {
      return [
        ...currentShrimps,
        newShrimp,
      ];
    }
    return [newShrimp];
}

const onSubmit = (shrimps, setShrimps, nameInput, setNameInput) => {
  setShrimps(produceShrimp(shrimps, nameInput));
  setNameInput('');
}

const handleKeyDown = (e, shrimps, setShrimps, nameInput, setNameInput) => {
  // dont do anything unless ENTER has been pressed
  if (e.key !== ENTER_KEY) {
    return;
  }
  onSubmit(shrimps, setShrimps, nameInput, setNameInput);
}

const DrawShrimps = () => {
  const [nameInput, setNameInput] = useState('');
  const [shrimps, setShrimps] = useState([]);

  return (
    <div className="draw-shrimps-container">
      <input 
        type="text"
        value={nameInput}
        name="nameInput"
        placeholder="give your shrimp a name"
        className="draw-shrimps__input"
        onChange={e => setNameInput(e.target.value )}
        onKeyPress={e => handleKeyDown(e, shrimps, setShrimps, nameInput, setNameInput)}
      />
      <button 
        className="draw-shrimps__button" 
        onClick={() => onSubmit(shrimps, setShrimps, nameInput, setNameInput)}
      >
        Draw it
      </button>
      <div className="shrimp-drawings">
        {shrimps.map(shrimp => 
          <ShrimpDrawing {...shrimp} key={shrimp.text} />
        )}
      </div>
    </div>
  );
};

export default DrawShrimps;
