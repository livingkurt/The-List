// React
import React from "react";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// Styles
import './scroll_container.css'


const ScrollContainer = (props) => {


  return (
    <div className="scroll_container" style={{ height: props.height }}>
      {/* <div className="scroll_container" onMouseDown={handleMouseDown}></div> */}
      {props.children}
    </div>
  );
}

export default ScrollContainer;



 // const POSITION = { x: 0, y: 0 }

  // const [drag_state, set_drag_state] = useState({
  //   isDragging: false,
  //   origin: POSITION,
  //   translation: POSITION
  // })
  // const styles = useMemo(() => ({
  //   curser: drag_state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
  //   transform: `translate(${drag_state.translation.x}px, ${drag_state.translation.y}px)`,
  //   transition: drag_state.isDragging ? 'none' : 'transform 500ms',
  //   zIndex: drag_state.isDragging ? 'absolute' : 'relative'
  // }), [drag_state.isDragging, drag_state.translation])


  // const handleMouseDown = useCallback(({ clientX, clientY }) => {
  //   set_drag_state(drag_state => ({
  //     ...drag_state,
  //     isDragging: true,
  //     origin: { x: clientX, y: clientY }
  //   }))
  // }, [])

  // const handleMouseMove = useCallback(({ clientX, clientY }) => {
  //   const translation = { x: clientX - drag_state.origin.x, y: clientY - drag_state.origin.y }
  //   set_drag_state(drag_state => ({
  //     ...drag_state,
  //     translation
  //   }))
  // }, [drag_state.origin])

  // const handleMouseUp = useCallback(() => {
  //   set_drag_state(drag_state => ({
  //     ...drag_state,
  //     isDragging: false
  //   }))
  // }, [])

  // useEffect(() => {
  //   if (drag_state.isDragging) {
  //     window.addEventListener('mousemove', handleMouseMove)
  //     window.addEventListener('mouseup', handleMouseUp)
  //   }
  //   else {
  //     window.removeEventListener('mousemove', handleMouseMove)
  //     window.removeEventListener('mouseup', handleMouseUp)

  //     set_drag_state(drag_state => ({ ...drag_state, translation: POSITION }))
  //   }
  // }, [drag_state.isDragging, handleMouseMove, handleMouseUp])