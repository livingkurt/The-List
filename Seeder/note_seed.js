const mongoose = require('mongoose')
const db = require("../models/index");

mongoose.connect('mongodb://localhost/thelist_db', {
  useNewUrlParser: true,
  useFindAndModify: false
})

const note_seed = [
  {
    title: "Start Learning Java First",
    body: `It seems to be the majority of jobs that are avaiable`,
    folder_id: "1",
    list_id: "master",
    priority: 5,
    scheduled: true,
    scheduled_date_time: "2020-03-24T11:37:16.233Z",
    date_created: new Date(Date.now() - 3),
    date_modified: new Date(Date.now())

  },
  {
    title: "What coding languages you need to learn ",
    body: `Java
    Python
    C++
    PHP`,
    folder_id: "1",
    list_id: "dump",
    priority: 3,
    scheduled: false,
    scheduled_date_time: "2020-05-02T11:37:16.233Z",
    date_created: new Date(Date.now() - 12),
    date_modified: new Date(Date.now())
  },
  {
    title: `Setting up Server with Express`,
    body: `Create package.json`,
    folder_id: "1",
    list_id: "master",
    priority: 1,
    scheduled: true,
    scheduled_date_time: "2020-06-10T11:37:16.233Z",
    date_created: new Date(Date.now() - 5),
    date_modified: new Date(Date.now())
  },
  {
    title: `Setting up Server with Express`,
    body: `Create package.json`,
    folder_id: "1",
    list_id: "dump",
    priority: 2,
    scheduled: false,
    scheduled_date_time: "2020-08-20T11:37:16.233Z",
    date_created: new Date(Date.now() - 1),
    date_modified: new Date(Date.now())
  }

];

db.Notes.deleteMany({})
  .then(() => db.Notes.insertMany(note_seed))
  .then(data => {
    console.log(data.length + ' records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
