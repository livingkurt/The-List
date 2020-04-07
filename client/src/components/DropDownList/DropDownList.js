// React
import React from "react";
import ScrollContainer from '../ScrollContainer/ScrollContainer';
import DropDownItem from "../DropDownItem/DropDownItem";
// Styles
import './dropdown_list.css'



function DropDownList(props) {
  console.log(props.dropdown_items)
  return (
    <div className="dropdown_list" style={{ display: props.dropdown_state }}>
      <ScrollContainer height="66px">
        {props.dropdown_items ? props.dropdown_items.map((item, index) => {
          return <DropDownItem name={props.name} on_dropdown_choice={props.on_dropdown_choice}>{item}</DropDownItem>
        }) : console.log("Nothing")}

      </ScrollContainer>
    </div>
  );
}

export default DropDownList;
