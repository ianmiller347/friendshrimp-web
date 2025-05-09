import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';

interface HeaderLinkProps {
  path: string;
  displayName: string;
}

interface PageLink {
  path: string;
  displayName: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ path, displayName }) => {
  const location = useLocation();

  const classNames = [
    'main-nav__page-link',
    location.pathname === path ? 'active' : '',
  ].join(' ');

  return (
    <Link to={path} className={classNames}>
      {displayName}
    </Link>
  );
};

const pageLinks: PageLink[] = [
  {
    path: '/',
    displayName: 'Home',
  },
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

const Header: React.FC = () => (
  <header>
    <nav className="main-nav">
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
