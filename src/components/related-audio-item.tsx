import { useState } from 'react';
import { FaPlay } from "react-icons/fa";

import "../assets/css/related-audio.css";
import Visualizer from './visualizer';

const RelatedAudioItem = (props: any) => {
  const [play, setPlay] = useState(false);

  const handlePlayPress = () => {
    setPlay(!play)
  }

  return(
    <div className="related-audio-item">
      <div 
        className={`related-audio-player 
          ${props.data.priority === 'High' && 'high-priority'}
          ${props.data.priority === 'Low' && 'low-priority'}
          ${props.data.priority === 'Medium' && 'medium-priority'}`
        }  
      >
        <Visualizer play={play} id={props.key}/>
        <button onClick={handlePlayPress}>
          <FaPlay />
        </button>
      </div>
      <span>00:15</span>
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