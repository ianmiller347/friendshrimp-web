import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import { formatToDollarAmount } from '../../util/formatting';
import DonorForm from './DonorForm';
import ShrimpIcon from '../ShrimpIcon';

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const shrimpDonorsPath = '/shrimp-donors';
const SHRIMP_DONORS_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:8080${shrimpDonorsPath}`
    : shrimpDonorsPath;

const ShrimpDonorWall = () => {
  const [isLoadingDonors, setIsLoadingDonors] = useState(false);
  const [loadingDonorsError, setLoadingDonorsError] = useState(false);
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    if (!isLoadingDonors && !donors.length && !loadingDonorsError) {
      setIsLoadingDonors(true);
      fetch(SHRIMP_DONORS_URL)
        .then((response) => response.json())
        .then((response) => {
          setDonors(response);
          setLoadingDonorsError(false);
        })
        .catch((error) => {
          console.log(error);
          setLoadingDonorsError(true);
          setDonors([]);
        })
        .finally(() => setIsLoadingDonors(false));
    }
  }, []);

  const sectionTitle = 'Shrimp Donors';
  const sectionDescription =
    'You can purchase a shrimp on this wall using PayPal below.';
  // get list of donors from ddb
  // on purchase, add the donor to the wall
  return (
    <div>
      <h2>{sectionTitle}</h2>
      <p>{sectionDescription}</p>
      <div className="paypal-container">
        <PayPalScriptProvider
          options={{
            'client-id': CLIENT_ID,
            components: 'buttons',
            currency: 'USD',
          }}
        >
          <DonorForm />
        </PayPalScriptProvider>
      </div>
      <div className="shrimp-donors-wall">
        {donors.map((donor) => (
          <div className="donor-shrimp" key={donor.createdAt}>
            <h3>{donor.displayName}</h3>
            <ShrimpIcon text={formatToDollarAmount(donor.amountDonated)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShrimpDonorWall;
