import React, { Component } from "react";
import DATA from "./ItemData";
import InfiniteScroll from "react-infinite-scroll-component";
import Observer from "@researchgate/react-intersection-observer";
import spinner from "./spinner.gif";

function random(min, max) {
  return min + Math.random() * (max - min);
}

function choice(l) {
  return l[Math.floor(Math.random() * l.length)];
}

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, items: [] };
    this.seen = new Set();
  }

  componentDidMount() {
    const types = this.props.types;
    const items = DATA.filter(
      item => types.includes(item.type) && item.firstPost //&& (item.firstNotification || item.firstAd)    //in itemData --> firstPost: true
    );
    this.setState({ items, isLoading: false });
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.emotion !== this.props.emotion) {
  //     console.log(`EMOTION: ${prevProps.emotion} --> ${this.props.emotion}`);
  //     this.fetchNewItems();
  //   } else if (prevProps.target !== this.props.target) {
  //     console.log(`TARGET: ${prevProps.target} --> ${this.props.target}`);
  //     this.fetchNewItems();
  //   }
  // }

  fetchNewItem() {
    console.log("fetchNewItem", this.props.target, this.props.emotion);
    let newItem;
    if (this.props.target) {
      newItem = DATA.find(
        item =>
          item &&
          this.props.types.includes(item.type) &&
          item.target === this.props.target &&
          !this.seen.has(item)
      );
      if (!newItem) {
        this.seen.forEach(item => {
          if (item.target === this.props.target && !item.firstPost) {
            this.seen.delete(item);
          }
        });
      }
    } else if (this.props.emotion) {
      newItem = DATA.find(
        item =>
          item &&
          this.props.types.includes(item.type) &&
          !item.target &&
          !item.firstPost &&
          item.emotionStatus === this.props.emotion &&
          !this.seen.has(item)
      );
      if (!newItem) {
        this.seen.forEach(item => {
          if (item.emotionStatus === this.props.emotion && !item.firstPost) {
            this.seen.delete(item);
          }
        });
      }
    } else {
      newItem = DATA.find(
        item =>
          item &&
          this.props.types.includes(item.type) &&
          !item.firstPost &&
          !item.target &&
          !item.emotionStatus &&
          !this.seen.has(item)
      );
      if (!newItem) {
        this.seen.forEach(item => {
          if (!item.emotionStatus && !item.target) {
            this.seen.delete(item);
          }
        });
      }
    }
    // console.log("fetchNewItems", newItem);
    if (!newItem) {
      //console.log("NO NEW ITEMS FOUND – clearing seen");
      const newItems = DATA.filter(
        item =>
          item &&
          this.props.types.includes(item.type) &&
          !item.target &&
          !item.firstPost &&
          !item.emotionStatus
        // !this.seen.has(item)
      );
      newItem = choice(newItems);
    }
    if (newItem) {
      this.seen.add(newItem);
      newItem = JSON.parse(JSON.stringify(newItem));
      newItem.id = Math.floor(Math.random() * 1000000);
      const items = this.state.items;
      //items.unshift(newItem);
      items.push(newItem);
      this.setState({ items });
    }
  }

  fetchNewItems() {
    // for (let i = 0; i < 2; i++) {
    this.fetchNewItem();
    // }
  }

  render() {
    return (
      <InfiniteScroll
        ref={this.scroller}
        dataLength={this.state.items.length}
        next={this.fetchNewItems.bind(this)}
        hasMore={true}
        loader={
          <img
            style={{
              width: 25,
              verticalAlign: "middle",
              marginLeft: 230,
              marginTop: 50,
              marginBottom: 50
            }}
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
        scrollThreshold={0.99}
      >
        {/* <p>EMOTION: { this.props.emotion}</p> */}
        {this.state.items.map((i, index) =>
          // <div key={index}>div - #{index}</div>
          this.renderItem(i)
        )}
      </InfiniteScroll>
    );
  }

  onClickModalPost(modalPost) {
    const modal = document.getElementById(`myModal-${modalPost.id}`);
    const modalImage = modal.querySelector(".modal-content");
    const closeSpan = modal.querySelector(".close");

    modal.style.display = "block";
    modalImage.src = modalPost.image;

    const closeFn = () => {
      modal.style.display = "none";
    };

    modal.addEventListener("click", closeFn);
    closeSpan.addEventListener("click", closeFn);
  }

  onClickModalVideo(modalVideo) {
    const modal = document.getElementById(`myModal-${modalVideo.id}`);
    const modalImage = modal.querySelector(".modal-content");
    const closeSpan = modal.querySelector(".close");

    modal.style.display = "block";
    modalImage.src = modalVideo.video;

    const closeFn = () => {
      modal.style.display = "none";
    };

    modal.addEventListener("click", closeFn);
    closeSpan.addEventListener("click", closeFn);
  }

  renderItem(item) {
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
    } else if (item.type === "modalPost") {
      element = this.renderModalPost(item);
    } else if (item.type === "modalVideo") {
      element = this.renderModalVideo(item);
    } else if (item.type === "video") {
      element = this.renderVideo(item);
    } else if (item.type === "gif") {
      element = this.renderGif(item);
    } else {
      element = this.renderNews(item);
    }
    if (item.onVisible) {
      element = (
        <Observer
          onChange={this.props.app[item.onVisible].bind(this.props.app)}
          threshold={0.1}
          key={item.id}
        >
          {element}
        </Observer>
      );
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
            width={90}
            height={90}
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
            width={90}
            height={90}
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
            width={90}
            height={90}
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
            width={90}
            height={90}
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

  renderModalPost(modalPost) {
    //-----------------------------------------------------modalpost!!!!!!!!!!!!!!!!!!!!!!!!!----------------------------------------
    return (
      <div className="item news-item" key={modalPost.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={modalPost.profileImage}
            width={90}
            height={90}
            alt={modalPost.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">{modalPost.profileName}</span>
            <span className="item__action"> {modalPost.action}</span>
            <p className="item__date"> {modalPost.date}</p>
          </div>
        </div>
        <div className="item__body">
          <div className="item__subText">{modalPost.text}</div>
          <img
            onClick={this.onClickModalPost.bind(this, modalPost)}
            id="originalImage"
            className="item__image"
            src={modalPost.image}
            alt={modalPost.text}
          />
        </div>
        <div id={`myModal-${modalPost.id}`} className="modal">
          <span className="close">&times;</span>
          <img className="modal-content" />
        </div>
        <div className="item__actions">
          <span className="item__smiley">{modalPost.smiley}</span>
        </div>
      </div>
    );
  }

  renderModalVideo(modalVideo) {
    //-----------------------------------------------------modalvideo!!!!!!!!!!!!!!!!!!!!!!!!!----------------------------------------
    return (
      <div className="item news-item" key={modalVideo.id}>
        <div className="item__newsHeader">
          <img
            className="item__profileImage"
            src={modalVideo.profileImage}
            width={90}
            height={90}
            alt={modalVideo.profileName}
          />
          <div className="item__profileNameContainer">
            <span className="item__profileName">{modalVideo.profileName}</span>
            <span className="item__action"> {modalVideo.action}</span>
            <p className="item__date"> {modalVideo.date}</p>
          </div>
        </div>
        <div className="item__body">
          <div className="item__subText">{modalVideo.text}</div>
          <video
            autoPlay
            muted
            loop
            id="ownVideo"
            width="1332"
            height="830"
            onClick={this.onClickModalVideo.bind(this, modalVideo)}
          >
            <source src={modalVideo.video} type="video/mp4" />
          </video>
        </div>
        <div id={`myModal-${modalVideo.id}`} className="modal">
          <span className="close">&times;</span>
          <video className="modal-content" autoPlay muted />
        </div>
        <div className="item__actions">
          <span className="item__smiley">{modalVideo.smiley}</span>
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
            width={90}
            height={90}
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
            width={90}
            height={90}
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
            width="1332"
            height="828.8"
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
            width={90}
            height={90}
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
            width={90}
            height={90}
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
            width={90}
            height={90}
            alt={story.profileName}
          />
          <p className="item__storyProfileName">{story.profileName}</p>
        </div>
      </div>
    );
  }
}
