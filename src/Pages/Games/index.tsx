import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import ShrimpDivider, { ShrimpDividerPreview } from './ShrimpDivider';
import ShrimpKeyboard, { ShrimpKeyboardPreview } from './ShrimpKeyboard';
import FriendshrimpPhotoMaker, {
  FriendshrimpPhotoMakerPreview,
} from './FriendshrimpPhotoMaker';
import DrawShrimps, { DrawShrimpsPreview } from './DrawShrimps';
import ShrimpCardsBattle, {
  ShrimpCardsBattlePreview,
} from './ShrimpCardsBattle';
import MultiShrimpLobby, { MultiShrimpLobbyPreview } from './MultishrimpLobby';
import './style.scss';

interface Game {
  name: string;
  displayName: string;
  path: string;
  PageComponent: React.ComponentType;
  description: string;
  PreviewSection: React.ComponentType;
}

export const gamesList: Game[] = [
  {
    name: 'card-battle',
    displayName: 'Shrimps card battle',
    path: '/games/card-battle',
    PageComponent: ShrimpCardsBattle,
    description: 'battle the shrimp cards together.',
    PreviewSection: () => <ShrimpCardsBattlePreview />,
  },
  {
    name: 'shrimp-lobby',
    displayName: 'Multishrimp Lobby',
    path: '/games/shrimp-lobby',
    PageComponent: MultiShrimpLobby,
    description:
      'just some shrimps hanging out in the water. chat with other shrimps now.',
    PreviewSection: () => <MultiShrimpLobbyPreview />,
  },
  {
    name: 'shrimp-divider',
    displayName: 'Shrimp Divider',
    path: '/games/shrimp-divider',
    PageComponent: ShrimpDivider,
    description:
      'Shrimp divider of the shrimp juice. Get a lot of shrimps n dont run out of juice',
    PreviewSection: () => <ShrimpDividerPreview />,
  },
  {
    name: 'shrimp-keyboard',
    displayName: 'Shrimp Keyboard',
    path: '/games/shrimp-keyboard',
    PageComponent: ShrimpKeyboard,
    description: 'shrimps can make music too',
    PreviewSection: () => <ShrimpKeyboardPreview />,
  },
  {
    name: 'draw-shrimps',
    displayName: 'Draw shrimps',
    path: '/games/draw-shrimps',
    PageComponent: DrawShrimps,
    description:
      'draw a shrimps our something. add as many different shrimp friends as u want.',
    PreviewSection: () => <DrawShrimpsPreview />,
  },
  {
    name: 'friendshrimp-photo-maker',
    displayName: 'Friendshrimp Photo Maker',
    path: '/games/friendshrimp-photo-maker',
    PageComponent: FriendshrimpPhotoMaker,
    description: 'shrimps can make photos too',
    PreviewSection: () => <FriendshrimpPhotoMakerPreview />,
  },
];

const Games: React.FC = () => (
  <>
    <h2>
      Games not just for shrimps but made <em>from</em> shrimps
    </h2>
    <div className="content-container">
      <ul className="games-list">
        {gamesList.map(
          ({ name, displayName, path, description, PreviewSection }) => (
            <li className="game" key={name}>
              <Link to={path} className="game__link-title">
                <h5 className="game__title">
                  {displayName} <FeatherIcon icon="play" />
                </h5>
                <div className="game__preview">
                  <PreviewSection />
                </div>
                <p className="game__description">{description}</p>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  </>
);

export default Games;
