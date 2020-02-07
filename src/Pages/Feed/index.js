import React from 'react';
import './style.scss';

class Feed extends React.Component {
  state = {
    feedItems: [],
    isLoading: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`https://www.friendshrimp.com/get-feed.php`)
      .then(response => response.json())
      .then(data => {
        this.setState({ isLoading: false, feedItems: data.items });
      })
      .catch(error => {
        this.setState({ isLoading: false, errorMessage: 'Problem fetching friendshrimp feed :('})
      });
  }

  render() {
    return (
      <div className="friendshrimp-feed"> 
        <h2>so what is new</h2>
        {this.renderFeed()}
      </div>
    );
  }

  renderFeed() {
    const {
      isLoading,
      errorMessage,
      feedItems,
    } = this.state;

    if (isLoading) {
      return (
        <div className="loader">
          Refreshing friendshrimp feed...
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="error error-container">
          {errorMessage}
        </div>
      );
    }

    if (feedItems) {
      return (
        <ul className="feed__list">
          {feedItems.map(item => (
            <li className="feed__item" key={item.id}>
              <h3 className="item__title">{item.title}</h3>
              <div 
                className="item__content text-content"
                dangerouslySetInnerHTML={{ __html: item.content }} />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  }
}

export default Feed;
