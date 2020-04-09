import axios from 'axios';

export default {

  // ==================================================
  // Note Routes
  // ==================================================
  post_note: function (note_data) {
    console.log({ 'API.js': note_data })
    return axios.post('/api/note', note_data);
  },
  get_all_notes: function () {
    return axios.get('/api/notes');
  },
  get_notes_by_list_id: function (list_id) {
    return axios.get('/api/notes/' + list_id);
  },
  get_notes_by_priority: function (priority) {
    return axios.get('/api/notes/' + priority);
  },
  get_notes_by_priority: function (priority) {
    return axios.get('/api/notes/' + priority);
  },
  get_note: function (note_id) {
    return axios.get('/api/note/' + note_id);
  },
  update_note: function (note_id, note_data) {
    console.log({ 'API.js': note_data })
    return axios.put('/api/note/' + note_id, note_data);
  },
  delete_note: function (note_id) {
    console.log({ 'API.js': note_id })
    return axios.delete('/api/note/' + note_id);
  },
  // ==================================================
  // Folder Routes
  // ==================================================
  get_all_folders: function () {
    return axios.get('/api/folders');
  },
  post_folder: function (folder_data) {
    console.log({ 'API.js': folder_data })
    return axios.post('/api/folder', folder_data);
  },
  update_folder: function (folder_id, folder_data) {
    console.log({ 'API.js': folder_data })
    return axios.put('/api/folder/' + folder_id, folder_data);
  },
  get_folder: function (folder_id) {
    return axios.get('/api/folder/' + folder_id);
  },
  delete_folder: function (folder_id) {
    console.log({ 'API.js': folder_id })
    return axios.delete('/api/folder/' + folder_id);
  },
  // ==================================================
  // Category Routes
  // ==================================================
  get_all_categories: function () {
    return axios.get('/api/categories');
  },
  post_category: function (category_data) {
    console.log({ 'API.js': category_data })
    return axios.post('/api/category', category_data);
  },
  update_category: function (category_id, category_data) {
    console.log({ 'API.js': category_data })
    return axios.put('/api/category/' + category_id, category_data);
  },
  get_category: function (category_id) {
    return axios.get('/api/category/' + category_id);
  },
  delete_category: function (category_id) {
    console.log({ 'API.js': category_id })
    return axios.delete('/api/category/' + category_id);
  },

}


