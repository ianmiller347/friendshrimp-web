import React from 'react';
import { getRandomInt, getStatusColorFromRandomInt } from '../../../util/rng';
import ShrimpSvg from '../../../components/ShrimpSvg';
import Egg from './Egg';
import './style.scss';

class ShrimpDivider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shrimps: [],
      bottomNumber: 0,
      topNumber: 100,
      yourRecord: 0,
    };
  }

  divideShrimps = (e) => {
    this.setState(prevState => {
      const shrimps = [
        ...prevState.shrimps,
        {
          name: `shrimp-${prevState.shrimps.length + 1}`
        },
      ];
      const yourRecord = prevState.shrimps.length + 1 > prevState.yourRecord ? 
        prevState.shrimps.length + 1 : prevState.yourRecord;
      return {
        topNumber: getRandomInt(prevState.bottomNumber, prevState.topNumber),
        shrimps,
        yourRecord,
      };
    });
  }

  resetGame = (e) => {
    this.setState({
      topNumber: 100,
      shrimps: [],
    });
  }

  render() {
    const {
      topNumber,
      shrimps,
      yourRecord,
    } = this.state;

    const currentStatusColor = getStatusColorFromRandomInt(topNumber, 100);
    const topGradient = `#a70e0e 100%`;
    const middleGradient = `${currentStatusColor} ${Math.ceil(topNumber)}%`;
    const linearGradient = `linear-gradient(90deg, rgb(34,180,0) 0%, ${middleGradient}, ${topGradient})`;

    const juiceBarStyle = {
      backgroundColor: currentStatusColor,
      color: topNumber > 50 ? 'black' : 'white',
      background: topNumber > 0 ? linearGradient : 'black',
    };

    const isNewRecord = topNumber === 0 && yourRecord === shrimps.length;

    return (
      <div className="shrimp-divider">
        <div className="explanation-container">
          <h2>How many shrimps can u get?</h2>
          <p>Hit the juice to get more shrimps. Get as many shrimps as u can till u get the goose egg.</p>
          {this.renderJuiceHit(topNumber)}
        </div>
        <div className="results-container">
          <div className="remaining-juice">
            <div className="juice-bar" style={juiceBarStyle}>
                Shrimp juice remaining: {topNumber}
            </div>
          </div>
          <div className="shrimps-container">
            {this.renderShrimps(shrimps, currentStatusColor)}
          </div>
          <div className="shrimp-count">
            You got {shrimps.length} shrimps
          </div>
          <div className={`record-container ${isNewRecord ? 'new-record' : ''}`}>
            {yourRecord > 0 && 
              <>
                {isNewRecord && <p>New record!</p>}
                <span>Your record: </span>
                <strong>{yourRecord} shrimps</strong>
              </>
            }
          </div>
        </div>
        <div className="buttons-container">
          <button 
            className="button get-juice" 
            onClick={(e) => this.divideShrimps(e)}
            disabled={topNumber === 0}>
            hit the juice
          </button>
          {
            topNumber === 0 && <button className="button reset" onClick={this.resetGame}>Restart</button>
          }
        </div>
      </div>
    );
  }

  renderJuiceHit(topNumber) {
    if (topNumber === 0) {
      return (
        <div>
          <div><Egg size={69} /></div>
          <p className="hit-status">You hit the goose egg! You are all out of shrimp juice :(</p>
        </div>
      )
    }

    if (topNumber < 100) {
      return <p>You hit {100 - topNumber} shrimp juice :o</p>
    }
    return null;
  }

  renderShrimps(shrimps, currentStatusColor) {
    return (
      <>
        {
          shrimps.map(shrimp => (
            <div className="shrimp" key={shrimp.name}>
              <ShrimpSvg size={50} fill={currentStatusColor} />
            </div>
          ))
        }
      </>
    )
  }
}

export default ShrimpDivider;
