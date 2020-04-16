const mongoose = require('mongoose')
const db = require("../models/index");

mongoose.connect('mongodb://localhost/thelist_db', {
  useNewUrlParser: true,
  useFindAndModify: false
})


const folder_seed = [
  {
    folder_name: "Back End",
    folder_id: "1",
    notes: [],
    date_created: new Date(Date.now() - 4),
    date_modified: new Date(Date.now())

  },
  {
    folder_name: "Front End",
    folder_id: "2",
    notes: ["5e79f0ece2ca992dcc6b8625", "5e79f284ad6e3a2e0872bfb8"],
    date_created: new Date(Date.now() - 4),
    date_modified: new Date(Date.now())

  },
  {
    folder_name: "Back End",
    folder_id: "3",
    notes: ["5e79f284ad6e3a2e0872bfb9", "5e79f284ad6e3a2e0872bfba"],
    date_created: new Date(Date.now() - 10),
    date_modified: new Date(Date.now())

  },
  {
    folder_name: "Stuff",
    folder_id: "4",
    notes: [],
    date_created: new Date(Date.now() - 3),
    date_modified: new Date(Date.now())

  },

];

db.Folders.deleteMany({})
  .then(() => db.Folders.insertMany(folder_seed))
  .then(data => {
    console.log(data.length + ' records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })