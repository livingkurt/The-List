// React
import React from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './todo_container.css'


const TodoContainer = (props) => {


  return (
    <div className="todo_container" style={props.styles}>
      {props.children}
    </div>
  );
}

export default TodoContainer;