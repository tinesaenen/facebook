import React, { Component } from "react";
import DATA from "./ItemData";
import InfiniteScroll from "react-infinite-scroll-component";
import Observer from '@researchgate/react-intersection-observer';
import spinner from "./spinner.gif";

// let currentFeedItems = [];
let loadNewData = 0;
// let items;

function random(min, max) {
  return min + Math.random() * (max - min);
}

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, allItems: [], items: [] };
  }

  componentDidMount() {
    const types = this.props.types;
    const allItems = DATA.filter(
      item => types.includes(item.type) && !item.target
    );
    const items = allItems.slice(0, 10);
    this.setState({ allItems, items });
  }

  fetchData = () => {
    let newItems = this.state.allItems.filter(
      item => item.emotionStatus === this.props.emotion
    );
    if (newItems.length > 0) {
      // newItems.sort((a, b) => a.order - b.order);
    } else {
      const newIndex = this.state.items.length;
      newItems = this.state.allItems.slice(newIndex, newIndex + 10);
      newItems = newItems.filter(
        item => typeof item.emotionStatus === "undefined"
      );
    }
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(newItems)
      });
    }, 1000);
  };

  render() {
    return (
      <InfiniteScroll
        ref={this.scroller}
        dataLength={this.state.items.length}
        next={this.fetchData}
        hasMore={this.state.items.length < this.state.allItems.length}
        loader={
          <img
            style={{ width: 25, verticalAlign: "middle", margin: 40 }}
            src={spinner}
          />
        }
        // height={700}
        scrollableTarget="newsfeed-wrapper"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // scrollThreshold={0.7}
      >
        {/* <p>EMOTION: { this.props.emotion}</p> */}
        {this.state.items.map((i, index) =>
          // <div key={index}>div - #{index}</div>
          this.renderItem(i)
        )}
      </InfiniteScroll>
    );
  }

  renderItem(item) {
    // console.log(this.state.items.length);
    // console.log(item);
    let element;

    if (item.type === "news") {
      element = this.renderNews(item);
    } else if (item.type === "bigNews") {
      element = this.renderBigNews(item);
    } else if (item.type === "bigNewsOwnPost") {
      element = this.renderBigNewsOwnPost(item);
    } else if (item.type === "status") {
      element = this.renderStatus(item);
    } else if (item.type === "picture") {
      element = this.renderPicture(item);
    } else if (item.type === "notification") {
      element = this.renderNotification(item);
    } else if (item.type === "miniNotification") {
      element = this.renderMiniNotification(item);
    } else if (item.type === "ad") {
      element = this.renderAd(item);
    } else if (item.type === "story") {
      element = this.renderStory(item);
    } else if (item.type === "video") {
      element = this.renderVideo(item);
    } else if (item.type === "gif") {
      element = this.renderGif(item);
    } else {
      element = this.renderNews(item);
    }
    if (item.onVisible) {
      element = <Observer
        onChange={this.props.app[item.onVisible].bind(this.props.app)}
        threshold={0.5}
        >{element}</Observer>
    }
    return element;
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
        <div className="item__body item__bodyColor">
          <img className="item__image" src={news.image} alt={news.text} />
          <div className="item__messagesource_itemText_container">
            <p className="item__messageSourceWebsite">
              <a href={news.messageSourceWebsite}>
                {news.messageSourceWebsite}
              </a>
            </p>
            <div className="item__text">{news.text}</div>
          </div>
        </div>
        <div className="item__actions">
          <span className="item__smiley">{news.smiley}</span>
          {/* <span className="item__profileName"> {news.profileName}</span>
          <span> {news.messageResponse}</span> */}
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
        <div className="item__body item__bodyColor">
          <img className="item__image" src={bigNews.image} alt={bigNews.text} />
          <div className="item__messagesource_itemText_container">
            <p className="item__messageSourceWebsite">
              <a href={bigNews.messageSourceWebsite}>
                {bigNews.messageSourceWebsite}
              </a>
            </p>
            <div className="item__text item__textBigNews">{bigNews.text}</div>
            <div className="item__subText item__subTextBigNews">
              {bigNews.subText}
            </div>
          </div>
        </div>

        <div className="item__actions">
          <span className="item__smiley">{bigNews.smiley}</span>
          {/* <span className="item__profileName"> {bigNews.profileName}</span>
          <span> {bigNews.messageResponse}</span> */}
        </div>
      </div>
    );
  }

  renderBigNewsOwnPost(bigNewsOwnPost) {
    return (
      <div className="item news-item" key={bigNewsOwnPost.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={bigNewsOwnPost.profileImage}
            width={45}
            height={45}
            alt={bigNewsOwnPost.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">
              {bigNewsOwnPost.profileName}
            </span>
            <span className="item__action"> {bigNewsOwnPost.action}</span>
            {/* <span className="item__messageSource">
              {bigNewsOwnPost.messageSource}
            </span> */}
            <p className="item__date"> {bigNewsOwnPost.date}</p>
          </div>
        </div>
        <div className="item__body item__bodyColor">
          <img
            className="item__image"
            src={bigNewsOwnPost.image}
            alt={bigNewsOwnPost.text}
          />
          <div className="item__messagesource_itemText_container">
            <p className="item__messageSourceWebsite">
              <a href={bigNewsOwnPost.messageSourceWebsite}>
                {bigNewsOwnPost.messageSourceWebsite}
              </a>
            </p>
            <div className="item__text item__textBigNews">
              {bigNewsOwnPost.text}
            </div>
            <div className="item__subText item__subTextBigNews">
              {bigNewsOwnPost.subText}
            </div>
          </div>
        </div>

        <div className="item__actions">
          <span className="item__smiley">{bigNewsOwnPost.smiley}</span>
          {/* <span className="item__profileName"> {bigNews.profileName}</span>
          <span> {bigNews.messageResponse}</span> */}
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
          {/* <span className="item__profileName"> {picture.profileName}</span>
          <span> {picture.messageResponse}</span> */}
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
          {/* <span className="item__profileName"> {gif.profileName}</span>
          <span> {gif.messageResponse}</span> */}
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
          {/* <span className="item__profileName"> {video.profileName}</span>
          <span> {video.messageResponse}</span> */}
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
          {/* <span className="item__profileName"> {status.profileName}</span>
          <span> {status.messageResponse}</span> */}
        </div>
      </div>
    );
  }

  renderNotification(notification) {
    // console.log(notification);
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
    // console.log(miniNotification);
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
          <div className="item__subText item__subTextAd">{ad.subText}</div>
        </div>
      </div>
    );
  }

  renderStory(story) {
    return (
      <div className="item story-item" key={story.id}>
        <div className="item__storyItem">
          <img
            className="item__storyProfileImage"
            src={story.profileImage}
            width={45}
            height={45}
            alt={story.profileName}
          />
          <p className="item__storyProfileName">{story.profileName}</p>
        </div>
      </div>
    );
  }
}