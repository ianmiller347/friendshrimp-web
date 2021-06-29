import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { getRandomColor, getRandomInt } from '../../../util/rng';
import ShrimpDrawing from '../../../components/ShrimpDrawing';
import {
  initiateSocket,
  subscribeToPlayersList,
  newPlayerJoin,
  disconnectSocket,
} from '../utilities/socketio';
import './style.scss';

const MultiShrimpLobby = () => {
  const [name, setName] = useState('');
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    initiateSocket();

    subscribeToPlayersList((data) => {
      setPlayerList(data);
    });

    return () => disconnectSocket();
  }, []);

  const addPlayer = (name) => {
    const newPlayerData = {
      name,
    };

    newPlayerJoin(newPlayerData);

    ReactGA.event({
      category: 'multi-shrimp-game',
      action: 'shrimp-joined',
      value: 1,
    });
  };

  return (
    <div>
      <h1>Shrimp Lobby</h1>
      <blockquote>Just some shrimps hanging out</blockquote>
      <div>
        <input
          name="name"
          value={name}
          placeholder="name?"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => addPlayer(name)}>Join the shrimp lobby</button>
      </div>
      <div className="shrimps-in-water-container">
        <h3>Shrimps in the water</h3>
        <ul className="shrimp-list list-style-none display-flex flex-wrap">
          {playerList.map((player) => (
            <li className="margin-s pill" key={player.id}>
              <dd>{player.displayName}</dd>
              <dt>
                <ShrimpDrawing
                  text={player.displayName}
                  size={getRandomInt(69, 420)}
                  color={getRandomColor()}
                />
              </dt>
            </li>
          ))}
        </ul>
        {!!playerList.length && (
          <div className="underwater">
            <div className="wave"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiShrimpLobby;
