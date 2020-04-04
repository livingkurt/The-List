// React
import React, { useState } from "react";
import { useClipboard } from 'use-clipboard-copy';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
import FolderAttributesModal from '../FolderAttributesModal/FolderAttributesModal';

// Styles
import './folder_title.css'


const FolderTitle = (props) => {

  const clipboard = useClipboard();
  const copy_to_clipboard = () => {
    clipboard.copy(props.folder_id)
    console.log(props.folder_id)
  }

  const [folder_modal_state, set_folder_modal_state] = useState("none")

  const show_hide_folder_modal = async (e) => {
    const todo_id = props.id
    console.log(todo_id)
    if (folder_modal_state === "none") {
      set_folder_modal_state("block")
    }
    else {
      set_folder_modal_state("none")
    }
  }




  return (
    <div onClick={copy_to_clipboard} className="folder_title zoom" style={{ borderBottom: props.border, padding: "2px", justifyContent: "space-between" }}>
      {/* <h2 style={{ margin: props.margin, fontSize: props.fontSize }}>{props.children}</h2> */}
      {/* <input style={{ margin: props.margin, fontSize: props.fontSize }}>{props.children}</input> */}
      <input
        defaultValue={props.children}
        onChange={e => props.on_change_folder_editor(e)}
        className="folder_id_input editor_inputs"
        id={props.folder_id}
        placeholder="Folder Name"
        // onBlur={e => props.update_folder(e)}
        name="folder_name" />
      <div style={{ display: "flex" }}>
        <ButtonSymbol margin="1px 3px 0px 0px" padding="4px" on_click_function={show_hide_folder_modal} list_id={props.folder_id} folder={props.folder}><i className="fas fa-bars"></i></ButtonSymbol>
        <ButtonSymbol margin="1px 3px 0px 0px" padding="0px 2px 7px 0px" on_click_function={props.show_hide_by_folder} list_id={props.folder_id} folder={props.folder}><i className="fas fa-sort-up"></i></ButtonSymbol>
      </div>
      <FolderAttributesModal id={props.folder_id} on_change_folder_editor={props.on_change_folder_editor} get_all_folders={props.get_all_folders} show_hide_folder_modal={show_hide_folder_modal} folder_modal_state={folder_modal_state} />
    </div >
  );
}

export default FolderTitle;
