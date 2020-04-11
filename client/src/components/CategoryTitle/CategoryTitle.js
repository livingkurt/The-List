// React
import React, { useState } from "react";
import { useClipboard } from 'use-clipboard-copy';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
import CategoryAttributesModal from '../CategoryAttributesModal/CategoryAttributesModal';
import Label from '../Label/Label';

// Styles
import './category_title.css'


const CategoryTitle = (props) => {

  // const clipboard = useClipboard();
  // const copy_to_clipboard = () => {
  //   clipboard.copy(props.folder_id)
  //   console.log(props.folder_id)
  // }

  const [category_modal_state, set_category_modal_state] = useState("none")

  const show_hide_category_modal = async (e) => {
    const todo_id = props.id
    // console.log(todo_id)
    if (category_modal_state === "none") {
      set_category_modal_state("block")
    }
    else {
      set_category_modal_state("none")
    }
  }




  return (
    <div className="category_title zoom" style={{ borderBottom: props.border, padding: "2px", justifyContent: "space-between" }}>
      {/* <h2 style={{ margin: props.margin, fontSize: props.fontSize }}>{props.children}</h2> */}
      {/* <input style={{ margin: props.margin, fontSize: props.fontSize }}>{props.children}</input> */}
      <div style={{ fontSize: "20px", color: "silver", transform: "rotate(270deg)", marginLeft: "10px", marginTop: "3px" }}>
        <i className="fas fa-sort-up"></i>
      </div>
      <input
        defaultValue={props.children}
        // onChange={e => props.on_change_category_editor(e)}
        className="category_id_input editor_inputs"
        id={props.category_id}
        placeholder="Category Name"
        onBlur={e => props.on_change_category_editor(e)}
        name="category_name" />
      <div style={{ display: "flex" }}>
        <Label fontSize="16px" margin="auto" marginRight="13px" color="gray">{props.num_notes}</Label>
        <ButtonSymbol styles={{ margin: "5px 3px 7px 0px", padding: "4px" }} on_click_function={show_hide_category_modal} id={props.category_id} category={props.category}><i className="fas fa-bars"></i></ButtonSymbol>
        <ButtonSymbol styles={{ margin: "5px 3px 7px 0px", padding: "0px 2px 7px 0px" }} on_click_function={props.show_hide_by_category} id={props.category_id} category={props.category}><i className="fas fa-sort-up"></i></ButtonSymbol>
      </div>
      <CategoryAttributesModal id={props.category_id} on_change_category_editor={props.on_change_category_editor} get_all_notes_by_list_id={props.get_all_notes_by_list_id} get_all_categories={props.get_all_categories} show_hide_category_modal={show_hide_category_modal} category_modal_state={category_modal_state} />
    </div >
  );
}

export default CategoryTitle;
