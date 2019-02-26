import React, { Component } from "react";
import Feed from "./Feed";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <img
            src="/imagesIcons/logoFacebook.png"
            className="header__logo"
            alt="logo"
            height="20"
          />
          <input className="header__input" />
        </header>
        <main>
          <div className="leftColumn">
            <div className="liveFaceTracking">facialrecognition</div>
            <div className="leftColumnScroll">
              <Feed
                className="verticalFeed"
                types={["notification", "miniNotification"]}
              />
            </div>
          </div>
          <div className="middleColumn">
            <Feed
              className="verticalFeed"
              types={["news", "bigNews", "status", "picture"]}
            />
          </div>
          <div className="rightColumn">
            <div className="storyContainer">
              <Feed className="horizontalFeed" types={["story"]} />
              <div className="gekleurdeDiv" />
            </div>

            <div className="rightColumnScroll">
              <Feed className="verticalFeed" types={["ad"]} />
            </div>
          </div>
          <div />
        </main>
      </div>
    );
  }
}
