const mongoose = require('mongoose');
const { Schema } = mongoose;

const category_schema = new Schema({
  category_name: {
    type: String,
  },
  priority: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "notes"
    }
  ],
  hidden: Boolean,
  date_created: {
    type: Date,
    default: new Date().setDate(new Date().getDate())
  },
  date_modified: Date,
});

const Category = mongoose.model('Category', category_schema);

module.exports = Category;