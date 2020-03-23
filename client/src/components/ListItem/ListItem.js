// React
import React, { useState } from "react";
// Styles
import './list_item.css'
import Checkbox from '../Checkbox/Checkbox';


const ListItem = ({ children }) => {
  const [itemState, setItemState] = useState("false")

  return (
    <div className="list_div">
      <Checkbox />
      <div
        contenteditable={itemState}
        className="list_item"
        onClick={() => {
          setItemState("true")
        }}
        onBlur={() => setItemState("false")}
        style={{ display: "flex" }}
      >

        {children}
      </div>
    </div>
  );
}

export default ListItem;
