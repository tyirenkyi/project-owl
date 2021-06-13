import '../assets/css/recordings.css';
import Pagination from "../components/pagination";
import Tabs from "../components/tabs";
import RecordingItem from "../components/recording-item";
import Ripple from "../components/ripple";
import emptyList from "../assets/images/empty-mailbox.png";
import { NotifyModel, AudioModel, PaginationModel } from '../models/models';
import { fetchAudio, fetchAudioList, paginationFetch } from "../services/fetch-audio";
import { parseAudioJson, parseAudioJsonList, parsePaginationJson } from "../utils";
import Nav from "../components/nav";
import Footer from "../components/footer";

import "../assets/css/recordings.css";
import { useCallback, useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';


const Recordings = () => {
  const [audioList, setAudioList] = useState<AudioModel[]>([]);
  const [busy, setBusy] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<PaginationModel>(PaginationModel.emptyInstance());
  const [currentIssue, setCurrentIssue] = useState<string>('');

  function getAxiosConfig() {
    const config = {
      headers: {}
    };
    return config;
  }

  const getConnectionInfo = useCallback(async() => {
    return axios.post(`https://projectowl.azurewebsites.net/api/negotiate`, null, getAxiosConfig())
      .then(resp => resp.data);
  }, [])

  const updateList = async(data: NotifyModel) => {
    try {
      const response = await fetchAudio(data.fileName);
      const recording = parseAudioJson(response);
      console.log(recording)
      setAudioList((prevState) => [...prevState, recording]);
    } catch (error) {console.error(error)}
  }

  useEffect(() => {
    getConnectionInfo().then(info => {
      info.accessToken = info.accessToken || info.accessKey;
      info.url = info.url || info.endpoint;

      const options = {
        accessTokenFactory: () => info.accessToken
      };

      const connection = new HubConnectionBuilder()
        .withUrl(info.url, options)
        .withAutomaticReconnect()
        .build();

        connection.on('notify', (data: NotifyModel) =>{
          updateList(data)
        });

        connection.onclose(() => console.log('disconnected'));
  
        console.log('connecting...');
        connection.start()
          .then(() => console.log('connected!'))
          .catch(console.error);
    })
    .catch(alert)      
  }, [getConnectionInfo]);

  const loadAudioList = useCallback(async() => {
    setBusy(true);
    try {
      const response = await fetchAudioList();
      parseAudioData(response);
      setBusy(false);
      setPaginationData(parsePaginationJson(response))
    } catch (error) {
      setBusy(false);
    }
  }, [])

  const parseAudioData = (json: any) => {
    const { data } = json;
    const parsedAudioList = parseAudioJsonList(data);
    setAudioList(parsedAudioList);
  }

  const handlePreviousBtnPress = async(params: string) => {
    setBusy(true);
    try {
      const response = await paginationFetch(params);
      parseAudioData(response);
      setBusy(false);
      setPaginationData(parsePaginationJson(response))
    } catch (error) {
      setBusy(false);
    }
  }

  const handleNextBtnPress = async(params: string) => {
    setBusy(true)
    try {
      const response = await paginationFetch(params);
      parseAudioData(response);
      setBusy(false);
      setPaginationData(parsePaginationJson(response))
    } catch (error) {
      setBusy(false);
    }
  }

  const fetchAudioListByIssue = async(issue: string) => {
    try {
      setBusy(true);
      const response = await fetchAudioList(1, 24, issue, null!);
      parseAudioData(response);
      setCurrentIssue(issue);
      setBusy(false);
    } catch (error) {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadAudioList()
  }, [loadAudioList])

  return (
    <>
      <Nav onIssueClick={fetchAudioListByIssue}/>
      <div className="recordings-container">
        <div className="actions-div">
          <Tabs currentIssue={currentIssue} />
          <Pagination 
            data={paginationData!} 
            handleNextBtnPress={handleNextBtnPress} 
            handlePreviousBtnPress={handlePreviousBtnPress} 
          />
        </div>
        {busy && (
          <div 
            style={{height: 'calc(100vh - 400px)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center'}}
          >
            <Ripple color="#000"/>
          </div>
        )}
        {!busy && audioList.length > 0 && (
          <div className="recordings-list">
            {audioList.map((item, index) => (
              <RecordingItem  data={item} key={index}/>
            ))}
          </div>
        )}

        {!busy && audioList.length === 0 && (
          <div className="empty-recordings-div">
            <img src={emptyList} alt='empty mailbox' />
            <p>No recordings found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Recordings;