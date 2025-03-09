import React from 'react';
import ShrimpKeys from './ShrimpKeys';
import ComputerKeyToNote from './ComputerKeyToNote';
import KeySounds from './KeySounds';
import './style.scss';

class ShrimpKeyboard extends React.Component {
  constructor() {
    super();

    const keySounds = {};
    Object.keys(KeySounds).forEach((key) => {
      // had to remove default here too
      keySounds[key] = new Audio(KeySounds[key]);
    });

    this.keySounds = keySounds;
  }

  handleKeyDown = (e) => {
    e.stopPropagation();
    const note = ComputerKeyToNote[e.key];
    if (note) {
      this.playShrimpKey(note);
    }
  };

  handleShrimpKey = (e, note) => {
    e.stopPropagation();
    this.playShrimpKey(note);
  };

  playShrimpKey(note) {
    const shrimpKeySound = this.keySounds[note];
    shrimpKeySound.pause();
    // this looks dumb but it's actually necessary to do the actual stop n reset retrigger
    // eslint-disable-next-line no-self-assign
    shrimpKeySound.src = shrimpKeySound.src;
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

export { default as ShrimpKeyboardPreview } from './Preview';

export default ShrimpKeyboard;
