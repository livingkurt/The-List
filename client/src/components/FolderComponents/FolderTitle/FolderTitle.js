// React
import React, { useState, useEffect } from "react";
import { useClipboard } from 'use-clipboard-copy';
// Components
import { ButtonSymbol, Label, EditorInput } from '../../UtilityComponents';
import FolderAttributesModal from '../FolderAttributesModal/FolderAttributesModal';
import { FlexContainer } from '../../ContainerComponents';
// Utils
import { API } from "../../../utils/";
// Styles
import './folder_title.css'



const FolderTitle = (props) => {

  // const clipboard = useClipboard();
  // const copy_to_clipboard = () => {
  //   clipboard.copy(props.folder_id)
  //   console.log(props.folder_id)
  // }

  const [folder_modal_state, set_folder_modal_state] = useState("none")
  const [folder_state, set_folder_state] = useState(props.folder)



  useEffect(() => {

  }, [folder_state])

  const show_hide_folder_modal = async (e) => {
    const todo_id = folder_state._id
    // console.log(todo_id)
    if (folder_modal_state === "none") {
      set_folder_modal_state("block")
    }
    else {
      set_folder_modal_state("none")
    }
  }


  const on_change_folder_editor = async (e) => {
    const folder_id = folder_state._id
    const folder_data = e.target.value
    const field_name = e.target.name
    console.log(folder_id, folder_data, field_name)
    try {
      const update_folder = {
        ...folder_state,
        [field_name]: folder_data
      }
      console.log({ "update_folder": update_folder })
      const res = await API.update_folder(folder_id, update_folder)
      set_folder_state(res.data)
    }
    catch (err) {
      console.log({ "on_change_folder_editor": err });
    }

  }



  return (
    <div className="folder_title zoom" >
      <EditorInput
        value={folder_state.folder_name}
        on_change_function={e => on_change_folder_editor(e)}
        id={folder_state._id}
        placeholder="Folder Name"
        styles={{ fontWeight: "700", fontSize: "16px", margin: "2px", boxShadow: "unset" }}
        name="folder_name" />
      <FlexContainer >
        <Label styles={{ fontSize: "16px", margin: "auto", marginRight: "13px", color: "gray" }}>{props.num_notes}</Label>
        <ButtonSymbol styles={{ margin: "5px 3px 7px 0px", padding: "4px" }} on_click_function={show_hide_folder_modal} id={folder_state._id} folder={folder_state}><i className="fas fa-bars"></i></ButtonSymbol>
        <ButtonSymbol styles={{ margin: "5px 3px 7px 0px", padding: "0px 2px 7px 0px" }} on_click_function={props.show_hide_by_folder} id={folder_state._id} folder={folder_state}><i className="fas fa-sort-up"></i></ButtonSymbol>
      </FlexContainer>
      <FolderAttributesModal id={folder_state._id} folder_state={folder_state} on_change_folder_editor={on_change_folder_editor} get_all_folders={props.get_all_folders} show_hide_folder_modal={show_hide_folder_modal} folder_modal_state={folder_modal_state} />
    </div >
  );
}

export default FolderTitle;
