import '../assets/css/recordings.css';
import Pagination from "../components/pagination";
import Tabs from "../components/tabs";
import RecordingItem from "../components/recording-item";

import "../assets/css/recordings.css";
import { useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import { NotifyModel } from '../models/models';

const mock = [
  { priority: 'High' }, { priority: 'Medium' }, { priority: 'Low' }, { priority: 'High' },
  { priority: 'Low' }, { priority: 'Medium' }, { priority: 'High' }, { priority: 'Medium' }
]

const Recordings = () => {

  function getAxiosConfig() {
    const config = {
      headers: {}
    };
    return config;
  }

  function getConnectionInfo() {
    return axios.post(`http://localhost:7071/api/negotiate`, null, getAxiosConfig())
      .then(resp => resp.data);
  }

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
  }, []);


  return (
    <div className="recordings-container">
      <div className="actions-div">
        <Tabs />
        <Pagination />
      </div>
      <div className="recordings-list">
        {mock.map((item, index) => (
          <RecordingItem data={item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Recordings;