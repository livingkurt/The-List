// React
import React from "react";
// Styles
import './title.css'


const Title = (props) => {
  return (
    <div className="title" style={{ borderBottom: props.border }}>
      <h2 style={{ margin: props.margin, fontSize: props.fontSize }}>{props.children}</h2>
    </div >
  );
}

export default Title;
