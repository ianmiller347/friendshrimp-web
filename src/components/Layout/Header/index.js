import React from 'react';
import { Link } from 'react-router-dom';
// import { pageLinks } from '../../routes';

const HeaderLink = ({ path, displayName }) => (
  <Link to={path} className="main-nav__page-link">{displayName}</Link>
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
    <nav className="main-nav">
      <Link to="/" className="main-nav__page-link">Home</Link>
      {pageLinks.map(route => 
        <HeaderLink key={route.path} path={route.path} displayName={route.displayName} />
      )}
    </nav>
  </header>
);

export default Header;