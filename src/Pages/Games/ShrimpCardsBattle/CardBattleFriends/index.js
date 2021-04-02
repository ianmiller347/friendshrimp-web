import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { getShuffledDeck } from '../deckOfCards';
import { getRandom4LetterWord } from '../../../../util/rng';
import Game from './Game';

const INIT_GAME_TEXT = 'Draw a card to begin';

let socket;
const ENDPOINT = window.location.hostname !== 'localhost' 
  ? 'https://friendshrimp.com'
  : 'http://localhost:8080';

const initiateSocket = () => {
  socket = socketIOClient(ENDPOINT);
};

const CardBattleFriends = () => {
  const [gameId, setGameId] = useState('');
  // TODO: use local storage and/or cookies to get the name they last used
  const [userName, setUserName] = useState('');
  const [gameOn, setGameOn] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    initiateSocket();

    socket.on('gameState', data => {
      setPlayerList(Object.keys(data.playerMap).map(key => data.playerMap[key]));
      setGameState(data);
    });

    return () => socket.disconnect();
  }, []);

  const addPlayer = () => {
    socket.emit('newPlayer', {
      name: userName,
    });
  }

  const createNewGame = () => {
    // generate an ID
    const newId = getRandom4LetterWord();
    // generate a new deck o cards
    const newDeck = getShuffledDeck();
    const deckFirstHalf = newDeck.slice(0, 26);
    const deckSecondHalf = newDeck.slice(26, newDeck.length);
    // send it to server along with userName
    socket.emit('newGame', {
      gameId: newId,
      playerName: userName,
      gameName: 'CardBattle',
      gameData: {
        deck: newDeck,
        player1Cards: deckFirstHalf,
        player2Cards: deckSecondHalf,
        player1Drawn: null,
        player2Drawn: null,
        gameStatus: INIT_GAME_TEXT,
      },
    });

    // get confirmation

    // now go to that new game
    setGameId(newId);
    setGameOn(true);
  }

  const joinGame = () => {
    // send game id to server
    if (socket && gameId) {
      socket.emit('joinGame', {
        gameId,
        playerName: userName,
      });

      // get confirmation

      // now go to that game
      setGameOn(true);
    }
  }

  if (gameOn) {
    return <Game id={gameId} gameState={gameState} player1Name={userName} />
  };

  return (
    <div className="card-battle-friends">
      <div>
        Players
        <ul className="list-style-none display-flex">
          {playerList.map(player => (
            <li key={player.id}>{player.displayName}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Enter a name for yourself</h5>
        {userName?.toLowerCase() === 'david' && <strong>No davids allowed!</strong>}
        <input
          type="text"
          value={userName}
          maxLength={16}
          onChange={e => setUserName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <button
        className="button"
        onClick={() => addPlayer()}
      >
        Add my name
      </button>
      <button
        className="button"
        onClick={() => createNewGame()}
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
        <button className="button" onClick={() => joinGame()}>
          Join a game
        </button>
      </div>
    </div>
  );
};

export default CardBattleFriends;
