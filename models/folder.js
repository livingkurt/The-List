const mongoose = require('mongoose');
const { Schema } = mongoose;

const folder_schema = new Schema({
  folder_name: {
    type: String,
    required: true
  },
  folder_id: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "notes"
    }
  ],
  date_created: {
    type: Date,
    default: new Date().setDate(new Date().getDate())
  },
  date_modified: Date,
});

const Folder = mongoose.model('Folder', folder_schema);

module.exports = Folder;