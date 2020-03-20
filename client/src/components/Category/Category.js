// React
import React from "react";
// Styles
import './list_item.css'


function ListItem({ children }) {
  return (
    <div className="list_item">
      {children}
    </div>
  );
}

export default ListItem;
