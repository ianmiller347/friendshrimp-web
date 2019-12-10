import React from 'react';
import ShrimpKeys from './ShrimpKeys';
import KeySounds from './KeySounds';
import './style.scss';

class ShrimpKeyboard extends React.Component {
  handleShrimpKey = (e, note) => {
    // playSound(note);
    console.log('playing a shrimp sound. note: ', note)
    console.log('file: ', KeySounds[note]);
    e.stopPropagation();
    const shrimpKeySound = new Audio(KeySounds[note]);
    shrimpKeySound.play();
  }
  
  render() {
    return (
      <div className="shrimp-keyboard-container">
        <div className="shrimp-keyboard">
          <ShrimpKeys onClick={this.handleShrimpKey} />
        </div>
      </div>
    );
  }
}

export default ShrimpKeyboard;
