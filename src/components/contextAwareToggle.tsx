import { useContext } from 'react';
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "../assets/css/contextAwareToggle.css";

const ContextAwareToggle = (props: any) => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    props.eventKey,
    () => props.callback && props.callback(props.eventKey),
  );

  const isCurrentEventKey = currentEventKey === props.eventKey;

  return (
    <button onClick={decoratedOnClick} className={`toggle-btn ${props.className}`}>
      <div className="row space-btwn">
        <p className="toggle-title">{props.title}</p>
        {isCurrentEventKey ? <FaChevronUp color="#8B8B8B"/> : <FaChevronDown color="#8B8B8B"/>}
      </div>
    </button>
  )
}

export default ContextAwareToggle;