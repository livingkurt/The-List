// React
import React from "react";
// Styles
import './folder_container.css'


const FolderContainer = (props) => {


  return (
    <div className="folder_container" style={{ height: props.height }}>
      {props.children}
    </div>
  );
}

export default FolderContainer;