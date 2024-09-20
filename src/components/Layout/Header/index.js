import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const HeaderLink = ({ path, displayName }) => (
  <Link to={path} className="main-nav__page-link">
    {displayName}
  </Link>
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
    displayName: 'Feed',
    path: '/feed',
  },
];

const Header = () => (
  <header>
    <nav className="main-nav">
      <Link to="/" className="main-nav__page-link">
        Home
      </Link>
      {pageLinks.map((route) => (
        <HeaderLink
          key={route.path}
          path={route.path}
          displayName={route.displayName}
        />
      ))}
    </nav>
  </header>
);

export default Header;
