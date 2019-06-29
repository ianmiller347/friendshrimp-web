import React from 'react';
import { Link } from 'react-router-dom';
// import { pageLinks } from '../../routes';

const HeaderLink = ({ path, displayName }) => (
  <Link to={path}>{displayName}</Link>
);

const pageLinks = [
  {
    path: '/games',
    displayName: 'Games',
  },
  {
    path: '/store',
    displayName: 'Store',
  },
  {
    path: '/shows',
    displayName: 'Shows',
  },
];

const Header = () => (
  <header>
    <nav>
      <Link to="/">Home</Link>
      {pageLinks.map(route => 
        <HeaderLink path={route.path} displayName={route.displayName} />
      )}
    </nav>
  </header>
);

export default Header;
