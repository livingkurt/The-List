// React
import React from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './category_note_container.css'


const FolderNoteContainer = (props) => {




  return (
    <div className="category_note_container" style={{ height: props.height }}>
      {props.children}
    </div>
  );
}

export default FolderNoteContainer;