import React, { Requireable } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';


import "../assets/css/visualizer.css";

interface VisualizerProps {
  play: boolean
}

class Visualizer extends React.Component<VisualizerProps> {
  audioTrack: any = null!;
  waveform: WaveSurfer = null!;

  static propTypes: {
    play: Requireable<boolean>
  }

  constructor(props: any) {
    super(props);
    this.audioTrack = React.createRef<HTMLAudioElement>();
  }

  componentDidMount() {
    this.waveform = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#D44646',
      responsive: true,
      waveColor: '#707070',
      cursorColor: 'transparent'
    })

    this.waveform.load(this.audioTrack);
  }

  componentDidUpdate(prevProps: any) {
    if(this.props.play !== prevProps.play) {
      this.waveform.playpause();
    }
  }

  handlePlayPause() {
    this.waveform.playpause();
  }

  render() {
    const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

    return(
      <div className="visualizer">
        <div className="wave" id="waveform" />
        <audio id="track" ref={this.audioTrack} src={url} />
      </div>
    )
  }
}

Visualizer.propTypes = {
  play: PropTypes.bool
}

export default Visualizer;