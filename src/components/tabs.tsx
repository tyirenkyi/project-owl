import "../assets/css/tabs.css";

interface TabsProps{
  currentIssue: string
}

const Tabs = (props: TabsProps) => {
  return (
    <div className="tabs-container">
      <h4>{props.currentIssue}</h4>
    </div>
  )
}

export default Tabs;