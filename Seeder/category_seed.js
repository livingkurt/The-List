const mongoose = require('mongoose')
const db = require("../models/index");

mongoose.connect('mongodb://localhost/thelist_db', {
  useNewUrlParser: true,
  useFindAndModify: false
})


const category_seed = [
  {
    category_name: "Daily",
    category_id: "1",
    priority: "High",
    hidden: false,
    notes: [],
    date_created: new Date(Date.now()),
    date_modified: new Date(Date.now())
  },
];

db.Categories.deleteMany({})
  .then(() => db.Categories.insertMany(category_seed))
  .then(data => {
    console.log(data.length + ' records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })