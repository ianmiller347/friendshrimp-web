import { useState } from 'react';
import { getRandomColor, getRandomInt } from '../../../util/rng';
import ShrimpDrawing from '../../../components/ShrimpDrawing';

const ShrimpPlayer = ({ player }) => {
  const [shrimpSize, setShrimpSize] = useState(69);
  const color = getRandomColor();

  return (
    <li className="margin-s shrimp-player">
      <dd className="shrimp-player__name">{player.displayName}</dd>
      <dt onClick={() => setShrimpSize(getRandomInt(69, 420))}>
        <ShrimpDrawing
          text={player.statusDisplay}
          size={shrimpSize}
          color={color}
        />
      </dt>
    </li>
  );
};

export default ShrimpPlayer;
