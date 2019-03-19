import React, { Component } from "react";
import Feed from "./Feed";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { emotions: {} };
  }

  componentDidMount() {
    const videoRoot = document.querySelector(".liveFaceTracking__video");
    const faceMode = window.affdex.FaceDetectorMode.LARGE_FACES;
    this.detector = new window.affdex.CameraDetector(
      videoRoot,
      645,
      485,
      faceMode
    );

    this.detector.addEventListener("onInitializeSuccess", function() {
      document.querySelector("#face_video_canvas").style.display = "block";
      document.querySelector("#face_video").style.display = "none";
    });

    this.detector.addEventListener(
      "onImageResultsSuccess",
      this.onAffectivaImage.bind(this)
    );
    this.detector.detectAllExpressions();
    this.detector.detectAllEmotions();
    this.detector.detectAllEmojis();
    this.detector.detectAllAppearance();
    this.detector.start();
  }

  componentWillUnmount() {
    this.detector.stop();
  }

  onAffectivaImage(faces, image, timestamp) {
    if (faces.length !== 1) {
      this.setState({ emotions: {} });
      return;
    }

    const face = faces[0];
    this.setState({ emotions: face.emotions });
    const canvas = document.querySelector("#face_video_canvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.strokeWidth = 2;
    const points = face.featurePoints;
    ctx.beginPath();
    // Kaak
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.lineTo(points[4].x, points[4].y);

    // wenkbrauw (links)
    ctx.moveTo(points[5].x, points[5].y);
    ctx.lineTo(points[6].x, points[6].y);
    ctx.lineTo(points[7].x, points[7].y);

    // wenkbrauw (rechts)
    ctx.moveTo(points[8].x, points[8].y);
    ctx.lineTo(points[9].x, points[9].y);
    ctx.lineTo(points[10].x, points[10].y);

    // neus
    ctx.moveTo(points[11].x, points[11].y);
    ctx.lineTo(points[12].x, points[12].y);
    ctx.lineTo(points[13].x, points[13].y);
    ctx.lineTo(points[14].x, points[14].y);
    ctx.lineTo(points[15].x, points[15].y);
    ctx.lineTo(points[12].x, points[12].y);

    // oog links hor
    ctx.moveTo(points[16].x, points[16].y);
    ctx.lineTo(points[17].x, points[17].y);

    // oog links vert
    ctx.moveTo(points[30].x, points[30].y);
    ctx.lineTo(points[31].x, points[31].y);

    // oog rechts hor
    ctx.moveTo(points[18].x, points[18].y);
    ctx.lineTo(points[19].x, points[19].y);

    // oog rechts vert
    ctx.moveTo(points[32].x, points[32].y);
    ctx.lineTo(points[33].x, points[33].y);

    // mond buiten
    ctx.moveTo(points[20].x, points[20].y);
    ctx.lineTo(points[21].x, points[21].y);
    ctx.lineTo(points[22].x, points[22].y);
    ctx.lineTo(points[23].x, points[23].y);
    ctx.lineTo(points[24].x, points[24].y);
    ctx.lineTo(points[25].x, points[25].y);
    ctx.lineTo(points[26].x, points[26].y);
    ctx.lineTo(points[27].x, points[27].y);
    ctx.lineTo(points[20].x, points[20].y);

    // mond binnen
    ctx.moveTo(points[20].x, points[20].y);
    ctx.lineTo(points[29].x, points[29].y);
    ctx.lineTo(points[24].x, points[24].y);
    ctx.lineTo(points[28].x, points[28].y);
    ctx.lineTo(points[20].x, points[20].y);

    ctx.stroke();

    ctx.fillStyle = "white";
    for (let i = 0; i < 34; i++) {
      const pt = face.featurePoints[i];
      ctx.fillRect(pt.x - 2, pt.y - 2, 4, 4);
    }
  }

  render() {
    const { emotions } = this.state;
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
            <div className="liveFaceTracking">
              <div className="liveFaceTracking__video" />
              <div className="liveFaceTracking__stats">
                <p>Vreugde: {(emotions.joy || 0).toFixed(2)}%</p>
                <p>Woede: {(emotions.anger || 0).toFixed(2)}%</p>
                <p>Verdriet: {(emotions.sadness || 0).toFixed(2)}%</p>
                <p>Afgunst: {(emotions.disgust || 0).toFixed(2)}%</p>
                <p>Minachting: {(emotions.contempt || 0).toFixed(2)}%</p>
                <p>Angst: {(emotions.fear || 0).toFixed(2)}%</p>
                <p>Verwondering: {(emotions.surprise || 0).toFixed(2)}%</p>
              </div>
            </div>
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
              types={["news", "bigNews", "status", "picture", "gif", "video"]}
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
