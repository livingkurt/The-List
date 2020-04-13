import React, { useState, useEffect } from 'react';
import './App.css';
// Container Components
import { Background, FlexContainer, Container, Section, Header, ScrollContainer } from './components/ContainerComponents';
// Note Components
import { NoteContainer, Note, NoteEditor } from './components/NoteComponents/'
// Todo Components
import { Todo, TodoContainer } from './components/TodoComponents/'
// Folder Components
import { FolderTitle, FolderContainer, FolderNoteContainer } from './components/FolderComponents/'
// Category Components
import { CategoryTitle, CategoryNoteContainer, CategoryContainer } from './components/CategoryComponents/'
// Utility Components
import { ButtonSymbol, ButtonWord, Title } from './components/UtilityComponents/'
// Calender Components
import { CalenderContainer, CalenderColumns, CalenderRows } from './components/CalenderComponents/'
// Priority Components
import { PriorityTitle, PriorityContainer } from './components/PriorityComponents';
// Utils
import { API } from "./utils";
import { format_date_element, format_date_display } from "./utils/HelperFunctions";

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
  const [note_state, set_note_state] = useState({
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


  const [category_state, set_category_state] = useState([])


  // const on_change_category_editor = async (e) => {
  //   const category_id = e.target.id
  //   const category_data = e.target.value
  //   const field_name = e.target.name
  //   set_category_state({ ...category_state, [field_name]: category_data })
  //   try {
  //     const res = await API.get_category(category_id)
  //     const update_category = {
  //       ...res.data,
  //       [field_name]: category_data
  //     }
  //     console.log({ "update_category": update_category })
  //     API.update_category(category_id, update_category)
  //   }
  //   catch (err) {
  //     console.log({ "on_change_folder_editor": err });
  //   }

  // }

  const get_all_notes_by_list_id = async (list_id) => {
    try {
      const res = await API.get_notes_by_list_id(list_id)
      if (list_id === "Dump") {
        set_todo_dump_state(res.data)
      }
      else if (list_id === "Master") {
        set_todo_master_state(res.data)
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

  const create_empty_todo = async (list_id) => {
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
      get_all_notes_by_list_id("Master");
      get_all_notes_by_list_id("Dump");
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
        if (folder.hidden === false) {
          array = { ...array, [id]: "100%" }
        }
        else if (folder.hidden === true) {
          array = { ...array, [id]: "0px" }
        }

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
      const category = res.data
      console.log({ "get_all_categories": category })
      set_categories_state(category)
      let array = []
      category.map(category => {
        // console.log({ "category": category._id })
        let id = category._id
        if (category.hidden === false) {
          array = { ...array, [id]: "100%" }
        }
        else if (category.hidden === true) {
          array = { ...array, [id]: "0px" }
        }


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

  const show_hide_by_priority = (id, priority) => {
    console.log({ "show_hide_by_priority": priority })
    priority = priority.toLowerCase()
    let field_name = id + "_" + priority
    if (priority_state[field_name] === "100%") {
      set_priority_state({ ...priority_state, [field_name]: "0px" })
    }
    else if (priority_state[field_name] === "0px") {
      set_priority_state({ ...priority_state, [field_name]: "100%" })
    }

  }


  const [folder_view_state, set_folder_view_state] = useState([])

  const show_hide_by_folder = async (folder_id) => {
    let update_folder = {}
    try {
      const res = await API.get_folder(folder_id)
      // console.log({ "update_folder": res.data })
      const folder = res.data

      if (folder.hidden === false) {
        set_folder_state({ ...folder, hidden: true })
        update_folder = {
          ...folder,
          hidden: true
        }
        set_folder_view_state("0px")
        set_folder_view_state({ ...folder_view_state, [folder_id]: "0px" })
      }
      else if (folder.hidden === true) {
        set_folder_state({ ...folder, hidden: false })
        update_folder = {
          ...folder,
          hidden: false
        }
        set_folder_view_state("100%")
        set_folder_view_state({ ...folder_view_state, [folder_id]: "100%" })
      }
      const resp = await API.update_folder(folder_id, update_folder)
      get_all_notes_by_list_id("Dump")
      get_all_notes_by_list_id("Master")
      API.update_folder(folder_id, update_folder)
      get_all_notes_by_list_id("Dump")
      get_all_notes_by_list_id("Master")
    }
    catch (err) {
      console.log({ "save_scheduling": err });
    }
  }


  const [category_view_state, set_category_view_state] = useState([])

  const show_hide_by_category = async (category_id) => {
    let update_category = {}
    try {
      const res = await API.get_category(category_id)
      // console.log({ "update_category": res.data })
      const category = res.data

      if (category.hidden === false) {
        set_category_state({ ...category, hidden: true })
        update_category = {
          ...category,
          hidden: true
        }
        set_category_view_state("0px")
        set_category_view_state({ ...category_view_state, [category_id]: "0px" })
      }
      else if (category.hidden === true) {
        set_category_state({ ...category, hidden: false })
        update_category = {
          ...category,
          hidden: false
        }
        set_category_view_state("100%")
        set_category_view_state({ ...category_view_state, [category_id]: "100%" })
      }
      const resp = await API.update_category(category_id, update_category)
      get_all_notes_by_list_id("Dump")
      get_all_notes_by_list_id("Master")
      API.update_category(category_id, update_category)
      get_all_notes_by_list_id("Dump")
      get_all_notes_by_list_id("Master")
    }
    catch (err) {
      console.log({ "save_scheduling": err });
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

  const [show_hide_notes_state, set_show_hide_notes_state] = useState({
    name: "Show Notes",
    display: "block"
  })

  const [show_hide_calender_state, set_show_hide_calender_state] = useState({
    name: "Hide Calender",
    display: "block"
  })

  const show_hide_calender = () => {
    console.log("show_hide_calender")

    if (show_hide_calender_state.display === "none") {
      set_show_hide_calender_state({ ...show_hide_calender_state, name: "Hide Todo Calender", display: "block" })
    }
    else if (show_hide_calender_state.display === "block") {
      set_show_hide_calender_state({ ...show_hide_calender_state, name: "Show Todo Calender", display: "none" })
    }
  }

  const show_hide_master = () => {
    console.log("show_hide_master")

    if (show_hide_master_state.display === "none") {
      set_show_hide_master_state({ ...show_hide_master_state, name: "Hide Todo Master", display: "block" })
    }
    else if (show_hide_master_state.display === "block") {
      set_show_hide_master_state({ ...show_hide_master_state, name: "Show Todo Master", display: "none" })
    }
  }


  const [sidebar_state, set_sidebar_state] = useState(false)

  const show_hide_notes = () => {
    if (sidebar_state) {
      document.querySelector(".note_container").classList.remove("open");
      set_sidebar_state(false)
      set_show_hide_notes_state({ ...show_hide_notes_state, name: "Show Notes", display: "none" })

    }
    else {
      document.querySelector(".note_container").classList.add("open");
      set_sidebar_state(true)
      set_show_hide_notes_state({ ...show_hide_notes_state, name: "Hide Notes", display: "block" })
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

  const change_date = (id) => {

    if (id === "forward") {
      console.log("Going Forward in Time")
    }
    else if (id === "backward") {
      console.log("Going Backward in Time")

    }
  }

  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



  return (
    <div >
      <Background>
        <Header show_hide_notes={show_hide_notes}>
          <Title styles={{ margin: "0px" }}>TheList</Title>
          <ButtonWord styles={{ margin: "20px" }} on_click_function={show_hide_notes} >{show_hide_notes_state.name}</ButtonWord>
          <ButtonWord styles={{ margin: "20px" }} on_click_function={show_create_note_container} >{show_hide_create_note_state.name}</ButtonWord>
          <ButtonWord styles={{ margin: "20px" }} on_click_function={show_hide_master} >{show_hide_master_state.name}</ButtonWord>
          <ButtonWord styles={{ margin: "20px" }} on_click_function={show_hide_dump} >{show_hide_dump_state.name}</ButtonWord>
          <ButtonWord styles={{ margin: "20px" }} on_click_function={show_hide_calender} >{show_hide_calender_state.name}</ButtonWord>
        </Header>
        <Container>
          <NoteContainer >
            <FlexContainer styles={{ justifyContent: "space-between" }}>
              <Title >Notes</Title>
              <ButtonWord on_click_function={create_new_folder} >New Folder</ButtonWord>
            </FlexContainer>
            <ScrollContainer styles={{ height: "85vh" }}>

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
                      folder_id={folder._id}
                      num_notes={folder.notes.length}
                    >{folder.folder_name}</FolderTitle>
                    <FolderNoteContainer height={folder_view_state[folder._id]}>
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
          <NoteEditor show_hide={{ display: show_hide_create_note_state.display }}
            create_new_note={create_new_note}
            note_state={note_state}
            formatted_date_slash={format_date_display(new Date())}
            formatted_date_dash={format_date_element(new Date())}
            on_change_note_editor={on_change_note_editor}
            show_scheduling={show_scheduling}
            schedule_state={schedule_state} />
          <Section styles={{ display: show_hide_master_state.display }}>
            <FlexContainer styles={{ justifyContent: "space-between" }}>
              <Title>Master Todo List:</Title>
              <FlexContainer styles={{ flexDirection: "row" }}>
                <ButtonWord styles={{ margin: "20px" }} on_click_function={create_new_category} >Create Category</ButtonWord>
                <ButtonSymbol styles={{ webkitTransform: "rotate(90deg)", margin: "18px 0px 18px 18px" }} id="backward" on_click_function={change_date} ><i className="fas fa-sort-up"></i></ButtonSymbol>
                <ButtonSymbol styles={{ webkitTransform: "rotate(-90deg)", margin: "18px 0px 18px 18px" }} id="forward" on_click_function={change_date} ><i className="fas fa-sort-up"></i></ButtonSymbol>
                <ButtonSymbol styles={{ margin: "18px 0px 18px 18px" }} on_click_function={create_empty_todo} id="Master" >+</ButtonSymbol>
              </FlexContainer>
            </FlexContainer>
            <Title styles={{ margin: "-30px 0px 0px 0px", fontSize: "16px" }}>Today {format_date_display(new Date())}</Title>
            <ScrollContainer >
              {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle styles={{ fontSize: "18px", margin: "10px" }} on_click_function={show_hide_by_priority} id="master" priority={priority} >{priority} Priority</PriorityTitle>
                  <TodoContainer className={"master_" + priority.toLowerCase()} styles={{ height: priority_state["master_" + priority.toLowerCase()] }}>
                    {categories_state.map((category, index) => {
                      // console.log({ "category": category })
                      if (category.priority === priority) {
                        return <CategoryContainer index={category._id} id={category._id} key={category._id}>
                          <CategoryTitle
                            show_hide_by_category={show_hide_by_category}
                            get_all_notes_by_list_id={get_all_notes_by_list_id}
                            get_all_notes_by_list_id={get_all_notes_by_list_id}
                            category={category}
                            category_id={category._id}
                          // on_change_category_editor={on_change_category_editor}
                          >{category.category_name}</CategoryTitle>
                          <CategoryNoteContainer
                            height={category_view_state[category._id]}
                            hidden={category.hidden}
                            get_all_notes_by_list_id={get_all_notes_by_list_id}
                            category={category}
                          >
                            {todo_master_state.map((note, index) => {
                              if (note.category_id === category._id) {
                                return <Todo
                                  category_state={category_state}
                                  show_create_note_container={show_create_note_container}
                                  get_all_notes_by_list_id={get_all_notes_by_list_id}
                                  index={note._id}
                                  id={note._id}
                                  key={note._id}>{note.title}</Todo>
                              }
                            })}

                          </CategoryNoteContainer>
                        </CategoryContainer>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })}
            </ScrollContainer>
          </Section>
          <Section styles={{ display: show_hide_dump_state.display }}>
            <FlexContainer styles={{ justifyContent: "space-between" }}>
              <Title>Todo Dump</Title>
              <ButtonSymbol styles={{ margin: "18px 0px 18px 18px" }} on_click_function={create_empty_todo} id="Dump" >+</ButtonSymbol>
            </FlexContainer>
            <Title styles={{ margin: "-30px 0px 0px 0px", fontSize: "16px" }}>Get your Ideas Down Fast</Title>
            <ScrollContainer >
              {priority_state.priorites.map((priority, index) => {
                return <PriorityContainer key={index}>
                  <PriorityTitle styles={{ fontSize: "18px", margin: "10px" }} on_click_function={show_hide_by_priority} id="dump" priority={priority} >{priority} Priority</PriorityTitle>
                  <TodoContainer className={"dump_" + priority.toLowerCase()} styles={{ height: priority_state["dump_" + priority.toLowerCase()] }}>
                    {todo_dump_state.map((note, index) => {
                      if (note.priority === priority) {
                        return <Todo
                          folders_state={folders_state}
                          show_create_note_container={show_create_note_container}
                          get_all_notes_by_list_id={get_all_notes_by_list_id}
                          index={note._id}
                          id={note._id}
                          key={note._id}>{note.title}</Todo>
                      }
                    })}
                  </TodoContainer>
                </PriorityContainer>
              })}
            </ScrollContainer>
          </Section>
        </Container>
        <Container>
          <Section styles={{ display: show_hide_calender_state.display }} >
            <FlexContainer styles={{ flexDirection: "column", width: "100%" }}>
              <Title>Calender</Title>
              <Title styles={{ margin: "0px", fontSize: "20px" }}>Today {format_date_display(new Date())}</Title>
            </FlexContainer>

            <FlexContainer styles={{ justifyContent: "space-around", marginTop: "10px" }}>
              {days.map((day, index) => {
                return <Title>{day}</Title>
              })}
            </FlexContainer>
            <CalenderContainer styles={{ margin: "15px 0px 0px 0px" }}>
              {days.map((day, index) => {
                return <CalenderColumns >
                  {/* {day} */}
                  {hours.map((hour, index) => {
                    return <CalenderRows>
                      {hour}:00
                    </CalenderRows>
                  })}
                </CalenderColumns>
              })}
            </CalenderContainer>
          </Section>
        </Container>

      </Background >
    </div >
  );
}

export default App;


