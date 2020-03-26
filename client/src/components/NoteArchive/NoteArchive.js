// React
import React from "react";
// Styles
import './note_archive.css'


const NoteArchive = ({ children }) => {

  return (
    <div className="sidebar">
      {children}
    </div>
  );
}

export default NoteArchive;
