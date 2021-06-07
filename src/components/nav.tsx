import { useState, createRef, useEffect, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";

import "../assets/css/nav.css";
import uploadIcon from "../assets/images/upload.svg";
import Upload from "./upload";

const Nav = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdown = createRef<HTMLDivElement>();

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

  const focusDropdown = useCallback(() => {
    if(showDropdown)
      dropdown.current?.focus();
  }, [dropdown, showDropdown])

  useEffect(() => {
    focusDropdown();
  }, [showDropdown, focusDropdown])

  return (
    <div className="nav-container">
      <h2>Project OWL</h2>
      <div className="nav-btns">
        <button className="clear-nav-btn">
          About
        </button>
        <button className="clear-nav-btn" onClick={() => setShowDropdown(true)}>
          Issues <FaChevronDown />
        </button>
        <button className="upload-btn" onClick={toggleUploadModal}>
          <img src={uploadIcon} alt="upload icon" />
          Upload Recording
        </button>
        {showDropdown && (
          <div 
            className="issues-div" 
            tabIndex={1} 
            onBlur={() => setShowDropdown(false)}
            ref={dropdown}
          >
            <button>Internet Connectivity</button>
            <button>Data</button>
            <button>Airtime</button>
          </div>
        )}
      </div>
      {showUploadModal && <Upload closeModal={toggleUploadModal}/>}
    </div>
  )
}

export default Nav;