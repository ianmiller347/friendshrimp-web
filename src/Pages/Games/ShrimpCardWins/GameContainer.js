import React, { useEffect, useState } from 'react';

const GameContainer = () => {
  const [gameIsOn, turnOnTheGame] = useState(false);

  useEffect(() => {
    // subscribe to players/is game on etc
  }, []);

  if (!gameIsOn) {
    return (
      <div className="">
        <button onClick={() => turnOnTheGame(true)}>Start</button>
      </div>
    );
  }
  
  return (
    <div className="">
      <div className="card-stack card-stack--other-player">
        
      </div>
      <div className="visible-card visible-card--other-player">

      </div>
      <div className="visible-card visible-card--this-player">

      </div>
      <div className="card-stack card-stack--this-player">

      </div>
    </div>
  );
};

export default GameContainer;
