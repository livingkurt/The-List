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
  priority: Number,
  scheduled: {
    type: Boolean,
    default: false
  },
  scheduled_date_time: Date,
  date_created: {
    type: Date,
    default: Date.now
  },
  date_modified: Date,
});

const Note = mongoose.model('Note', note_schema);

module.exports = Note;