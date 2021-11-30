import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { getRandomColor, getRandomInt } from '../../../util/rng';
import ShrimpDrawing from '../../../components/ShrimpDrawing';
import {
  initiateSocket,
  subscribeToPlayersList,
  newPlayerJoin,
  disconnectSocket,
  getSocketId,
  handlePlayerSettingStatus,
} from '../utilities/socketio';
import './style.scss';

const MultiShrimpLobby = () => {
  const [inputText, setInputText] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [shrimpSize, setShrimpSize] = useState(69);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    initiateSocket();

    subscribeToPlayersList((data) => {
      const clientPlayerId = getSocketId();
      if (data?.find((playerData) => playerData.id === clientPlayerId)) {
        setIsJoined(true);
      }
      setPlayerList(data);
    });

    return () => disconnectSocket({ username: playerName });
  }, []);

  const addPlayer = (name) => {
    const filteredName = name.replace('_', '');
    const newPlayerData = {
      name: filteredName,
      statusText: 'i am new lol',
    };

    newPlayerJoin(newPlayerData);
    setPlayerName(filteredName);
    setInputText('');

    ReactGA.event({
      category: 'multi-shrimp-game',
      action: 'shrimp-joined',
      value: 1,
    });
  };

  const setPlayerStatus = (statusText) => {
    const newPlayerData = {
      name: playerName,
      statusDisplay: statusText,
    };

    handlePlayerSettingStatus(newPlayerData);
    setInputText('');
  };

  const buttonText = isJoined ? 'Set shrimp status' : 'Join the shrimp lobby';
  const handleButtonClick = () => {
    if (isJoined) {
      setPlayerStatus(inputText);
    } else {
      addPlayer(inputText);
    }
  };

  return (
    <div>
      <h1>Shrimp Lobby</h1>
      <blockquote>Just some shrimps hanging out</blockquote>
      <div>
        <input
          name="name"
          value={inputText}
          placeholder={isJoined ? 'status?' : 'name?'}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleButtonClick()}
        />
        <button onClick={handleButtonClick} type="submit">
          {buttonText}
        </button>
      </div>
      <div className="shrimps-in-water-container">
        <h3>Shrimps in the water</h3>
        <ul className="shrimp-list list-style-none display-flex flex-wrap">
          {playerList.map((player) => (
            <li className="margin-s shrimp-player" key={player.id}>
              <dd className="shrimp-player__name">{player.displayName}</dd>
              <dt onClick={() => setShrimpSize(getRandomInt(69, 420))}>
                <ShrimpDrawing
                  text={player.statusDisplay}
                  size={shrimpSize}
                  color={getRandomColor()}
                />
              </dt>
            </li>
          ))}
        </ul>
        {!!playerList.length && (
          <div className="underwater">
            <div className="waves">
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiShrimpLobby;
