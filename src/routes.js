import {
  Games,
  Shows,
  Feed,
  Store,
} from './Pages';

import { gamesList } from './Pages/Games';
import CardBattleFriends from './Pages/Games/ShrimpCardsBattle/CardBattleFriends';

// all routes except home because home is treated like it's own thing ok
const routes = [
  {
    name: 'games',
    displayName: 'Games',
    path: '/games',
    PageComponent: Games,
  },
  {
    name: 'store',
    displayName: 'Store',
    path: '/store',
    PageComponent: Store,
  },
  {
    name: 'feed',
    displayName: 'Friendshrimp Feed',
    path: '/feed',
    PageComponent: Feed,
  },
  {
    name: 'shows',
    displayName: 'Shows',
    path: '/shows',
    PageComponent: Shows,
  },
  {
    name: 'cards-with-friends',
    displayName: 'Card Battle with Friends',
    path: '/games/card-battle/friend',
    PageComponent: CardBattleFriends,
  },
  ...gamesList,
];

// why wont this work for the Header links
export const pageLinks = routes.map(({ path, displayName }) => ({
  path,
  displayName,
}));

export default routes;
