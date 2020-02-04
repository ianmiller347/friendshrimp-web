import React from 'react';
import './style.scss';

const BLOG_ID = '8742275038305474674';
// lol
const API_KEY = 'AIzaSyCL78ZsRhUt9R8KItZv-2HGioIeL2VNoT0';

class Feed extends React.Component {
  state = {
    feedItems: [],
    isLoading: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`)
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
              <div className="item__content" dangerouslySetInnerHTML={{ __html: item.content }} />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  }
}

export default Feed;
