import React, { useState } from 'react';
import Game from './Game';

const createNewGame = (setGameOn, setGameId, userName) => {
  // generate an ID
  const newId = 1;
  // send it to server along with userName

  // get confirmation

  // now go to that new game
  setGameId(newId);
  setGameOn(true);
}

const joinGame = (gameId, setGameOn, userName) => {
  // send game id to server

  // get confirmation

  // now go to that game
  setGameOn(true);
}

const CardBattleFriends = () => {
  const [gameId, setGameId] = useState('');
  // TODO: use local storage and/or cookies to get the name they last used
  const [userName, setUserName] = useState('');
  const [gameOn, setGameOn] = useState(false);

  if (gameOn) {
    return <Game id={gameId} />
  };

  return (
    <div className="card-battle-friends">
      <div>
        <h5>Enter a name for yourself</h5>
        {userName === 'david' && <strong>No davids allowed!</strong>}
        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <button 
        className="button"
        onClick={() => createNewGame(setGameOn, setGameId, userName)}
      >
        Create a game
      </button>
      <div>
        <input 
          type="text"
          value={gameId}
          onChange={e => setGameId(e.target.value)}
          placeholder="Enter game id"
        />
        <button className="button" onClick={joinGame(gameId, setGameOn, userName)}>
          Join a game
        </button>
      </div>
    </div>
  );
};

export default CardBattleFriends;
