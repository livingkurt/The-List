// React
import React, { useState, useEffect } from "react";
// Styles
import './category_attributes_modal.css'
// import Checkbox from '../Checkbox/Checkbox';
import ButtonWord from '../ButtonWord/ButtonWord';
import Checkbox from '../Checkbox/Checkbox';
import API from "../../utils/API";
import Label from '../Label/Label';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
import DropDownList from "../DropDownList/DropDownList"
import FlexContainer from "../FlexContainer/FlexContainer"
import BlockContainer from "../BlockContainer/BlockContainer"
import EditorInput from "../EditorInput/EditorInput";


const CategoryAttributesModal = (props) => {

  // const [todo_state, set_todo_state] = useState("")
  const category_id = props.id

  // console.log({ "category_id": category_id })

  const [category_state, set_category_state] = useState(props.category_state)

  const [dropdown_state, set_dropdown_state] = useState("none")

  useEffect(() => {
    // get_category()

  }, [props.category_state])

  // const get_category = async () => {
  //   const category_id = props.id
  //   if (category_id != undefined) {
  //     try {
  //       const res = await API.get_category(category_id)
  //       set_category_state(res.data)
  //     }
  //     catch (err) {
  //       // console.log(err);
  //     }
  //   }
  // }
  const drop_down = () => {
    if (dropdown_state === "none") {
      set_dropdown_state("flex")
    }
    else if (dropdown_state === "flex") {
      set_dropdown_state("none")
    }

  }
  const on_change_category_editor = async (e) => {
    const category_id = props.id
    let todo_data = ""
    let field_name = ""
    // const category_id = e.target.id
    console.log({ "on_change_category_editor": e })
    if (e.target === undefined) {
      set_category_state({ ...category_state, scheduled: e })
      todo_data = e
      field_name = "scheduled"
    }
    else {

      todo_data = e.target.value
      field_name = e.target.name
      set_category_state({ ...category_state, [field_name]: todo_data })
    }
    console.log(field_name)
    try {
      const res = await API.get_category(category_id)
      console.log({ "update_category": res.data })
      const update_todo = {
        ...res.data,
        [field_name]: todo_data
      }
      API.update_category(category_id, update_todo)
    }
    catch (err) {
      console.log({ "save_scheduling": err });
    }

  }

  const delete_category = async (e) => {
    const category_id = props.id
    console.log()
    try {
      const res = await API.delete_category(category_id)
      props.get_all_categories()
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

  const on_attribute_change = async (e) => {

    const category_id = props.id
    const attribute_data = e.target.id
    const field_name = e.target.name
    console.log({ "category_id": category_id, "attribute_data": attribute_data, "field_name": field_name })
    try {
      const res = await API.get_category(category_id)
      // console.log({ "update_category": res.data })
      const update_category = {
        ...res.data,
        [field_name]: attribute_data
      }
      const resp = await API.update_category(category_id, update_category)
      props.get_all_notes_by_list_id("Dump")
      props.get_all_notes_by_list_id("Master")
      API.update_category(category_id, update_category)
      props.get_all_notes_by_list_id("Dump")
      props.get_all_notes_by_list_id("Master")
    }
    catch (err) {
      console.log({ "save_scheduling": err });
    }
  }


  const priority_dropdown_items = ["High", "Medium", "Low"]
  return (
    <div style={{ display: props.category_modal_state }} className="category_attributes_modal zoom">
      <ButtonSymbol styles={{ margin: "-10px 0px 8px" }} id={props.id} on_click_function={props.show_hide_category_modal}><i className="fas fa-times"></i></ButtonSymbol>
      <div id="create_category_fields">
        <div id="create_category_container">
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Category Name: </Label>
            <EditorInput
              value={category_state.category_name}
              on_change_function={props.on_change_category_editor}
              id={props.id}
              placeholder="Category Name"
              name="category_name" />
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Category ID: </Label>
            <input
              defaultValue={category_state._id}
              readOnly
              onBlur={e => props.on_change_category_editor(e)}
              className="category_id_input_2 editor_inputs"
              placeholder="Category ID"
              id={props.id}
              name="category_id" />
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Priority: </Label>
            <DropDownList
              styles={{ left: "104px", top: "207px" }}
              on_dropdown_choice={on_attribute_change}
              dropdown_items={priority_dropdown_items}
              dropdown_state={dropdown_state}
              name="priority">{category_state.priority}
            </DropDownList>
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Notes: </Label>
            <input
              defaultValue={category_state.notes}
              onBlur={e => props.on_change_category_editor(e)}
              className="notes_input editor_inputs"
              placeholder="Notes"
              id={props.id}
              name="notes" />
          </FlexContainer>

          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Date Created: </Label>
            <input
              defaultValue={format_date_display(category_state.date_created)}
              readOnly
              onChange={e => props.on_change_category_editor(e)}
              className="category_id_input_2 editor_inputs"
              // placeholder="Date"
              id={props.id}
              name="category_id" />
          </FlexContainer>
          <FlexContainer styles={{ flexDirection: "column" }}>
            <Label>Date Modified: </Label>
            <input
              defaultValue={format_date_display(category_state.date_modified)}
              readOnly
              onChange={e => props.on_change_category_editor(e)}
              className="category_id_input_2 editor_inputs"
              // placeholder="category ID"
              id={props.id}
              name="category_id" />
          </FlexContainer>

        </div>
      </div>
      <ButtonWord styles={{ margin: "10px 0px 0px 0px" }} on_click_function={delete_category} index={props.id} get_all_categories={props.get_all_categories} id={props.id}>
        Delete
      </ButtonWord>
    </div>
  );
}

export default CategoryAttributesModal;