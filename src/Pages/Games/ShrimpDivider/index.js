import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { getRandomInt, getStatusColorFromRandomInt } from '../../../util/rng';
import Shrimps from './Shrimps';
import JuiceHit from './JuiceHit';

import './style.scss';
import FeatherIcon from 'feather-icons-react';

/**
 * Shrimp Divider of the Shrimp Juice Game
 * Written by Ian Friendshrimp 🦐
 *
 * You only have 100 shrimp juice
 * You need to pull a little juice out to get the shrimps
 * You punch the shrimp juice and take too much
 * Get as many shrimps as you can!
 */
const ShrimpDivider = () => {
  const [shrimps, setShrimps] = useState([]);
  const bottomNumber = 0;
  const [topNumber, setTopNumber] = useState(100);
  const [yourRecord, setYourRecord] = useState(0);
  const [gotALuckyShrimp, setGotLucky] = useState(false);

  const divideShrimps = () => {
    const chanceOfPercentageLoss = !!(getRandomInt(bottomNumber, 100) > 69);
    const calcBottom = topNumber > 50 ? 10 : bottomNumber;
    setGotLucky(chanceOfPercentageLoss);
    const amountOfJuiceLeft = chanceOfPercentageLoss
      ? topNumber - Math.floor(topNumber / 10)
      : getRandomInt(calcBottom, topNumber);
    setTopNumber(amountOfJuiceLeft);
    const newShrimps = [
      ...shrimps,
      {
        name: `shrimp-${shrimps.length + 1}`,
        isLucky: chanceOfPercentageLoss,
      },
    ];
    setShrimps(newShrimps);
    if (newShrimps.length > yourRecord) {
      setYourRecord(newShrimps.length);
      ReactGA.event({
        category: 'shrimp-divider',
        action: 'score-record',
        value: yourRecord,
      });
    }
  };

  const resetGame = () => {
    setTopNumber(100);
    setShrimps([]);
    ReactGA.event({
      category: 'shrimp-divider',
      action: 'reset-game',
      value: 1,
    });
  };

  const currentStatusColor = getStatusColorFromRandomInt(topNumber, 100);
  const topGradient = `#a70e0e 100%`;
  const middleGradient = `${currentStatusColor} ${Math.ceil(topNumber)}%`;
  const linearGradient = `linear-gradient(90deg, rgb(34,180,0) 0%, ${middleGradient}, ${topGradient})`;

  const juiceBarStyle = {
    backgroundColor: currentStatusColor,
    border: `1px solid ${currentStatusColor}`,
    color: topNumber > 50 ? 'black' : 'white',
    background: topNumber > 0 ? linearGradient : 'black',
  };

  const isNewRecord = topNumber === 0 && yourRecord === shrimps.length;
  const luckyShrimps = shrimps.filter((s) => !!s.isLucky);

  return (
    <div className="shrimp-divider">
      <div className="explanation-container">
        <h2>How many shrimps can u get?</h2>
        <p className="description">
          Hit the juice to get more shrimps. <br /> Get as many shrimps as u
          can.
        </p>
        <JuiceHit topNumber={topNumber} />
      </div>
      <div className="buttons-container">
        {topNumber !== 0 && (
          <button
            className="button get-juice"
            onClick={(e) => divideShrimps(e)}
            disabled={topNumber === 0}
          >
            hit the juice
          </button>
        )}
        {topNumber === 0 && (
          <button className="button reset" onClick={resetGame}>
            Restart
          </button>
        )}
      </div>
      <div className="results-container">
        <div className="remaining-juice">
          <div className="juice-bar" style={juiceBarStyle}>
            Shrimp juice remaining: {topNumber}
          </div>
        </div>
        {gotALuckyShrimp && (
          <div className="lucky-shrimp">
            You squeezed out a lucky shrimp that time!
          </div>
        )}
        <div className="shrimps-container">
          <Shrimps shrimps={shrimps} currentStatusColor={currentStatusColor} />
        </div>
        <div className="shrimp-count">
          <span>You got {shrimps.length} shrimps total</span>
          <span> and {luckyShrimps.length} lucky shrimps</span>
        </div>
        <div className={`record-container ${isNewRecord ? 'new-record' : ''}`}>
          {yourRecord > 0 && (
            <>
              {isNewRecord && <p>New record!</p>}
              <span>Your record: </span>
              <strong>{yourRecord} shrimps</strong>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ShrimpDividerPreview = () => (
  <div className="shrimp-divider-preview">
    <FeatherIcon size={64} icon="activity" />
  </div>
);

export default ShrimpDivider;
