import { useState } from "react";
import { BsPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

import "../assets/css/recording-item.css";
import Visualizer from "../components/visualizer";

const RecordingItem = (props: any) => {
  const [playAudio, setPlayAudio] = useState(false);

  const handlePlayPress = () => {
    setPlayAudio(!playAudio)
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
        <Visualizer play={playAudio} id={props.id}/>
      </div>
      <span className="elapsed">00:15</span>
      <div className="metadata-div">
        <div className="metadata-column">
          <p>Issue Type</p>
          <h5>Internet Connectivity</h5>
        </div>
        <div  className="metadata-column">
          <p>Priority</p>
          <h5 className="high-priority-label">High</h5>
        </div>
        <span className="timestamp">11:23</span>
      </div>
      <button 
        className="playback-btn" 
        style={playAudio ? {background: 'white'}:{}}
        onClick={handlePlayPress}
      >
        {!playAudio && (<FaPlay size={18}/>)}
        {playAudio && (<BsPauseFill size={38} color="black"/>)}
      </button>
    </div>
  )
}

export default RecordingItem;