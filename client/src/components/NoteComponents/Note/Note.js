// React
import React, { useState, useEffect } from "react";
// Components
import { ButtonSymbol } from '../../UtilityComponents';
import { BlockContainer } from "../../ContainerComponents";
import { TodoModal } from '../../TodoComponents';
// Styles
import './note.css'
// Utils
import { API } from "../../../utils";



const Note = (props) => {

  const [modal_state, set_modal_state] = useState("none")
  const [note_state, set_note_state] = useState(props.note)

  useEffect(() => {
    console.log("Reload")
  }, [note_state])

  const show_modal = async (e) => {
    const todo_id = note_state._id
    console.log(todo_id)
    if (modal_state === "none") {
      set_modal_state("flex")
    }
    else {
      set_modal_state("none")
    }
  }



  const on_change_note_editor = async (e) => {
    const note_id = note_state._id
    const note_data = e.target.value
    const field_name = e.target.name
    console.log({ "note_id": note_id, "note_data": note_data, "field_name": field_name })
    try {
      const update_note = {
        ...note_state,
        [field_name]: note_data
      }
      console.log({ "update_note": update_note })
      const res = await API.update_note(note_id, update_note)
      set_note_state({ ...note_state, [field_name]: note_data })
      // set_note_state(res.data)
    }
    catch (err) {
      console.log({ "on_change_note_editor": err });
    }

  }


  return (
    <div className="note zoom">
      {/* <Checkbox /> */}
      <BlockContainer styles={{ fontSize: "20px", color: "silver", transform: "rotate(270deg)", paddingBottom: "10px" }}>
        <i className="fas fa-sort-up"></i>
      </BlockContainer>
      <input
        defaultValue={note_state.title}
        className="note_input"
        placeholder="Title"
        id={note_state._id}
        name="title"
        onBlur={e => on_change_note_editor(e)} />
      <ButtonSymbol styles={{ margin: "0px", padding: "0px" }} on_click_function={show_modal} ><i className="fas fa-bars"></i></ButtonSymbol>
      {/* <ButtonSymbol margin="0px" padding="0px" on_click_function={show_modal} ><i className="fas fa-sort-up"></i></ButtonSymbol> */}
      <TodoModal id={note_state._id} show_modal={show_modal} note_state={note_state} show_modal_state={modal_state} get_all_notes_by_list_id={props.get_all_notes_by_list_id}></TodoModal>
    </div>
  );
}

export default Note;
