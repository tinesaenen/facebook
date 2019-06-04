import React, { Component, Fragment } from "react";
import AudioAnalyser from "./AudioAnalyser";

export default class FaceTracking extends Component {
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
      // this.setState({ emotions: {} });
      return;
    }

    const face = faces[0];

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
    ctx.fillStyle = "#0d76ff";

    ctx.fill();

    let oogx2 = (points[18].x + points[19].x + points[32].x + points[33].x) / 4;
    let oogy2 = (points[18].y + points[19].y + points[32].y + points[33].y) / 4;
    ctx.beginPath();
    ctx.moveTo(oogx2, oogy2);
    ctx.arc(oogx2, oogy2, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#0d76ff";
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

    vreugdediv.style.width = `${face.emotions.joy}%`;
    woedediv.style.width = `${face.emotions.anger}%`;
    verdrietdiv.style.width = `${face.emotions.sadness}%`;
    afgunstdiv.style.width = `${face.emotions.disgust}%`;
    minachtingdiv.style.width = `${face.emotions.contempt}%`;
    angstdiv.style.width = `${face.emotions.fear}%`;
    verwonderingdiv.style.width = `${face.emotions.surprise}%`;

    var dt = new Date();
    document.getElementById("time").innerHTML = dt.toLocaleTimeString();

    var dt = new Date();
    document.getElementById("date").innerHTML =
      ("0" + (dt.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + dt.getDate()).slice(-2) +
      "/" +
      dt.getFullYear();

    // this.setState({ emotions: face.emotions });
    if (this.props.onEmotions) {
      this.props.onEmotions(face.emotions);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="liveFaceTracking">
          <div className="videoCanvas">
            <div className="liveFaceTracking__video" />
          </div>
          <div className="equaliserTimeContainer">
            <div className="liveFaceTracking__stats">
              <div className="emotion">
                <p className="emotion-label">Vreugde</p>
                <div className="onderliggendeBalk">
                  <div className="emotion-vreugde balk">&nbsp;</div>
                </div>
              </div>
              <div className="emotion">
                <p className="emotion-label">Woede</p>
                <div className="onderliggendeBalk">
                  <div className="emotion-woede balk">&nbsp;</div>
                </div>
              </div>
              <div className="emotion">
                <p className="emotion-label">Verdriet</p>
                <div className="onderliggendeBalk">
                  <div className="emotion-verdriet balk">&nbsp;</div>
                </div>
              </div>
              <div className="emotion">
                <p className="emotion-label">Afgunst</p>
                <div className="onderliggendeBalk">
                  <div className="emotion-afgunst balk">&nbsp;</div>
                </div>
              </div>
              <div className="emotion">
                <p className="emotion-label">Minachtig</p>
                <div className="onderliggendeBalk">
                  <div className="emotion-minachting balk">&nbsp;</div>
                </div>
              </div>
              <div className="emotion">
                <p className="emotion-label">Angst</p>
                <div className="onderliggendeBalk">
                  <div className="emotion-angst balk">&nbsp;</div>
                </div>
              </div>
              <div className="emotion">
                <p className="emotion-label">Verbazing</p>
                <div className="onderliggendeBalk">
                  <div className="emotion-verwondering balk">&nbsp;</div>
                </div>
              </div>
            </div>
            <div className="timeStatAnalyserEqualiserContainer">
              <div className="timeStatAnalyserContainer">
                <div className="timeStatLabelContainer">
                  <p className="timeStatLabel" id="date" />
                  <p className="timeStatLabel" id="time" />
                </div>
                <div className="timeStatLabelContainer">
                  <p className="timeStatLabel">BELGIE </p>
                  <p className="timeStatLabel">51°11’56,742”N</p>
                  <p className="timeStatLabel">4°24’14,293”O</p>
                </div>
              </div>
              <div>
                <div className="audioAnalyser">
                  <AudioAnalyser />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="privacySerieus">
          * Wij nemen uw privacy heel serieus. Ga naar de privacyovereenkomst.
        </div>
      </Fragment>
    );
  }
}
