import { useState, useEffect, useCallback } from "react";
import { BsPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

import "../assets/css/recording-item.css";
import Visualizer from "../components/visualizer";

const RecordingItem = (props: any) => {
  const [playAudio, setPlayAudio] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [displayDuration, setDisplayDuration] = useState<string>('');
  const [playBtn, setPlayBtn] = useState<string>('play');

  const handlePlayPress = () => {
    setPlayAudio(!playAudio)
  }

  const cacheDuration = (length: number) => {
    setDuration(length)
  }

  const togglePlayIcon = (icon: string) => {
    setPlayBtn(icon);
  }

  const sanitizeDuration = useCallback(() => {
    if(duration! > 60) {
      const seconds = duration! % 60;
      const minutes = Math.trunc(duration! / 60);
      setDisplayDuration(`${minutes}:${seconds}`)
    } else {
      setDisplayDuration(`00:${Math.trunc(duration!)}`);
    }
  }, [duration])

  useEffect(() => {
    sanitizeDuration();
  }, [duration, sanitizeDuration])

  return (
    <div className="recording-container">
      <div 
        className={`audio-visual 
          ${props.data.priority === 'High' && 'high-priority'}
          ${props.data.priority === 'Low' && 'low-priority'}
          ${props.data.priority === 'Medium' && 'medium-priority'}`
        }
      >
        <Visualizer 
          play={playAudio} 
          id={props.id} 
          cacheDuration={cacheDuration}
          togglePlayIcon={togglePlayIcon}
        />
      </div>
      <span className="elapsed">{displayDuration}</span>
      <div className="metadata-div">
        <div className="metadata-column">
          <p>Issue Type</p>
          <h5>Internet Connectivity</h5>
        </div>
        <div  className="metadata-column">
          <p>Priority</p>
          <h5 
            className={`
            ${props.data.priority === 'High' && 'high-priority-label'}
            ${props.data.priority === 'Low' && 'low-priority-label'}
            ${props.data.priority === 'Medium' && 'medium-priority-label'}`
            }
          >
              {props.data.priority}</h5>
        </div>
        <span className="timestamp">11:23</span>
      </div>
      <button 
        className="playback-btn" 
        style={playAudio ? {background: 'white'}:{}}
        onClick={handlePlayPress}
      >
        {playBtn === 'play' && (<FaPlay size={20}/>)}
        {playBtn === 'pause' && (<BsPauseFill size={38} color={'#000'}/>)}
      </button>
    </div>
  )
}

export default RecordingItem;