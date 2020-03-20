const mongoose = require('mongoose');
const { Schema } = mongoose;

const master_list_schema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: String,
  category: String,
  priority: String,
  date_created: {
    type: Date,
    default: Date.now
  },
  date_modified: Date,
});

const Master_List = mongoose.model('Master_List', master_list_schema);

module.exports = Master_List;