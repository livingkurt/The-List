import React, { useState, useEffect } from 'react';
import './App.css';
import Background from './components/Background/Background';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import Header from './components/Header/Header';
import ListItem from './components/ListItem/ListItem';
import ScrollContainer from './components/ScrollContainer/ScrollContainer.js';
import Title from './components/Title/Title';
import NoteContainer from './components/NoteContainer/NoteContainer';
import Note from './components/Note/Note';
import NoteAttributeEditor from './components/NoteAttributeEditor/NoteAttributeEditor';
import NoteTextEditor from './components/NoteTextEditor/NoteTextEditor';
import PriorityContainer from './components/PriorityContainer/PriorityContainer';
import TodoContainer from './components/TodoContainer/TodoContainer';
import FolderContainer from './components/FolderContainer/FolderContainer';
import FolderNoteContainer from './components/FolderNoteContainer/FolderNoteContainer';
import CategoryNoteContainer from './components/CategoryNoteContainer/CategoryNoteContainer';
import PriorityTitle from './components/PriorityTitle/PriorityTitle';
import FolderTitle from './components/FolderTitle/FolderTitle';
import CategoryTitle from './components/CategoryTitle/CategoryTitle';
import ButtonSymbol from './components/ButtonSymbol/ButtonSymbol';
import ButtonWord from './components/ButtonWord/ButtonWord';
import NoteEditor from './components/NoteEditor/NoteEditor';
// 
import API from "./utils/API";
// import styled from 'styled-components';

