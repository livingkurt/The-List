// React
import React from "react";
import Section from '../Section/Section';
import ButtonSymbol from '../ButtonSymbol/ButtonSymbol';
import NoteTextEditor from '../NoteTextEditor/NoteTextEditor';
import NoteAttributeEditor from '../NoteAttributeEditor/NoteAttributeEditor';
import Title from '../Title/Title';
// Styles
import './note_editor.css'
import FlexContainer from "../FlexContainer/FlexContainer";
import BlockContainer from "../BlockContainer/BlockContainer";


function NoteEditor(props) {
  return (
    // <div style={{ display: props.show_hide }}>
    <Section styles={props.show_hide}>
      <FlexContainer styles={{ justifyContent: "space-between" }}>
        <Title >Create Note</Title>
        <ButtonSymbol styles={{ margin: "18px 0px 18px 18px" }} on_click_function={props.create_new_note} >+</ButtonSymbol>
      </FlexContainer>
      <Title styles={{ margin: "-30px 0px 0px 0px", fontSize: "16px" }}>Create a New Note Below</Title>
      <BlockContainer>
        <NoteTextEditor
          note_state={props.note_state}
          on_change_note_editor={props.on_change_note_editor} />
        <NoteAttributeEditor
          note_state={props.note_state}
          formatted_date_slash={props.formatted_date_slash}
          formatted_date_dash={props.formatted_date_dash}
          on_change_note_editor={props.on_change_note_editor}
          show_scheduling={props.show_scheduling}
          schedule_state={props.schedule_state} />
      </BlockContainer>
    </Section>
    // </div>
  );
}

export default NoteEditor;
