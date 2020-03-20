import React from "react";
import Container from "../Container/Container"
import './background.css'

function Background({ children }) {
  return (
    <div id="bg">
      {children}
    </div>
  );
}

export default Background;
