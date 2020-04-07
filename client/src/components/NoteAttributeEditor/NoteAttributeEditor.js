// React
import React, { useState, useEffect } from "react";
import Label from "../Label/Label"
import Checkbox from "../Checkbox/Checkbox"
import ButtonWord from "../ButtonWord/ButtonWord"
import DropDownList from "../DropDownList/DropDownList"
// Styles
import './note_attribute_editor.css'
import API from "../../utils/API";


function NoteAttributeEditor(props) {

  useEffect(() => {
    get_all_folders();
  }, []);

  const [folder_state, set_folder_state] = useState({})

  const get_all_folders = async () => {
    try {
      const res = await API.get_all_folders()
      const folders = res.data
      set_folder_state(folders)

      // return folders;
      // console.log({ "get_all_folders": res.data })
    }
    catch (err) {
      console.log(err);
    }
  };


  return (
    <div id="create_note_fields">
      <div id="create_note_container">
        <div style={{ width: "50%" }}>
          <div >
            <Label>Priority: </Label>
            <DropDownList
              on_dropdown_choice={props.on_attribute_change}
              dropdown_items={props.priority_dropdown_items}
              dropdown_state={props.dropdown_state}
              name="priority">{props.note_state.priority}
            </DropDownList>
          </div>
          <div>
            <Label>List Name: </Label>
            <DropDownList
              on_dropdown_choice={props.on_attribute_change}
              dropdown_items={props.list_name_dropdown_items}
              dropdown_state={props.dropdown_state}
              name="list_id"> {props.note_state.list_id}
            </DropDownList>
          </div>
          <div>
            <Label>Folder ID: </Label>
            <input
              defaultValue={props.note_state.folder_id}
              onBlur={e => props.on_change_note_editor(e)}
              className="folder_id_input_2 editor_inputs"
              placeholder="Folder ID"
              name="folder_id" />
            {/* <Label>Folder: </Label> */}
            {/* <DropDownList
              dropdown_items={folder_state}
              on_dropdown_choice={props.on_attribute_change}
              // dropdown_items={props.folder_name_dropdown_items}
              dropdown_state={props.dropdown_state}
              name="folder_id">{props.note_state.folder_id}
            </DropDownList> */}
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
            onBlur={e => props.on_change_note_editor(e)}
            name="scheduled_date" />
          <Label>Time: </Label>
          <input id="scheduled_time" type="time"
            defaultValue={props.time_state}
            onBlur={e => props.on_change_note_editor(e)}
            name="scheduled_time" />
        </div>
      </div>
    </div>
  );
}

export default NoteAttributeEditor;
