import React from 'react';
import items from './items';
import './style.scss';

class Feed extends React.Component {
  render() {
    return (
      <div className="friendshrimp-feed"> 
        <h2>so what is new</h2>
        <ul className="feed__list">
          {items.map(item => (
            <li className="feed__item" key={item.id}>
              <h3 className="item__title">{item.title}</h3>
              <div className="item__content">{item.content}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Feed;
