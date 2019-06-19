import React from 'react';
import Page from '../components/Page';

class Games extends React.Component {
  render() {
    return (
      <Page name="games" displayName="Games">
        <h2>Some pretty cool shrimp games</h2>
        <div>
          Random shrimp finder
        </div>
      </Page>
    );
  }
}

export default Games;
