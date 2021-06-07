import React from "react";

import "../assets/css/tabs.css";

const Tabs = () => {
  return (
    <div className="tabs-container">
      <button className="tab active-tab">
        Submitted
      </button>
      <button className="tab">
        Done
      </button>
    </div>
  )
}

export default Tabs;