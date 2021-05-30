import { FaPlay } from "react-icons/fa";

import "../assets/css/related-audio.css";

const RelatedAudioItem = () => {
  return(
    <div className="related-audio-item">
      <div className="related-audio-player">
        <button>
          <FaPlay />
        </button>
        <span>00:15</span>
      </div>
      <div className="related-audio-meta">
        <p className="related-audio-label">Issue Type</p>
        <p className="related-audio-col-value">Internet Connectivity</p>
        <p className="related-audio-label" style={{marginBottom: '0px'}}>Priority</p>
        <p className="related-audio-col-value medium-priority-label">Medium</p>
        <p className="label">Yesterday 10:45</p>
      </div>
    </div>
  )
}

export default RelatedAudioItem;