import React, { useEffect, useState } from 'react';
import {
  initiateSocket,
  subscribeToGameState,
  subscribeToNewGameCreation,
  subscribeToJoinGame,
  newPlayerJoin,
  createNewGame,
  joinExistingGameById,
  disconnectSocket,
} from '../../utilities/socketio';
import { getShuffledDeck } from '../deckOfCards';
import { getRandom4LetterWord } from '../../../../util/rng';
import Game from './Game';

const INIT_GAME_TEXT = 'Draw a card to begin';

const CardBattleFriends = () => {
  const [gameId, setGameId] = useState('');
  // TODO: use local storage and/or cookies to get the name they last used
  const [userName, setUserName] = useState('');
  const [gameOn, setGameOn] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    initiateSocket();

    subscribeToGameState((data) => {
      console.log('gameState is it', data);
      setPlayerList(
        Object.keys(data.playerMap).map((key) => data.playerMap[key])
      );
      setGameState(data);
    });

    subscribeToNewGameCreation((data) => {
      console.log('new game created. lego.', data);
      // todo match by id lol
      // setGameOn(true);
    });

    subscribeToJoinGame((data) => {
      console.log('Another player joined!', data);
    });

    return () => disconnectSocket();
  }, []);

  const addPlayer = (name) => {
    const newPlayerData = {
      name,
    };

    newPlayerJoin(newPlayerData);
    // setPlayerList([...playerList, newPlayerData]);
  }

  const createGame = () => {
    // generate an ID
    const newId = getRandom4LetterWord();
    // generate a new deck o cards
    const newDeck = getShuffledDeck();
    const deckFirstHalf = newDeck.slice(0, 26);
    const deckSecondHalf = newDeck.slice(26, newDeck.length);
    // send it to server along with userName
    createNewGame({
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
  };

  const joinGame = () => {
    // send game id to server
    if (gameId) {
      joinExistingGameById({
        gameId,
        playerName: userName,
      });

      // get confirmation

      // now go to that game
      setGameOn(true);
    }
  }

  if (gameOn) {
    return (
      <div>
        <Game id={gameId} gameState={gameState} player1Name={userName} />
        <dd>
          <em>Your name is {userName}</em>
        </dd>
      </div>
    );
  }

  return (
    <div className="card-battle-friends shrimp-cards-container">
      <div>
        Players in lobby
        <ul className="list-style-none display-flex">
          {playerList.map((player) => (
            <li className="margin-s pill" key={player.id}>
              {player.displayName}
            </li>
          ))}
        </ul>
      </div>
      <div className="margin-bottom-s">
        <h5>Enter a name for yourself</h5>
        {userName?.toLowerCase() === 'david' && (
          <p className="error"><strong>No davids allowed!</strong></p>
        )}
        {userName?.toLowerCase() === 'steven' && (
          <p className="error"><strong>OMG Steven 😤</strong></p>
        )}
        <input
          type="text"
          value={userName}
          maxLength={16}
          onChange={(e) => {
            setUserName(e.target.value);
            addPlayer(e.target.value);
          }}
          className={userName?.toLowerCase() === 'david' ? 'error' : 'main-input'}
          placeholder="Your name"
        />
      </div>
      <p>Multiplayer is unavailable right now :(</p>
      <div className="display-flex flex-direction-column align-items-center">
        <button
          className="button"
          title="create a new game room"
          onClick={() => createGame()}
          disabled
        >
          Create a game
        </button>
        <dd className="margin-s">Or</dd>
        <div>
          <input
            type="text"
            className="input-with-side-submit"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Enter game id"
          />
          <button
            className="button button--side-submit"
            title="join a game by id"
            onClick={() => joinGame()}
            disabled
          >
            Join a game
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBattleFriends;
