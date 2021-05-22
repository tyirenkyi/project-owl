import '../assets/css/recordings.css';
import Pagination from "../components/pagination";
import Tabs from "../components/tabs";
import RecordingItem from "../components/recording-item";

import "../assets/css/recordings.css";

const Recordings = () => {
  return (
    <div className="recordings-container">
      <div className="actions-div">
        <Tabs />
        <Pagination />
      </div>
      <div className="recordings-list">
        <RecordingItem />
        <RecordingItem />
        <RecordingItem />
        <RecordingItem />
        <RecordingItem />
        <RecordingItem />
      </div>
    </div>
  )
}

export default Recordings;