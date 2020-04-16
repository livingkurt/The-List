// React
import React, { useState, useEffect } from "react";
// Components
import { Label, Checkbox, ButtonWord } from "../../UtilityComponents"
import { DropDownList } from "../../DropdownComponents"
import { FlexContainer, BlockContainer } from "../../ContainerComponents"
// Styles
import './note_attribute_editor.css'
// Utils
import { API } from "../../../utils";
import { format_date_element, format_date_display } from "../../../utils/HelperFunctions";


function NoteAttributeEditor(props) {

  useEffect(() => {
    // get_all_folders();
  }, []);

  // const [folder_state, set_folder_state] = useState({})

  // const get_all_folders = async () => {
  //   try {
  //     const res = await API.get_all_folders()
  //     const folders = res.data
  //     set_folder_state(folders)

  //     // return folders;
  //     // console.log({ "get_all_folders": res.data })
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // };

  const [schedule_state, set_schedule_state] = useState()

  const show_scheduling = () => {
    if (schedule_state === false) {
      set_schedule_state(true)
      // on_change_note_editor(true)
    }
    else {
      set_schedule_state(false)
      // on_change_note_editor(false)
    }
  }


  return (
    <div id="create_note_fields">
      <div id="create_note_container">
        <BlockContainer styles={{ width: "50%" }}>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Priority: </Label>
            <DropDownList
              styles={{ left: "115px" }}
              on_dropdown_choice={props.on_dropdown_choice}
              dropdown_items={props.priority_dropdown_items}
              dropdown_state={props.dropdown_state}
              name="priority">{props.note_state.priority}
            </DropDownList>
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>List Name: </Label>
            <DropDownList
              styles={{ top: "692px" }}
              on_dropdown_choice={props.on_dropdown_choice}
              dropdown_items={props.list_name_dropdown_items}
              dropdown_state={props.dropdown_state}
              name="list_id"> {props.note_state.list_id}
            </DropDownList>
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
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
              on_dropdown_choice={props.on_change_note_editor}
              // dropdown_items={props.folder_name_dropdown_items}
              dropdown_state={props.dropdown_state}
              name="folder_id">{props.note_state.folder_id}
            </DropDownList> */}
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Category ID: </Label>
            <input
              defaultValue={props.note_state.category_id}
              onBlur={e => props.on_change_note_editor(e)}
              className="category_input editor_inputs"
              placeholder="Category"
              name="category_id" />
          </FlexContainer>
          <FlexContainer style={{ flexDirection: "column" }}>
            <Label>Date Created: {format_date_display(props.note_state.date_created)}</Label>
            <Label>Date Modified: {format_date_display(props.note_state.date_modified)}</Label>
            <Label>Date Completed: {format_date_display(props.note_state.date_completed)}</Label>
          </FlexContainer>
          <FlexContainer className="scheduled_field" style={{ flexDirection: "column" }}>
            <Label>Schedule: </Label>
            <Checkbox onCheck={show_scheduling} checkboxState={schedule_state} />
          </FlexContainer>
        </BlockContainer>

        <div id="schedule_div" style={{ display: schedule_state ? "flex" : "none" }}>
          <Label>Date: </Label>
          <input id="scheduled_date" type="date"
            defaultValue={format_date_element(props.date_state)}
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
