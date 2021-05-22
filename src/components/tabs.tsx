import React from "react";

import "../assets/css/tabs.css";

const Tabs = () => {
  return (
    <div className="tabs-container">
      <button className="tab active-tab">
        All
      </button>
      <button className="tab">
        In Progress
      </button>
      <button className="tab">
        Submitted
      </button>
      <button className="tab">
        Done
      </button>
    </div>
  )
}

export default Tabs;