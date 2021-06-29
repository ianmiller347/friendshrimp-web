import React from 'react';
import Egg from './Egg';

const JuiceHit = ({ topNumber }) => {
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
};

export default JuiceHit;
