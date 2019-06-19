import React from 'react';
import {Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/shows">Shows</Link>
    </nav>
  </header>
);

export default Header;
