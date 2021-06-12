import { useState } from "react";

import "../assets/css/tabs.css";

interface TabsProps{
  onTabChange: Function,
  currentIssue: string
}

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('all')

  const handleTabPress = (newTab: string) => {
    setActiveTab(newTab)
    props.onTabChange(newTab)
  }

  return (
    <div className="tabs-container">
      <button 
        className={`tab ${activeTab === 'all' && 'active-tab'}`}
        onClick={() => handleTabPress('all')}
      >
        All
      </button>
      <button
        className={`tab ${activeTab === 'submitted' && 'active-tab'}`}
        onClick={() => handleTabPress('submitted')}
      >
        Submitted
      </button>
      <button 
        className={`tab ${activeTab === 'done' && 'active-tab'}`}
        onClick={() => handleTabPress('done')}
      >
        Done
      </button>
      <h4>{props.currentIssue}</h4>
    </div>
  )
}

export default Tabs;