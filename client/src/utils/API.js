import axios from 'axios';

export default {

  // Note Routes
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
  get_note: function (note_id) {
    return axios.get('/api/note/' + note_id);
  },
  update_note: function (note_id, note_data) {
    console.log({ 'API.js': note_data })
    return axios.put('/api/note/' + note_id, note_data);
  },
  delete_note: function (note_id, note_data) {
    console.log({ 'API.js': note_data })
    return axios.delete('/api/note/' + note_id, note_data);
  },
  // Folder Routes
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

}


