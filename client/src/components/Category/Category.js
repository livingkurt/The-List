// React
import React from "react";
// Styles
import './todo.css'


function Todo({ children }) {
  return (
    <div className="todo">
      {children}
    </div>
  );
}

export default Todo;
