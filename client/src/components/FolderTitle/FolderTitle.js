// React
import React, { useState } from "react";
import { useClipboard } from 'use-clipboard-copy';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
// Styles
import './folder_title.css'


const FolderTitle = (props) => {
  const clipboard = useClipboard();
  const copy_to_clipboard = () => {
    clipboard.copy(props.folder_id)
    console.log(props.folder_id)
  }


  return (
    <div className="folder_title zoom" style={{ borderBottom: props.border, padding: "2px", justifyContent: "space-between" }}>
      {/* <h2 style={{ margin: props.margin, fontSize: props.fontSize }}>{props.children}</h2> */}
      {/* <input style={{ margin: props.margin, fontSize: props.fontSize }}>{props.children}</input> */}
      <input
        defaultValue={props.children}
        onChange={e => props.on_change_folder_editor(e)}
        className="folder_id_input editor_inputs"
        id={props.folder_id}
        placeholder="Folder ID"
        // onBlur={e => props.update_folder(e)}
        name="folder_name" />


      <ButtonSymbol margin="1px 3px 0px 0px" padding="0px 2px 7px 0px" on_click_function={props.on_click_function} list_id={props.folder_id} folder={props.folder}><i className="fas fa-sort-up"></i></ButtonSymbol>
    </div >
  );
}

export default FolderTitle;
