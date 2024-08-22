import { PayPalButtons } from '@paypal/react-paypal-js';
import { useEffect, useRef, useState } from 'react';
import './DonorForm.scss';

const shrimpDonorsPath = '/shrimp-donors';
const SHRIMP_DONORS_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:8080${shrimpDonorsPath}`
    : shrimpDonorsPath;

const DonateButton = ({ currency, amount, displayName, setWarning }) => {
  const amountRef = useRef(amount);
  const nameRef = useRef(displayName);
  // have to update the ref in order to persist the memoized value to the paypalbutton callbacks
  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);
  useEffect(() => {
    nameRef.current = displayName;
  }, [displayName]);

  const warnIfNotValid = () => {
    if (
      !amountRef.current ||
      amountRef.current === 'custom' ||
      !nameRef.current
    ) {
      setWarning(true);
      return false;
    }
  };

  return (
    <div className="donate-button-container">
      <PayPalButtons
        style={{ color: 'black', label: 'donate' }}
        fundingSource="paypal"
        onClick={warnIfNotValid}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amountRef.current,
                  breakdown: {
                    item_total: {
                      currency_code: currency,
                      value: amountRef.current,
                    },
                  },
                },
                items: [
                  {
                    name: 'Shrimp Donor Wall',
                    description:
                      'All proceeds directly support shrimps. You get a commemorative shrimp on the wall.',
                    quantity: '1',
                    unit_amount: {
                      currency_code: currency,
                      value: amountRef.current,
                    },
                    category: 'DONATION',
                  },
                ],
              },
            ],
          });
        }}
        onApprove={(data, actions) =>
          actions.order.capture().then((details) => {
            if (
              details.intent === 'CAPTURE' &&
              details.status === 'COMPLETED'
            ) {
              // first, display SUCCESS message, then post to the donor table.
              const requestBody = {
                amountDonated: amountRef.current,
                displayName: nameRef.current,
                transactionDetails: details,
              };
              // for more security and reliability, this should be removed in favor of a webhook.
              fetch(SHRIMP_DONORS_URL, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            }
          })
        }
      />
    </div>
  );
};

function AmountPicker({ amount, onAmountChange, warning, setWarning }) {
  const [customAmount, setCustomAmount] = useState('');

  const amounts = [
    {
      value: '5.00',
      displayName: '$5',
    },
    {
      value: '10.00',
      displayName: '$10',
    },
    {
      value: '15.00',
      displayName: '$15',
    },
    {
      value: 'custom',
      displayName: 'Custom',
    },
  ];

  const handleAmountChange = (e) => {
    onAmountChange(e.target.value);
  };

  const handleCustomValueChange = (e) => {
    const value = e.target.value;
    if (value) {
      setWarning(false);
    }
    setCustomAmount(value);
    onAmountChange(value);
  };

  const showAmountWarning = warning && (!amount || amount === 'custom');

  return (
    <div className="amount-picker-container">
      <fieldset className="amount-picker">
        <legend>Donation Amount</legend>
        {amounts.map((amountObject) => (
          <label key={amountObject.value} className="amount-picker__label">
            <input
              type="radio"
              value={amountObject.value}
              onChange={handleAmountChange}
              name="amount"
              className="amount-picker__radio"
              checked={amount === amountObject.value}
            />
            {amountObject.displayName}
            {amountObject.value === 'custom' && (
              <input
                type="number"
                className="amount-picker__custom-input"
                onChange={handleCustomValueChange}
                value={customAmount}
              />
            )}
          </label>
        ))}
        {showAmountWarning && (
          <span className="donate-form__warning">Please enter an amount</span>
        )}
      </fieldset>
    </div>
  );
}

function DonorForm() {
  const [amount, setAmount] = useState('5.00');
  const [displayName, setDisplayName] = useState('');
  const [warning, setWarning] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value) {
      setWarning(false);
    }
    setDisplayName(value);
  };

  const showNameWarning = warning && !displayName;

  return (
    <form className="donate-form">
      <AmountPicker
        amount={amount}
        onAmountChange={setAmount}
        setWarning={setWarning}
        warning={warning}
      />
      <label className="donate-form__display-name">
        Shrimp display name
        <input
          type="text"
          className="donate-form__display-name__input"
          onChange={handleNameChange}
          required
        />
      </label>
      {showNameWarning && (
        <span className="donate-form__warning">
          Please add a display name for your shrimp
        </span>
      )}
      <DonateButton
        currency="USD"
        amount={amount}
        displayName={displayName}
        setWarning={setWarning}
      />
    </form>
  );
}

export default DonorForm;
