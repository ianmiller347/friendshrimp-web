import { useEffect, useState } from 'react';
import { formatToDollarAmount } from '../../util/formatting';
import ShrimpIcon from '../ShrimpIcon';
import { getRandomColor } from '../../util/rng';

const ShrimpDonorDisplay = ({ donor }) => {
  const [color, setColor] = useState('#333');

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  return (
    <div className="shrimp-donor-display" key={donor.createdAt}>
      <ShrimpIcon
        text={formatToDollarAmount(donor.amountDonated)}
        color={color}
      />
      <h3 className="shrimp-donor-display__name">{donor.displayName}</h3>
    </div>
  );
};

export default ShrimpDonorDisplay;
