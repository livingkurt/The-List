// React
import React, { useState, useEffect } from "react";
// Styles
import './folder_attributes_modal.css'
// Components
import { ButtonWord, ButtonSymbol, EditorInput, Label } from '../../UtilityComponents';
import { FlexContainer } from '../../ContainerComponents';
// Utils
import { API } from "../../../utils/";


const FolderAttributesModal = (props) => {

  // const [todo_state, set_todo_state] = useState("")
  const folder_id = props.id

  // console.log({ "folder_id": folder_id })

  const [folder_state, set_folder_state] = useState({
    folder_name: "",
    folders: "",
    folders: "",
    completed: "",
    date_modified: ""
  })

  const [dropdown_state, set_dropdown_state] = useState("none")

  useEffect(() => {
    get_folder()

  }, [])

  const get_folder = async () => {
    const folder_id = props.id
    if (folder_id != undefined) {
      try {
        const res = await API.get_folder(folder_id)
        set_folder_state(res.data)
      }
      catch (err) {
        // console.log(err);
      }
    }
  }
  const drop_down = () => {
    if (dropdown_state === "none") {
      set_dropdown_state("flex")
    }
    else if (dropdown_state === "flex") {
      set_dropdown_state("none")
    }

  }
  const on_change_folder_editor = async (e) => {
    const folder_id = props.id
    let todo_data = ""
    let field_name = ""
    // const folder_id = e.target.id
    console.log({ "on_change_folder_editor": e })
    if (e.target === undefined) {
      set_folder_state({ ...folder_state, scheduled: e })
      todo_data = e
      field_name = "scheduled"
    }
    else {

      todo_data = e.target.value
      field_name = e.target.name
      set_folder_state({ ...folder_state, [field_name]: todo_data })
    }
    console.log(field_name)
    try {
      const res = await API.get_folder(folder_id)
      console.log({ "update_folder": res.data })
      const update_todo = {
        ...res.data,
        [field_name]: todo_data
      }
      API.update_folder(folder_id, update_todo)
    }
    catch (err) {
      console.log({ "save_scheduling": err });
    }

  }

  const delete_folder = async (e) => {
    const folder_id = props.id
    console.log()
    try {
      const res = await API.delete_folder(folder_id)
      props.get_all_folders()
    }
    catch (err) {
      console.log(err);
    }
  }


  const format_date_display = unformatted_date => {
    const date = new Date(unformatted_date)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatted_date = `${month}/${day}/${year}`
    return formatted_date;
  }

  const format_date_element = unformatted_date => {
    const date = new Date(unformatted_date)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatted_date = `${month}-${day}-${year}`
    return formatted_date;
  }



  return (
    <div style={{ display: props.folder_modal_state }} className="folder_attributes_modal zoom">
      <ButtonSymbol styles={{ margin: "-10px 0px 8px" }} id={props.id} on_click_function={props.show_hide_folder_modal}><i className="fas fa-times"></i></ButtonSymbol>
      <div id="create_folder_fields">
        <div id="create_folder_container">
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Folder Name: </Label>
            <EditorInput
              value={folder_state.folder_name}
              on_change_function={e => props.on_change_folder_editor(e)}
              className="folder_name_input editor_inputs"
              id={props.id}
              placeholder="Folder Name"
              name="folder_name" />
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Folder ID: </Label>
            <input
              defaultValue={folder_state._id}
              readOnly
              onChange={e => props.on_change_folder_editor(e)}
              className="folder_id_input_2 editor_inputs"
              placeholder="Folder ID"
              id={props.id}
              name="folder_id" />
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Notes: </Label>
            <input
              defaultValue={folder_state.notes}
              onChange={e => props.on_change_folder_editor(e)}
              className="notes_input editor_inputs"
              placeholder="Notes"
              id={props.id}
              name="notes" />
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Folders: </Label>
            <input
              defaultValue={folder_state.folders}
              onChange={e => props.on_change_folder_editor(e)}
              className="folders_input editor_inputs"
              placeholder="Folders"
              id={props.id}
              name="folders" />
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Date Created: </Label>
            <input
              defaultValue={format_date_display(folder_state.date_created)}
              readOnly
              onChange={e => props.on_change_folder_editor(e)}
              className="folder_id_input_2 editor_inputs"
              // placeholder="Date"
              id={props.id}
              name="folder_id" />
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Date Modified: </Label>
            <input
              defaultValue={format_date_display(folder_state.date_modified)}
              readOnly
              onChange={e => props.on_change_folder_editor(e)}
              className="folder_id_input_2 editor_inputs"
              // placeholder="Folder ID"
              id={props.id}
              name="folder_id" />
          </FlexContainer>
        </div>
      </div>
      {/* <ButtonSymbol margin="-10px 0px 8px" id={props.id} on_click_function={props.show_hide_folder_modal}><i className="fas fa-times"></i></ButtonSymbol>
      <folderTextEditor
        folder_state={folder_state}
        on_change_folder_editor={on_change_folder_editor}
        height="30vh" />
      <folderAttributeEditor
        folder_state={folder_state}
        formatted_date_slash={formatted_date_slash}
        on_change_folder_editor={on_change_folder_editor}
        checkboxState={folder_state.completed}
        show_scheduling={show_scheduling}
        schedule_state={schedule_state} /> */}
      <ButtonWord styles={{ margin: "10px 0px 0px 0px" }} on_click_function={delete_folder} index={props.id} get_all_folders={props.get_all_folders} id={props.id}>
        Delete
      </ButtonWord>
    </div>
  );
}

export default FolderAttributesModal;