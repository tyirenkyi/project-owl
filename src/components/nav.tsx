import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import "../assets/css/nav.css";
import uploadIcon from "../assets/images/upload.svg";

const Nav = () => {
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
        <button className="upload-btn">
          <img src={uploadIcon} alt="upload icon" />
          Upload Recording
        </button>
        <div className="issues-div">
          <button>Internet Connectivity</button>
          <button>Data</button>
          <button>Airtime</button>
        </div>
      </div>
    </div>
  )
}

export default Nav;