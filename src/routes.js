import {
  Games,
  Shows,
  Store,
} from './Pages';

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
    name: 'shows',
    displayName: 'Shows',
    path: '/shows',
    PageComponent: Shows,
  },
];

// why wont this work for the Header links
export const pageLinks = routes.map(({ path, displayName }) => ({
  path,
  displayName,
}));

export default routes;
