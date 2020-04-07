// React
import React, { useState } from "react";
import ScrollContainer from '../ScrollContainer/ScrollContainer';
import DropDownItem from "../DropDownItem/DropDownItem";
import ButtonWord from "../ButtonWord/ButtonWord";
// Styles
import './dropdown_list.css'



function DropDownList(props) {

  const [dropdown_state, set_dropdown_state] = useState("none")

  const show_dropdown = () => {

    if (dropdown_state === "none") {
      set_dropdown_state("flex")
      console.log("show_dropdown")
    }
    else if (dropdown_state === "flex") {
      set_dropdown_state("none")
      console.log("hide_dropdown")
    }
  }
  console.log({ "props.dropdown_items": props.dropdown_items })
  return (
    <div>
      <ButtonWord
        on_click_function={show_dropdown}
      >{props.children} <i className="fas fa-sort-up"></i>
      </ButtonWord>
      <div className="dropdown_list" style={{ display: dropdown_state }}>
        <ScrollContainer>
          {props.dropdown_items ? props.dropdown_items.map((item, index) => {
            return <DropDownItem name={props.name} on_dropdown_choice={props.on_dropdown_choice}>{item.folder_name ? item.folder_name : item}</DropDownItem>
          }) : console.log("Nothing")}

        </ScrollContainer>
      </div>
    </div>
  );
}

export default DropDownList;
