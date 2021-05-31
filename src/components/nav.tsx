import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import "../assets/css/nav.css";
import uploadIcon from "../assets/images/upload.svg";
import Upload from "./upload";

const Nav = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const toggleUploadModal = () => {
    if(showUploadModal)
      enableScroll()

    if(!showUploadModal)
      disableScroll()
    
    setShowUploadModal((prevValue) => !prevValue);
  }

  const enableScroll = () => {
    const body = document.body;
    body.classList.remove('no-scroll');
  }

  const disableScroll = () => {
    const body = document.body;
    body.classList.add('no-scroll')
  }

  return (
    <div className="nav-container">
      <h2>Project OWL</h2>
      <div className="nav-btns">
        <button className="clear-nav-btn">
          About
        </button>
        <button className="clear-nav-btn">
          Issues <FaChevronDown />
        </button>
        <button className="upload-btn" onClick={toggleUploadModal}>
          <img src={uploadIcon} alt="upload icon" />
          Upload Recording
        </button>
        <div className="issues-div">
          <button>Internet Connectivity</button>
          <button>Data</button>
          <button>Airtime</button>
        </div>
      </div>
      {showUploadModal && <Upload closeModal={toggleUploadModal}/>}
    </div>
  )
}

export default Nav;