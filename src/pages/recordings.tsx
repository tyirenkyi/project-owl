import '../assets/css/recordings.css';
import Pagination from "../components/pagination";
import Tabs from "../components/tabs";
import RecordingItem from "../components/recording-item";
import Ripple from "../components/ripple";
import { NotifyModel, AudioModel, PaginationModel } from '../models/models';
import { fetchAudioList, paginationFetch } from "../services/fetch-audio";
import { parseAudioJsonList, parsePaginationJson } from "../utils";

import "../assets/css/recordings.css";
import { useCallback, useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import { Status } from '../enums';


const Recordings = () => {
  const [audioList, setAudioList] = useState<AudioModel[]>([]);
  const [busy, setBusy] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<PaginationModel>(PaginationModel.emptyInstance());

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

  function updateList(data: NotifyModel){
    console.log(data)
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

  const onTabChange = async(newTab: string) => {
    if(newTab === 'all')
      loadAudioList();
    else if(newTab === 'done')
      fetchAudioListByStatus(Status.Done);
    else if(newTab === 'submitted')
      fetchAudioListByStatus(Status.Pending);
  }

  const fetchAudioListByStatus = async(status: number) => {
    try {
      setBusy(true);
      const response = await fetchAudioList(1, 24, null!, status);
      parseAudioData(response);
      setBusy(false);
      setPaginationData(parsePaginationJson(response))
    } catch (error) {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadAudioList()
  }, [loadAudioList])

  return (
    <div className="recordings-container">
      <div className="actions-div">
        <Tabs onTabChange={onTabChange}/>
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
      {!busy &&  (
        <div className="recordings-list">
          {audioList.map((item) => (
            <RecordingItem  data={item}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default Recordings;