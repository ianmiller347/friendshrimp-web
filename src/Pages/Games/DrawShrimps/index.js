import React from 'react';
import ShrimpDrawing from './ShrimpDrawing';
import './style.scss';

class DrawShrimps extends React.Component {
  state = {
    nameInput: '',
    shrimps: []
  }

  handleDraw = () => {
    const { nameInput } = this.state;
    const newShrimp = {
      text: nameInput,
    };
    if (this.state.shrimps.length > 0) {
      this.setState(prevState => ({
        shrimps: [
          ...prevState.shrimps,
          newShrimp,
        ],
      }));
    }
    else {
      this.setState({
        shrimps: [newShrimp]
      });
    }
  }

  render() {
    return (
      <div className="draw-shrimps-container">
        <input type="text" value={this.state.nameInput} name="nameInput" onChange={e => this.setState({ nameInput: e.target.value })} />
        <button onClick={this.handleDraw}>Draw it</button>
        <div className="shrimp-drawings">
          {this.state.shrimps.map(shrimp => <ShrimpDrawing text={shrimp.text} key={shrimp.text} />)}
        </div>
      </div>
    );
  }
}

export default DrawShrimps;
