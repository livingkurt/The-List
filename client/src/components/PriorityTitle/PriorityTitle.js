// React
import React from "react";
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
// Styles
import './priority_title.css'


const PriorityTitle = (props) => {
  return (
    <div onClick={() => props.on_click_function(props.priority, props.id)} className="priority_title">
      <h2 style={props.styles}>{props.children}</h2>
      <ButtonSymbol styles={{ margin: "1px 3px 0px 0px", padding: "0px 2px 7px 0px" }} on_click_function={props.on_click_function} id={props.id} priority={props.priority}><i className="fas fa-sort-up"></i></ButtonSymbol>
    </div >
  );
}

export default PriorityTitle;
