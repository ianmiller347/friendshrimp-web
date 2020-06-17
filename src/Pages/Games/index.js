import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import ShrimpDivider from './ShrimpDivider';
import ShrimpKeyboard from './ShrimpKeyboard';
import FriendshrimpPhotoMaker from './FriendshrimpPhotoMaker';
import DrawShrimps from './DrawShrimps';
import ShrimpCardsBattle from './ShrimpCardsBattle';
import './style.scss';

export const gamesList = [
  {
    name: 'shrimp-divider',
    displayName: 'Shrimp Divider',
    path: '/games/shrimp-divider',
    PageComponent: ShrimpDivider,
    description: 'Get a lot of shrimps n dont run out of juice',
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
  {
    name: 'draw-shrimps',
    displayName: 'Draw shrimps',
    path: '/games/draw-shrimps',
    PageComponent: DrawShrimps,
    description: 'draw a shrimps our something',
  },
  {
    name: 'card-battle',
    displayName: 'Shrimps card battle',
    path: '/games/card-battle',
    PageComponent: ShrimpCardsBattle,
    description: 'battle the shrimp cards together',
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
              {displayName} <FeatherIcon icon="play" />
            </Link>
            <p className="game__description">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default Games;
