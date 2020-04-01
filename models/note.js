const mongoose = require('mongoose');
const { Schema } = mongoose;

const note_schema = new Schema({
  title: {
    type: String,
    // required: true
  },
  body: String,
  folder_id: String,
  list_id: {
    type: String,
    default: "dump"
  },
  priority: {
    type: String,
    default: "Low"
  },
  scheduled: {
    type: Boolean,
    default: false
  },
  scheduled_date: Date,
  scheduled_time: Date,
  completed: {
    type: Boolean,
    default: false
  },
  date_created: {
    type: Date,
    default: new Date().setDate(new Date().getDate())
  },
  date_modified: Date,
});

const Note = mongoose.model('Note', note_schema);

module.exports = Note;