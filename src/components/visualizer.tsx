import React, { Requireable } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';

import "../assets/css/visualizer.css";

const { REACT_APP_SERVER } = process.env;

interface VisualizerProps {
  play: boolean,
  id: number,
  file: string,
  cacheDuration?: any,
  height?: number,
  barGap?: number,
  updateElapsedUI?: any,
  togglePlayIcon?: any
}

class Visualizer extends React.Component<VisualizerProps> {
  audioTrack: any = null!;
  waveform: WaveSurfer = null!;
  track: HTMLAudioElement = null!;

  static propTypes: {
    play: Requireable<boolean>,
    id: Requireable<number>,
    file: Requireable<string>,
    cacheDuration: Requireable<any>,
    height: Requireable<number>,
    barGap: Requireable<number>,
    updateElapsedUI: Requireable<any>,
    togglePlayIcon: Requireable<any>
  }

  constructor(props: any) {
    super(props);
    this.audioTrack = React.createRef<HTMLAudioElement>();
  }

  state = {
    ready: false
  }

  componentDidMount() {
    this.initializeWaveSurfer();
    this.getDuration();
    if(this.props.updateElapsedUI)
      this.trackElaspsedTime();
    
    this.onFinish();
    this.onPause();
    this.onPlay();
  }

  componentDidUpdate(prevProps: any) {
    if(this.props.play !== prevProps.play) {
      if(!this.state.ready) {
        this.loadAudio();
      } else {
        this.waveform.playPause();
      }
    }
  }

  componentWillUnmount() {
    this.cleanUpSubscriptions();
  }

  handlePlayPause() {
    this.waveform.playPause();
  }

  initializeWaveSurfer() {
    this.waveform = WaveSurfer.create({
      barWidth: 1, cursorWidth: 1, container: `#waveform${this.props.id}`,
      backend: 'WebAudio', height: this.props.height ? this.props.height : 120, 
      progressColor: '#D44646', responsive: true, waveColor: '#000000', 
      cursorColor: 'transparent', barGap: this.props.barGap ? this.props.barGap : 2.5,
    })
  }

  getDuration() {
    this.waveform.on('ready', () => this.props.cacheDuration(this.waveform.getDuration()))
  }

  trackElaspsedTime() {
    this.waveform.on(
      'audioprocess', () => this.props.updateElapsedUI(this.waveform.getCurrentTime()))
  }

  onPlay() {
    this.waveform.on(
      'play', () => this.props.togglePlayIcon('pause')
    )
  }

  onPause() {
    this.waveform.on(
      'pause', () => this.props.togglePlayIcon('play')
    )
  }

  onFinish() {
    this.waveform.on(
      'finish', () => this.props.togglePlayIcon('play')
    )
  }

  cleanUpSubscriptions() {
    this.waveform.un('ready', ()=>{})
    this.waveform.un('audioprocess', ()=>{})
    this.waveform.un('play', ()=>{})
    this.waveform.un('finish', () => {})
    this.waveform.un('pause', () => {})
  }

  loadAudio() {
    this.waveform.load(this.audioTrack.current);
    this.waveform.on('ready', () => {
      this.setState({
        ready: true
      }, () => this.waveform.playPause())

    });
  }

  render() {
    return(
      <div className="visualizer">
        <div className="wave" id={`waveform${this.props.id}`} />
        <audio 
          id={`track${this.props.id}`} 
          ref={this.audioTrack} 
          src={`${REACT_APP_SERVER}/api/audio/play/${this.props.file}`} 
        />
        {!this.state.ready && (
          <p className="visualizer-text">Click play to listen</p>
        )}
      </div>
    )
  }
}

Visualizer.propTypes = {
  play: PropTypes.bool,
  id: PropTypes.number,
  file: PropTypes.string,
  cacheDuration: PropTypes.any,
  height: PropTypes.number,
  barGap: PropTypes.number,
  updateElapsedUI: PropTypes.any,
  togglePlayIcon: PropTypes.any
}

export default Visualizer;