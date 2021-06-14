import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { BsPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

import "../assets/css/recording-item.css";
import Visualizer from "../components/visualizer";
import { AudioModel } from "../models/models";

interface RecordingItemProps {
  data: AudioModel
}

const RecordingItem = (props: RecordingItemProps) => {
  const [playAudio, setPlayAudio] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [displayDuration, setDisplayDuration] = useState<string>('00:00');
  const [playBtn, setPlayBtn] = useState<string>('play');
  const history = useHistory();

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
    if(duration === 0)
      return;
    if(duration! > 60) {
      const seconds = Math.round(duration! % 60);
      const minutes = Math.trunc(duration! / 60);
      setDisplayDuration(`${minutes}:${seconds}`)
    } else {
      setDisplayDuration(`00:${Math.trunc(duration!)}`);
    }
  }, [duration])

  useEffect(() => {
    sanitizeDuration();
  }, [duration, sanitizeDuration])


  const handleItemClick = () => {
    history.push(`/recording/${props.data.fileName}`)
  }

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
          id={props.data.id} 
          cacheDuration={cacheDuration}
          togglePlayIcon={togglePlayIcon}
          file={props.data.fileName}
        />
      </div>
      <span className="elapsed">{displayDuration}</span>
      <div className="metadata-div">
        <div className="metadata-column">
          <p>Issue Type</p>
          <h5>{props.data.issue}</h5>
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
        <button 
          className="view-details-btn"
          onClick={handleItemClick}
        >
          View details
        </button>
        <span className="timestamp">{props.data.created}</span>
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