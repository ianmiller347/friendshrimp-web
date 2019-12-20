import React from 'react';
import ShrimpKeys from './ShrimpKeys';
import ComputerKeyToNote from './ComputerKeyToNote';
import KeySounds from './KeySounds';
import './style.scss';

class ShrimpKeyboard extends React.Component {
  handleKeyDown = (e) => {
    e.stopPropagation();
    const note = ComputerKeyToNote[e.key];
    if (note) {
      this.playShrimpKey(note);
    }
  }

  handleShrimpKey = (e, note) => {
    e.stopPropagation();
    this.playShrimpKey(note);
  }

  playShrimpKey(note) {
    const shrimpKeySound = new Audio(KeySounds[note]);
    shrimpKeySound.play();
  }
  
  render() {
    return (
      <div className="shrimp-keyboard-container">
        <div className="shrimp-keyboard" onKeyDown={this.handleKeyDown}>
          <ShrimpKeys onClick={this.handleShrimpKey} />
        </div>
      </div>
    );
  }
}

export default ShrimpKeyboard;
