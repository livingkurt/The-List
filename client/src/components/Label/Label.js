// React
import React, { useState, useEffect } from "react";
// Styles
import './label.css'


function Label(props) {
  return (
    <label style={{ fontSize: props.fontSize, margin: props.margin, marginRight: props.marginRight, color: props.color }} className="label">
      {props.children}
    </label>
  );
}

export default Label;