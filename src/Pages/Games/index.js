import React from 'react';
import { Link } from 'react-router-dom';
import ShrimpDivider from './ShrimpDivider';

export const gamesList = [
  {
    name: 'shrimp-divider',
    displayName: 'Shrimp Divider',
    path: '/games/shrimp-divider',
    PageComponent: ShrimpDivider,
  },
];

class Games extends React.Component {
  render() {
    return (
      <>
        <h2>Games not just for shrimps but made <em>from</em> shrimps</h2>
        <div>
          <ul className="games-list">
            {
              gamesList.map(({ name, displayName, path }) => (
                <Link to={path} key={name}>
                  {displayName}
                </Link>
              ))
            }
          </ul>
        </div>
      </>
    );
  }
}

export default Games;
