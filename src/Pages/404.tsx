import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import ShrimpsClicks from '../components/ShrimpsClicks';

const NotFound: React.FC = () => {
  const shrimpsClicksParentRef = useRef<HTMLDivElement>(null);

  return (
    <Page name="not-found" displayName="Page Not Found">
      <div ref={shrimpsClicksParentRef} style={{ minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry! the page you are looking for does not exist lol</p>
          <p>🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐</p>
          <Link to="/" style={{ textDecoration: 'underline' }}>
            Return to Home
          </Link>
        </div>
        <ShrimpsClicks parentRef={shrimpsClicksParentRef} />
      </div>
    </Page>
  );
};

export default NotFound;
