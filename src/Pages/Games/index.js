import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import ShrimpDivider from './ShrimpDivider';
import ShrimpKeyboard from './ShrimpKeyboard';
import FriendshrimpPhotoMaker from './FriendshrimpPhotoMaker';
import DrawShrimps from './DrawShrimps';
import ShrimpCardsBattle from './ShrimpCardsBattle';
import MultiShrimpLobby from './MultishrimpLobby';
import './style.scss';

export const gamesList = [
  {
    name: 'shrimp-lobby',
    displayName: 'Multishrimp Lobby',
    path: '/games/shrimp-lobby',
    PageComponent: MultiShrimpLobby,
    description: 'just some shrimps hanging out in the water',
  },
  {
    name: 'card-battle',
    displayName: 'Shrimps card battle',
    path: '/games/card-battle',
    PageComponent: ShrimpCardsBattle,
    description: 'battle the shrimp cards together',
  },
  {
    name: 'shrimp-divider',
    displayName: 'Shrimp Divider',
    path: '/games/shrimp-divider',
    PageComponent: ShrimpDivider,
    description: 'Shrimp divider of the shrimp juice. Get a lot of shrimps n dont run out of juice',
  },
  {
    name: 'draw-shrimps',
    displayName: 'Draw shrimps',
    path: '/games/draw-shrimps',
    PageComponent: DrawShrimps,
    description: 'draw a shrimps our something',
  },
  {
    name: 'shrimp-keyboard',
    displayName: 'Shrimp Keyboard',
    path: '/games/shrimp-keyboard',
    PageComponent: ShrimpKeyboard,
    description: 'shrimps can make music too',
  },
  {
    name: 'friendshrimp-photo-maker',
    displayName: 'Friendshrimp Photo Maker',
    path: '/games/friendshrimp-photo-maker',
    PageComponent: FriendshrimpPhotoMaker,
    description: 'shrimps can make photos too',
  },
];

const Games = () => (
  <>
    <h2>Games not just for shrimps but made <em>from</em> shrimps</h2>
    <div className="content-container">
      <ul className="games-list">
        {gamesList.map(({ name, displayName, path, description }) => (
          <li className="game" key={name}>
            <Link to={path} className="game__link-title">
              <h5 className="title">{displayName} <FeatherIcon icon="play" /></h5>
              <p className="game__description">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default Games;
