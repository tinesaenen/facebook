import React, { Component } from "react";

export default class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // vars voor audiocontext, tekencontext, analyse en micro input
    this.canvas = this.canvasRef.current;
    this.canvas.width = 300;
    this.canvas.height = 400;
    this.ctx = this.canvas.getContext("2d");

    window.navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia(
      { audio: true },
      this.onStream.bind(this),
      function() {
        console.warn("Microphone Error");
      }
    );

    // tekent op basis van een interval van 20 millis.
    requestAnimationFrame(this.draw.bind(this));
  }

  onStream(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.mediaStreamSource = this.audioCtx.createMediaStreamSource(stream);
    this.mediaStreamSource.connect(this.analyser);
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
    if (!this.analyser) return;
    const ctx = this.ctx;
    // achtergrond
    ctx.save();
    ctx.fillStyle = "#E8EEF6";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // fft frequency display
    var frequencies = new Uint8Array(128);
    this.analyser.getByteFrequencyData(frequencies);
    // console.log(frequencies);
    ctx.fillStyle = "#0D76FF";
    for (let i = 0; i < frequencies.length; i++) {
      ctx.fillRect(i * 10, 450, 5, -frequencies[i]);
    }
    // klankdisplay op basis van time domain
    var timedomain = new Uint8Array(128);
    // debugger;
    this.analyser.getByteTimeDomainData(timedomain);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 13;
    ctx.beginPath();
    for (let i = 0; i < timedomain.length; i++) {
      let x = i * 10;
      let y = this.canvas.height * 0.8 - timedomain[i];
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  render() {
    return (
      <canvas
        style={{ width: 100, height: 75, margin: 3 }} // aanpassen voor breedte van de equalizer
        ref={this.canvasRef}
      />
    );
  }
}
