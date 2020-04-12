// React
import React, { useState } from "react";
import { useClipboard } from 'use-clipboard-copy';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
import FolderAttributesModal from '../FolderAttributesModal/FolderAttributesModal';
import Label from '../Label/Label';
import FlexContainer from '../FlexContainer/FlexContainer';

// Styles
import './folder_title.css'
import EditorInput from "../EditorInput/EditorInput";


const FolderTitle = (props) => {

  const clipboard = useClipboard();
  const copy_to_clipboard = () => {
    clipboard.copy(props.folder_id)
    console.log(props.folder_id)
  }

  const [folder_modal_state, set_folder_modal_state] = useState("none")

  const show_hide_folder_modal = async (e) => {
    const todo_id = props.id
    // console.log(todo_id)
    if (folder_modal_state === "none") {
      set_folder_modal_state("block")
    }
    else {
      set_folder_modal_state("none")
    }
  }




  return (
    <div onClick={copy_to_clipboard} className="folder_title zoom" >
      <EditorInput
        value={props.children}
        on_change_function={e => props.on_change_folder_editor(e)}
        id={props.folder_id}
        placeholder="Folder Name"
        styles={{ fontWeight: "700", fontSize: "16px", margin: "2px", boxShadow: "unset" }}
        name="folder_name" />
      <FlexContainer >
        <Label fontSize="16px" margin="auto" marginRight="13px" color="gray">{props.num_notes}</Label>
        <ButtonSymbol styles={{ margin: "5px 3px 7px 0px", padding: "4px" }} on_click_function={show_hide_folder_modal} id={props.folder_id} folder={props.folder}><i className="fas fa-bars"></i></ButtonSymbol>
        <ButtonSymbol styles={{ margin: "5px 3px 7px 0px", padding: "0px 2px 7px 0px" }} on_click_function={props.show_hide_by_folder} id={props.folder_id} folder={props.folder}><i className="fas fa-sort-up"></i></ButtonSymbol>
      </FlexContainer>
      <FolderAttributesModal id={props.folder_id} on_change_folder_editor={props.on_change_folder_editor} get_all_folders={props.get_all_folders} show_hide_folder_modal={show_hide_folder_modal} folder_modal_state={folder_modal_state} />
    </div >
  );
}

export default FolderTitle;
