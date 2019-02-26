import React, { Component } from "react";
import DATA from "./ItemData";

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, items: [] };
  }

  componentDidMount() {
    const types = this.props.types;
    const items = DATA.filter(
      item => types.includes(item.type) && !item.target
    );
    this.setState({ items, isLoading: false });
  }

  render() {
    const { isLoading, items } = this.state;
    const itemElements = items.map(item => this.renderItem(item));
    return (
      <div className="feed">
        {isLoading && (
          <div className="feed__loading">
            <i className="fas fa-spin fa-spinner" />
          </div>
        )}
        {itemElements}
      </div>
    );
  }

  renderItem(item) {
    if (item.type === "news") {
      return this.renderNews(item);
    } else if (item.type === "bigNews") {
      return this.renderBigNews(item);
    } else if (item.type === "status") {
      return this.renderStatus(item);
    } else if (item.type === "picture") {
      return this.renderPicture(item);
    } else if (item.type === "notification") {
      return this.renderNotification(item);
    } else if (item.type === "miniNotification") {
      return this.renderMiniNotification(item);
    } else if (item.type === "ad") {
      return this.renderAd(item);
    } else {
      return this.renderNews(item);
    }
  }

  renderNews(news) {
    return (
      <div className="item news-item" key={news.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={news.profileImage}
            width={45}
            height={45}
            alt={news.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">{news.profileName}</span>
            <span className="item__action"> {news.action}</span>
            <span className="item__messageSource"> {news.messageSource}</span>
            <p className="item__date"> {news.date}</p>
          </div>
        </div>
        <div className="item__body">
          <img className="item__image" src={news.image} alt={news.text} />
          <p className="item__messageSourceWebsite">
            <a href={news.messageSourceWebsite}>{news.messageSourceWebsite}</a>
          </p>
          <div className="item__text">{news.text}</div>
        </div>
        <div className="item__actions">
          <span className="item__smiley">{news.smiley}</span>
          <span className="item__profileName"> {news.profileName}</span>
          <span> {news.messageResponse}</span>
        </div>
      </div>
    );
  }

  renderBigNews(bigNews) {
    return (
      <div className="item news-item" key={bigNews.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={bigNews.profileImage}
            width={45}
            height={45}
            alt={bigNews.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">{bigNews.profileName}</span>
            <span className="item__action"> {bigNews.action}</span>
            <span className="item__messageSource">{bigNews.messageSource}</span>
            <p className="item__date"> {bigNews.date}</p>
          </div>
        </div>
        <div className="item__body">
          <img className="item__image" src={bigNews.image} alt={bigNews.text} />
          <p className="item__messageSourceWebsite">
            <a href={bigNews.messageSourceWebsite}>
              {bigNews.messageSourceWebsite}
            </a>
          </p>
          <div className="item__text">{bigNews.text}</div>
          <div className="item__subText">{bigNews.subText}</div>
        </div>
        <div className="item__actions">
          <span className="item__smiley">{bigNews.smiley}</span>
          <span className="item__profileName"> {bigNews.profileName}</span>
          <span> {bigNews.messageResponse}</span>
        </div>
      </div>
    );
  }

  renderPicture(picture) {
    return (
      <div className="item news-item" key={picture.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={picture.profileImage}
            width={45}
            height={45}
            alt={picture.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">{picture.profileName}</span>
            <span className="item__action"> {picture.action}</span>
            <p className="item__date"> {picture.date}</p>
          </div>
        </div>
        <div className="item__body">
          <div className="item__subText">{picture.text}</div>
          <img className="item__image" src={picture.image} alt={picture.text} />
        </div>
        <div className="item__actions">
          <span className="item__smiley">{picture.smiley}</span>
          <span className="item__profileName"> {picture.profileName}</span>
          <span> {picture.messageResponse}</span>
        </div>
      </div>
    );
  }

  renderStatus(status) {
    return (
      <div className="item news-item" key={status.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={status.profileImage}
            width={45}
            height={45}
            alt={status.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">{status.profileName}</span>
            <span className="item__action"> {status.action}</span>
            <p className="item__date"> {status.date}</p>
          </div>
        </div>
        <div className="item__body">
          <div className="item__statusText">{status.text}</div>
        </div>
        <div className="item__actions">
          <span className="item__smiley">{status.smiley}</span>
          <span className="item__profileName"> {status.profileName}</span>
          <span> {status.messageResponse}</span>
        </div>
      </div>
    );
  }

  renderNotification(notification) {
    console.log(notification);
    return (
      <div className="item notification-item" key={notification.id}>
        <div className="item__body">
          <div className="item__notificationHeader">
            <img
              className="item__notificationF"
              src="/imagesIcons/notification_F.png"
            />
            <p className="item__notificationHeaderText">
              {notification.message}
            </p>
          </div>
          <img
            className="item__image"
            src={notification.image}
            alt={notification.text}
          />
          <div className="item__notificationTextContainer">
            <div className="item__notificationTextTitle">
              {notification.textTitle}
            </div>
            <div className="item__notificationText">{notification.text}</div>
          </div>
        </div>
      </div>
    );
  }

  renderMiniNotification(miniNotification) {
    console.log(miniNotification);
    return (
      <div className="item notification-item" key={miniNotification.id}>
        <div className="item__body">
          <div className="item__notificationHeader">
            <img
              className="item__notificationF"
              src="/imagesIcons/notification_F.png"
            />
            <p className="item__notificationHeaderText">
              {miniNotification.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderAd(ad) {
    return (
      <div className="item ad-item" key={ad.id}>
        <div className="item__adHeader">
          <img
            className="item__profileImage"
            src={ad.profileImage}
            width={45}
            height={45}
            alt={ad.pageName}
          />
          <div className="item__pageNameContainer">
            <span className="item__pageName">{ad.pageName}</span>
            <p className="item__gesponsord">◉ gesponsord</p>
          </div>
        </div>
        <div className="item__body">
          <img className="item__image" src={ad.image} alt={ad.text} />
          <div className="item__text">{ad.text}</div>
          <div className="item__subText">{ad.subText}</div>
        </div>
      </div>
    );
  }
}
