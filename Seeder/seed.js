const mongoose = require('mongoose')
const Master_List = require("../models/master_list");

mongoose.connect('mongodb://localhost/list_db', {
  useNewUrlParser: true,
  useFindAndModify: false
})

const list_seed = [
  {
    title: "Connecting server to Local MongoDB Database",
    body: `Inside of `,
    category: "Back End",
    priority: "None",
    date_created: new Date(Date.now()),
    date_modified: new Date(Date.now())

  },
  {
    title: "Set up a Route Server Side",
    body: `Create a `,
    category: "Back End",
    priority: "None",
    date_created: new Date(Date.now()),
    date_modified: new Date(Date.now())
  },
  {
    title: `Setting up Server with Express`,
    body: `Create package.json`,
    category: "Back End",
    date_created: new Date(Date.now()),
    date_modified: new Date(Date.now())
  }
];

  Master_List.deleteMany({})
  .then(() => Master_List.insertMany(list_seed))
  .then(data => {
    console.log(data.length + ' records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
