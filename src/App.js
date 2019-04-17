import React, { Component } from "react";
import Feed from "./Feed";
import AudioAnalyser from "./AudioAnalyser";
// import InfiniteScroll from "react-infinite-scroll-component";

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

    var pubnubDemo = new window.PubNub({
      publishKey: "pub-c-d4621507-6ae8-4cf8-a156-cfb1c8d2a4cb",
      subscribeKey: "sub-c-40748466-5610-11e9-93f3-8ed1bbcba485"
    });

    pubnubDemo.addListener({
      message: function(message) {
        console.log(message);
        alert(JSON.stringify(message));
      }
    });

    pubnubDemo.subscribe({
      channels: ["main"]
    });
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
    const points = face.featurePoints;
    ctx.lineWidth = 1;
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

    // // oog links hor
    // ctx.moveTo(points[16].x, points[16].y);
    // ctx.lineTo(points[17].x, points[17].y);

    // // oog links vert
    // ctx.moveTo(points[30].x, points[30].y);
    // ctx.lineTo(points[31].x, points[31].y);

    // // oog rechts hor
    // ctx.moveTo(points[18].x, points[18].y);
    // ctx.lineTo(points[19].x, points[19].y);

    // // oog rechts vert
    // ctx.moveTo(points[32].x, points[32].y);
    // ctx.lineTo(points[33].x, points[33].y);

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

    let oogx1 = (points[16].x + points[17].x + points[30].x + points[31].x) / 4;
    let oogy1 = (points[16].y + points[17].y + points[30].y + points[31].y) / 4;
    ctx.beginPath();
    ctx.moveTo(oogx1, oogy1);
    ctx.arc(oogx1, oogy1, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "cyan";

    ctx.fill();

    let oogx2 = (points[18].x + points[19].x + points[32].x + points[33].x) / 4;
    let oogy2 = (points[18].y + points[19].y + points[32].y + points[33].y) / 4;
    ctx.beginPath();
    ctx.moveTo(oogx2, oogy2);
    ctx.arc(oogx2, oogy2, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "cyan";
    ctx.fill();

    ctx.fillStyle = "white";
    for (let i = 0; i < 34; i++) {
      if (
        i === 16 ||
        i === 17 ||
        i === 30 ||
        i === 31 ||
        i === 18 ||
        i === 19 ||
        i === 32 ||
        i === 33
      )
        continue;
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

    vreugdediv.style.width = `${this.state.emotions.joy}%`;
    woedediv.style.width = `${this.state.emotions.anger}%`;
    verdrietdiv.style.width = `${this.state.emotions.sadness}%`;
    afgunstdiv.style.width = `${this.state.emotions.disgust}%`;
    minachtingdiv.style.width = `${this.state.emotions.contempt}%`;
    angstdiv.style.width = `${this.state.emotions.fear}%`;
    verwonderingdiv.style.width = `${this.state.emotions.surprise}%`;

    var dt = new Date();
    document.getElementById("time").innerHTML =
      dt.toLocaleTimeString() + " CET";

    var dt = new Date();
    document.getElementById("date").innerHTML =
      ("0" + (dt.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + dt.getDate()).slice(-2) +
      "/" +
      dt.getFullYear();
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
              <div>
                <div className="timeStatLabelContainer">
                  <p className="timeStatLabel" id="date" />
                  <p className="timeStatLabel" id="time" />
                  <p className="timeStatLabel">BELGIE </p>
                  <p className="timeStatLabel">51°11’56,742”N</p>
                  <p className="timeStatLabel">4°24’14,293”O</p>
                  <AudioAnalyser />
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
            </div>
            <div className="privacySerieus">
              * Wij nemen uw privacy heel serieus.
            </div>
            <div className="leftColumnScroll">
              <Feed
                className="verticalFeed"
                types={["notification", "miniNotification"]}
                autoRefresh={true}
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
