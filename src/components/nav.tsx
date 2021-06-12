import { useState, createRef, useEffect, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

import "../assets/css/nav.css";
import uploadIcon from "../assets/images/upload.svg";
import Upload from "./upload";
import { Issue } from "../enums";

interface NavProps {
  onIssueClick: Function
}

const Nav = (props: NavProps) => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

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

  const toggleAlert = (message: string) => {
    setAlertMessage(message);
    if(!showAlert) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return
    }
    setShowAlert(!showAlert)
  }

  return (
    <>
      <Alert color="danger" isOpen={showAlert} toggle={()=> setShowAlert(false)}>
        {alertMessage}
      </Alert>
      <div className="nav-container">
        
        <Link to='/'>
          <h2>Project OWL</h2>
        </Link>
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
              <button onClick={() => props.onIssueClick(Issue.BalanceTransfer)}>{Issue.BalanceTransfer}</button>
              <button onClick={() => props.onIssueClick(Issue.General)}>{Issue.General}</button>
              <button onClick={() => props.onIssueClick(Issue.LocalPayments)}>{Issue.LocalPayments}</button>
              <button onClick={() => props.onIssueClick(Issue.Maintenance)}>{Issue.Maintenance}</button>
              <button onClick={() => props.onIssueClick(Issue.MissingCard)}>{Issue.MissingCard}</button>
              <button onClick={() => props.onIssueClick(Issue.Remittance)}>{Issue.Remittance}</button>
              <button onClick={() => props.onIssueClick(Issue.Uncategorized)}>{Issue.Uncategorized}</button>
            </div>
          )}
        </div>
        {showUploadModal && <Upload closeModal={toggleUploadModal} toggleAlert={toggleAlert}/>}
      </div>
    </>
  )
}

export default Nav;