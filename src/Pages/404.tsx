import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';

const NotFound: React.FC = () => {
  return (
    <Page name="not-found" displayName="Page Not Found">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" style={{ textDecoration: 'underline' }}>
          Return to Home
        </Link>
      </div>
    </Page>
  );
};

export default NotFound;
