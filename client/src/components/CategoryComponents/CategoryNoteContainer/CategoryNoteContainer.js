// React
import React from "react";
// Styles
import './category_note_container.css'


const CategoryNoteContainer = (props) => {




  return (
    <div className="category_note_container" style={{ height: props.height }}>
      {props.children}
    </div>
  );
}

export default CategoryNoteContainer;