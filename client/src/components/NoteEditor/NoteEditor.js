// React
import React, { useState, useEffect } from "react";
import Label from "../Label/Label"
import Checkbox from "../Checkbox/Checkbox"
// Styles
import './note_editor.css'


function NoteEditor(props) {

  const [schedule_state, set_schedule_state] = useState(false)

  const show_scheduling = () => {
    // console.log("show_scheduling")
    if (schedule_state === false) {
      set_schedule_state(true)
      props.on_change_note_editor(true)
    }
    else {
      set_schedule_state(false)
      props.on_change_note_editor(false)
    }
    // console.log(note_state)

  }
  return (
    <div id="create_note_fields">
      <div id="create_note_container">
        <div style={{ width: "55%" }}>
          <div >
            <Label>Priority: </Label>
            <input
              defaultValue={props.note_state.priority}
              onChange={e => props.on_change_note_editor(e)}
              className="priority_input create_note_inputs"
              placeholder="High, Medium, Low"
              name="priority" />
          </div>
          <div>
            <Label>List Name: </Label>
            <input
              defaultValue={props.note_state.list_id}
              onChange={e => props.on_change_note_editor(e)}
              className="list_id_input modal_input create_note_inputs"
              placeholder="List Name"
              name="list_id" />
          </div>
          <Label>Date Created: {props.formatted_date_slash}</Label>
          <div className="modal_scheduled_field ">
            <Label>Schedule: </Label>
            <Checkbox onCheck={show_scheduling} checkboxState={schedule_state} />
          </div>
        </div>

        <div id="schedule_div" style={{ display: schedule_state ? "flex" : "none" }}>
          <Label>Date: </Label>
          <input id="scheduled_date" type="date"
            defaultValue={props.date_state}
            onChange={e => props.on_change_note_editor(e)}
            placeholder="List Name"
            name="scheduled_date" />
          <Label> Time: </Label>
          <input id="scheduled_time" type="time"
            defaultValue={props.time_state}
            onChange={e => props.on_change_note_editor(e)}
            placeholder="List Name"
            name="scheduled_time" />
        </div>
      </div>
    </div>
  );
}

export default NoteEditor;