const App = () => {


  useEffect(() => {
    get_all_notes_by_list_id("Master");
    get_all_notes_by_list_id("Dump");
    get_all_notes();
    get_all_folders();
    get_all_categories();
  }, []);


  const [todo_master_state, set_todo_master_state] = useState([])
  const [todo_dump_state, set_todo_dump_state] = useState([])
  const [all_todo_state, set_all_todo_state] = useState([])
  const [todo_state, set_todo_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "",
    priority: "Low",
    category_id: "",
    scheduled: false,
    scheduled_date: "",
    scheduled_time: "",
    completed: false,
    date_created: "",
    date_modified: "",
  })
  const [note_state, set_note_state] = useState({
    title: "",
    body: "",
    folder_id: "",
    list_id: "",
    priority: "Dump",
    category_id: "",
    scheduled: false,
    scheduled_date: "",
    scheduled_time: "",
    completed: false,
    date_created: "",
    date_modified: "",
  })


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


  const [category_state, set_category_state] = useState([])


  const on_change_category_editor = async (e) => {
    const category_id = e.target.id
    const category_data = e.target.value
    const field_name = e.target.name
    // console.log(category_id, category_data, field_name)
    set_category_state({ ...category_state, [field_name]: category_data })
    try {
      const res = await API.get_category(category_id)

      const update_category = {
        ...res.data,
        [field_name]: category_data
      }
      console.log({ "update_category": update_category })
      API.update_category(category_id, update_category)
      // get_all_folders();
    }
    catch (err) {
      console.log({ "on_change_folder_editor": err });
    }

  }

  const get_all_notes_by_list_id = async (list_id) => {
    try {
      const res = await API.get_notes_by_list_id(list_id)
      if (list_id === "Dump") {
        set_todo_dump_state(res.data)
      }
      else if (list_id === "Master") {
        set_todo_master_state(res.data)
        // let category_names = []
        // let categories = []
        // let category_views = []
        // res.data.map(note => {
        //   console.log({ "note": note })
        //   categories.push({ "category_name": note.category, "priority": note.priority })
        //   category_names = [...new Set(category_names)]
        //   // categories.push({ ...categories, "category_name": note.category, "priority": note.priority })
        //   category_names = [...category_names, note.category]
        //   category_names = [...new Set(category_names)]
        //   category_views = { ...category_views, [note.category]: "0px" }


        // })
        // console.log(category_views)
        // console.log({ "categories": categories })
        // set_category_state(categories)
        // set_category_view_state(category_views)

      }
      return res;
    }
    catch (err) {
      console.log(err);
    }
  };

  const get_all_notes = async () => {
    try {
      const res = await API.get_all_notes()
      set_all_todo_state(res.data)
      // res.data.filter(note => {
      //   note.category
      // })
    }
    catch (err) {
      console.log(err);
    }
  };

  const create_empty_list_item = async (list_id) => {
    console.log({ "list_id": list_id })
    try {
      const res = await API.get_notes_by_list_id(list_id)
      const new_data = [...res.data, { ...todo_state, list_id: list_id }]
      const response = await API.post_note({ ...note_state, list_id: list_id })
      if (list_id === "Dump") {
        set_todo_dump_state(new_data)
        set_todo_dump_state([response.data, ...todo_dump_state])
      }
      else if (list_id === "Master") {
        set_todo_master_state(new_data)
        set_todo_master_state([response.data, ...todo_master_state])
      }
      get_all_notes_by_list_id(list_id);
    }
    catch (err) {
      console.log(err);
    }
  };

  const create_new_note = async () => {
    try {
      const res = await API.post_note(note_state)
      get_all_notes_by_list_id("Master");
      get_all_notes_by_list_id("Dump");
      set_note_state({
        title: "",
        body: "",
        folder_id: "",
        list_id: "Dump",
        priority: "Low",
        category_id: "5e8f7c48d4e1a46221ddb732",
        scheduled: false,
        scheduled_date: "",
        scheduled_time: "",
        completed: false,
        date_created: "",
        date_modified: "",
      })
      document.querySelector(".title_field").defaultValue = ""
      document.querySelector(".text_field").defaultValue = ""
      document.querySelector(".priority_input").defaultValue = "Low"
      document.querySelector(".list_id_input").defaultValue = "Dump"
      document.querySelector(".folder_id_input_2").defaultValue = ""
      document.querySelector("#checkbox_input").checked = false
    }
    catch (err) {
      console.log(err);
    }
  }

  const [sidebar_state, set_sidebar_state] = useState(false)

  const sidebar_show_hide = () => {
    if (sidebar_state) {
      document.querySelector(".note_archive").classList.remove("open");
      set_sidebar_state(false)
    }
    else {
      document.querySelector(".note_archive").classList.add("open");
      set_sidebar_state(true)
    }
  }

  const on_change_note_editor = (e) => {
    if (e.target === undefined) {
      set_note_state({ ...note_state, scheduled: e })
    }
    else {
      const todo_data = e.target.value
      const field_name = e.target.name
      set_note_state({ ...note_state, [field_name]: todo_data })
    }

  }

  const [schedule_state, set_schedule_state] = useState(false)

  const show_scheduling = () => {
    if (schedule_state === false) {
      set_schedule_state(true)
      on_change_note_editor(true)
    }
    else {
      set_schedule_state(false)
      on_change_note_editor(false)
    }
  }


  const [folders_state, set_folders_state] = useState([])


  const create_new_folder = async () => {
    const blank_folder = {
      folder_name: "",
      folder_id: "",
      notes: [],
      folders: [],
      hidden: true
    }
    try {
      const res = await API.post_folder(blank_folder)
      console.log(res.data)
      get_all_folders();
    }
    catch (err) {
      console.log(err);
    }
  };

  const get_all_folders = async () => {
    try {
      const res = await API.get_all_folders()
      console.log({ "get_all_folders": res.data })
      set_folders_state(res.data)
      let array = []
      res.data.map(folder => {
        // console.log({ "folder": folder._id })
        let id = folder._id
        array = { ...array, [id]: "0px" }

      })
      set_folder_view_state(array)
    }
    catch (err) {
      console.log(err);
    }
  };

  const [categories_state, set_categories_state] = useState([])

  const get_all_categories = async () => {
    try {
      const res = await API.get_all_categories()
      console.log({ "get_all_categories": res.data })
      set_categories_state(res.data)
      let array = []
      res.data.map(folder => {
        // console.log({ "folder": folder._id })
        let id = folder._id
        array = { ...array, [id]: "100%" }

      })
      set_category_view_state(array)
    }
    catch (err) {
      console.log(err);
    }
  };


  const create_new_category = async () => {
    const blank_category = {
      category_name: "",
      category_id: "",
      notes: [],
      priority: "Low",
      hidden: false
    }
    try {
      const res = await API.post_category(blank_category)
      console.log({ "post_category": res.data })
      get_all_categories();
    }
    catch (err) {
      console.log(err);
    }
  };



  const [priority_state, set_priority_state] = useState(
    {
      master_high: "100%",
      master_medium: "100%",
      master_low: "100%",
      dump_high: "100%",
      dump_medium: "100%",
      dump_low: "100%",
      priorites: ["High", "Medium", "Low"]
    }
  )

  const show_hide_by_priority = (list_id, priority) => {
    console.log({ "show_hide_by_priority": priority })

    priority = priority.toLowerCase()
    let field_name = list_id + "_" + priority
    if (priority_state[field_name] === "100%") {
      set_priority_state({ ...priority_state, [field_name]: "0px" })
    }
    else if (priority_state[field_name] === "0px") {
      set_priority_state({ ...priority_state, [field_name]: "100%" })
    }
  }


  const [folder_view_state, set_folder_view_state] = useState([])

  const show_hide_by_folder = (folder_id) => {

    if (folder_view_state[folder_id] === "100%") {
      set_folder_view_state({ ...folder_view_state, [folder_id]: "0px" })
    }
    else if (folder_view_state[folder_id] === "0px") {
      set_folder_view_state({ ...folder_view_state, [folder_id]: "100%" })
    }
  }


  const [category_view_state, set_category_view_state] = useState([])

  const show_hide_by_category = (category_id) => {

    if (category_view_state[category_id] === "100%") {
      set_category_view_state({ ...category_view_state, [category_id]: "0px" })
    }
    else if (category_view_state[category_id] === "0px") {
      set_category_view_state({ ...category_view_state, [category_id]: "100%" })
    }
  }

  const [folder_state, set_folder_state] = useState({})

  const on_change_folder_editor = async (e) => {
    const folder_id = e.target.id
    const folder_data = e.target.value
    const field_name = e.target.name
    console.log(folder_id, folder_data, field_name)
    set_folder_state({ ...folder_state, [field_name]: folder_data })
    try {
      const res = await API.get_folder(folder_id)

      const update_folder = {
        ...res.data,
        [field_name]: folder_data
      }
      console.log({ "update_folder": update_folder })
      API.update_folder(folder_id, update_folder)
      // get_all_folders();
    }
    catch (err) {
      console.log({ "on_change_folder_editor": err });
    }

  }
  const [create_note_state, set_create_note_state] = useState("none")
  // const [new_note_button_state, set_new_note_button_state] = useState("New Note")
  const [show_hide_create_note_state, set_show_hide_create_note_state] = useState({
    name: "Create New Note",
    display: "none"
  })
  const [show_hide_master_state, set_show_hide_master_state] = useState({
    name: "Hide Todo Master",
    display: "block"
  })
  const [show_hide_dump_state, set_show_hide_dump_state] = useState({
    name: "Hide Todo Dump",
    display: "block"
  })

  const show_hide_master = () => {

    if (show_hide_master_state.display === "none") {
      set_show_hide_master_state({ ...show_hide_master_state, name: "Hide Todo Master", display: "block" })
    }
    else if (show_hide_master_state.display === "block") {
      set_show_hide_master_state({ ...show_hide_master_state, name: "Show Todo Master", display: "none" })
    }
  }

  const show_hide_dump = () => {

    if (show_hide_dump_state.display === "none") {
      set_show_hide_dump_state({ ...show_hide_dump_state, name: "Hide Todo Dump", display: "block" })
    }
    else if (show_hide_dump_state.display === "block") {
      set_show_hide_dump_state({ ...show_hide_dump_state, name: "Show Todo Dump", display: "none" })
    }
  }

  const show_create_note_container = () => {
    if (show_hide_create_note_state.display === "none") {
      // set_create_note_state("block")
      set_show_hide_create_note_state({ ...show_hide_create_note_state, name: "Hide New Note", display: "block" })
      // set_new_note_button_state("Discard Changes")
      set_note_state({
        title: "",
        body: "",
        folder_id: "",
        list_id: "Dump",
        priority: "Low",
        category_id: "",
        scheduled: false,
        scheduled_date: "",
        scheduled_time: "",
        completed: false,
        date_created: "",
        date_modified: "",
      })
      document.querySelector(".title_field").defaultValue = ""
      document.querySelector(".text_field").defaultValue = ""
      document.querySelector(".priority_input").defaultValue = "Low"
      document.querySelector(".list_id_input").defaultValue = "Dump"
      document.querySelector(".folder_id_input").defaultValue = ""
      document.querySelector("#checkbox_input").checked = false
    }
    else if (show_hide_create_note_state.display === "block") {
      set_show_hide_create_note_state({ ...show_hide_create_note_state, name: "Create New Note", display: "none" })
      // set_create_note_state("none")
      // set_new_note_button_state("New Note")
    }
  }


  const [folder_modal_state, set_folder_modal_state] = useState([])

  const show_hide_folder_modal = (folder_id) => {

    if (folder_modal_state[folder_id] === "block") {
      set_folder_modal_state({ ...folder_modal_state, [folder_id]: "none" })
    }
    else if (folder_modal_state[folder_id] === "none") {
      set_folder_modal_state({ ...folder_modal_state, [folder_id]: "block" })
    }
  }



  return (
    <div >
      <Background>
        <Header sidebar_show_hide={sidebar_show_hide}>
          <Title margin="0px">TheList</Title>
          {/* <ButtonWord margin="auto 20px" padding="20px" on_click_function={sidebar_show_hide} className="nav_button"><i className="fas fa-bars"></i></ButtonWord> */}
          <button onClick={sidebar_show_hide} className="nav_button"><i className="fas fa-bars"></i></button>

          <ButtonWord margin="20px" on_click_function={show_create_note_container} >{show_hide_create_note_state.name}</ButtonWord>
          <ButtonWord margin="20px" on_click_function={show_hide_master} >{show_hide_master_state.name}</ButtonWord>
          <ButtonWord margin="20px" on_click_function={show_hide_dump} >{show_hide_dump_state.name}</ButtonWord>
        </Header>
        <Container>

          <NoteContainer >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title >Notes</Title>

              <ButtonWord on_click_function={create_new_folder} >New Folder</ButtonWord>
            </div>
            <ScrollContainer height="73vh">

              {folders_state.map((folder, index) => {
                console.log(folder.folders)
                if (folder.folders !== []) {
                  return <FolderContainer index={folder._id} id={folder._id} key={folder._id}>
                    <FolderTitle
                      show_hide_by_folder={show_hide_by_folder}
                      folder={folder}
                      get_all_folders={get_all_folders}
                      show_hide_folder_modal={show_hide_folder_modal}
                      on_change_folder_editor={on_change_folder_editor}
                      fontSize="16px"
                      folder_id={folder._id}
                      num_notes={folder.notes.length}
                      margin="10px">{folder.folder_name}</FolderTitle>
                    <FolderNoteContainer height={folder_view_state[folder._id]}>
                      {folders_state.map((folder, index) => {

                        // if (note.folder_id === folder._id) {
                        // return <Note show_create_note_container={show_create_note_container} get_all_notes={get_all_notes} index={note._id} id={note._id} key={note._id}>{note.title}</Note>
                        // }
                      })}
                      {all_todo_state.map((note, index) => {
                        if (note.folder_id === folder._id) {
                          return <Note
                            show_create_note_container={show_create_note_container}
                            get_all_notes={get_all_notes}
                            index={note._id}
                            id={note._id}
                            key={note._id}>{note.title}</Note>
                        }
                      })}

                    </FolderNoteContainer>
                  </FolderContainer>
                }
              })}
            </ScrollContainer>
          </NoteContainer>
          <NoteEditor show_hide={show_hide_create_note_state.display}
            create_new_note={create_new_note}
            note_state={note_state}
            formatted_date_slash={format_date_display(new Date())}
            formatted_date_dash={format_date_element(new Date())}
            on_change_note_editor={on_change_note_editor}
            show_scheduling={show_scheduling}
            schedule_state={schedule_state} />
          <Section show_hide={show_hide_master_state.display}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>Master Todo List:</Title>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <ButtonWord margin="20px" on_click_function={create_new_category} >Create Category</ButtonWord>
                <ButtonSymbol margin="18px 0px 18px 18px" on_click_function={create_empty_list_item} list_id="Master" >+</ButtonSymbol>
              </div>
            </div>
            <Title margin="-30px 0px 0px 0px" fontSize="16px">Today {format_date_display(new Date())}</Title>
            <ScrollContainer height="73vh">
              {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="18px" on_click_function={show_hide_by_priority} list_id="master" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer className={"master_" + priority.toLowerCase()} height={priority_state["master_" + priority.toLowerCase()]}>
                    {categories_state.map((category, index) => {
                      console.log({ "category": category })
                      if (category.priority === priority) {
                        return <FolderContainer index={category._id} id={category._id} key={category._id}>
                          <CategoryTitle
                            show_hide_by_category={show_hide_by_category}
                            get_all_notes_by_list_id={get_all_notes_by_list_id}
                            fontSize="16px"
                            category_id={category._id}
                            on_change_category_editor={on_change_category_editor}
                            margin="10px">{category.category_name}</CategoryTitle>
                          <CategoryNoteContainer height={category_view_state[category._id]}>
                            {todo_master_state.map((note, index) => {
                              console.log({ "note.category_id": note.category_id, "category._id": category._id })
                              if (note.category_id === category._id) {
                                return <ListItem
                                  category_state={category_state}
                                  show_create_note_container={show_create_note_container}
                                  get_all_notes_by_list_id={get_all_notes_by_list_id}
                                  index={note._id}
                                  id={note._id}
                                  key={note._id}>{note.title}</ListItem>
                              }

                            })}

                          </CategoryNoteContainer>
                        </FolderContainer>
                        // }

                      }
                      // {
                      //   todo_master_state.map((note, index) => {
                      //     // if (note.category_id !== category._id) {
                      //     return <ListItem
                      //       category_state={category_state}
                      //       show_create_note_container={show_create_note_container}
                      //       get_all_notes_by_list_id={get_all_notes_by_list_id}
                      //       index={note._id}
                      //       id={note._id}
                      //       key={note._id}>{note.title}</ListItem>
                      //     // }

                      //   })
                      // }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })}
              {/* {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="16px" on_click_function={show_hide_by_priority} list_id="master" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer className={"master_" + priority.toLowerCase()} height={priority_state["master_" + priority.toLowerCase()]}>
                    {todo_master_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <ListItem
                          folders_state={folders_state}
                          show_create_note_container={show_create_note_container}
                          get_all_notes_by_list_id={get_all_notes_by_list_id}
                          index={note._id}
                          id={note._id}
                          key={note._id}>{note.title}</ListItem>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })} */}
              {/* {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="16px" on_click_function={show_hide_by_priority} list_id="master" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer className={"master_" + priority.toLowerCase()} height={priority_state["master_" + priority.toLowerCase()]}>
                    {todo_master_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <ListItem
                          folders_state={folders_state}
                          show_create_note_container={show_create_note_container}
                          get_all_notes_by_list_id={get_all_notes_by_list_id}
                          index={note._id}
                          id={note._id}
                          key={note._id}>{note.title}</ListItem>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })} */}
            </ScrollContainer>
          </Section>
          <Section show_hide={show_hide_dump_state.display}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title>Todo Dump</Title>
              <ButtonSymbol margin="18px 0px 18px 18px" on_click_function={create_empty_list_item} list_id="Dump" >+</ButtonSymbol>
            </div>
            <Title margin="-30px 0px 0px 0px" fontSize="16px">Get your Ideas Down Fast</Title>
            <ScrollContainer height="73vh">
              {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle fontSize="16px" on_click_function={show_hide_by_priority} list_id="Dump" priority={priority} border="1px solid silver" margin="10px">{priority} Priority</PriorityTitle>
                  <TodoContainer className={"dump_" + priority.toLowerCase()} height={priority_state["dump_" + priority.toLowerCase()]}>
                    {todo_dump_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <ListItem
                          folders_state={folders_state}
                          show_create_note_container={show_create_note_container}
                          get_all_notes_by_list_id={get_all_notes_by_list_id}
                          index={note._id}
                          id={note._id}
                          key={note._id}>{note.title}</ListItem>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })}
            </ScrollContainer>
          </Section>
        </Container>
        <Container>
          <Section width="100%">
            <Title>Calender</Title>
          </Section>
        </Container>

      </Background >
    </div >
  );
}

export default App;


