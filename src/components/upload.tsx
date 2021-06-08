import React, { useState, createRef } from "react";
import { FaChevronDown } from 'react-icons/fa';
import { FiCheck } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

import "../assets/css/upload.css";
import uploadIcon from "../assets/images/upload.svg";
import visualizer from "../assets/images/visualizer.svg";
import { Issue } from "../enums";
import { uploadAudio } from "../services/upload";
import Ripple from "../components/ripple";

const Upload = (props: any) => {
  const [status, setStatus] = useState<string>('empty');
  const [file, setFile] = useState<any>(null);
  const [issue, setIssue] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);
  const fileInput = createRef<HTMLInputElement>();


  const openUploadDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInput.current?.click();
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files: FileList = e.currentTarget.files!;
    handleFile(files[0]);
  }

  const handleFile = (file: File) => {
    if(validateFile(file)) {
      setFile(file)
      setStatus('selected')
    }
  }

  const validateFile = (file: File):boolean => {
    if(file.type !== 'audio/wav') {
      props.toggleAlert('File type not permitted. Wav files only');
      return false
    }

    return true;
  }

  const clearFile = () => {
    setFile(null);
  }

  const generateUploadForm = () => {
    const form = new FormData();
    form.append('Issue', issue);
    form.append('', file);
    return form;
  }

  const handleSubmit = async() => {
    if(!file)
      return;
    setBusy(true);
    const form = generateUploadForm();
    try {
      await uploadAudio(form);
      setBusy(false);
      setStatus('success');
    } catch (error) {
      setBusy(false)
      props.toggleAlert('Failed to upload your file. Please try again later')
    }
  }


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
                <input hidden ref={fileInput} type="file" onChange={(e) => handleFileSelect(e)}/>
                <button 
                  className="upload-btn"
                  onClick={(e) => openUploadDialog(e)}
                >
                  Choose File
                </button>
                or drag file to upload
              </span>
            )}
            {status === 'selected' && (
              <p className="filename">{file.name}</p>
            )}
          </div>
        )}
        {status !== 'success' && (
          <div className="upload-form">
            <p className="label" style={{fontSize: '16px'}}>Issue Type</p>
            <div className="select">
              <select className="select-input" value={issue} onChange={(e) => setIssue(e.currentTarget.value)}>
                <option value={Issue.LocalPayments}>Local Payments</option>
                <option value={Issue.BalanceTransfer}>Balance Transfer</option>
                <option value={Issue.General}>General</option>
                <option value={Issue.Maintenance}>Maintenance</option>
                <option value={Issue.Remittance}>Remittance</option>
                <option value={Issue.MissingCard}>Missing Card</option>
                <option value={Issue.Uncategorized}>Uncategorized</option>
              </select>
              <FaChevronDown />
            </div>
            <div className="btn-div">
              {!busy ? (
                <button className="upload-modal-btn" onClick={handleSubmit}>
                  <img src={uploadIcon} alt="upload icon" /> Upload Recording
                </button>
              ):(
                <Ripple color="#729ED1"/>
              )}
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