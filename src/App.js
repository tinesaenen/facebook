import React, { Component } from "react";
import Feed from "./Feed";

let detector;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { emotions: {} };
  }

  componentDidMount() {
    const videoRoot = document.querySelector(".liveFaceTracking__video");
    const faceMode = window.affdex.FaceDetectorMode.LARGE_FACES;
    detector = new window.affdex.CameraDetector(videoRoot, 645, 485, faceMode);

    detector.addEventListener("onInitializeSuccess", function() {
      document.querySelector("#face_video_canvas").style.display = "block";
      document.querySelector("#face_video").style.display = "none";
    });

    detector.addEventListener(
      "onImageResultsSuccess",
      this.onAffectivaImage.bind(this)
    );
    detector.detectAllExpressions();
    detector.detectAllEmotions();
    detector.detectAllEmojis();
    detector.detectAllAppearance();
    detector.start();
  }

  componentWillUnmount() {
    detector.stop();
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

    const vreugdediv = document.querySelector(`.emotion-vreugde`),
      woedediv = document.querySelector(`.emotion-woede`),
      verdrietdiv = document.querySelector(`.emotion-verdriet`),
      afgunstdiv = document.querySelector(`.emotion-afgunst`),
      minachtingdiv = document.querySelector(`.emotion-minachting`),
      angstdiv = document.querySelector(`.emotion-angst`),
      verwonderingdiv = document.querySelector(`.emotion-verwondering`);

    let vreugdebalk = this.calculateWidth(this.state.emotions.joy);
    let woedebalk = this.calculateWidth(this.state.emotions.anger);
    let verdrietbalk = this.calculateWidth(this.state.emotions.sadness);
    let afgunstbalk = this.calculateWidth(this.state.emotions.disgust);
    let minachtingbalk = this.calculateWidth(this.state.emotions.contempt);
    let angstbalk = this.calculateWidth(this.state.emotions.fear);
    let verwonderingbalk = this.calculateWidth(this.state.emotions.surprise);

    console.log(vreugdebalk);

    vreugdediv.style.width = `${vreugdebalk}px`;
    woedediv.style.width = `${woedebalk}px`;
    verdrietdiv.style.width = `${verdrietbalk}px`;
    afgunstdiv.style.width = `${afgunstbalk}px`;
    minachtingdiv.style.width = `${minachtingbalk}px`;
    angstdiv.style.width = `${angstbalk}px`;
    verwonderingdiv.style.width = `${verwonderingbalk}px`;
  }

  calculateWidth(percent) {
    return (percent / 100) * 135;
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
              <div className="videoCanvas">
                <div className="liveFaceTracking__video" />
              </div>
              <div className="liveFaceTracking__stats">
                <div className="emotion">
                  <p className="emotion-label">Vreugde</p>
                  <div className="onderliggendeBalk">
                    <div className="emotion-vreugde balk">
                      <p className="procent">
                        {(emotions.joy || 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="emotion">
                  <p className="emotion-label">Woede</p>
                  <div className="onderliggendeBalk">
                    <div className="emotion-woede balk">
                      <p className="procent">
                        {(emotions.anger || 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="emotion">
                  <p className="emotion-label">Verdriet</p>
                  <div className="onderliggendeBalk">
                    <div className="emotion-verdriet balk">
                      <p className="procent">
                        {(emotions.sadness || 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="emotion">
                  <p className="emotion-label">Afgunst</p>
                  <div className="onderliggendeBalk">
                    <div className="emotion-afgunst balk">
                      <p className="procent">
                        {(emotions.disgust || 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="emotion">
                  <p className="emotion-label">Minachtig</p>
                  <div className="onderliggendeBalk">
                    <div className="emotion-minachting balk">
                      <p className="procent">
                        {(emotions.contempt || 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="emotion">
                  <p className="emotion-label">Angst</p>
                  <div className="onderliggendeBalk">
                    <div className="emotion-angst balk">
                      <p className="procent">
                        {(emotions.fear || 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="emotion">
                  <p className="emotion-label">Verbazing</p>
                  <div className="onderliggendeBalk">
                    <div className="emotion-verwondering balk">
                      <p className="procent">
                        {(emotions.surprise || 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
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
