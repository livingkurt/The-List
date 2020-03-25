import axios from 'axios';

export default {
  post_note: function (note_data) {

    return axios.post('/api/note', note_data);
  },
  get_all_notes: function () {
    return axios.get('/api/notes');
  },
  get_notes_by_list_id: function (list_id) {
    return axios.get('/api/notes/' + list_id);
  },
  get_note: function (note_id) {
    return axios.get('/api/note/' + note_id);
  },
  update_note: function (note_id, note_data) {
    console.log({ 'API.js': note_data })
    return axios.put('/api/note/' + note_id, note_data);
  },
  delete_note: function (note_id, note_data) {
    return axios.delete('/api/note/' + note_id, note_data);
  },

}


