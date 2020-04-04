// React
import React from "react";
// Styles
import './note_container.css'


const NoteContainer = ({ children }) => {

  return (
    <div className="note_archive">
      {children}
    </div>
  );
}

export default NoteContainer;
