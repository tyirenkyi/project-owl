import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { FaChevronLeft, FaPlay } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { BsPauseFill } from "react-icons/bs";
import Accordion from "react-bootstrap/Accordion";

import "../assets/css/recording-detail.css";
import RelatedAudioItem from "../components/related-audio-item";
import ContextAwareToggle from "../components/context-aware-toggle";
import Visualizer from "../components/visualizer";

const mock = [
  { priority: 'High' }, { priority: 'Medium' }, { priority: 'Low' }, { priority: 'High' },
]

const RecordingDetail = () => {
  const [playAudio, setPlayAudio] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [displayDuration, setDisplayDuration] = useState<string>('');
  const [elapsed, setElapsed] = useState<number>(0);
  const [displayElapsed, setDisplayElapsed] = useState<string>('');

  const handlePlayPress = () => {
    setPlayAudio(!playAudio)
  }

  const updateElapsedUI = (data: number) => {
    setElapsed(data);
  }

  const cacheDuration = (length: number) => {
    setDuration(length)
  }

  const sanitizeDuration = useCallback(() => {
    if(duration! > 60) {
      const seconds = duration! % 60;
      const minutes = Math.trunc(duration! / 60);
      setDisplayDuration(`${minutes}:${seconds}`)
    } else
      setDisplayDuration(`00:${Math.trunc(duration!)}`);
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
    setDisplayElapsed(`00:${Math.trunc(elapsed)}`);
  }, [elapsed])

  useEffect(() => {
    sanitizeElapsed();
  }, [elapsed, sanitizeElapsed])

  return(
    <div className="detail-container">
      <Link to="/">
        <button className="go-back-btn">
          <FaChevronLeft /> Back to Homepage
        </button>
      </Link>
      <div className="detail-content">
        <div className="player-and-meta">
          <div className="player">
            <div>
              <Visualizer 
                play={playAudio}
                id={23}
                height={200}
                barGap={4}
                cacheDuration={cacheDuration}
                updateElapsedUI={updateElapsedUI}
              />
            </div>
            <div className="controls">
              <button className="play-btn" onClick={handlePlayPress}>
                {!playAudio && (<FaPlay size={20}/>)}
                {playAudio && (<BsPauseFill size={20}/>)}
              </button>
              <span className="elapsed-span">
                <p className="elapsed-text">{displayElapsed}</p> - {` `} 
                <p className="duration-text">{displayDuration}</p>
              </span>
            </div>
          </div>
          <div className="meta">
            <div className="custom-row space-btwn">
              <div className="labels custom-row space-btwn">
                <div className="custom-col">
                  <p className="label">Issue Type</p>
                  <span className="custom-row align-items-center">
                    <p className="col-value">Internet Connectivity</p>
                    <button className='edit-btn'>
                      <RiEditLine color={"#AAAAAA"} size={20}/>
                    </button>
                  </span>
                </div>
                <div className="custom-col">
                  <p className="label">Priority</p>
                  <p className="high-priority-label col-value">High</p>
                </div>
              </div>
              <p className="created-at">11:23</p>
            </div>
            <div className="transcription-div">
              <Accordion defaultActiveKey="0">
                <ContextAwareToggle 
                  eventKey="0"
                  title="Show Transcription"
                />
                <Accordion.Collapse eventKey="0">
                  <p className="transcription">
                    Chani mostly avoided indiscreet questions. She maintained a Fremen sense of good manners. Hers were more often practical questions. What interested Chani were facts which bore on the position of her man -- his strength in Council, the loyalty of his legions, the abilities and talents of his allies. Her memory held catalogs of names and cross-indexed details. She could rattle off the major weakness of every known enemy, the potential dispositions of opposing forces, battle plans of their military leaders, the tooling and production capacities of basic industries. Why now, Paul wondered, did she ask about Irulan?
                  </p>
                </Accordion.Collapse>
              </Accordion>
            </div>
            <div className='taxonomy custom-col'>
              <p className="label">Taxonomy</p>
              <div className="taxonomy-items">
                <span className="taxonomy-item">Internet</span>
                <span className="taxonomy-item">Data</span>
              </div>
            </div>
          </div>
        </div>
        <div className="related-media">
          <h5>Related</h5>
          <div className="related-media-lis">
            {mock.map((item, index) => (
              <RelatedAudioItem data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecordingDetail;