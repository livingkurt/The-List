// React
import React, { useState, useEffect } from "react";
import { useClipboard } from 'use-clipboard-copy';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
import CategoryAttributesModal from '../CategoryAttributesModal/CategoryAttributesModal';
import Label from '../Label/Label';
import FlexContainer from '../FlexContainer/FlexContainer';
import BlockContainer from '../BlockContainer/BlockContainer';

// Styles
import './category_title.css'
import EditorInput from "../EditorInput/EditorInput";
import API from '../../utils/API'
import CategoryContext from '../../utils/CategoryContext'


const CategoryTitle = (props) => {

  const [category_modal_state, set_category_modal_state] = useState("none")
  const [category_state, set_category_state] = useState(props.category)

  // console.log(props.category)

  useEffect(() => {

  }, [category_state])

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




  const on_change_category_editor = async (e) => {
    const category_id = e.target.id
    const category_data = e.target.value
    const field_name = e.target.name

    try {
      // const res = await API.get_category(category_id)
      const update_category = {
        ...category_state,
        [field_name]: category_data
      }
      console.log({ "update_category": update_category })
      const res = await API.update_category(category_id, update_category)
      set_category_state(res.data)
      // set_category_state({ ...category_state, [field_name]: category_data })
    }
    catch (err) {
      console.log({ "on_change_folder_editor": err });
    }

  }




  return (
    <div className="category_title zoom" >
      <FlexContainer>
        <BlockContainer styles={{ fontSize: "20px", color: "silver", transform: "rotate(270deg)", marginLeft: "10px", marginTop: "3px" }}>
          <i className="fas fa-sort-up"></i>
        </BlockContainer>
        <EditorInput
          value={props.children}
          styles={{ fontWeight: "700", margin: "0px", boxShadow: "unset" }}
          id={props.category_id}
          placeholder="Category Name"
          on_change_function={e => on_change_category_editor(e)}
          name="category_name" />
      </FlexContainer>
      <FlexContainer >
        <Label styles={{ fontSize: "16px", margin: "auto", marginRight: "13px", color: "gray" }}>{props.num_notes}</Label>
        <ButtonSymbol styles={{ margin: "5px 3px 7px 0px", padding: "4px" }} on_click_function={show_hide_category_modal} id={props.category_id} category={props.category}><i className="fas fa-bars"></i></ButtonSymbol>
        <ButtonSymbol styles={{ margin: "5px 3px 7px 0px", padding: "0px 2px 7px 0px" }} on_click_function={props.show_hide_by_category} id={props.category_id} category={props.category}><i className="fas fa-sort-up"></i></ButtonSymbol>
      </FlexContainer>
      <CategoryAttributesModal id={props.category_id} on_change_category_editor={on_change_category_editor} get_all_notes_by_list_id={props.get_all_notes_by_list_id} get_all_categories={props.get_all_categories} show_hide_category_modal={show_hide_category_modal} category_modal_state={category_modal_state} category_state={category_state} />
    </div >
  );
}

export default CategoryTitle;
