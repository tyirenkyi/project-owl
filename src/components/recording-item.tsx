import { BsPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

import "../assets/css/recording-item.css";

const RecordingItem = () => {
  return (
    <div className="recording-container">
      <div className="audio-visual">
        <span className="elapsed">00:15</span>
      </div>
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
      <button className="playback-btn">
        <FaPlay size={18}/>
      </button>
    </div>
  )
}

export default RecordingItem;