import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

class Page extends React.Component {
  render() {
    const { 
      name, 
      displayName, 
      children, 
      location,
      ...otherProps 
    } = this.props;

    return (
      <>
        <Header />
        <main className={`page--${name}`} {...otherProps}>
          <h1>{displayName}</h1>
          {children}
        </main>
        <Footer currentRoute={location.pathname} />
      </>
    );
  }
}

export default Page;
