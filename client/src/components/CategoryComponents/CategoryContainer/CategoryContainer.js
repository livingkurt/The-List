// React
import React from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './category_container.css'


const CategoryContainer = (props) => {


  return (
    <div className="category_container" style={{ height: props.height }}>
      {props.children}
    </div>
  );
}

export default CategoryContainer;