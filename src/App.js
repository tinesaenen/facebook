import React, { Component } from "react";
import Feed from "./Feed";
import NewsFeed from "./NewsFeed";
import FaceTracking from "./FaceTracking";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emotions: {},
      currentTarget: null,
      currentEmotion: null,
      emotionCooldown: Date.now(),
      showFaceTracking: false,
      showAds: false,
      showNotifications: false
    };
  }

  componentDidMount() {
    this.audio = new Audio("/imagesIntro/Blip.mp3");

    var pubnubDemo = new window.PubNub({
      publishKey: "pub-c-d4621507-6ae8-4cf8-a156-cfb1c8d2a4cb",
      subscribeKey: "sub-c-40748466-5610-11e9-93f3-8ed1bbcba485"
    });

    pubnubDemo.addListener({
      message: message => {
        console.log(message);
        this.setState({ currentTarget: message.message.target });
      }
    });

    pubnubDemo.subscribe({
      channels: ["main"]
    });
  }

  checkEmotions(emotions) {
    if (this.state.emotionCooldown > Date.now()) return;
    const keys = Object.keys(emotions);
    for (const key of keys) {
      const value = emotions[key];
      if (value > 90) {
        this.setState({
          currentEmotion: key,
          emotionCooldown: Date.now() + 2 * 1000
        });
        console.log("CURRENT EMOTION", key);
        return;
      }
    }
    this.setState({ currentEmotion: null });
  }

  onSwitch() {
    if (document.body.className === "oldStyle") {
      document.body.className = "newStyle";
    } else {
      document.body.className = "oldStyle";
    }
  }

  switchToNewStyle({ isIntersecting }) {
    if (!isIntersecting) return;
    this.audio.play();
    document.body.className = "newStyle";
  }

  showFaceTracking({ isIntersecting }) {
    if (!isIntersecting) return;
    this.audio.play();
    this.setState({ showFaceTracking: true });
    this.setState({});
  }

  showAds({ isIntersecting }) {
    if (!isIntersecting) return;
    this.audio.play();
    this.setState({ showAds: true });
  }

  showNotifications({ isIntersecting }) {
    if (!isIntersecting) return;
    this.audio.play();
    this.setState({ showNotifications: true });
  }

  render() {
    const { emotions, showFaceTracking, currentTarget } = this.state;

    return (
      <div className="app">
        <header className="header">
          {/* <button
            id="switch"
            onClick={this.onSwitch.bind(this)}
            style={{ position: "absolute", right: 0 }}
          >
            Switch
          </button> */}
          <div className="logo_search_container">
            <img
              src="/imagesIcons/logo_fb_oldStyle.png"
              className="header__logo logo_oldStyle"
              alt="logo"
              height="25"
            />
            <img
              src="/imagesIcons/logoFacebook.png"
              className="header__logo logo_newStyle"
              alt="logo"
              height="25"
            />
            <input className="header__input" placeholder="zoeken" />
          </div>
          <img
            src="/imagesIcons/icons_oldStyle.png"
            className="header__icons_oldStyle"
            alt="logo"
            height="30"
          />
        </header>
        <main>
          <div className="leftColumn">
            {showFaceTracking && (
              <FaceTracking onEmotions={this.checkEmotions.bind(this)} />
            )}
            {!showFaceTracking && (
              <img
                src="/imagesIcons/linker_kolom_oldStyle.png"
                className="linkerkolom__icons_oldStyle"
                alt="logo"
                height="inherit"
              />
            )}

            <div className="leftColumnScroll">
              {this.state.showNotifications && (
                <Feed
                  className="verticalFeed"
                  types={["notification", "miniNotification"]}
                  emotion={this.state.currentEmotion}
                  autoRefresh={true}
                  target={currentTarget}
                />
              )}
            </div>
          </div>

          <div className="middleColumn" id="newsfeed-wrapper">
            <NewsFeed
              className="verticalFeed"
              types={[
                "news",
                "bigNews",
                "bigNewsOwnPost",
                "status",
                "picture",
                "gif",
                "video",
                "introPicture"
              ]}
              emotion={this.state.currentEmotion}
              app={this}
              target={currentTarget}
            />
          </div>

          <div className="rightColumn">
            {!this.state.showAds && (
              <img
                src="/imagesIcons/rechter_kolom_oldstyle.jpg"
                className="rechterkolom__icons_oldStyle"
                alt="logo"
                height="inherit"
              />
            )}
            {this.state.showAds && (
              <div className="storyContainer">
                <Feed className="horizontalFeed" types={["story"]} />
              </div>
            )}
            {this.state.showAds && (
              <div className="rightColumnScroll">
                <Feed
                  className="verticalFeed"
                  types={["ad"]}
                  target={currentTarget}
                />
              </div>
            )}
          </div>
          <div />
        </main>
      </div>
    );
  }
}
