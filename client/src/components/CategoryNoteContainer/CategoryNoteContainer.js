// React
import React, { useState, useEffect } from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './category_note_container.css'


const CategoryNoteContainer = (props) => {

  const [category_view_state, set_category_view_state] = useState("100%")

  useEffect(() => {
    show_hide_by_category()
  }, [])

  const show_hide_by_category = () => {

    if (props.category.hidden === false) {
      set_category_view_state("0px")
    }
    else if (props.category.hidden === true) {
      set_category_view_state("100%")
    }
  }



  return (
    <div className="category_note_container" style={{ height: props.height }}>
      {props.children}
    </div>
  );
}

export default CategoryNoteContainer;