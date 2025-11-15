import React, { useEffect, useState, useRef } from 'react';
import {
  initiateSocket,
  subscribeToGameState,
  subscribeToNewGameCreation,
  subscribeToJoinGame,
  subscribeToJoinGameError,
  createNewGame,
  joinExistingGameById,
  disconnectSocket,
  getSocketId,
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
  const [errorMessage, setErrorMessage] = useState('');

  // Use refs to track current values without causing re-renders
  const gameIdRef = useRef(gameId);
  const userNameRef = useRef(userName);
  const wasInGameRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    gameIdRef.current = gameId;
  }, [gameId]);

  useEffect(() => {
    userNameRef.current = userName;
  }, [userName]);

  // Initialize socket only once on mount
  useEffect(() => {
    initiateSocket();

    return () => {
      disconnectSocket();
    };
  }, []); // Empty dependency array - only run on mount/unmount

  // Set up subscriptions only once, but use current state values via refs
  useEffect(() => {
    const handleGameState = (data) => {
      console.log('gameState is it', data);
      setPlayerList(
        Object.keys(data.playerMap).map((key) => data.playerMap[key])
      );

      // Get current values from refs (always up-to-date)
      const currentGameId = gameIdRef.current;
      const currentUserName = userNameRef.current;
      const socketId = getSocketId();

      setGameState(data);

      // Check if we're in any game by socket ID (more reliable than displayName)
      let foundGame = null;
      let foundGameId = null;

      // Only check if we have a socket ID
      if (!socketId) {
        console.log('No socket ID available yet');
        return;
      }

      // First, check the game with currentGameId if it exists
      if (currentGameId && data.gameMap[currentGameId]) {
        const game = data.gameMap[currentGameId];
        const isInGame = game.players.some((player) => player.id === socketId);
        if (isInGame) {
          foundGame = game;
          foundGameId = currentGameId;
        }
      }

      // If not found, search all games for our socket ID
      if (!foundGame) {
        for (const [gameId, game] of Object.entries(data.gameMap)) {
          const isInGame = game.players.some(
            (player) => player.id === socketId
          );
          if (isInGame) {
            foundGame = game;
            foundGameId = gameId;
            // Update the gameId state if we found ourselves in a different game
            if (gameId !== currentGameId) {
              console.log(`Updating gameId from ${currentGameId} to ${gameId}`);
              setGameId(gameId);
              gameIdRef.current = gameId;
            }
            break;
          }
        }
      }

      if (foundGame && foundGameId) {
        console.log('Found game:', foundGame);
        console.log('Game ID:', foundGameId);
        console.log('Current userName:', currentUserName);
        console.log('Socket ID:', socketId);
        console.log('Game players:', foundGame.players);

        const playerInGame = foundGame.players.find(
          (player) => player.id === socketId
        );
        const isCreator = playerInGame?.isCreator || false;
        const isPlayer = !!playerInGame;

        console.log(
          'isCreator:',
          isCreator,
          'isPlayer:',
          isPlayer,
          'players.length:',
          foundGame.players.length
        );

        // Start the game if:
        // 1. Creator and waiting for second player (1 player)
        // 2. Any player and game is full (2 players)
        if (isCreator && foundGame.players.length === 1) {
          // Game created successfully, waiting for second player
          console.log('Starting game as creator (waiting for player)');
          setGameOn(true);
          wasInGameRef.current = true;
        } else if (isPlayer && foundGame.players.length === 2) {
          // Joined game successfully, game is ready
          console.log('Starting game as player (game ready)');
          setGameOn(true);
          wasInGameRef.current = true;
        } else if (isPlayer) {
          // Player is in game but not ready yet
          console.log('Player in game but not ready yet');
          setGameOn(true); // Show the waiting screen
          wasInGameRef.current = true;
        }
      } else if (currentGameId && !data.gameMap[currentGameId]) {
        // Only show error if we were actually in a game
        // Don't show error if user is just typing a gameId that doesn't exist yet
        if (wasInGameRef.current) {
          // Game was deleted - we were in a game but it no longer exists
          console.log('Game was deleted, exiting game view');
          setGameOn(false);
          wasInGameRef.current = false;
          setErrorMessage(
            'The game has ended. Your opponent may have disconnected.'
          );
          setGameId('');
          gameIdRef.current = '';
        }
      }
    };

    subscribeToGameState(handleGameState);

    subscribeToNewGameCreation((data) => {
      console.log('new game created. lego.', data);
      // todo match by id lol
      // setGameOn(true);
    });

    subscribeToJoinGame((data) => {
      console.log('Another player joined!', data);
      // Don't set gameOn here - wait for gameState update to handle it
      // This event is for when someone else joins, not when we join
    });

    subscribeToJoinGameError((error) => {
      console.error('Join game error:', error);
      setErrorMessage(error);
      setGameOn(false);
    });
  }, []); // Empty dependency array - subscriptions set up once

  const createGame = () => {
    if (!userName.trim()) {
      setErrorMessage('Please enter a name first');
      return;
    }

    console.log('Creating game with userName:', userName);

    // generate an ID
    const newId = getRandom4LetterWord();
    console.log('Generated game ID:', newId);

    // generate a new deck o cards
    const newDeck = getShuffledDeck();
    const deckFirstHalf = newDeck.slice(0, 26);
    const deckSecondHalf = newDeck.slice(26, newDeck.length);

    // set the game ID first
    setGameId(newId);

    // send it to server along with userName
    console.log('Sending createNewGame request');
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

    // The game will start when the server confirms creation via gameState update
  };

  const joinGame = () => {
    if (!userName.trim()) {
      setErrorMessage('Please enter a name first');
      return;
    }

    if (!gameId.trim()) {
      setErrorMessage('Please enter a game ID');
      return;
    }

    // Check if socket is connected
    const socketId = getSocketId();
    if (!socketId) {
      setErrorMessage(
        'Not connected to server. Please wait a moment and try again.'
      );
      return;
    }

    // Clear any previous error
    setErrorMessage('');

    console.log('Joining game:', gameId, 'with socket ID:', socketId);

    // send game id to server
    joinExistingGameById({
      gameId,
      playerName: userName,
    });

    // Don't set gameOn immediately - wait for server confirmation via gameState update
  };

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
          <p className="error">
            <strong>No davids allowed!</strong>
          </p>
        )}
        {userName?.toLowerCase() === 'steven' && (
          <p className="error">
            <strong>OMG Steven 😤</strong>
          </p>
        )}
        <input
          type="text"
          value={userName}
          maxLength={16}
          onChange={(e) => {
            setUserName(e.target.value);
            // Don't send to server on every keystroke - only when joining/creating game
          }}
          className={
            userName?.toLowerCase() === 'david' ? 'error' : 'main-input'
          }
          placeholder="Your name"
        />
      </div>
      {errorMessage && (
        <div
          className="error-message"
          style={{ color: 'red', marginBottom: '10px' }}
        >
          {errorMessage}
        </div>
      )}
      <div className="display-flex flex-direction-column align-items-center">
        <button
          className="button"
          title="create a new game room"
          onClick={() => createGame()}
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
          >
            Join a game
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBattleFriends;
