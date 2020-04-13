// React
import React, { useState, useEffect } from "react";
// Styles
import './dropdown_item.css'

const DropDownItem = (props) => {


  return (
    <div >
      <button
        name={props.name}
        id={props.children}
        onClick={(e) => props.on_dropdown_choice(e)}
        className="dropdown_item">{props.children}</button>
    </div>
  );
}

export default DropDownItem;
