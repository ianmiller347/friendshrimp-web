import { Games, Shows, Feed, Store } from './Pages';
import { gamesList } from './Pages/Games';
import CardBattleFriends from './Pages/Games/ShrimpCardsBattle/CardBattleFriends';

interface Route {
  name: string;
  displayName: string;
  path: string;
  PageComponent: React.ComponentType;
}

interface PageLink {
  path: string;
  displayName: string;
}

// all routes except home because home is treated like it's own thing ok
const routes: Route[] = [
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
export const pageLinks: PageLink[] = routes.map(({ path, displayName }) => ({
  path,
  displayName,
}));

export default routes;
