import { useState, useEffect, useCallback } from 'react';
import { FaPlay } from "react-icons/fa";
import { BsPauseFill } from "react-icons/bs";

import "../assets/css/related-audio.css";
import Visualizer from './visualizer';
import { AudioModel } from '../models/models';

interface RelatedAudioItemProps {
  data: AudioModel,
  id: number
}

const RelatedAudioItem = (props: RelatedAudioItemProps) => {
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [displayDuration, setDisplayDuration] = useState<string>('');
  const [elapsed, setElapsed] = useState<number>(0);
  const [displayElapsed, setDisplayElapsed] = useState<string>('');
  const [playBtn, setPlayBtn] = useState<string>('play');

  const handlePlayPress = () => {
    setPlay(!play)
  }

  const updateElapsedUI = (data: number) => {
    setElapsed(data);
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
    } else
      setDisplayDuration(`00:0${Math.trunc(duration!)}`);
  }, [duration])

  useEffect(() => {
    sanitizeDuration();
  }, [duration, sanitizeDuration])

  const sanitizeElapsed = useCallback(() => {
    if(elapsed > 60) {
      const seconds = elapsed % 60;
      const minutes = Math.trunc(elapsed / 60);
      setDisplayElapsed(`${minutes}:${seconds}`);
    } else if(elapsed < 10)
      setDisplayElapsed(`00:0${Math.trunc(elapsed)}`);
    else
    setDisplayElapsed(`00:0${Math.trunc(elapsed)}`);
  }, [elapsed])

  useEffect(() => {
    sanitizeElapsed();
  }, [elapsed, sanitizeElapsed])

  return(
    <div className="related-audio-item">
      <div 
        className={`related-audio-player 
          ${props.data.priority === 'High' && 'high-priority'}
          ${props.data.priority === 'Low' && 'low-priority'}
          ${props.data.priority === 'Medium' && 'medium-priority'}`
        }  
      >
        <div style={{width: '100%'}}>
          <Visualizer 
            play={play} 
            id={props.id}
            cacheDuration={cacheDuration}
            updateElapsedUI={updateElapsedUI}
            togglePlayIcon={togglePlayIcon}
            file={props.data.fileName}
          />
        </div>
      </div>
      <button onClick={handlePlayPress}>
        {playBtn === 'play' && (<FaPlay size={20}/>)}
        {playBtn === 'pause' && (<BsPauseFill size={38} />)}
      </button>
      <span>
        {playBtn === 'pause' && (displayElapsed)}
        {playBtn === 'play' && (displayDuration)}
      </span>
      <div className="related-audio-meta">
        <p className="related-audio-label">Issue Type</p>
        <p className="related-audio-col-value">{props.data.issue}</p>
        <p className="related-audio-label" style={{marginBottom: '0px'}}>Priority</p>
        <p 
          className={`
            related-audio-col-value
            ${props.data.priority === 'High' && 'high-priority-label'}
            ${props.data.priority === 'Low' && 'low-priority-label'}
            ${props.data.priority === 'Medium' && 'medium-priority-label'}`
          }
        >{props.data.priority}</p>
        <p className="label">{props.data.created}</p>
      </div>
    </div>
  )
}

export default RelatedAudioItem;