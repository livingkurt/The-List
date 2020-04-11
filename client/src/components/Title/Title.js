// React
import React from "react";
// Styles
import './title.css'


const Title = (props) => {
  console.log({ [props.children]: props.styles })
  return (
    <div className="title">
      {/* // <div className="title" style={props.styles}> */}
      <h2 style={props.styles}>{props.children}</h2>
    </div >
  );
}

export default Title;
