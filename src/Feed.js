import React, { Component } from "react";
import DATA from "./ItemData";

function random(min, max) {
  return min + Math.random() * (max - min);
}

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: []
    };
    this.seen = new Set();
    this.timeForNewItems = Date.now() + 2 * 1000;
    // this.prevEmotion = null;
    // console.log(this.state.allItems);
  }

  componentDidMount() {
    const types = this.props.types;
    const allItems = DATA.filter(
      item =>
        types.includes(item.type) &&
        (!item.target || item.target === this.props.target) &&
        !item.firstNotification &&
        !item.firstAd
    );
    const items = DATA.filter(
      item =>
        types.includes(item.type) && (item.firstNotification || item.firstAd)
    );
    // console.log("ITEMS", items);
    this.setState({ allItems, items, isLoading: false });
    if (this.props.autoRefresh) {
      // setTimeout(this.fetchNewItem.bind(this), random(1000, 7000));
    } else {
      this.setState({ items: allItems });
    }
    setInterval(this.fetchNewItem.bind(this), 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.emotion !== this.props.emotion) {
      this.fetchNewItem();
      this.timeForNewItems = Date.now();
    }
  }

  fetchNewItem() {
    if (this.timeForNewItems > Date.now()) return;
    // console.log("fetchNewItem", this.props.emotion);
    let newItem;
    if (this.props.target) {
      newItem = DATA.find(
        item =>
          item &&
          this.props.types.includes(item.type) &&
          item.target === this.props.target &&
          !this.seen.has(item)
      );
    } else if (this.props.emotion) {
      newItem = DATA.find(
        item =>
          item &&
          this.props.types.includes(item.type) &&
          !item.target &&
          !item.firstNotification &&
          item.emotionStatus === this.props.emotion &&
          !this.seen.has(item)
      );
    }
    if (newItem) {
      this.seen.add(newItem);
      const items = this.state.items;
      items.unshift(newItem);
      this.setState({ items });
    }
    this.timeForNewItems = Date.now() + random(5000, 8000);
    //setTimeout(this.fetchNewItem.bind(this), );
  }

  render() {
    let { isLoading, items } = this.state;
    //if (this.props.autoRefresh) {
    //items = items.slice(0, itemCount);
    //items = items.reverse();
    //}
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
    } else if (item.type === "story") {
      return this.renderStory(item);
    } else if (item.type === "video") {
      return this.renderVideo(item);
    } else if (item.type === "gif") {
      return this.renderGif(item);
    } else if (item.type === "introPicture") {
      return this.renderIntroPicture(item);
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
          {/* <span className="item__profileName"> {news.profileName}</span> */}
          {/* <span> {news.messageResponse}</span> */}
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
          {/* <span className="item__profileName"> {bigNews.profileName}</span> */}
          {/* <span> {bigNews.messageResponse}</span> */}
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
          {/* <span className="item__profileName"> {picture.profileName}</span> */}
          {/* <span> {picture.messageResponse}</span> */}
        </div>
      </div>
    );
  }

  renderGif(gif) {
    return (
      <div className="item news-item" key={gif.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={gif.profileImage}
            width={45}
            height={45}
            alt={gif.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">{gif.profileName}</span>
            <span className="item__action"> {gif.action}</span>
            <p className="item__date"> {gif.date}</p>
          </div>
        </div>
        <div className="item__body">
          <div className="item__subText">{gif.text}</div>
          <img className="item__image" src={gif.image} alt={gif.text} />
        </div>
        <div className="item__actions">
          <span className="item__smiley">{gif.smiley}</span>
          {/* <span className="item__profileName"> {gif.profileName}</span> */}
          {/* <span> {gif.messageResponse}</span> */}
        </div>
      </div>
    );
  }

  renderVideo(video) {
    return (
      <div className="item news-item" key={video.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={video.profileImage}
            width={45}
            height={45}
            alt={video.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">{video.profileName}</span>
            <span className="item__action"> {video.action}</span>
            <p className="item__date"> {video.date}</p>
          </div>
        </div>
        <div className="item__body">
          <div className="item__subText">{video.text}</div>
          <iframe
            width="548"
            height="308"
            src={video.videolink}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        <div className="item__actions">
          <span className="item__smiley">{video.smiley}</span>
          {/* <span className="item__profileName"> {video.profileName}</span> */}
          {/* <span> {video.messageResponse}</span> */}
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
          {/* <span className="item__profileName"> {status.profileName}</span> */}
          {/* <span> {status.messageResponse}</span> */}
        </div>
      </div>
    );
  }

  renderNotification(notification) {
    // console.log(notification);
    return (
      <div className="item notification-item" key={notification.id}>
        <div className="item__body item__bodyBigNotification">
          <div className="item__notificationHeader item__bigNotificationHeader">
            {/* <img
              className="item__notificationF"
              src="/imagesIcons/notification_F.png"
            /> */}
            <p className="item__notificationHeaderText ">
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
    // console.log(miniNotification);
    return (
      <div className="item notification-item" key={miniNotification.id}>
        <div className="item__body">
          <div className="item__notificationHeader">
            {/* <img
              className="item__notificationF"
              src="/imagesIcons/notification_F.png"
            /> */}
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
            width={80}
            height={80}
            alt={ad.pageName}
          />
          <div className="item__pageNameContainer">
            <span className="item__pageName item__adName ">{ad.pageName}</span>
            <p className="item__gesponsord">
              <span className="item__gesponsordBolletje">◉ </span>gesponsord
            </p>
          </div>
        </div>
        <div className="item__bodyAd">
          <img className="item__image" src={ad.image} alt={ad.text} />
          <div className="item__textAd">{ad.text}</div>
          <div className="item__subTextAd">{ad.subText}</div>
        </div>
      </div>
    );
  }

  // renderStory(story) {
  //   return (
  //     <div className="item story-item" key={story.id}>
  //       <div className="item__storyItem">
  //         <img
  //           className="item__storyProfileImage"
  //           src={story.profileImage}
  //           width={80}
  //           height={80}
  //           alt={story.profileName}
  //         />
  //         <p className="item__storyProfileName">{story.profileName}</p>
  //       </div>
  //     </div>
  //   );
  // }

  renderIntroPicture(introPicture) {
    return (
      <div className="item news-item" key={introPicture.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={introPicture.profileImage}
            width={45}
            height={45}
            alt={introPicture.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">
              {introPicture.profileName}
            </span>
            <span className="item__action"> {introPicture.action}</span>
            <p className="item__date"> {introPicture.date}</p>
          </div>
        </div>
        <div className="item__body">
          <img className="item__image" src={introPicture.image} />
        </div>
        <div className="item__actions">
          <span className="item__smiley">{introPicture.smiley}</span>
          <span className="item__numberLikes">{introPicture.number}</span>
        </div>
      </div>
    );
  }
}
