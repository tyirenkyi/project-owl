import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import { FaChevronLeft, FaPlay } from "react-icons/fa";
import { BsPauseFill } from "react-icons/bs";
import Accordion from "react-bootstrap/Accordion";
import { useHistory } from 'react-router-dom';

import "../assets/css/recording-detail.css";
import RelatedAudioItem from "../components/related-audio-item";
import ContextAwareToggle from "../components/context-aware-toggle";
import Visualizer from "../components/visualizer";
import Ripple from '../components/ripple';
import { fetchAudio, fetchAudioList } from "../services/fetch-audio";
import { parseAudioJson, parseAudioJsonList } from "../utils";
import { AudioModel } from '../models/models';
import Nav from "../components/nav";
import Footer from "../components/footer";

const RecordingDetail = () => {
  const [playAudio, setPlayAudio] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [displayDuration, setDisplayDuration] = useState<string>('00:00');
  const [elapsed, setElapsed] = useState<number>(0);
  const [displayElapsed, setDisplayElapsed] = useState<string>('00:00');
  const [playBtn, setPlayBtn] = useState<string>('play');
  const [busy, setBusy] = useState<boolean>(true);
  const [recording, setRecording] = useState<AudioModel>();
  const [relatedAudioList, setRelatedAudioList] = useState<AudioModel[]>([]);
  const { fileName }: any = useParams();
  const history = useHistory();

  const handlePlayPress = () => {
    setPlayAudio(!playAudio)
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

  const parseAudioListData = (json: any) => {
    const { data } = json;
    const parsedAudioList = parseAudioJsonList(data);
    setRelatedAudioList(parsedAudioList);
  }

  const sanitizeDuration = useCallback(() => {
    if(duration === 0)
      return;
    if(duration! > 60) {
      const seconds = Math.round(duration! % 60);
      const minutes = Math.trunc(duration! / 60);
      setDisplayDuration(`${minutes}:${seconds}`)
    } else
      setDisplayDuration(`00:${Math.trunc(duration!)}`);
  }, [duration])

  useEffect(() => {
    sanitizeDuration();
  }, [duration, sanitizeDuration])

  const sanitizeElapsed = useCallback(() => {
    if(elapsed === 0)
      return;
    if(elapsed > 60) {
      const seconds = Math.round(elapsed % 60);
      const minutes = Math.trunc(elapsed / 60);
      setDisplayElapsed(`${minutes}:${seconds}`);
    } else if(elapsed < 10)
      setDisplayElapsed(`00:0${Math.trunc(elapsed)}`);
    else
    setDisplayElapsed(`00:${Math.trunc(elapsed)}`);
  }, [elapsed])

  const loadRecording = useCallback(async() => {
    try {
      const response = await fetchAudio(fileName);
      setRecording(parseAudioJson(response));
      setBusy(false)
    } catch (error) {
      setBusy(false)
    }
  }, [fileName])

  const loadRelatedAudioList = useCallback(async() => {
    setBusy(true);
    try {
      const response = await fetchAudioList(1, 10, recording?.issue);
      parseAudioListData(response);
      setBusy(false)
    } catch (error) {
      setBusy(false)
    }
  }, [recording?.issue])

  useEffect(() => {
    sanitizeElapsed();
  }, [elapsed, sanitizeElapsed])

  useEffect(() => {
    loadRecording()
  }, [loadRecording, fileName])

  useEffect(() => {
    loadRelatedAudioList();
  }, [recording, loadRelatedAudioList])

  const handleRelatedItemClick = (fileName: string) => {
    history.push(`/recording/${fileName}`);
  }

  return(
    <>
      <Nav onIssueClick={()=> {}}/>
      <div className="detail-container">
        <Link to="/">
          <button className="go-back-btn">
            <FaChevronLeft /> Back to Homepage
          </button>
        </Link>
        {busy && (
          <div style={{height: 'calc(100vh - 300px)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center'}}
          >
            <Ripple color="#000" />
          </div>
        )}
        {!busy && (
          <div className="detail-content">
            <div className="player-and-meta">
              <div 
                className={`player
                ${recording?.priority === 'High' && 'high-priority'}
                ${recording?.priority === 'Low' && 'low-priority'}
                ${recording?.priority === 'Medium' && 'medium-priority'}`
              }
              >
                <div>
                  <Visualizer 
                    play={playAudio}
                    id={23}
                    height={200}
                    barGap={4}
                    cacheDuration={cacheDuration}
                    updateElapsedUI={updateElapsedUI}
                    togglePlayIcon={togglePlayIcon}
                    file={fileName}
                  />
                </div>
                <div className="controls">
                  <button className="play-btn" onClick={handlePlayPress}>
                    {playBtn === 'play' && (<FaPlay size={20}/>)}
                    {playBtn === 'pause' && (<BsPauseFill size={20}/>)}
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
                        <p className="col-value">{recording?.issue}</p>
                      </span>
                    </div>
                    <div className="custom-col">
                      <p className="label">Priority</p>
                      <p className={`col-value
                        ${recording?.priority === 'High' && 'high-priority-label'}
                        ${recording?.priority === 'Low' && 'low-priority-label'}
                        ${recording?.priority === 'Medium' && 'medium-priority-label'}`
                      }
                      >{recording?.priority}</p>
                    </div>
                  </div>
                  <p className="created-at">{recording?.created}</p>
                </div>
                <div className="transcription-div">
                  <Accordion defaultActiveKey="0">
                    <ContextAwareToggle 
                      eventKey="0"
                      title="Show Transcription"
                    />
                    <Accordion.Collapse eventKey="0">
                      <p className="transcription">{recording?.transcript}</p>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
                <div className='taxonomy custom-col'>
                  <p className="label">Taxonomy</p>
                  <div className="taxonomy-items">
                    {recording?.taxonomy && recording?.taxonomy.map((item, index) => (
                      <span className="taxonomy-item" key={index}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="related-media">
              <h5>Related</h5>
              {busy ? (
                <div style={{display: 'flex', 
                alignItems: 'center', justifyContent: 'center'}}>
                  <Ripple />
                </div>
              ):(
                <div className="related-media-lis">
                  {relatedAudioList.map((item, index) => (
                    <RelatedAudioItem data={item} key={index} id={index} handleItemClick={handleRelatedItemClick}/>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default RecordingDetail;