// React
import React, { useState, useEffect } from "react";
import Label from "../Label/Label"
import Checkbox from "../Checkbox/Checkbox"
// Styles
import './note_attribute_editor.css'


function NoteAttributeEditor(props) {


  return (
    <div id="create_note_fields">
      <div id="create_note_container">
        <div >
          <div >
            <Label>Priority: </Label>
            <input
              defaultValue={props.note_state.priority}
              onChange={e => props.on_change_note_editor(e)}
              className="priority_input editor_inputs"
              placeholder="High, Medium, Low"
              name="priority" />
          </div>
          <div>
            <Label>List Name: </Label>
            <input
              defaultValue={props.note_state.list_id}
              onChange={e => props.on_change_note_editor(e)}
              className="list_id_input editor_inputs"
              placeholder="List Name"
              name="list_id" />
          </div>
          <div>
            <Label>Folder ID: </Label>
            <input
              defaultValue={props.note_state.folder_id}
              onChange={e => props.on_change_note_editor(e)}
              className="folder_id_input editor_inputs"
              placeholder="Folder ID"
              name="folder_id" />
          </div>
          <Label>Date Created: {props.formatted_date_slash}</Label>
          <div className="scheduled_field ">
            <Label>Schedule: </Label>
            <Checkbox onCheck={props.show_scheduling} checkboxState={props.schedule_state} />
          </div>
        </div>

        <div id="schedule_div" style={{ display: props.schedule_state ? "flex" : "none" }}>
          <Label>Date: </Label>
          <input id="scheduled_date" type="date"
            defaultValue={props.date_state}
            onChange={e => props.on_change_note_editor(e)}
            name="scheduled_date" />
          <Label>Time: </Label>
          <input id="scheduled_time" type="time"
            defaultValue={props.time_state}
            onChange={e => props.on_change_note_editor(e)}
            name="scheduled_time" />
        </div>
      </div>
    </div>
  );
}

export default NoteAttributeEditor;
