import { useState } from "react";
import { FaChevronDown } from 'react-icons/fa';
import { FiCheck } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

import "../assets/css/upload.css";
import uploadIcon from "../assets/images/upload.svg";
import visualizer from "../assets/images/visualizer.svg";

const Upload = (props: any) => {
  const [status, setStatus] = useState<string>('empty');

  return (
    <div className="upload-container">
      <div className="upload-modal">
        <button className="upload-close-btn" onClick={props.closeModal}>
          <RiCloseLine color="white" size={30}/>
        </button>
        {status !== 'success' && (
          <div className="dropzone" style={status === 'selected' ? {background: '#E1FFE4', borderColor: '#56A75E'} : {}}>
            <img src={visualizer} alt="visualizer" />
            {status === 'empty' && (
              <span>
                <button className="upload-btn">
                  Choose File
                </button>
                or drag file to upload
              </span>
            )}
            {status === 'selected' && (
              <p className="filename">Recording_1.mp3</p>
            )}
          </div>
        )}
        {status !== 'success' && (
          <div className="upload-form">
            <p className="label" style={{fontSize: '16px'}}>Issue Type</p>
            <div className="select">
              <select className="select-input">
                <option value="volvo">Select</option>
                <option value="saab">Ghana</option>
                <option value="opel">USA</option>
                <option value="audi">United Kingdom</option>
              </select>
              <FaChevronDown />
            </div>
            <p className="label" style={{fontSize: '16px'}}>Priority</p>
            <div className="select">
              <select className="select-input">
                <option value="volvo">Select</option>
                <option value="saab">Ghana</option>
                <option value="opel">USA</option>
                <option value="audi">United Kingdom</option>
              </select>
              <FaChevronDown />
            </div>
            <div className="btn-div">
              <button className="upload-modal-btn">
                <img src={uploadIcon} alt="upload icon" /> Upload Recording
              </button>
            </div>
          </div>
        )}
        {status === 'success' && (
          <div className="upload-success">
            <div className="success-ring">
              <FiCheck color="#3A9B5A" size={50}/>
            </div>
            <p className="success-text">File Upload Successful!</p>
            <button className="upload-modal-btn" onClick={props.closeModal}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload;