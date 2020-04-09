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


const CategoryAttributesModal = (props) => {

  // const [todo_state, set_todo_state] = useState("")
  const category_id = props.id

  // console.log({ "category_id": category_id })

  const [category_state, set_category_state] = useState({
    category_name: "",
    category_id: "",
    notes: [],
    priority: "Low",
  })

  const [dropdown_state, set_dropdown_state] = useState("none")

  useEffect(() => {
    get_category()

  }, [])

  const get_category = async () => {
    const category_id = props.id
    if (category_id != undefined) {
      try {
        const res = await API.get_category(category_id)
        set_category_state(res.data)
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



  return (
    <div style={{ display: props.category_modal_state }} className="category_attributes_modal zoom">
      <ButtonSymbol margin="-10px 0px 8px" list_id={props.id} on_click_function={props.show_hide_category_modal}><i className="fas fa-times"></i></ButtonSymbol>
      <div id="create_category_fields">
        <div id="create_category_container">
          <div >
            <div >
              <Label>Category Name: </Label>
              <input
                defaultValue={category_state.category_name}
                onBlur={e => props.on_change_category_editor(e)}
                className="category_name_input editor_inputs"
                id={props.id}
                placeholder="category Name"
                name="category_name" />
            </div>
            <div>
              <Label>Category ID: </Label>
              <input
                defaultValue={category_state._id}
                readOnly
                onBlur={e => props.on_change_category_editor(e)}
                className="category_id_input_2 editor_inputs"
                placeholder="category ID"
                id={props.id}
                name="category_id" />
            </div>
            <div>
              <Label>Notes: </Label>
              <input
                defaultValue={category_state.notes}
                onBlur={e => props.on_change_category_editor(e)}
                className="notes_input editor_inputs"
                placeholder="Notes"
                id={props.id}
                name="notes" />
            </div>
            <div>
              <Label>Date Created: </Label>
              <input
                defaultValue={format_date_display(category_state.date_created)}
                readOnly
                onChange={e => props.on_change_category_editor(e)}
                className="category_id_input_2 editor_inputs"
                // placeholder="Date"
                id={props.id}
                name="category_id" />
            </div>
            <div>
              <Label>Date Modified: </Label>
              <input
                defaultValue={format_date_display(category_state.date_modified)}
                readOnly
                onChange={e => props.on_change_category_editor(e)}
                className="category_id_input_2 editor_inputs"
                // placeholder="category ID"
                id={props.id}
                name="category_id" />
            </div>
          </div>
        </div>
      </div>
      <ButtonWord margin="10px 0px 0px 0px" on_click_function={delete_category} index={props.id} get_all_categories={props.get_all_categories} id={props.id}>
        Delete
      </ButtonWord>
    </div>
  );
}

export default CategoryAttributesModal;