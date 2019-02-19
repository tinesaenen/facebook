import React, { Component } from 'react';
import DATA from './ItemData';

export default class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, items: [] }
  }

  componentDidMount() {
    const types = this.props.types;
    const items = DATA.filter(item => types.includes(item.type) && !item.target);
    this.setState({ items, isLoading: false });
  }

  render() {
    const { isLoading, items } = this.state;
    const itemElements = items.map(item => this.renderItem(item));
    return (
      <div className="feed">
      { isLoading && <div className="feed__loading"><i className="fas fa-spin fa-spinner"></i></div> }
      { itemElements }
      </div>
    );
  }

  renderItem(item) {
    if (item.type === 'ad') {
      return this.renderAd(item);
    } else if (item.type === 'notification') {
      return this.renderNotification(item);
    } else {
      return this.renderAd(item);
    }
  }

  renderAd(ad) {
    return (
      <div className="item ad-item" key={ ad.id }>
        <div className="item__header">
          <img className="item__profileImage" src={ad.profileImage} width={75} alt={ ad.profileName} />
          <div className="item__profileName">{ ad.profileName }</div>
        </div>
        <div className="item__body">
          <img className="item__image" src={ad.image} alt={ ad.text } />
          <div className="item__text">{ ad.text }</div>
        </div>
        <div className="item__actions">
          Like?
        </div>
      </div>
    )
  }

  renderNotification(notification) {
    return (
      <div className="item notification-item" key={ notification.id }>
        <div className="item__body">
          <img className="item__image" src={ notification.image } alt={ notification.text } />
          <div className="item__text">{ notification.text }</div>
        </div>
        <div className="item__actions">
          Like?
        </div>
      </div>
    )
  }

}
