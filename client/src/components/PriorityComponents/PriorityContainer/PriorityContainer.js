// React
import React from "react";
// Styles
import './priority_container.css'


const PriorityContainer = (props) => {


  return (
    <div className="priority_container" style={{ height: props.height }}>
      {props.children}
    </div>
  );
}

export default PriorityContainer;